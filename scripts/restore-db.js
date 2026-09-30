import { MongoClient, BSON } from 'mongodb';
import fs from 'fs';
import path from 'path';

// 1. Baca konfigurasi environment
let uri = process.env.MONGODB_URI;
let dbName = process.env.MONGODB_DB_NAME || 'invitation';

if (!uri) {
	try {
		const envPath = path.resolve(process.cwd(), '.env');
		if (fs.existsSync(envPath)) {
			const envContent = fs.readFileSync(envPath, 'utf8');
			for (const line of envContent.split(/\r?\n/)) {
				const trimmed = line.trim();
				if (!trimmed || trimmed.startsWith('#')) continue;
				const eqIdx = trimmed.indexOf('=');
				if (eqIdx === -1) continue;
				const key = trimmed.slice(0, eqIdx).trim();
				const val = trimmed.slice(eqIdx + 1).trim();
				if (key === 'MONGODB_URI' && !uri) uri = val;
				if (key === 'MONGODB_DB_NAME' && (!process.env.MONGODB_DB_NAME || dbName === 'invitation'))
					dbName = val;
			}
		}
	} catch (err) {
		console.warn('⚠️ Tidak dapat membaca file .env:', err.message);
	}
}

if (!uri) {
	console.error('❌ MONGODB_URI belum diset di environment maupun file .env');
	process.exit(1);
}

// 2. Cari direktori backup
function findBackupDirectory() {
	const args = process.argv.slice(2);
	let targetDir = null;
	let shouldDrop = false;

	for (let i = 0; i < args.length; i++) {
		if (args[i] === '--drop') {
			shouldDrop = true;
		} else if (args[i] === '--db' && args[i + 1]) {
			dbName = args[i + 1];
			i++;
		} else if (!args[i].startsWith('-') && !targetDir) {
			targetDir = args[i];
		}
	}

	const baseBackupDir = path.resolve(process.cwd(), 'backups');

	if (targetDir) {
		const resolved = path.isAbsolute(targetDir)
			? targetDir
			: path.resolve(process.cwd(), targetDir);
		if (fs.existsSync(resolved)) return { dir: resolved, shouldDrop };
		const inBackups = path.join(baseBackupDir, targetDir);
		if (fs.existsSync(inBackups)) return { dir: inBackups, shouldDrop };
		console.error(`❌ Direktori backup tidak ditemukan: ${targetDir}`);
		process.exit(1);
	}

	// Ambil folder backup terbaru di folder backups/
	if (!fs.existsSync(baseBackupDir)) {
		console.error('❌ Folder backups/ tidak ditemukan.');
		process.exit(1);
	}

	const dirs = fs
		.readdirSync(baseBackupDir, { withFileTypes: true })
		.filter((d) => d.isDirectory())
		.map((d) => d.name)
		.sort()
		.reverse();

	if (dirs.length === 0) {
		console.error('❌ Tidak ada folder backup di dalam folder backups/.');
		process.exit(1);
	}

	return { dir: path.join(baseBackupDir, dirs[0]), shouldDrop };
}

async function restore() {
	const { dir: backupDir, shouldDrop } = findBackupDirectory();
	const startTime = Date.now();

	console.log('='.repeat(60));
	console.log('🔄 MONGODB RESTORE UTILITY');
	console.log('='.repeat(60));
	console.log(`Database Target : ${dbName}`);
	console.log(`Folder Sumber   : ${backupDir}`);
	console.log(`Drop Existing   : ${shouldDrop ? 'YA (--drop aktif)' : 'TIDAK (Upsert / Tambah)'}`);
	console.log('='.repeat(60));

	const client = new MongoClient(uri);

	try {
		console.log('⏳ Menghubungkan ke MongoDB...');
		await client.connect();
		console.log('✅ Terhubung!\n');

		const db = client.db(dbName);

		// Baca metadata jika ada
		let metadata = null;
		const metaPath = path.join(backupDir, 'metadata.json');
		if (fs.existsSync(metaPath)) {
			try {
				metadata = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
			} catch {
				// Abaikan jika rusak
			}
		}

		// Cari semua file .json kecuali metadata.json
		const files = fs
			.readdirSync(backupDir)
			.filter((f) => f.endsWith('.json') && f !== 'metadata.json');

		if (files.length === 0) {
			console.log('⚠️ Tidak ada file data koleksi (.json) di direktori ini.');
			return;
		}

		let totalRestored = 0;

		for (const file of files) {
			const colName = path.basename(file, '.json');
			const filePath = path.join(backupDir, file);
			const rawData = fs.readFileSync(filePath, 'utf8');

			let docs = [];
			try {
				docs = BSON.EJSON.parse(rawData, { relaxed: true });
			} catch (parseErr) {
				console.error(`  ❌ Gagal parse ${file}:`, parseErr.message);
				continue;
			}

			if (!Array.isArray(docs)) {
				console.warn(`  ⚠️ Format file ${file} bukan array dokumen, dilewati.`);
				continue;
			}

			const collection = db.collection(colName);

			if (shouldDrop) {
				try {
					await collection.drop();
				} catch {
					// Collection mungkin belum ada
				}
			}

			if (docs.length > 0) {
				if (shouldDrop) {
					await collection.insertMany(docs);
				} else {
					// Upsert berdasarkan _id jika tidak pakai --drop
					for (const doc of docs) {
						if (doc._id) {
							await collection.replaceOne({ _id: doc._id }, doc, { upsert: true });
						} else {
							await collection.insertOne(doc);
						}
					}
				}
			}

			// Restore indeks jika ada di metadata
			if (metadata && Array.isArray(metadata.collections)) {
				const colMeta = metadata.collections.find((c) => c.name === colName);
				if (colMeta && Array.isArray(colMeta.indexes) && colMeta.indexes.length > 0) {
					for (const idx of colMeta.indexes) {
						try {
							const { key, name, unique, sparse } = idx;
							const options = { name };
							if (unique) options.unique = true;
							if (sparse) options.sparse = true;
							await collection.createIndex(key, options);
						} catch {
							// Abaikan jika indeks sudah ada / konflik
						}
					}
				}
			}

			totalRestored += docs.length;
			console.log(
				`  • ${colName.padEnd(22)}: ${String(docs.length).padStart(5)} dokumen dipulihkan`
			);
		}

		const elapsedSec = ((Date.now() - startTime) / 1000).toFixed(2);

		console.log('\n' + '='.repeat(60));
		console.log('🎉 RESTORE SELESAI!');
		console.log('='.repeat(60));
		console.log(`Total Dokumen : ${totalRestored}`);
		console.log(`Waktu Eksekusi: ${elapsedSec} detik`);
		console.log('='.repeat(60));
	} catch (err) {
		console.error('\n❌ Terjadi kesalahan saat restore:', err);
		process.exit(1);
	} finally {
		await client.close();
	}
}

restore();
