export type InvitationStatus = 'draft' | 'published' | 'unpublished';

export type InvitationTheme =
	| 'editorial'
	| 'cinematic'
	| 'minimal'
	| 'botanical'
	| 'romantic-classic'
	| 'modern-mono'
	| 'brutalist'
	| 'contemporary-color'
	| 'javanese-heritage';

export interface Partner {
	name: string;
	fullName?: string;
	childOf?: string;
	photoMediaId?: string | null;
	photoUrl?: string | null;
}

export interface CoupleContent {
	partner1: Partner;
	partner2: Partner;
}

export interface HeroContent {
	headline: string;
	subheadline: string | null;
	coverMediaId?: string | null;
	coverUrl?: string | null;
	dateBadge?: string;
}

export interface OpeningContent {
	greeting?: string;
	quote?: string;
	quoteSource?: string;
}

export interface StoryContent {
	title: string;
	body: string;
}

export interface WeddingEvent {
	id?: string;
	type: 'ceremony' | 'reception' | string;
	title: string;
	date: string;
	startTime: string;
	endTime: string;
	venue: string;
	address: string;
	mapsUrl: string | null;
}

export interface CountdownContent {
	targetDate: string; // e.g. "2026-12-12T08:00:00"
}

export interface GalleryItem {
	mediaId: string;
	url?: string;
	sortOrder: number;
	caption: string | null;
}

export interface RsvpSettings {
	enabled: boolean;
	deadline?: string;
	allowGuestCount: boolean;
}

export interface GuestbookSettings {
	enabled: boolean;
}

export interface GiftItem {
	type: 'bank' | 'ewallet' | 'address';
	label: string;
	accountNumber: string;
	accountName: string;
}

export interface GiftContent {
	enabled: boolean;
	items: GiftItem[];
}

export interface InvitationContent {
	opening: OpeningContent;
	couple: CoupleContent;
	hero: HeroContent;
	story: StoryContent;
	events: WeddingEvent[];
	countdown: CountdownContent;
	gallery: GalleryItem[];
	rsvp: RsvpSettings;
	guestbook: GuestbookSettings;
	gift: GiftContent;
}

export interface InvitationMusic {
	type: 'library';
	musicId: string;
	url?: string;
	title?: string;
}

export interface Invitation {
	id: string;
	userId: string;
	eventType: 'wedding';
	slug: string;
	status: InvitationStatus;
	theme: InvitationTheme;
	content: InvitationContent;
	music?: InvitationMusic;
	createdAt: string | Date;
	updatedAt: string | Date;
	publishedAt?: string | Date | null;
}

export interface User {
	id: string;
	googleId: string;
	email: string;
	name: string;
	avatarUrl: string | null;
	role: 'user';
	plan: 'free';
	createdAt: string | Date;
	updatedAt: string | Date;
}

export interface MediaItem {
	id: string;
	userId: string;
	invitationId?: string;
	type: 'image' | 'audio';
	cloudinary: {
		publicId: string;
		secureUrl: string;
		resourceType: string;
	};
	originalName: string;
	mimeType: string;
	width?: number;
	height?: number;
	bytes: number;
	createdAt: string | Date;
}

export interface MusicItem {
	id: string;
	name: string;
	category: string;
	cloudinary: {
		publicId: string;
		secureUrl: string;
	};
	duration: number;
	isActive: boolean;
	sortOrder: number;
}

export type AttendanceStatus = 'attending' | 'not_attending' | 'maybe';

export interface RsvpItem {
	id: string;
	invitationId: string;
	name: string;
	attendance: AttendanceStatus;
	guestCount: number;
	message?: string | null;
	createdAt: string | Date;
}

export interface GuestbookItem {
	id: string;
	invitationId: string;
	name: string;
	message: string;
	createdAt: string | Date;
}
