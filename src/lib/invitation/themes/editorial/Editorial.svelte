<script lang="ts">
	import ThemeHeader from '$lib/invitation/ThemeHeader.svelte';
	import type { Invitation, GuestbookItem } from '$lib/types/invitation';
	import Countdown from '$lib/invitation/components/Countdown.svelte';
	import RSVPSection from '$lib/invitation/components/RSVPSection.svelte';
	import GuestbookSection from '$lib/invitation/components/GuestbookSection.svelte';
	import GiftSection from '$lib/invitation/components/GiftSection.svelte';
	import FloralCorner from '$lib/invitation/ornaments/FloralCorner.svelte';
	import BotanicalDivider from '$lib/invitation/ornaments/BotanicalDivider.svelte';
	import MonogramFrame from '$lib/invitation/ornaments/MonogramFrame.svelte';
	import PaperTexture from '$lib/invitation/ornaments/PaperTexture.svelte';
	import { parallax } from '$lib/actions/parallax';
	import { scrollReveal } from '$lib/actions/scrollReveal';
	import { Calendar, Clock, MapPin, ExternalLink } from '@lucide/svelte';

	let {
		invitation,
		initialGuestbook = [],
		isEditor = false
	}: {
		invitation: Invitation;
		initialGuestbook?: GuestbookItem[];
		isEditor?: boolean;
	} = $props();

	const { content } = $derived(invitation);
</script>

<article
	class="relative min-h-screen bg-[#fbf9f5] font-sans-clean leading-relaxed text-[#2c2825] overflow-x-hidden selection:bg-[#8c7051] selection:text-white"
>
	<!-- Tactile Paper Texture -->
	<PaperTexture opacity={0.035} />

	<!-- Top Editorial Corner Framing -->
	<div class="absolute top-4 left-4 z-10 opacity-40 sm:top-6 sm:left-6">
		<FloralCorner position="top-left" variant="editorial" size={56} color="#8c7051" />
	</div>
	<div class="absolute top-4 right-4 z-10 opacity-40 sm:top-6 sm:right-6">
		<FloralCorner position="top-right" variant="editorial" size={56} color="#8c7051" />
	</div>

	<!-- Masthead Publication Meta -->
	<div class="relative z-10 mx-auto max-w-5xl px-6 pt-8 text-center sm:pt-12">
		<div class="flex items-center justify-between border-b border-[#2c2825]/15 pb-3 text-[10px] sm:text-xs font-mono tracking-[0.25em] text-[#8c7051] uppercase">
			<span>EDISI / 2026</span>
			<span class="font-playfair italic normal-case tracking-normal">Perayaan Cinta Abadi</span>
			<span>VOL. 01</span>
		</div>
	</div>

	<!-- Top Editorial Header -->
	<header class="relative z-10">
		<ThemeHeader theme="editorial" {content} />
	</header>

	<!-- Monogram Stamp -->
	<div class="relative z-10 flex justify-center -mt-2 mb-10">
		<MonogramFrame
			partner1={content.couple.partner1.name}
			partner2={content.couple.partner2.name}
			variant="editorial"
			color="#8c7051"
			size={80}
		/>
	</div>

	<!-- Hero Cover Section: Asymmetrical Editorial Vogue Composition -->
	{#if content.hero?.coverUrl}
		<section class="relative z-10 mx-auto my-6 max-w-5xl px-4 sm:px-6">
			<div class="relative grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end">
				<!-- Cover Photo -->
				<div class="md:col-span-8 relative">
					<div
						use:parallax={{ speed: 0.08 }}
						class="relative aspect-4/3 sm:aspect-16/10 overflow-hidden border border-[#2c2825]/15 bg-[#2c2825]/5 p-2 shadow-sm"
					>
						<img
							src={content.hero.coverUrl}
							alt={content.hero.headline}
							class="h-full w-full object-cover"
							loading="eager"
						/>
					</div>
				</div>

				<!-- Editorial Side Column -->
				<div class="md:col-span-4 flex flex-col justify-end space-y-4 pb-2 text-left">
					<div class="h-px w-12 bg-[#8c7051]"></div>
					<span class="text-[10px] font-mono tracking-[0.3em] uppercase text-[#8c7051]">
						UNDANGAN PERNIKAHAN
					</span>
					<h3 class="font-playfair text-2xl sm:text-3xl font-normal leading-snug">
						Dua jiwa,<br />satu perjalanan suci.
					</h3>
					{#if content.hero.subheadline}
						<p class="font-playfair text-xs sm:text-sm text-[#554e48] italic leading-relaxed">
							"{content.hero.subheadline}"
						</p>
					{/if}
				</div>
			</div>
		</section>
	{/if}

	<BotanicalDivider variant="modern" color="#8c7051" />

	<!-- Opening Quote -->
	{#if content.opening?.quote}
		<section class="relative z-10 mx-auto max-w-3xl px-6 py-10 sm:py-16 text-center">
			<span class="mb-4 block text-[10px] font-mono tracking-[0.35em] text-[#8c7051] uppercase">
				UNGKAPAN HATI
			</span>
			<blockquote use:scrollReveal={{ duration: 400 }} class="font-playfair text-lg sm:text-2xl leading-relaxed text-[#3d3733] italic">
				"{content.opening.quote}"
			</blockquote>
			{#if content.opening.quoteSource}
				<cite
					use:scrollReveal
					class="mt-4 block font-sans text-xs font-semibold tracking-widest text-[#8c7051] uppercase not-italic"
				>
					— {content.opening.quoteSource}
				</cite>
			{/if}
		</section>
		<BotanicalDivider variant="minimal" color="#8c7051" />
	{/if}

	<!-- The Couple Section -->
	<section class="relative z-10 mx-auto max-w-5xl px-6 py-12 sm:py-20">
		<div use:scrollReveal class="mb-14 text-center">
			<span class="mb-2 block text-[11px] font-semibold tracking-[0.3em] text-[#8c7051] uppercase">
				KEDUA MEMPELAI
			</span>
			<h2 class="font-playfair text-3xl font-normal sm:text-5xl">Mempelai Berbahagia</h2>
		</div>

		<div class="grid grid-cols-1 items-start gap-12 sm:gap-16 md:grid-cols-2 max-w-4xl mx-auto">
			<!-- Groom -->
			<div class="space-y-6 text-center">
				{#if content.couple.partner1.photoUrl}
					<div class="relative mx-auto h-64 w-52 sm:h-80 sm:w-64 border border-[#2c2825]/15 bg-white p-2 shadow-sm">
						<div class="h-full w-full overflow-hidden bg-stone-200">
							<img
								use:parallax={{ speed: 0.02, scale: 1.06 }}
								src={content.couple.partner1.photoUrl}
								alt={content.couple.partner1.name}
								class="h-full w-full object-cover"
								loading="eager"
								decoding="async"
							/>
						</div>
					</div>
				{/if}
				<div use:scrollReveal>
					<span class="text-[10px] font-mono tracking-[0.25em] text-[#8c7051] uppercase block mb-1">
						01 / MEMPELAI PRIA
					</span>
					<h3 class="font-playfair text-2xl sm:text-3xl font-medium text-[#1a1715]">
						{content.couple.partner1.fullName || content.couple.partner1.name}
					</h3>
					{#if content.couple.partner1.childOf}
						<p class="mx-auto mt-2 max-w-xs text-xs text-[#736861] sm:text-sm font-serif italic">
							{content.couple.partner1.childOf}
						</p>
					{/if}
				</div>
			</div>

			<!-- Bride -->
			<div class="space-y-6 text-center">
				{#if content.couple.partner2.photoUrl}
					<div class="relative mx-auto h-64 w-52 sm:h-80 sm:w-64 border border-[#2c2825]/15 bg-white p-2 shadow-sm">
						<div class="h-full w-full overflow-hidden bg-stone-200">
							<img
								use:parallax={{ speed: 0.02, scale: 1.06 }}
								src={content.couple.partner2.photoUrl}
								alt={content.couple.partner2.name}
								class="h-full w-full object-cover"
								loading="eager"
								decoding="async"
							/>
						</div>
					</div>
				{/if}
				<div use:scrollReveal>
					<span class="text-[10px] font-mono tracking-[0.25em] text-[#8c7051] uppercase block mb-1">
						02 / MEMPELAI WANITA
					</span>
					<h3 class="font-playfair text-2xl sm:text-3xl font-medium text-[#1a1715]">
						{content.couple.partner2.fullName || content.couple.partner2.name}
					</h3>
					{#if content.couple.partner2.childOf}
						<p class="mx-auto mt-2 max-w-xs text-xs text-[#736861] sm:text-sm font-serif italic">
							{content.couple.partner2.childOf}
						</p>
					{/if}
				</div>
			</div>
		</div>
	</section>

	<!-- Love Story -->
	{#if content.story?.body}
		<section class="relative z-10 border-y border-[#2c2825]/10 bg-[#f4f0e8] px-6 py-14 sm:py-20">
			<div use:scrollReveal class="mx-auto max-w-3xl space-y-6">
				<div class="text-center">
					<span class="block text-[11px] font-semibold tracking-[0.3em] text-[#8c7051] uppercase">
						KISAH CINTA
					</span>
					<h2 class="font-playfair text-3xl font-normal sm:text-4xl mt-1">
						{content.story.title || 'Kisah Kasih Kami'}
					</h2>
				</div>
				<div class="mx-auto max-w-2xl border-l-2 border-[#8c7051] pl-6 py-1">
					<p
						class="font-serif text-sm sm:text-base leading-relaxed whitespace-pre-wrap text-[#554e48]"
					>
						{content.story.body}
					</p>
				</div>
			</div>
		</section>
	{/if}

	<!-- Wedding Events -->
	{#if content.events && content.events.length > 0}
		<section class="relative z-10 mx-auto max-w-5xl px-6 py-14 sm:py-24">
			<div use:scrollReveal class="mb-14 text-center">
				<span class="mb-2 block text-[11px] font-semibold tracking-[0.3em] text-[#8c7051] uppercase">
					JADWAL ACARA
				</span>
				<h2 class="font-playfair text-3xl font-normal sm:text-5xl">Rangkaian Acara</h2>
			</div>

			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
				{#each content.events as event}
					<div
						class="relative space-y-5 border border-[#2c2825]/15 bg-white p-8 text-center shadow-xs transition-shadow hover:shadow-md sm:p-10"
					>
						<h3 class="font-playfair text-2xl font-medium text-[#1a1715]">
							{event.title}
						</h3>
						<div class="mx-auto h-px w-10 bg-[#8c7051]"></div>

						<div class="space-y-2.5 text-xs sm:text-sm text-[#554e48]">
							<div class="flex items-center justify-center gap-2">
								<Calendar class="h-4 w-4 text-[#8c7051]" />
								<span class="font-medium text-[#1a1715]">{event.date}</span>
							</div>
							<div class="flex items-center justify-center gap-2">
								<Clock class="h-4 w-4 text-[#8c7051]" />
								<span>{event.startTime} - {event.endTime} WIB</span>
							</div>
							<div class="flex items-start justify-center gap-2 pt-2">
								<MapPin class="mt-0.5 h-4 w-4 shrink-0 text-[#8c7051]" />
								<div>
									<p class="font-semibold text-[#1a1715]">{event.venue}</p>
									<p class="mt-0.5 text-xs text-[#736861]">{event.address}</p>
								</div>
							</div>
						</div>

						{#if event.mapsUrl}
							<div class="pt-3">
								<a
									href={event.mapsUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center gap-2 border border-[#2c2825] px-6 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all hover:bg-[#1a1715] hover:text-white"
								>
									<span>Petunjuk Lokasi</span>
									<ExternalLink class="h-3.5 w-3.5" />
								</a>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</section>
	{/if}

	<!-- Countdown Timer -->
	{#if content.countdown?.targetDate}
		<section class="relative z-10 bg-[#2c2825] px-6 py-14 text-center text-[#fbf9f5] sm:py-20">
			<div class="mx-auto max-w-2xl space-y-6">
				<span class="block text-[11px] font-semibold tracking-[0.3em] text-[#d4af37] uppercase">
					MENGHITUNG HARI BAHAGIA
				</span>
				<Countdown targetDate={content.countdown.targetDate} variant="editorial" />
			</div>
		</section>
	{/if}

	<!-- Photo Gallery: Editorial Gallery Grid -->
	{#if content.gallery && content.gallery.length > 0}
		<section class="relative z-10 mx-auto max-w-6xl px-6 py-14 sm:py-24">
			<div class="mb-14 text-center">
				<span class="mb-2 block text-[11px] font-semibold tracking-[0.3em] text-[#8c7051] uppercase">
					GALERI FOTO
				</span>
				<h2 class="font-playfair text-3xl font-normal sm:text-5xl">Galeri Foto</h2>
			</div>

			<div class="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
				{#each content.gallery as item}
					<div class="group relative aspect-3/4 overflow-hidden border border-[#2c2825]/15 bg-white p-1 shadow-xs">
						<div class="relative h-full w-full overflow-hidden bg-stone-100">
							<img
								src={item.url}
								alt={item.caption || 'Foto Galeri'}
								class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
								loading="lazy"
							/>
							{#if item.caption}
								<div
									class="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-transparent to-transparent p-3 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
								>
									<p>{item.caption}</p>
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</section>
	{/if}

	<!-- RSVP & Guestbook -->
	<section class="relative z-10 border-t border-[#2c2825]/10 bg-[#f4f0e8] px-6 py-14 sm:py-24">
		<div class="mx-auto max-w-3xl space-y-16">
			{#if content.rsvp?.enabled}
				<div>
					<div class="mb-10 text-center">
						<span class="mb-2 block text-[11px] font-semibold tracking-[0.3em] text-[#8c7051] uppercase">
							KONFIRMASI KEHADIRAN
						</span>
						<h2 class="font-playfair text-3xl font-normal sm:text-4xl">Konfirmasi Kehadiran</h2>
					</div>
					<div class="[&_button[type=submit]]:rounded-none [&_button[type=submit]]:bg-[#2c2825] [&_button[type=submit]]:hover:bg-black">
						<RSVPSection invitationId={invitation.id} settings={content.rsvp} theme="editorial" />
					</div>
				</div>
			{/if}

			{#if content.gift?.enabled}
				<div class="border-t border-[#2c2825]/10 pt-8">
					<div class="mb-10 text-center">
						<span class="mb-2 block text-[11px] font-semibold tracking-[0.3em] text-[#8c7051] uppercase">
							TANDA KASIH
						</span>
						<h2 class="font-playfair text-3xl font-normal sm:text-4xl">Kirim Hadiah</h2>
					</div>
					<GiftSection gift={content.gift} theme="editorial" />
				</div>
			{/if}

			{#if content.guestbook?.enabled}
				<div class="border-t border-[#2c2825]/10 pt-8">
					<div class="mb-10 text-center">
						<span class="mb-2 block text-[11px] font-semibold tracking-[0.3em] text-[#8c7051] uppercase">
							DOA & UCAPAN
						</span>
						<h2 class="font-playfair text-3xl font-normal sm:text-4xl">Doa & Ucapan</h2>
					</div>
					<GuestbookSection
						invitationId={invitation.id}
						settings={content.guestbook}
						initialEntries={initialGuestbook}
						theme="editorial"
					/>
				</div>
			{/if}
		</div>
	</section>

	<!-- Footer -->
	<footer class="relative z-10 border-t border-[#2c2825]/10 px-6 py-12 text-center text-xs text-[#736861]">
		<p class="font-playfair mb-2 text-lg text-[#2c2825] italic">
			{content.couple.partner1.name} & {content.couple.partner2.name}
		</p>
		<p>Terima kasih atas segala doa dan restu Anda</p>
	</footer>
</article>
