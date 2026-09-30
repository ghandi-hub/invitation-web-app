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

// 2. Format timestamp untuk nama folder (YYYY-MM-DD_HH-mm-ss)
function getFormattedTimestamp() {
	const now = new Date();
	const pad = (n) => String(n).padStart(2, '0');
	const y = now.getFullYear();
	const m = pad(now.getMonth() + 1);
	const d = pad(now.getDate());
	const hh = pad(now.getHours());
	const mm = pad(now.getMinutes());
	const ss = pad(now.getSeconds());
	return `${y}-${m}-${d}_${hh}-${mm}-${ss}`;
}

function formatBytes(bytes) {
	if (bytes === 0) return '0 B';
	const k = 1024;
	const sizes = ['B', 'KB', 'MB', 'GB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function backup() {
	const startTime = Date.now();
	const timestampStr = getFormattedTimestamp();

	// Parse argumen CLI (misal: --out <dir>)
	const args = process.argv.slice(2);
	let targetDirName = `backup-${dbName}-${timestampStr}`;
	for (let i = 0; i < args.length; i++) {
		if ((args[i] === '--out' || args[i] === '-o') && args[i + 1]) {
			targetDirName = args[i + 1];
			i++;
		}
	}

	const baseBackupDir = path.resolve(process.cwd(), 'backups');
	const backupPath = path.isAbsolute(targetDirName)
		? targetDirName
		: path.join(baseBackupDir, targetDirName);

	if (!fs.existsSync(backupPath)) {
		fs.mkdirSync(backupPath, { recursive: true });
	}

	console.log('='.repeat(60));
	console.log('📦 MONGODB BACKUP UTILITY');
	console.log('='.repeat(60));
	console.log(`Database : ${dbName}`);
	console.log(`Tujuan   : ${backupPath}`);
	console.log(`Waktu    : ${new Date().toLocaleString()}`);
	console.log('='.repeat(60));

	const client = new MongoClient(uri);

	try {
		console.log('⏳ Menghubungkan ke MongoDB...');
		await client.connect();
		console.log('✅ Berhasil terhubung ke MongoDB!\n');

		const db = client.db(dbName);
		const collections = await db.listCollections({ type: 'collection' }).toArray();

		if (collections.length === 0) {
			console.log('⚠️ Tidak ada collection yang ditemukan di database.');
			return;
		}

		const metadata = {
			database: dbName,
			timestamp: new Date().toISOString(),
			localTime: new Date().toLocaleString(),
			totalCollections: collections.length,
			collections: []
		};

		let totalDocs = 0;
		let totalBytes = 0;

		console.log('Memproses backup koleksi:');

		for (const colInfo of collections) {
			const colName = colInfo.name;
			const collection = db.collection(colName);

			// Ambil semua dokumen
			const docs = await collection.find({}).toArray();
			const count = docs.length;
			totalDocs += count;

			// Ambil indeks
			let indexes = [];
			try {
				indexes = await collection.indexes();
			} catch {
				// Abaikan jika tidak bisa ambil indeks
			}

			// Simpan ke file JSON menggunakan EJSON (Extended JSON) agar tipe ObjectId & Date tetap terjaga
			const filePath = path.join(backupPath, `${colName}.json`);
			const ejsonContent = BSON.EJSON.stringify(docs, { relaxed: true }, 2);
			fs.writeFileSync(filePath, ejsonContent, 'utf8');

			const stat = fs.statSync(filePath);
			totalBytes += stat.size;

			metadata.collections.push({
				name: colName,
				count,
				file: `${colName}.json`,
				sizeBytes: stat.size,
				indexes: indexes.filter((idx) => idx.name !== '_id_') // Indeks _id otomatis dibuat mongo
			});

			console.log(
				`  • ${colName.padEnd(22)}: ${String(count).padStart(5)} dokumen (${formatBytes(stat.size).padStart(9)})`
			);
		}

		// Tulis metadata.json
		const metadataPath = path.join(backupPath, 'metadata.json');
		fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2), 'utf8');

		const elapsedSec = ((Date.now() - startTime) / 1000).toFixed(2);

		console.log('\n' + '='.repeat(60));
		console.log('🎉 BACKUP SELESAI!');
		console.log('='.repeat(60));
		console.log(`Total Collection: ${collections.length}`);
		console.log(`Total Dokumen   : ${totalDocs}`);
		console.log(`Total Ukuran    : ${formatBytes(totalBytes)}`);
		console.log(`Waktu Eksekusi  : ${elapsedSec} detik`);
		console.log(`Lokasi File     : ${backupPath}`);
		console.log('='.repeat(60));
	} catch (err) {
		console.error('\n❌ Terjadi kesalahan saat melakukan backup:', err);
		process.exit(1);
	} finally {
		await client.close();
	}
}

backup();
