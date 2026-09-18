import { json, type RequestHandler } from '@sveltejs/kit';
import { getMusicList } from '$lib/server/music';

export const GET: RequestHandler = async () => {
	try {
		const tracks = await getMusicList();
		return json({ tracks });
	} catch (err) {
		console.error('Fetch music tracks error:', err);
		return json({ tracks: [] });
	}
};
