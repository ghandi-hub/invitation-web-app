import { initDatabaseIndexes } from './db';

export async function runInit(): Promise<void> {
	console.log('Initializing database indexes and sample records...');
	await initDatabaseIndexes();
	console.log('Database initialization complete.');
}
