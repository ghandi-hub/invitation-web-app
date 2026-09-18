import { getMusicCollection } from '$lib/server/db';
import { ObjectId } from 'mongodb';
import type { MusicItem } from '$lib/types/invitation';

export async function getMusicList(): Promise<MusicItem[]> {
	const col = await getMusicCollection();
	const docs = await col.find({ isActive: true }).sort({ sortOrder: 1 }).toArray();

	return docs.map((d) => ({
		id: d._id.toString(),
		name: d.name,
		category: d.category,
		cloudinary: d.cloudinary,
		duration: d.duration,
		isActive: d.isActive,
		sortOrder: d.sortOrder
	}));
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
		if (!d) return null;
		return {
			id: d._id.toString(),
			name: d.name,
			category: d.category,
			cloudinary: d.cloudinary,
			duration: d.duration,
			isActive: d.isActive,
			sortOrder: d.sortOrder
		};
	} catch {
		return null;
	}
}
