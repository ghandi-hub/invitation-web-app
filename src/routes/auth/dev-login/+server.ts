import { error, type RequestHandler } from '@sveltejs/kit';
export const GET: RequestHandler = () => {
	error(404, 'Login contoh tidak tersedia. Silakan masuk dengan Google.');
};
