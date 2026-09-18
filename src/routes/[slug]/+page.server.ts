import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getDb, memoryStore, initDatabaseIndexes } from '$lib/server/db';
import type { EventDocument, GuestDocument } from '$lib/types';
import { slugify } from '$lib/utils';
import { ObjectId } from 'mongodb';

export const load: PageServerLoad = async ({ params, url }) => {
	const { slug } = params;
	const recipientQuery = url.searchParams.get('to');

	let event: EventDocument | null = null;
	let guest: GuestDocument | null = null;
	let greetings: GuestDocument[] = [];

	const db = await getDb();

	if (db) {
		try {
			// Find event by slug
			const eventsCol = db.collection<EventDocument>('events');
			event = await eventsCol.findOne({ slug });

			if (!event) {
				// Try checking memory store if not yet seeded
				event = memoryStore.getEventBySlug(slug);
			}

			if (event) {
				const guestsCol = db.collection<GuestDocument>('guests');
				const eventIdObj = typeof event._id === 'string' ? new ObjectId(event._id) : event._id;

				// Recipient lookup if ?to= provided
				if (recipientQuery && recipientQuery.trim()) {
					const guestSlug = slugify(recipientQuery);
					guest = await guestsCol.findOne({
						eventId: eventIdObj,
						$or: [
							{ slug: guestSlug },
							{ name: { $regex: new RegExp(`^${recipientQuery.trim()}$`, 'i') } }
						]
					});

					// If guest not pre-registered in DB, provide guest instance with provided recipient name
					if (!guest) {
						guest = {
							_id: new ObjectId().toString(),
							eventId: String(event._id),
							name: recipientQuery.trim(),
							slug: guestSlug,
							rsvpStatus: 'pending',
							pax: 1
						};
					}
				}

				// Fetch greetings
				const greetingsCursor = guestsCol
					.find({
						eventId: eventIdObj,
						greetingMessage: { $exists: true, $ne: '' }
					})
					.sort({ submittedAt: -1 })
					.limit(50);

				greetings = await greetingsCursor.toArray();

				if (greetings.length === 0) {
					greetings = memoryStore.getGreetings(String(event._id));
				}
			}
		} catch (err) {
			console.warn('MongoDB query error, falling back to memory store:', (err as Error).message);
			event = memoryStore.getEventBySlug(slug);
		}
	} else {
		// Fallback to memory store
		event = memoryStore.getEventBySlug(slug);
		if (event && recipientQuery) {
			const guestSlug = slugify(recipientQuery);
			guest = memoryStore.getGuestByEventAndSlug(String(event._id), guestSlug);
			if (!guest) {
				guest = {
					_id: 'guest-' + Date.now(),
					eventId: String(event._id),
					name: recipientQuery.trim(),
					slug: guestSlug,
					rsvpStatus: 'pending',
					pax: 1
				};
			}
		}
		if (event) {
			greetings = memoryStore.getGreetings(String(event._id));
		}
	}

	if (!event) {
		throw error(404, {
			message: `Undangan dengan tautan "${slug}" tidak ditemukan.`
		});
	}

	// Serialize MongoDB documents for safe SvelteKit hydration
	const serializedEvent: EventDocument = {
		...event,
		_id: String(event._id),
		userId: String(event.userId),
		createdAt: event.createdAt ? new Date(event.createdAt).toISOString() : new Date().toISOString(),
		updatedAt: event.updatedAt ? new Date(event.updatedAt).toISOString() : new Date().toISOString()
	};

	const serializedGuest: GuestDocument | null = guest
		? {
				...guest,
				_id: String(guest._id),
				eventId: String(guest.eventId),
				submittedAt: guest.submittedAt ? new Date(guest.submittedAt).toISOString() : undefined
			}
		: null;

	const serializedGreetings: GuestDocument[] = greetings.map((g) => ({
		...g,
		_id: String(g._id),
		eventId: String(g.eventId),
		submittedAt: g.submittedAt ? new Date(g.submittedAt).toISOString() : undefined
	}));

	return {
		event: serializedEvent,
		guest: serializedGuest,
		greetings: serializedGreetings
	};
};
