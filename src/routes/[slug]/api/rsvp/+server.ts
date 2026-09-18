import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getDb, memoryStore } from '$lib/server/db';
import type { EventDocument, GuestDocument } from '$lib/types';
import { slugify } from '$lib/utils';
import { ObjectId } from 'mongodb';

// Sanitizer helper for security against XSS in greetings
function sanitizeString(input: unknown): string {
	if (typeof input !== 'string') return '';
	return input
		.trim()
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#x27;');
}

export const POST: RequestHandler = async ({ params, request }) => {
	const { slug } = params;

	let body: Record<string, unknown>;
	try {
		body = await request.json();
	} catch (err) {
		return json(
			{ success: false, error: 'Format JSON request tidak valid.' },
			{ status: 400 }
		);
	}

	const rawName = body.name;
	const rawPax = body.pax;
	const rawRsvpStatus = body.rsvpStatus;
	const rawGreeting = body.greetingMessage;

	// Validation
	if (!rawName || typeof rawName !== 'string' || rawName.trim().length < 2) {
		return json(
			{ success: false, error: 'Validasi gagal: Nama wajib diisi minimal 2 karakter.' },
			{ status: 400 }
		);
	}

	if (rawName.trim().length > 100) {
		return json(
			{ success: false, error: 'Validasi gagal: Nama maksimal 100 karakter.' },
			{ status: 400 }
		);
	}

	if (rawRsvpStatus !== 'attending' && rawRsvpStatus !== 'absent') {
		return json(
			{ success: false, error: 'Validasi gagal: Status RSVP harus "attending" atau "absent".' },
			{ status: 400 }
		);
	}

	const paxNumber = Number(rawPax) || 1;
	if (paxNumber < 1 || paxNumber > 10) {
		return json(
			{ success: false, error: 'Validasi gagal: Jumlah tamu (pax) harus antara 1 dan 10.' },
			{ status: 400 }
		);
	}

	const name = sanitizeString(rawName);
	const greetingMessage = rawGreeting ? sanitizeString(rawGreeting) : undefined;
	if (greetingMessage && greetingMessage.length > 500) {
		return json(
			{ success: false, error: 'Validasi gagal: Ucapan doa maksimal 500 karakter.' },
			{ status: 400 }
		);
	}

	const guestSlug = slugify(name);
	const db = await getDb();

	// Find the parent event
	let event: EventDocument | null = null;
	if (db) {
		try {
			event = await db.collection<EventDocument>('events').findOne({ slug });
		} catch (err) {
			console.warn('MongoDB error retrieving event:', err);
		}
	}
	if (!event) {
		event = memoryStore.getEventBySlug(slug);
	}

	if (!event) {
		return json(
			{ success: false, error: `Event dengan slug "${slug}" tidak ditemukan.` },
			{ status: 404 }
		);
	}

	const eventId = event._id;

	const newGuestData: Partial<GuestDocument> = {
		name,
		slug: guestSlug,
		rsvpStatus: rawRsvpStatus,
		pax: paxNumber,
		greetingMessage,
		submittedAt: new Date()
	};

	if (db) {
		try {
			const guestsCol = db.collection<GuestDocument>('guests');
			const eventIdObj = typeof eventId === 'string' ? new ObjectId(eventId) : eventId;

			// Update if exists or insert if new
			await guestsCol.updateOne(
				{
					eventId: eventIdObj,
					$or: [{ slug: guestSlug }, { name: { $regex: new RegExp(`^${name}$`, 'i') } }]
				},
				{
					$set: {
						...newGuestData,
						eventId: eventIdObj
					}
				},
				{ upsert: true }
			);
		} catch (err) {
			console.warn('MongoDB upsert error, falling back to memoryStore:', err);
			memoryStore.saveGuest({
				_id: new ObjectId(),
				eventId: String(eventId),
				name,
				slug: guestSlug,
				rsvpStatus: rawRsvpStatus,
				pax: paxNumber,
				greetingMessage,
				submittedAt: new Date()
			});
		}
	} else {
		// Memory store fallback
		memoryStore.saveGuest({
			_id: 'guest-' + Date.now(),
			eventId: String(eventId),
			name,
			slug: guestSlug,
			rsvpStatus: rawRsvpStatus,
			pax: paxNumber,
			greetingMessage,
			submittedAt: new Date()
		});
	}

	return json(
		{
			success: true,
			message: 'RSVP berhasil dikirim',
			data: {
				name,
				rsvpStatus: rawRsvpStatus,
				pax: paxNumber,
				greetingMessage
			}
		},
		{ status: 201 }
	);
};
