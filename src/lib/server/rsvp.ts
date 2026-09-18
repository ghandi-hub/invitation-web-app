import { getRsvpsCollection } from '$lib/server/db';
import type { AttendanceStatus, RsvpItem } from '$lib/types/invitation';

export async function createRsvp(params: {
	invitationId: string;
	name: string;
	attendance: AttendanceStatus;
	guestCount: number;
	message?: string | null;
}): Promise<RsvpItem> {
	const cleanName = (params.name || '').trim().slice(0, 100);
	if (!cleanName) {
		throw new Error('NAME_REQUIRED');
	}

	const allowedStatus: AttendanceStatus[] = ['attending', 'not_attending', 'maybe'];
	if (!allowedStatus.includes(params.attendance)) {
		throw new Error('INVALID_ATTENDANCE');
	}

	const count = Math.max(1, Math.min(10, Math.floor(Number(params.guestCount) || 1)));
	const cleanMessage = params.message ? params.message.trim().slice(0, 500) : null;
	const now = new Date();

	const col = await getRsvpsCollection();
	const doc = {
		invitationId: params.invitationId,
		name: cleanName,
		attendance: params.attendance,
		guestCount: count,
		message: cleanMessage,
		createdAt: now
	};

	const result = await col.insertOne(doc);

	return {
		id: result.insertedId.toString(),
		invitationId: params.invitationId,
		name: cleanName,
		attendance: params.attendance,
		guestCount: count,
		message: cleanMessage,
		createdAt: now
	};
}

export async function getRsvpsByInvitation(invitationId: string): Promise<RsvpItem[]> {
	try {
		const col = await getRsvpsCollection();
		const docs = await col.find({ invitationId }).sort({ createdAt: -1 }).toArray();

		return docs.map((d) => ({
			id: d._id.toString(),
			invitationId: d.invitationId,
			name: d.name,
			attendance: d.attendance,
			guestCount: d.guestCount,
			message: d.message || null,
			createdAt: d.createdAt
		}));
	} catch {
		return [];
	}
}
