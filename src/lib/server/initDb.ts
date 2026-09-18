import { initIndexes } from './db';

export async function runInit(): Promise<void> {
	console.log('Initializing database indexes and sample records...');
	await initIndexes();
	console.log('Database initialization complete.');
}
