import { MongoClient, type Db } from 'mongodb';
import { env } from '$env/dynamic/private';

const uri = env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = env.MONGODB_DB_NAME || 'invitation';

declare global {
	// eslint-disable-next-line no-var
	var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
	if (!global._mongoClientPromise) {
		client = new MongoClient(uri);
		global._mongoClientPromise = client.connect();
	}
	clientPromise = global._mongoClientPromise;
} else {
	client = new MongoClient(uri);
	clientPromise = client.connect();
}

export async function getDb(): Promise<Db> {
	const c = await clientPromise;
	return c.db(dbName);
}

let indexesInitialized = false;

export async function initIndexes(): Promise<void> {
	if (indexesInitialized) return;
	try {
		const db = await getDb();
		await db.collection('users').createIndex({ googleId: 1 }, { unique: true, sparse: true });
		await db.collection('users').createIndex({ email: 1 }, { unique: true });
		await db.collection('invitations').createIndex({ slug: 1 }, { unique: true });
		await db.collection('invitations').createIndex({ userId: 1 });
		await db.collection('invitations').createIndex({ status: 1 });
		await db.collection('invitations').createIndex({ eventType: 1 });
		await db.collection('media').createIndex({ userId: 1 });
		await db.collection('media').createIndex({ invitationId: 1 });
		await db.collection('music').createIndex({ isActive: 1, sortOrder: 1 });
		await db.collection('rsvps').createIndex({ invitationId: 1, createdAt: -1 });
		await db.collection('guestbook_entries').createIndex({ invitationId: 1, createdAt: -1 });
		indexesInitialized = true;
	} catch (err) {
		console.warn('Index initialization note:', (err as Error).message);
	}
}

export async function getUsersCollection() {
	const db = await getDb();
	return db.collection('users');
}

export async function getInvitationsCollection() {
	const db = await getDb();
	return db.collection('invitations');
}

export async function getMediaCollection() {
	const db = await getDb();
	return db.collection('media');
}

export async function getMusicCollection() {
	const db = await getDb();
	return db.collection('music');
}

export async function getRsvpsCollection() {
	const db = await getDb();
	return db.collection('rsvps');
}

export async function getGuestbookCollection() {
	const db = await getDb();
	return db.collection('guestbook_entries');
}
