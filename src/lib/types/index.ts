import type { ObjectId } from 'mongodb';

export type EventType = 'wedding' | 'khitanan' | 'birthday' | 'aqiqah' | 'gathering';
export type EventStatus = 'draft' | 'published' | 'archived';
export type RsvpStatus = 'pending' | 'attending' | 'absent';
export type GiftType = 'bank' | 'ewallet' | 'address';

export interface ScheduleItem {
	title: string;
	startTime: string | Date;
	endTime?: string | Date;
	venue: string;
	address: string;
	mapsUrl?: string;
}

export interface GalleryItem {
	url: string;
	caption?: string;
}

export interface GiftRegistryItem {
	type: GiftType;
	provider?: string;
	accountNumber?: string;
	accountHolder?: string;
	address?: string;
}

export interface EventMetadata {
	title: string;
	description: string;
	ogImage?: string;
}

export interface EventHonored {
	name: string;
	secondaryName?: string;
	roleOrTitle?: string;
	details?: Record<string, unknown>;
	avatarUrl?: string;
	secondaryAvatarUrl?: string;
	parentNames?: string;
	secondaryParentNames?: string;
}

export interface EventContent {
	hosts: string[];
	honored: EventHonored;
	quote?: {
		text: string;
		source?: string;
	};
	schedules: ScheduleItem[];
	galleries: GalleryItem[];
	giftRegistries: GiftRegistryItem[];
	story?: Array<{
		year?: string;
		title: string;
		description: string;
	}>;
}

export interface EventFeatures {
	rsvpEnabled: boolean;
	guestbookEnabled: boolean;
	giftEnabled: boolean;
	musicUrl?: string;
	showComments: boolean;
}

export interface EventDocument {
	_id: ObjectId | string;
	userId: ObjectId | string;
	slug: string;
	eventType: EventType;
	themeId: string;
	status: EventStatus;
	customDomain?: string;
	metadata: EventMetadata;
	content: EventContent;
	features: EventFeatures;
	createdAt: Date | string;
	updatedAt: Date | string;
}

export interface GuestDocument {
	_id: ObjectId | string;
	eventId: ObjectId | string;
	name: string;
	slug: string;
	category?: string;
	rsvpStatus: RsvpStatus;
	pax: number;
	greetingMessage?: string;
	submittedAt?: Date | string;
}

export interface RsvpPayload {
	name: string;
	pax: number;
	rsvpStatus: 'attending' | 'absent';
	greetingMessage?: string;
}

export interface ThemeConfig {
	id: string;
	name: string;
	description: string;
	eventType: EventType;
	previewImage?: string;
	primaryColor: string;
	accentColor: string;
}
