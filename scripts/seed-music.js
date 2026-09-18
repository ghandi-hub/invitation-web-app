import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';

// Read .env manually if not set
let uri = process.env.MONGODB_URI;
let dbName = process.env.MONGODB_DB_NAME || 'invitation';

if (!uri) {
	try {
		const envPath = path.resolve(process.cwd(), '.env');
		if (fs.existsSync(envPath)) {
			const envContent = fs.readFileSync(envPath, 'utf8');
			for (const line of envContent.split('\n')) {
				const trimmed = line.trim();
				if (trimmed.startsWith('MONGODB_URI=')) {
					uri = trimmed.substring('MONGODB_URI='.length).trim();
				} else if (trimmed.startsWith('MONGODB_DB_NAME=')) {
					dbName = trimmed.substring('MONGODB_DB_NAME='.length).trim();
				}
			}
		}
	} catch (err) {
		console.warn('Could not read .env file:', err.message);
	}
}

if (!uri) {
	console.error('MONGODB_URI is not set in environment or .env');
	process.exit(1);
}

const songs = [
	{
		name: 'Payung Teduh - Akad',
		category: 'Romantis / Pop Indonesia',
		cloudinary: {
			publicId: 'Payung-Teduh-Akad-Official-Music_tqdhnl',
			secureUrl: 'https://res.cloudinary.com/diton4fcf/video/upload/v1789742766/Payung-Teduh-Akad-Official-Music_tqdhnl.mp3'
		},
		duration: 256,
		isActive: true,
		sortOrder: 1,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		name: 'Andmesh Kamaleng - Cinta Luar Biasa',
		category: 'Romantis / Pop Indonesia',
		cloudinary: {
			publicId: 'aac_Andmesh_Kamaleng_-_Cinta_Luar_Biasa_Official_Music_Video_kdavn7',
			secureUrl: 'https://res.cloudinary.com/diton4fcf/video/upload/v1789743444/aac_Andmesh_Kamaleng_-_Cinta_Luar_Biasa_Official_Music_Video_kdavn7.mp3'
		},
		duration: 271,
		isActive: true,
		sortOrder: 2,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		name: 'Yovie & Nuno - Janji Suci',
		category: 'Romantis / Pop Indonesia',
		cloudinary: {
			publicId: 'aac_Yovie_Nuno_-_Janji_Suci_Video_Clip_rrilsj',
			secureUrl: 'https://res.cloudinary.com/diton4fcf/video/upload/v1789743183/aac_Yovie_Nuno_-_Janji_Suci_Video_Clip_rrilsj.mp3'
		},
		duration: 193,
		isActive: true,
		sortOrder: 3,
		createdAt: new Date(),
		updatedAt: new Date()
	}
];

async function seed() {
	console.log(`Connecting to MongoDB (${dbName})...`);
	const client = new MongoClient(uri);
	try {
		await client.connect();
		const db = client.db(dbName);
		const musicCol = db.collection('music');

		for (const song of songs) {
			const existing = await musicCol.findOne({
				$or: [
					{ 'cloudinary.publicId': song.cloudinary.publicId },
					{ 'cloudinary.secureUrl': song.cloudinary.secureUrl },
					{ name: song.name }
				]
			});

			if (existing) {
				await musicCol.updateOne(
					{ _id: existing._id },
					{
						$set: {
							name: song.name,
							category: song.category,
							cloudinary: song.cloudinary,
							duration: song.duration,
							isActive: song.isActive,
							sortOrder: song.sortOrder,
							updatedAt: new Date()
						}
					}
				);
				console.log(`Updated existing song: ${song.name} (id: ${existing._id})`);
			} else {
				const result = await musicCol.insertOne(song);
				console.log(`Inserted new song: ${song.name} (id: ${result.insertedId})`);
			}
		}

		console.log('All songs processed successfully!');
		const total = await musicCol.countDocuments({ isActive: true });
		console.log(`Total active songs in DB: ${total}`);

		// Set default song on invitations that do not have music yet
		const defaultSong = songs[0];
		const invCol = db.collection('invitations');
		const updateResult = await invCol.updateMany(
			{ $or: [{ music: { $exists: false } }, { music: null }, { 'music.url': { $exists: false } }] },
			{
				$set: {
					music: {
						type: 'library',
						musicId: '6aad52aefbd641276ebe81c1',
						url: defaultSong.cloudinary.secureUrl,
						title: defaultSong.name
					}
				}
			}
		);
		console.log(`Updated ${updateResult.modifiedCount} invitations with default music (${defaultSong.name})`);
	} catch (err) {
		console.error('Error seeding music:', err);
		process.exit(1);
	} finally {
		await client.close();
	}
}

seed();
