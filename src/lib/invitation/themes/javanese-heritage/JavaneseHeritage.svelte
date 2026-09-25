<script lang="ts">
	import type { Invitation, GuestbookItem } from '$lib/types/invitation';
	import Countdown from '$lib/invitation/components/Countdown.svelte';
	import PaperTexture from '$lib/invitation/ornaments/PaperTexture.svelte';
	import MelatiFloating from './ornaments/MelatiFloating.svelte';
	import JavaneseRSVP from './components/JavaneseRSVP.svelte';
	import JavaneseGift from './components/JavaneseGift.svelte';
	import JavaneseGuestbook from './components/JavaneseGuestbook.svelte';
	import GununganOrnament from './ornaments/GununganOrnament.svelte';
	import WayangOrnaments from './ornaments/WayangOrnaments.svelte';
	import RibbonDivider from './ornaments/RibbonDivider.svelte';
	import { scrollReveal } from '$lib/actions/scrollReveal';
	import { Calendar, Clock, MapPin, ExternalLink } from '@lucide/svelte';

	let {
		invitation,
		initialGuestbook = []
	}: {
		invitation: Invitation;
		initialGuestbook?: GuestbookItem[];
	} = $props();

	const { content } = $derived(invitation);
	const couplePhoto = $derived(
		content.hero?.coverUrl ||
			content.couple?.partner1?.photoUrl ||
			content.couple?.partner2?.photoUrl ||
			null
	);

	// =========================================================================
	// PALET WARNA TEMA JAVANESE (Ubah warna di sini untuk kustomisasi tema)
	// =========================================================================
	const themeColors = {
		// Latar Belakang (Background)
		bgMain: '#00163D', // Biru Dongker / Royal Navy utama
		bgGradientTop: '#092D5E', // Sorotan gradien atas
		bgGradientBottom: '#000B1F', // Kedalaman gradien bawah
		bgFooter: '#00102B', // Latar footer
		bgCard: '#072A5A', // Latar kartu acara, pengantin & gallery
		bgCardInner: '#011B3E', // Bingkai foto pengantin
		bgQuote: '#f5efe1', // Latar section kutipan purwaka

		// Teks (Typography)
		textPrimary: '#F3E7D7', // Judul utama & nama mempelai (Ivory)
		textSecondary: '#FAF3E0', // Paragraf & isi teks
		textMuted: '#D8C5A4', // Subtitle, alamat & keterangan
		textQuote: '#072A5A', // Teks kutipan di atas latar terang

		// Aksen Emas & Garis (Gold & Borders)
		goldPrimary: '#E5C378', // Emas terang (ikon, simbol &, badge)
		goldHover: '#C59B27', // Emas prada saat hover & seleksi
		borderGold: '#A39275', // Border ornamen & pembatas kartu

		// Tombol Aksi (Buttons)
		btnText: '#092a57', // Teks tombol
		btnBgFrom: '#f5efe1', // Gradien tombol awal
		btnBgTo: '#d8c5a4' // Gradien tombol akhir
	};
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Aladin&family=Alice&family=Elsie+Swash+Caps:wght@400;900&family=Lora:ital,wght@0,400..700;1,400..700&family=Philosopher:ital,wght@0,400;0,700;1,400;1,700&family=Quicksand:wght@300..700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<article
	class="javanese-heritage font-sans-clean relative min-h-screen overflow-x-hidden leading-relaxed selection:bg-[var(--jv-gold-hover)] selection:text-[var(--jv-bg-main)]"
	style="
		--jv-bg-main: {themeColors.bgMain};
		--jv-bg-grad-top: {themeColors.bgGradientTop};
		--jv-bg-grad-bottom: {themeColors.bgGradientBottom};
		--jv-bg-footer: {themeColors.bgFooter};
		--jv-bg-card: {themeColors.bgCard};
		--jv-bg-card-inner: {themeColors.bgCardInner};
		--jv-bg-quote: {themeColors.bgQuote};

		--jv-text-primary: {themeColors.textPrimary};
		--jv-text-secondary: {themeColors.textSecondary};
		--jv-text-muted: {themeColors.textMuted};
		--jv-text-quote: {themeColors.textQuote};

		--jv-gold-primary: {themeColors.goldPrimary};
		--jv-gold-hover: {themeColors.goldHover};
		--jv-border-gold: {themeColors.borderGold};

		--jv-btn-text: {themeColors.btnText};
		--jv-btn-bg-from: {themeColors.btnBgFrom};
		--jv-btn-bg-to: {themeColors.btnBgTo};
	"
>
	<!-- Background Delicate Paper Grain -->
	<PaperTexture opacity={0.035} blendMode="screen" />

	<!-- Floating Soft Petals -->
	<MelatiFloating count={6} />

	<!-- TOP / HERO SECTION (HOME) -->
	<section
		id="home"
		class="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24"
	>
		{#if couplePhoto}
			<!-- Background Foto Pasangan Jernih & Terang (Tanpa Vignette Biru) -->
			<div class="pointer-events-none absolute inset-0 z-0 overflow-hidden">
				<img
					src={couplePhoto}
					alt="Foto Pasangan"
					class="h-full w-full object-cover object-center"
					loading="eager"
				/>
			</div>
		{/if}

		<!-- Central Header Crest: Gunungan & Ribbon -->
		<div class="relative z-20 mx-auto mt-8 flex max-w-xl flex-col items-center px-4 text-center">
			<GununganOrnament size={100} animate="pulse" colour="gold" />

			<!-- Ribbon tepat di bawah Gunungan -->
			<div class="-mt-26">
				<RibbonDivider size={220} />
			</div>

			<!-- Groom & Bride Names in Elsie Swash Caps -->
			<h1
				class="font-elsie text-jv-primary my-2 text-4xl leading-tight font-normal tracking-wider drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] sm:text-6xl md:text-7xl"
			>
				{content.couple.partner1.name}
				<span class="text-jv-gold mx-2 font-serif text-2xl sm:inline sm:text-4xl">&amp;</span>
				{content.couple.partner2.name}
			</h1>

			<!-- Date Badge -->
			{#if content.hero?.dateBadge}
				<div class="mt-3">
					<span
						class="font-philosopher border-jv-gold-60 inline-block rounded-full border bg-gradient-to-r from-[#F5EFE1] to-[#D8C5A4] px-6 py-1.5 text-xs tracking-[0.25em] text-[#092A57] uppercase shadow-xl backdrop-blur-md sm:text-sm"
					>
						{content.hero.dateBadge}
					</span>
				</div>
			{/if}
		</div>

		<!-- Flanking Wayang with Authentic Swinging Animations -->
		<div class="pointer-events-none absolute -bottom-4 -left-2 z-10 sm:bottom-0 sm:left-8 md:left-14">
			<WayangOrnaments type="laki" size={110} />
		</div>

		<div
			class="pointer-events-none absolute -right-2 -bottom-4 z-10 sm:bottom-0 sm:right-8 md:right-14"
		>
			<WayangOrnaments type="perempuan" size={110} />
		</div>

		<!-- Lengkungan bawah pemisah section -->
		<div class="absolute bottom-0 left-0 z-10 w-full overflow-hidden leading-[0]">
			<svg
				class="relative block h-[50px] w-full"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 1000 100"
				preserveAspectRatio="none"
			>
				<path
					fill="var(--jv-bg-quote)"
					d="M500,97C126.7,96.3,0.8,19.8,0,0v100l1000,0V1C1000,19.4,873.3,97.8,500,97z"
				/>
			</svg>
		</div>
	</section>

	<!-- OPENING QUOTE / AYAT SUCI (PURWAKA) -->
	{#if content.opening?.quote}
		<section
			class="bg-jv-quote relative z-10 mx-auto -mt-1 max-w-3xl px-6 py-10 text-center sm:py-16"
		>
			<div class="pointer-events-none absolute inset-0 z-0 overflow-hidden">
				<img
					src="/ornaments/javanese/shadow.png"
					alt="Ornamen Bayangan"
					class="h-full w-full object-cover object-center opacity-50"
					loading="eager"
				/>
			</div>
			<div class="mb-4 flex flex-col items-center">
				<GununganOrnament size={68} animate="pulse" colour="blue" />
				<span
					class="font-philosopher border-jv-gold-40 text-jv-quote text-jv-gold mt-2 inline-block border-y px-5 py-1 text-[11px] tracking-[0.3em] uppercase sm:text-xs"
				>
					{content.opening.greeting || 'Purwaka & Pandonga'}
				</span>
			</div>

			<blockquote
				use:scrollReveal={{ variant: 'blur-in', duration: 800 }}
				class="font-lora text-jv-quote mx-auto max-w-2xl text-base leading-relaxed italic sm:text-xl"
			>
				"{content.opening.quote}"
			</blockquote>

			{#if content.opening.quoteSource}
				<cite
					use:scrollReveal={{ delay: 150 }}
					class="font-philosopher text-jv-quote mt-4 block text-xs font-semibold tracking-[0.25em] uppercase not-italic"
				>
					— {content.opening.quoteSource}
				</cite>
			{/if}
		</section>
	{/if}

	<!-- COUPLE SECTION / MEMPELAI (CATIN) -->
	<section id="catin" class="relative z-10 mx-auto max-w-5xl px-6 py-14 sm:py-24">
		<!-- Section Header -->
		<div
			use:scrollReveal
			class="relative z-10 mb-14 flex flex-col items-center justify-center text-center sm:mb-20"
		>
			<!-- Background Gunungan -->
			<div
				class="pointer-events-none absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 opacity-30"
			>
				<GununganOrnament size={68} animate="sway" colour="gold" />
			</div>

			<!-- Teks di atas Gunungan -->
			<span
				class="font-philosopher text-jv-gold relative z-10 my-2 block text-[11px] font-semibold tracking-[0.4em] uppercase sm:text-xs"
			>
				Pinanganten Pawiwahan
			</span>
			<h2 class="font-elsie text-jv-primary relative z-10 text-3xl font-normal sm:text-5xl">
				Sang Pengantin
			</h2>
		</div>

		<div
			class="relative z-10 mx-auto grid max-w-4xl grid-cols-1 items-start gap-12 sm:gap-14 md:grid-cols-2"
		>
			<!-- Groom (Pinanganten Kakung) -->
			<div
				class="group border-jv-gold-40 bg-jv-card relative rounded-2xl border p-6 text-center shadow-2xl backdrop-blur-md sm:p-8"
			>
				<!-- Photo Container with Gunungan in Background -->
				<div class="relative mx-auto h-64 w-52 sm:h-76 sm:w-60">
					<!-- Gunungan kiri di belakang lengkungan atas foto -->
					<div class="pointer-events-none absolute top-4 -left-8 z-0 sm:-left-10">
						<GununganOrnament size={76} animate="sway" rotate={-12} />
					</div>

					<!-- Gunungan kanan di belakang lengkungan atas foto -->
					<div class="pointer-events-none absolute top-4 -right-8 z-0 sm:-right-10">
						<GununganOrnament size={76} animate="sway" rotate={12} />
					</div>

					<!-- Foto Mempelai Pria (di depan Gunungan) -->
					{#if content.couple.partner1.photoUrl}
						<div
							class="border-jv-gold-50 bg-jv-card-inner relative z-10 h-full w-full overflow-hidden rounded-t-[110px] border-2 p-2 shadow-xl"
						>
							<img
								src={content.couple.partner1.photoUrl}
								alt={content.couple.partner1.name}
								class="h-full w-full rounded-t-[98px] object-cover"
								loading="lazy"
							/>
						</div>
					{/if}
				</div>

				<!-- Nama & Detail Pengantin Pria (Terbuka, Jelas & Bebas Terhalang) -->
				<div use:scrollReveal={{ delay: 100 }} class="relative z-10 mt-6 space-y-2">
					<span
						class="font-philosopher border-jv-gold-40 text-jv-gold inline-block border-b pb-0.5 text-[11px] font-semibold tracking-[0.3em] uppercase"
					>
						Pengantin Pria
					</span>
					<h3 class="font-elsie text-jv-primary text-2xl tracking-wide sm:text-3xl">
						{content.couple.partner1.fullName || content.couple.partner1.name}
					</h3>
					{#if content.couple.partner1.childOf}
						<p
							class="font-lora text-jv-secondary mx-auto max-w-xs text-xs leading-relaxed italic sm:text-sm"
						>
							{content.couple.partner1.childOf}
						</p>
					{/if}
				</div>
			</div>

			<!-- Bride (Pinanganten Putri) -->
			<div
				class="group border-jv-gold-40 bg-jv-card relative rounded-2xl border p-6 text-center shadow-2xl backdrop-blur-md sm:p-8"
			>
				<!-- Photo Container with Gunungan in Background -->
				<div class="relative mx-auto h-64 w-52 sm:h-76 sm:w-60">
					<!-- Gunungan kiri di belakang lengkungan atas foto -->
					<div class="pointer-events-none absolute top-4 -left-8 z-0 sm:-left-10">
						<GununganOrnament size={76} animate="sway" rotate={-12} />
					</div>

					<!-- Gunungan kanan di belakang lengkungan atas foto -->
					<div class="pointer-events-none absolute top-4 -right-8 z-0 sm:-right-10">
						<GununganOrnament size={76} animate="sway" rotate={12} />
					</div>

					<!-- Foto Mempelai Wanita (di depan Gunungan) -->
					{#if content.couple.partner2.photoUrl}
						<div
							class="border-jv-gold-50 bg-jv-card-inner relative z-10 h-full w-full overflow-hidden rounded-t-[110px] border-2 p-2 shadow-xl"
						>
							<img
								src={content.couple.partner2.photoUrl}
								alt={content.couple.partner2.name}
								class="h-full w-full rounded-t-[98px] object-cover"
								loading="lazy"
							/>
						</div>
					{/if}
				</div>

				<!-- Nama & Detail Pengantin Wanita (Terbuka, Jelas & Bebas Terhalang) -->
				<div use:scrollReveal={{ delay: 100 }} class="relative z-10 mt-6 space-y-2">
					<span
						class="font-philosopher border-jv-gold-40 text-jv-gold inline-block border-b pb-0.5 text-[11px] font-semibold tracking-[0.3em] uppercase"
					>
						Pengantin Wanita
					</span>
					<h3 class="font-elsie text-jv-primary text-2xl tracking-wide sm:text-3xl">
						{content.couple.partner2.fullName || content.couple.partner2.name}
					</h3>
					{#if content.couple.partner2.childOf}
						<p
							class="font-lora text-jv-secondary mx-auto max-w-xs text-xs leading-relaxed italic sm:text-sm"
						>
							{content.couple.partner2.childOf}
						</p>
					{/if}
				</div>
			</div>
		</div>
	</section>

	<!-- SAVE THE DATE / COUNTDOWN & EVENTS (STD) -->
	<section id="std" class="relative z-10 mx-auto max-w-5xl px-6 py-14 sm:py-24">
		<!-- Section Header -->
		<div
			use:scrollReveal
			class="relative mb-12 flex flex-col items-center justify-center text-center"
		>
			<!-- Background Gunungan -->
			<div
				class="pointer-events-none absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 opacity-30"
			>
				<GununganOrnament size={68} animate="sway" />
			</div>

			<!-- Teks di atas Gunungan -->
			<span
				class="font-philosopher text-jv-gold relative z-10 my-2 block text-[11px] font-semibold tracking-[0.4em] uppercase sm:text-xs"
			>
				Save The Date
			</span>
			<h2 class="font-elsie text-jv-primary relative z-10 text-3xl sm:text-5xl">Rangkaian Acara</h2>
		</div>

		<!-- Countdown Timer Section -->
		{#if content.countdown?.targetDate}
			<div
				class="border-jv-gold-50 bg-jv-card relative mx-auto mb-14 max-w-3xl overflow-hidden rounded-2xl border p-6 text-center shadow-2xl backdrop-blur-md sm:p-10"
			>
				<div class="text-jv-gold mb-4 inline-flex items-center gap-2">
					<span class="text-xs">❖</span>
					<span
						class="font-philosopher text-[11px] font-semibold tracking-[0.35em] uppercase sm:text-xs"
					>
						Menghitung Hari Bahagia
					</span>
					<span class="text-xs">❖</span>
				</div>

				<div
					class="[&_.font-bold]:font-elsie [&_.font-bold]:text-jv-primary [&_.uppercase]:text-jv-muted"
				>
					<Countdown targetDate={content.countdown.targetDate} variant="editorial" />
				</div>
			</div>
		{/if}

		<!-- Events Grid (Akad & Resepsi) -->
		{#if content.events && content.events.length > 0}
			<div class="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
				{#each content.events as event}
					<div
						class="border-jv-gold-hover border-jv-gold-40 bg-jv-card-90 relative space-y-5 rounded-2xl border p-8 text-center shadow-2xl backdrop-blur-md transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
					>
						<!-- Event Title -->
						<div class="space-y-1">
							<span
								class="font-philosopher text-jv-gold text-[10px] font-semibold tracking-[0.3em] uppercase"
							>
								Adicara
							</span>
							<h3 class="font-elsie text-jv-primary text-2xl sm:text-3xl">{event.title}</h3>
						</div>

						<!-- Time & Date Info -->
						<div class="text-jv-secondary space-y-3 text-xs sm:text-sm">
							<div class="flex items-center justify-center gap-2">
								<Calendar class="text-jv-gold h-4 w-4" />
								<span class="text-jv-primary font-semibold">{event.date}</span>
							</div>
							<div class="flex items-center justify-center gap-2">
								<Clock class="text-jv-gold h-4 w-4" />
								<span>{event.startTime} - {event.endTime} WIB</span>
							</div>
							<div class="flex items-start justify-center pt-2">
								<div>
									<p class="text-jv-primary leading-tight font-semibold">{event.venue}</p>
									<p class="text-jv-muted mt-0.5 text-xs">{event.address}</p>
								</div>
							</div>
						</div>

						<!-- Maps Location Button -->
						{#if event.mapsUrl}
							<div class="pt-3">
								<a
									href={event.mapsUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="btn-javanese-action inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-semibold tracking-wider uppercase shadow-md transition-all duration-300 hover:scale-105"
								>
									<span>Petunjuk Lokasi</span>
									<ExternalLink class="h-3.5 w-3.5" />
								</a>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	</section>

	<!-- LOVE STORY SECTION (LOVESTORY) -->
	{#if content.story?.body}
		<section id="lovestory" class="relative z-10 mx-auto max-w-4xl px-6 py-14 sm:py-24">
			<div
				use:scrollReveal
				class="relative z-10 mb-12 flex flex-col items-center justify-center text-center"
			>
				<!-- Background Gunungan -->
				<div
					class="pointer-events-none absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 opacity-30"
				>
					<GununganOrnament size={68} animate="sway" />
				</div>

				<!-- Teks di atas Gunungan -->
				<span
					class="font-philosopher text-jv-gold relative z-10 my-2 block text-[11px] font-semibold tracking-[0.4em] uppercase sm:text-xs"
				>
					Lelampahan Tresna
				</span>
				<h2 class="font-elsie text-jv-primary relative z-10 text-3xl sm:text-5xl">
					{content.story.title || 'Our Story'}
				</h2>
			</div>

			<div
				class="border-jv-gold-40 bg-jv-card relative mx-auto max-w-2xl rounded-2xl border p-8 text-center shadow-2xl backdrop-blur-md sm:p-12"
			>
				<p
					class="font-lora text-jv-secondary text-sm leading-relaxed whitespace-pre-wrap sm:text-base"
				>
					{content.story.body}
				</p>
			</div>
		</section>
	{/if}

	<!-- PHOTO GALLERY SECTION (GALLERY) -->
	{#if content.gallery && content.gallery.length > 0}
		<section id="gallery" class="relative z-10 mx-auto max-w-6xl px-6 py-14 sm:py-24">
			<div class="relative z-10 mb-14 flex flex-col items-center justify-center text-center">
				<!-- Background Gunungan -->
				<div
					class="pointer-events-none absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 opacity-30"
				>
					<GununganOrnament size={68} animate="sway" />
				</div>

				<!-- Teks di atas Gunungan -->
				<span
					class="font-philosopher text-jv-gold relative z-10 my-2 block text-[11px] font-semibold tracking-[0.4em] uppercase sm:text-xs"
				>
					Momen Kabagyan
				</span>
				<h2 class="font-elsie text-jv-primary relative z-10 text-3xl sm:text-5xl">Our Gallery</h2>
			</div>

			<div class="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
				{#each content.gallery as item}
					<div
						class="group border-jv-gold-40 bg-jv-card aspect-3/4 overflow-hidden rounded-xl border p-2 shadow-lg transition-all duration-500 hover:border-[var(--jv-gold-primary)] hover:shadow-[0_8px_25px_rgba(229,195,120,0.3)]"
					>
						<div class="relative h-full w-full overflow-hidden rounded-lg">
							<img
								src={item.url}
								alt={item.caption || 'Foto Galeri Pawiwahan'}
								class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
								loading="lazy"
							/>
							{#if item.caption}
								<div
									class="text-jv-primary absolute inset-0 flex items-end bg-gradient-to-t from-[var(--jv-bg-main)]/90 via-transparent to-transparent p-3 text-xs opacity-0 transition-opacity duration-300 group-hover:opacity-100"
								>
									<p class="font-lora italic">{item.caption}</p>
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</section>
	{/if}

	<!-- WEDDING GIFT / CASHLESS GIFT (GIFT) -->
	{#if content.gift?.enabled}
		<section id="gift" class="relative z-10 mx-auto max-w-4xl px-6 py-14 sm:py-20">
			<div class="mb-12 flex flex-col items-center text-center">
				<GununganOrnament size={68} animate="sway" />
				<span
					class="font-philosopher text-jv-gold my-2 block text-[11px] font-semibold tracking-[0.4em] uppercase sm:text-xs"
				>
					Tanda Tresna
				</span>
				<h2 class="font-elsie text-jv-primary text-3xl sm:text-5xl">Wedding Gift</h2>
			</div>

			<JavaneseGift gift={content.gift} />
		</section>
	{/if}

	<!-- RSVP & GUESTBOOK (WISHES) -->
	<section id="wishes" class="relative z-10 mx-auto max-w-4xl space-y-16 px-6 py-14 sm:py-20">
		{#if content.rsvp?.enabled}
			<div>
				<div class="relative z-10 mb-10 flex flex-col items-center justify-center text-center">
					<!-- Background Gunungan -->
					<div
						class="pointer-events-none absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 opacity-30"
					>
						<GununganOrnament size={68} animate="sway" />
					</div>

					<!-- Teks di atas Gunungan -->
					<span
						class="font-philosopher text-jv-gold relative z-10 my-2 block text-[11px] font-semibold tracking-[0.4em] uppercase sm:text-xs"
					>
						Pawartos Rawuh
					</span>
					<h2 class="font-elsie text-jv-primary relative z-10 text-3xl sm:text-5xl">
						Konfirmasi Kehadiran
					</h2>
				</div>

				<JavaneseRSVP invitationId={invitation.id} settings={content.rsvp} />
			</div>
		{/if}

		{#if content.guestbook?.enabled}
			<div class="border-jv-gold-30 border-t pt-12">
				<div class="relative z-10 mb-10 flex flex-col items-center justify-center text-center">
					<!-- Background Gunungan -->
					<div
						class="pointer-events-none absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 opacity-30"
					>
						<GununganOrnament size={68} animate="sway" />
					</div>

					<!-- Teks di atas Gunungan -->
					<span
						class="font-philosopher text-jv-gold relative z-10 my-2 block text-[11px] font-semibold tracking-[0.4em] uppercase sm:text-xs"
					>
						Pangestu & Pandonga
					</span>
					<h2 class="font-elsie text-jv-primary relative z-10 text-3xl sm:text-5xl">
						Ucapan & Doa
					</h2>
				</div>

				<JavaneseGuestbook
					invitationId={invitation.id}
					settings={content.guestbook}
					initialEntries={initialGuestbook}
				/>
			</div>
		{/if}
	</section>

	<!-- FOOTER (PANUTUP) -->
	<footer
		class="border-jv-gold-30 bg-jv-footer text-jv-muted relative z-10 space-y-5 border-t px-6 py-16 text-center text-xs"
	>
		<!-- Center Gunungan with Flanking Wayang in Footer -->
		<div class="flex items-center justify-center gap-4 sm:gap-8">
			<WayangOrnaments type="laki" size={70} />
			<GununganOrnament size={100} animate="pulse" />
			<WayangOrnaments type="perempuan" size={70} />
		</div>

		<p class="font-elsie text-jv-primary text-2xl tracking-wider sm:text-4xl">
			{content.couple.partner1.name}
			<span class="text-jv-gold mx-2 font-serif italic">&amp;</span>
			{content.couple.partner2.name}
		</p>

		<p class="font-lora text-jv-secondary mx-auto max-w-md leading-relaxed italic">
			Matur nuwun sanget awit saking sih kawigatosan, donga, lan pangestu panjenengan sami dumateng
			pinanganten kekalih.
		</p>

		<p class="font-philosopher text-jv-gold text-[11px] tracking-[0.3em] uppercase">
			Mugi Tansah Rahayu Widodo Basuki
		</p>
	</footer>
</article>

<style>
	/* === Gaya Latar Belakang & Variabel Tema === */
	.javanese-heritage {
		background-color: var(--jv-bg-main);
		background-image: radial-gradient(
			circle at 50% 0%,
			var(--jv-bg-grad-top) 0%,
			var(--jv-bg-main) 55%,
			var(--jv-bg-grad-bottom) 100%
		);
		color: var(--jv-text-primary);
	}

	/* === Kelas Utilitas Warna Teks (Menggunakan Variabel) === */
	.text-jv-primary {
		color: var(--jv-text-primary);
	}
	.text-jv-secondary {
		color: color-mix(in srgb, var(--jv-text-secondary) 85%, transparent);
	}
	.text-jv-muted {
		color: var(--jv-text-muted);
	}
	.text-jv-gold {
		color: var(--jv-gold-primary);
	}
	.text-jv-quote {
		color: var(--jv-text-quote);
	}

	/* === Kelas Utilitas Warna Background (Menggunakan Variabel) === */
	.bg-jv-footer {
		background-color: var(--jv-bg-footer);
	}
	.bg-jv-card {
		background-color: color-mix(in srgb, var(--jv-bg-card) 85%, transparent);
	}
	.bg-jv-card-90 {
		background-color: color-mix(in srgb, var(--jv-bg-card) 90%, transparent);
	}
	.bg-jv-card-inner {
		background-color: var(--jv-bg-card-inner);
	}
	.bg-jv-quote {
		background-color: var(--jv-bg-quote);
	}

	/* === Kelas Utilitas Warna Border (Menggunakan Variabel) === */
	.border-jv-gold-30 {
		border-color: color-mix(in srgb, var(--jv-border-gold) 30%, transparent);
	}
	.border-jv-gold-40 {
		border-color: color-mix(in srgb, var(--jv-border-gold) 40%, transparent);
	}
	.border-jv-gold-50 {
		border-color: color-mix(in srgb, var(--jv-border-gold) 50%, transparent);
	}
	.border-jv-gold-60 {
		border-color: color-mix(in srgb, var(--jv-border-gold) 60%, transparent);
	}
	.border-jv-gold-hover:hover {
		border-color: color-mix(in srgb, var(--jv-gold-primary) 70%, transparent);
	}

	/* === Tipografi Font === */
	.font-elsie {
		font-family: 'Elsie Swash Caps', serif;
	}
	.font-philosopher {
		font-family: 'Philosopher', serif;
	}
	.font-lora {
		font-family: 'Lora', serif;
	}

	/* === Tombol Aksi Khas Tema Jawa === */
	.btn-javanese-action {
		font-family: 'Alice', serif;
		color: var(--jv-btn-text);
		background: radial-gradient(
			circle at center,
			var(--jv-btn-bg-from) 0%,
			var(--jv-btn-bg-to) 100%
		);
		border: 2px solid var(--jv-border-gold);
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
	}

	.btn-javanese-action:hover {
		background: radial-gradient(
			circle at center,
			#ffffff 0%,
			color-mix(in srgb, var(--jv-btn-bg-to) 80%, #ffffff) 100%
		);
		border-color: var(--jv-gold-hover);
		box-shadow: 0 6px 20px rgba(229, 195, 120, 0.4);
	}
</style>
