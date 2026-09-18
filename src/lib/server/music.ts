import { getMusicCollection } from '$lib/server/db';
import { ObjectId } from 'mongodb';
import type { MusicItem } from '$lib/types/invitation';

export const DEFAULT_MUSIC_TRACKS: Array<Omit<MusicItem, 'id'> & { id: string }> = [
	{
		id: '6aad52aefbd641276ebe81c1',
		name: 'Payung Teduh - Akad',
		category: 'Romantis / Pop Indonesia',
		cloudinary: {
			publicId: 'Payung-Teduh-Akad-Official-Music_tqdhnl',
			secureUrl:
				'https://res.cloudinary.com/diton4fcf/video/upload/v1789742766/Payung-Teduh-Akad-Official-Music_tqdhnl.mp3'
		},
		duration: 256,
		isActive: true,
		sortOrder: 1
	},
	{
		id: '6aad52aefbd641276ebe81c2',
		name: 'Andmesh Kamaleng - Cinta Luar Biasa',
		category: 'Romantis / Pop Indonesia',
		cloudinary: {
			publicId: 'aac_Andmesh_Kamaleng_-_Cinta_Luar_Biasa_Official_Music_Video_kdavn7',
			secureUrl:
				'https://res.cloudinary.com/diton4fcf/video/upload/v1789743444/aac_Andmesh_Kamaleng_-_Cinta_Luar_Biasa_Official_Music_Video_kdavn7.mp3'
		},
		duration: 271,
		isActive: true,
		sortOrder: 2
	},
	{
		id: '6aad5406d89aae231ccdf306',
		name: 'Yovie & Nuno - Janji Suci',
		category: 'Romantis / Pop Indonesia',
		cloudinary: {
			publicId: 'aac_Yovie_Nuno_-_Janji_Suci_Video_Clip_rrilsj',
			secureUrl:
				'https://res.cloudinary.com/diton4fcf/video/upload/v1789743183/aac_Yovie_Nuno_-_Janji_Suci_Video_Clip_rrilsj.mp3'
		},
		duration: 193,
		isActive: true,
		sortOrder: 3
	}
];

export async function getMusicList(): Promise<MusicItem[]> {
	try {
		const col = await getMusicCollection();
		let docs = await col.find({ isActive: true }).sort({ sortOrder: 1 }).toArray();

		if (docs.length === 0) {
			for (const track of DEFAULT_MUSIC_TRACKS) {
				const { id, ...data } = track;
				await col.updateOne(
					{ 'cloudinary.secureUrl': track.cloudinary.secureUrl },
					{ $setOnInsert: { ...data, createdAt: new Date(), updatedAt: new Date() } },
					{ upsert: true }
				);
			}
			docs = await col.find({ isActive: true }).sort({ sortOrder: 1 }).toArray();
		}

		return docs.map((d) => ({
			id: d._id.toString(),
			name: d.name,
			category: d.category,
			cloudinary: d.cloudinary,
			duration: d.duration,
			isActive: d.isActive,
			sortOrder: d.sortOrder
		}));
	} catch (err) {
		console.warn('Failed to query music collection from db, using defaults:', err);
		return DEFAULT_MUSIC_TRACKS.map((t) => ({ ...t }));
	}
}

export async function getMusicById(id: string): Promise<MusicItem | null> {
	try {
		const col = await getMusicCollection();
		let filter;
		try {
			filter = { _id: new ObjectId(id) };
		} catch {
			filter = { _id: id as unknown as ObjectId };
		}
		const d = await col.findOne(filter);
		if (d) {
			return {
				id: d._id.toString(),
				name: d.name,
				category: d.category,
				cloudinary: d.cloudinary,
				duration: d.duration,
				isActive: d.isActive,
				sortOrder: d.sortOrder
			};
		}
	} catch {
		// fallback to preset search
	}

	const found = DEFAULT_MUSIC_TRACKS.find((t) => t.id === id);
	return found ? { ...found } : null;
}
