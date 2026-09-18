<script lang="ts">
	import ThemeHeader from '$lib/invitation/ThemeHeader.svelte';
	import type { Invitation, GuestbookItem } from '$lib/types/invitation';
	import Countdown from '$lib/invitation/components/Countdown.svelte';
	import RSVPSection from '$lib/invitation/components/RSVPSection.svelte';
	import GuestbookSection from '$lib/invitation/components/GuestbookSection.svelte';
	import GiftSection from '$lib/invitation/components/GiftSection.svelte';
	import { Calendar, Clock, MapPin, ExternalLink, Heart } from '@lucide/svelte';

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
	class="font-sans-clean min-h-screen bg-[#fbf9f5] leading-relaxed text-[#2c2825] selection:bg-[#8c7051] selection:text-white"
>
	<!-- Top Editorial Header -->
	<ThemeHeader theme="editorial" {content} />

	<!-- Hero Section -->
	{#if content.hero?.coverUrl}
		<section class="mx-auto my-10 max-w-5xl px-4 sm:my-16 sm:px-6">
			<div class="relative aspect-4/3 overflow-hidden bg-[#2c2825]/5 shadow-sm sm:aspect-16/9">
				<img
					src={content.hero.coverUrl}
					alt={content.hero.headline}
					class="h-full w-full object-cover"
					loading="eager"
				/>
			</div>
			{#if content.hero.subheadline}
				<div class="mx-auto mt-6 max-w-xl text-center">
					<p class="font-playfair text-sm text-[#554e48] italic sm:text-base">
						"{content.hero.subheadline}"
					</p>
				</div>
			{/if}
		</section>
	{/if}

	<!-- Opening Quote -->
	{#if content.opening?.quote}
		<section class="mx-auto max-w-3xl px-6 py-12 text-center sm:py-20">
			<div class="mx-auto mb-8 h-px w-12 bg-[#8c7051]"></div>
			<blockquote class="font-playfair text-base leading-relaxed text-[#3d3733] italic sm:text-lg">
				"{content.opening.quote}"
			</blockquote>
			{#if content.opening.quoteSource}
				<cite
					class="mt-4 block font-sans text-xs font-semibold tracking-widest text-[#8c7051] uppercase not-italic"
				>
					— {content.opening.quoteSource}
				</cite>
			{/if}
			<div class="mx-auto mt-8 h-px w-12 bg-[#8c7051]"></div>
		</section>
	{/if}

	<!-- The Couple Section -->
	<section class="mx-auto max-w-5xl px-6 py-14 sm:py-24">
		<div class="mb-16 text-center">
			<span class="mb-2 block text-[11px] font-semibold tracking-[0.3em] text-[#8c7051] uppercase">
				The Bride & Groom
			</span>
			<h2 class="font-playfair text-3xl font-normal sm:text-5xl">Mempelai</h2>
		</div>

		<div class="grid grid-cols-1 items-start gap-12 sm:gap-16 md:grid-cols-2">
			<!-- Groom -->
			<div class="space-y-5 text-center">
				{#if content.couple.partner1.photoUrl}
					<div class="mx-auto h-56 w-44 overflow-hidden bg-stone-200 shadow-md sm:h-72 sm:w-56">
						<img
							src={content.couple.partner1.photoUrl}
							alt={content.couple.partner1.name}
							class="h-full w-full object-cover"
							loading="lazy"
						/>
					</div>
				{/if}
				<div>
					<h3 class="font-playfair text-2xl font-medium text-[#1a1715] sm:text-3xl">
						{content.couple.partner1.fullName || content.couple.partner1.name}
					</h3>
					{#if content.couple.partner1.childOf}
						<p class="mx-auto mt-2 max-w-xs text-xs text-[#736861] sm:text-sm">
							{content.couple.partner1.childOf}
						</p>
					{/if}
				</div>
			</div>

			<!-- Bride -->
			<div class="space-y-5 text-center">
				{#if content.couple.partner2.photoUrl}
					<div class="mx-auto h-56 w-44 overflow-hidden bg-stone-200 shadow-md sm:h-72 sm:w-56">
						<img
							src={content.couple.partner2.photoUrl}
							alt={content.couple.partner2.name}
							class="h-full w-full object-cover"
							loading="lazy"
						/>
					</div>
				{/if}
				<div>
					<h3 class="font-playfair text-2xl font-medium text-[#1a1715] sm:text-3xl">
						{content.couple.partner2.fullName || content.couple.partner2.name}
					</h3>
					{#if content.couple.partner2.childOf}
						<p class="mx-auto mt-2 max-w-xs text-xs text-[#736861] sm:text-sm">
							{content.couple.partner2.childOf}
						</p>
					{/if}
				</div>
			</div>
		</div>
	</section>

	<!-- Love Story -->
	{#if content.story?.body}
		<section class="border-y border-[#2c2825]/10 bg-[#f4f0e8] px-6 py-14 sm:py-20">
			<div class="mx-auto max-w-2xl space-y-6 text-center">
				<span class="block text-[11px] font-semibold tracking-[0.3em] text-[#8c7051] uppercase">
					Chapter
				</span>
				<h2 class="font-playfair text-3xl font-normal sm:text-4xl">
					{content.story.title || 'Our Story'}
				</h2>
				<p
					class="font-sans text-sm leading-relaxed whitespace-pre-wrap text-[#554e48] sm:text-base"
				>
					{content.story.body}
				</p>
			</div>
		</section>
	{/if}

	<!-- Wedding Events -->
	{#if content.events && content.events.length > 0}
		<section class="mx-auto max-w-5xl px-6 py-16 sm:py-24">
			<div class="mb-16 text-center">
				<span
					class="mb-2 block text-[11px] font-semibold tracking-[0.3em] text-[#8c7051] uppercase"
				>
					Save The Date
				</span>
				<h2 class="font-playfair text-3xl font-normal sm:text-5xl">Rangkaian Acara</h2>
			</div>

			<div class="grid grid-cols-1 gap-8 sm:gap-12 md:grid-cols-2">
				{#each content.events as event}
					<div
						class="space-y-4 border border-[#2c2825]/10 bg-white p-8 text-center shadow-xs sm:p-10"
					>
						<h3 class="font-playfair text-2xl font-medium text-[#1a1715]">
							{event.title}
						</h3>
						<div class="mx-auto h-px w-8 bg-[#8c7051]"></div>

						<div class="space-y-2 text-xs text-[#554e48] sm:text-sm">
							<div class="flex items-center justify-center gap-2">
								<Calendar class="h-4 w-4 text-[#8c7051]" />
								<span>{event.date}</span>
							</div>
							<div class="flex items-center justify-center gap-2">
								<Clock class="h-4 w-4 text-[#8c7051]" />
								<span>{event.startTime} - {event.endTime} WIB</span>
							</div>
							<div class="flex items-start justify-center gap-2 pt-2">
								<MapPin class="mt-0.5 h-4 w-4 shrink-0 text-[#8c7051]" />
								<div>
									<p class="font-semibold text-[#1a1715]">{event.venue}</p>
									<p class="mt-0.5 text-[11px] text-[#736861] sm:text-xs">{event.address}</p>
								</div>
							</div>
						</div>

						{#if event.mapsUrl}
							<div class="pt-4">
								<a
									href={event.mapsUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center gap-2 border border-[#2c2825]/30 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all hover:border-[#1a1715] hover:bg-[#1a1715] hover:text-white"
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
		<section class="bg-[#2c2825] px-6 py-14 text-center text-[#fbf9f5] sm:py-20">
			<div class="mx-auto max-w-2xl space-y-8">
				<span class="block text-[11px] font-semibold tracking-[0.3em] text-[#d4af37] uppercase">
					Counting Down To The Big Day
				</span>
				<Countdown targetDate={content.countdown.targetDate} variant="editorial" />
			</div>
		</section>
	{/if}

	<!-- Photo Gallery -->
	{#if content.gallery && content.gallery.length > 0}
		<section class="mx-auto max-w-6xl px-6 py-16 sm:py-24">
			<div class="mb-16 text-center">
				<span
					class="mb-2 block text-[11px] font-semibold tracking-[0.3em] text-[#8c7051] uppercase"
				>
					Moments
				</span>
				<h2 class="font-playfair text-3xl font-normal sm:text-5xl">Galeri Foto</h2>
			</div>

			<div class="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
				{#each content.gallery as item}
					<div class="group relative aspect-3/4 overflow-hidden bg-stone-200">
						<img
							src={item.url}
							alt={item.caption || 'Foto Galeri'}
							class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
							loading="lazy"
						/>
						{#if item.caption}
							<div
								class="absolute inset-0 flex items-end bg-black/40 p-4 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
							>
								<p>{item.caption}</p>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</section>
	{/if}

	<!-- RSVP & Guestbook -->
	<section class="border-t border-[#2c2825]/10 bg-[#f4f0e8] px-6 py-16 sm:py-24">
		<div class="mx-auto max-w-3xl space-y-16">
			<!-- RSVP -->
			{#if content.rsvp?.enabled}
				<div>
					<div class="mb-10 text-center">
						<span
							class="mb-2 block text-[11px] font-semibold tracking-[0.3em] text-[#8c7051] uppercase"
						>
							RSVP
						</span>
						<h2 class="font-playfair text-3xl font-normal sm:text-4xl">Konfirmasi Kehadiran</h2>
					</div>
					<RSVPSection invitationId={invitation.id} settings={content.rsvp} theme="editorial" />
				</div>
			{/if}

			<!-- Gift -->
			{#if content.gift?.enabled}
				<div class="border-t border-[#2c2825]/10 pt-8">
					<div class="mb-10 text-center">
						<span
							class="mb-2 block text-[11px] font-semibold tracking-[0.3em] text-[#8c7051] uppercase"
						>
							Wedding Gift
						</span>
						<h2 class="font-playfair text-3xl font-normal sm:text-4xl">Kirim Hadiah</h2>
					</div>
					<GiftSection gift={content.gift} theme="editorial" />
				</div>
			{/if}

			<!-- Guestbook -->
			{#if content.guestbook?.enabled}
				<div class="border-t border-[#2c2825]/10 pt-8">
					<div class="mb-10 text-center">
						<span
							class="mb-2 block text-[11px] font-semibold tracking-[0.3em] text-[#8c7051] uppercase"
						>
							Wishes
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
	<footer class="border-t border-[#2c2825]/10 px-6 py-12 text-center text-xs text-[#736861]">
		<p class="font-playfair mb-2 text-base text-[#2c2825] italic">
			{content.couple.partner1.name} & {content.couple.partner2.name}
		</p>
		<p>Terima kasih atas segala doa dan restu Anda</p>
	</footer>
</article>
