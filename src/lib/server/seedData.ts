import type { EventDocument, GuestDocument } from '$lib/types';
import { ObjectId } from 'mongodb';

export const initialEvents: EventDocument[] = [
	{
		_id: new ObjectId('650000000000000000000001'),
		userId: new ObjectId('650000000000000000000099'),
		slug: 'khitanan-faiz-2026',
		eventType: 'khitanan',
		themeId: 'islamic-emerald',
		status: 'published',
		metadata: {
			title: 'Walimatul Khitan Faiz Muhammad - Undangan Digital',
			description: 'Tasyakuran dan Walimatul Khitan putra kami tercinta, Faiz Muhammad Subagja.',
			ogImage: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80'
		},
		content: {
			hosts: ['H. Ahmad Subagja, S.T.', 'Hj. Siti Aminah, S.Pd.'],
			honored: {
				name: 'Faiz Muhammad Subagja',
				roleOrTitle: 'Putra Kedua',
				details: { age: 10, school: 'SD Islam Al-Azhar' },
				avatarUrl: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=800&q=80',
				parentNames: 'Bpk. H. Ahmad Subagja & Ibu Hj. Siti Aminah'
			},
			quote: {
				text: 'Semoga menjadi anak yang sholeh, berbakti kepada kedua orang tua, berguna bagi agama, bangsa, dan negara.',
				source: 'Doa Khitanan'
			},
			schedules: [
				{
					title: 'Akad Khitan & Doa Bersama',
					startTime: '2026-10-24T08:00:00.000Z',
					endTime: '2026-10-24T10:00:00.000Z',
					venue: 'Kediaman Mempelai / Tuan Rumah',
					address: 'Jl. Melati Raya No. 45, Kebayoran Baru, Jakarta Selatan',
					mapsUrl: 'https://maps.google.com/?q=Jakarta'
				},
				{
					title: 'Tasyakuran & Ramah Tamah',
					startTime: '2026-10-24T11:00:00.000Z',
					endTime: '2026-10-24T15:00:00.000Z',
					venue: 'Grand Ball Room Al-Barokah',
					address: 'Jl. Sultan Hasanuddin No. 12, Kebayoran Baru, Jakarta Selatan',
					mapsUrl: 'https://maps.google.com/?q=Jakarta'
				}
			],
			galleries: [
				{
					url: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=800&q=80',
					caption: 'Faiz Muhammad Subagja'
				},
				{
					url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80',
					caption: 'Momen Kebersamaan Keluarga'
				},
				{
					url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
					caption: 'Syukuran & Kebahagiaan'
				}
			],
			giftRegistries: [
				{
					type: 'bank',
					provider: 'BCA',
					accountNumber: '8830129841',
					accountHolder: 'Ahmad Subagja'
				},
				{
					type: 'bank',
					provider: 'Bank Syariah Indonesia (BSI)',
					accountNumber: '7142099831',
					accountHolder: 'Siti Aminah'
				},
				{
					type: 'address',
					provider: 'Alamat Kirim Kado',
					address: 'Jl. Melati Raya No. 45, RT 03/RW 05, Kebayoran Baru, Jakarta Selatan 12160'
				}
			]
		},
		features: {
			rsvpEnabled: true,
			guestbookEnabled: true,
			giftEnabled: true,
			musicUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=ambient-piano-10786.mp3',
			showComments: true
		},
		createdAt: new Date('2026-01-01T00:00:00Z'),
		updatedAt: new Date('2026-01-01T00:00:00Z')
	},
	{
		_id: new ObjectId('650000000000000000000002'),
		userId: new ObjectId('650000000000000000000099'),
		slug: 'wedding-romeo-juliet',
		eventType: 'wedding',
		themeId: 'floral-blush',
		status: 'published',
		metadata: {
			title: 'The Wedding of Romeo & Juliet - Undangan Pernikahan',
			description: 'Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan syukuran pernikahan kami.',
			ogImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'
		},
		content: {
			hosts: ['Keluarga Bpk. H. Montague', 'Keluarga Bpk. H. Capulet'],
			honored: {
				name: 'Romeo Montague',
				secondaryName: 'Juliet Capulet',
				roleOrTitle: 'The Groom & The Bride',
				avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
				secondaryAvatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
				parentNames: 'Putra dari Bpk. Montague & Ibu Lady Montague',
				secondaryParentNames: 'Putri dari Bpk. Capulet & Ibu Lady Capulet'
			},
			quote: {
				text: 'Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.',
				source: 'QS. Ar-Rum: 21'
			},
			schedules: [
				{
					title: 'Akad Nikah',
					startTime: '2026-11-15T08:00:00.000Z',
					endTime: '2026-11-15T10:00:00.000Z',
					venue: 'Masjid Raya Al-Ikhlas',
					address: 'Jl. Senopati Indah No. 88, Kebayoran Baru, Jakarta Selatan',
					mapsUrl: 'https://maps.google.com/?q=Jakarta'
				},
				{
					title: 'Resepsi Pernikahan',
					startTime: '2026-11-15T11:00:00.000Z',
					endTime: '2026-11-15T16:00:00.000Z',
					venue: 'Glass House Botanical Garden',
					address: 'Jl. Puri Indah Raya No. 10, Jakarta Barat',
					mapsUrl: 'https://maps.google.com/?q=Jakarta'
				}
			],
			galleries: [
				{
					url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
					caption: 'Pre-wedding photoshoot'
				},
				{
					url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
					caption: 'Our Special Moment'
				},
				{
					url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
					caption: 'Two Hearts One Soul'
				}
			],
			giftRegistries: [
				{
					type: 'bank',
					provider: 'BCA',
					accountNumber: '5220918231',
					accountHolder: 'Romeo Montague'
				},
				{
					type: 'bank',
					provider: 'Mandiri',
					accountNumber: '1370018829910',
					accountHolder: 'Juliet Capulet'
				}
			]
		},
		features: {
			rsvpEnabled: true,
			guestbookEnabled: true,
			giftEnabled: true,
			musicUrl: 'https://cdn.pixabay.com/download/audio/2022/11/06/audio_f5ebc98cb7.mp3?filename=gentle-wedding-acoustic-125867.mp3',
			showComments: true
		},
		createdAt: new Date('2026-01-01T00:00:00Z'),
		updatedAt: new Date('2026-01-01T00:00:00Z')
	},
	{
		_id: new ObjectId('650000000000000000000003'),
		userId: new ObjectId('650000000000000000000099'),
		slug: 'cyber-party-alex',
		eventType: 'birthday',
		themeId: 'cyber-party',
		status: 'published',
		metadata: {
			title: "Alex's 21st Cyber Birthday Bash!",
			description: 'Join the ultimate neon party celebrating Alex turning 21. Music, drinks, and unforgettable vibes!',
			ogImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80'
		},
		content: {
			hosts: ['Alex Rivera & Friends'],
			honored: {
				name: 'Alex Rivera',
				roleOrTitle: 'Birthday Star (Turning 21)',
				avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80'
			},
			quote: {
				text: 'Level 21 Unlocked! Let’s celebrate another year of adventures, loud beats, and great company.',
				source: 'Alex'
			},
			schedules: [
				{
					title: 'The Cyber Countdown & DJ Set',
					startTime: '2026-12-31T20:00:00.000Z',
					endTime: '2027-01-01T02:00:00.000Z',
					venue: 'Neon Underground Club & Lounge',
					address: 'SCBD Lot 8, Senayan, Jakarta Selatan',
					mapsUrl: 'https://maps.google.com/?q=SCBD'
				}
			],
			galleries: [
				{
					url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
					caption: 'Neon Night Atmosphere'
				},
				{
					url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
					caption: 'Electric Beats'
				}
			],
			giftRegistries: [
				{
					type: 'ewallet',
					provider: 'GoPay / OVO',
					accountNumber: '081299887766',
					accountHolder: 'Alex Rivera'
				}
			]
		},
		features: {
			rsvpEnabled: true,
			guestbookEnabled: true,
			giftEnabled: true,
			musicUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=electronic-future-beats-117997.mp3',
			showComments: true
		},
		createdAt: new Date('2026-01-01T00:00:00Z'),
		updatedAt: new Date('2026-01-01T00:00:00Z')
	}
];

export const initialGuests: GuestDocument[] = [
	{
		_id: new ObjectId('650000000000000000000101'),
		eventId: new ObjectId('650000000000000000000001'),
		name: 'Budi Santoso',
		slug: 'budi-santoso',
		category: 'VIP',
		rsvpStatus: 'attending',
		pax: 2,
		greetingMessage: 'Barakallahu fiik untuk Faiz, semoga lekas pulih dan menjadi anak soleh kebanggaan orang tua.',
		submittedAt: new Date('2026-09-10T10:30:00Z')
	},
	{
		_id: new ObjectId('650000000000000000000102'),
		eventId: new ObjectId('650000000000000000000001'),
		name: 'Ustadz Abdullah & Keluarga',
		slug: 'ustadz-abdullah',
		category: 'Keluarga',
		rsvpStatus: 'attending',
		pax: 3,
		greetingMessage: 'Selamat atas khitanan ananda Faiz. Semoga senantiasa dalam limpahan berkah Allah SWT.',
		submittedAt: new Date('2026-09-12T14:15:00Z')
	},
	{
		_id: new ObjectId('650000000000000000000103'),
		eventId: new ObjectId('650000000000000000000002'),
		name: 'Budi Santoso',
		slug: 'budi-santoso',
		category: 'Rekan Kerja',
		rsvpStatus: 'attending',
		pax: 2,
		greetingMessage: 'Selamat menempuh hidup baru Romeo & Juliet! Sakinah mawaddah warahmah selamanya.',
		submittedAt: new Date('2026-09-15T09:00:00Z')
	}
];
