import { MongoClient, type Db, type Collection } from 'mongodb';
import { env } from '$env/dynamic/private';
import type { EventDocument, GuestDocument } from '$lib/types';
import { initialEvents, initialGuests } from './seedData';

const uri = env.MONGODB_URI || 'mongodb://localhost:27017/invitation_saas';

const options = {
	maxPoolSize: 20,
	minPoolSize: 5,
	maxIdleTimeMS: 30000,
	serverSelectionTimeoutMS: 2000
};

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;
let isConnectedToMongo = false;

declare global {
	var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// In-memory store fallback if MongoDB server is not running locally during development
class MemoryStore {
	private events: Map<string, EventDocument> = new Map();
	private guests: GuestDocument[] = [];

	constructor() {
		for (const ev of initialEvents) {
			this.events.set(ev.slug, JSON.parse(JSON.stringify(ev)));
		}
		for (const g of initialGuests) {
			this.guests.push(JSON.parse(JSON.stringify(g)));
		}
	}

	getEventBySlug(slug: string): EventDocument | null {
		const ev = this.events.get(slug);
		return ev ? JSON.parse(JSON.stringify(ev)) : null;
	}

	getAllEvents(): EventDocument[] {
		return Array.from(this.events.values()).map((e) => JSON.parse(JSON.stringify(e)));
	}

	getGuestByEventAndSlug(eventId: string, slug: string): GuestDocument | null {
		const g = this.guests.find(
			(item) => String(item.eventId) === String(eventId) && item.slug === slug
		);
		return g ? JSON.parse(JSON.stringify(g)) : null;
	}

	getGreetings(eventId: string): GuestDocument[] {
		return this.guests
			.filter(
				(item) =>
					String(item.eventId) === String(eventId) &&
					item.greetingMessage &&
					item.greetingMessage.trim().length > 0
			)
			.sort(
				(a, b) =>
					new Date(b.submittedAt || 0).getTime() - new Date(a.submittedAt || 0).getTime()
			)
			.map((e) => JSON.parse(JSON.stringify(e)));
	}

	saveGuest(guestData: GuestDocument): GuestDocument {
		const existingIndex = this.guests.findIndex(
			(item) =>
				String(item.eventId) === String(guestData.eventId) &&
				(item.slug === guestData.slug || item.name.toLowerCase() === guestData.name.toLowerCase())
		);
		if (existingIndex >= 0) {
			this.guests[existingIndex] = {
				...this.guests[existingIndex],
				...guestData,
				submittedAt: new Date()
			};
			return JSON.parse(JSON.stringify(this.guests[existingIndex]));
		} else {
			const newDoc = {
				...guestData,
				submittedAt: new Date()
			};
			this.guests.unshift(newDoc);
			return JSON.parse(JSON.stringify(newDoc));
		}
	}
}

export const memoryStore = new MemoryStore();

export async function getMongoClient(): Promise<MongoClient | null> {
	if (!uri) return null;
	try {
		if (process.env.NODE_ENV === 'development') {
			if (!global._mongoClientPromise) {
				client = new MongoClient(uri, options);
				global._mongoClientPromise = client.connect();
			}
			clientPromise = global._mongoClientPromise;
		} else {
			if (!clientPromise) {
				client = new MongoClient(uri, options);
				clientPromise = client.connect();
			}
		}
		const resolvedClient = await clientPromise;
		isConnectedToMongo = true;
		return resolvedClient;
	} catch (err) {
		isConnectedToMongo = false;
		// Return null so callers can seamlessly fall back to memory store without breaking the app
		return null;
	}
}

export async function getDb(): Promise<Db | null> {
	const c = await getMongoClient();
	if (!c) return null;
	return c.db();
}

export async function initDatabaseIndexes(): Promise<void> {
	try {
		const db = await getDb();
		if (!db) return;

		const eventsCol = db.collection<EventDocument>('events');
		const guestsCol = db.collection<GuestDocument>('guests');

		await eventsCol.createIndex({ slug: 1 }, { unique: true });
		await eventsCol.createIndex({ userId: 1, createdAt: -1 });

		await guestsCol.createIndex({ eventId: 1, slug: 1 }, { unique: true });
		await guestsCol.createIndex({ eventId: 1, submittedAt: -1 });

		// Seed initial events if database is empty
		const count = await eventsCol.countDocuments();
		if (count === 0) {
			await eventsCol.insertMany(initialEvents);
			await guestsCol.insertMany(initialGuests);
			console.log('Seed data inserted successfully into MongoDB.');
		}
	} catch (err) {
		console.warn('MongoDB index initialization skipped or failed:', (err as Error).message);
	}
}

export async function getEventsCollection(): Promise<Collection<EventDocument> | null> {
	const db = await getDb();
	return db ? db.collection<EventDocument>('events') : null;
}

export async function getGuestsCollection(): Promise<Collection<GuestDocument> | null> {
	const db = await getDb();
	return db ? db.collection<GuestDocument>('guests') : null;
}
