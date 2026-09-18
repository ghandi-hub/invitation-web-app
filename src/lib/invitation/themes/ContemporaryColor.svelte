<script lang="ts">
	import ThemeHeader from '$lib/invitation/ThemeHeader.svelte';
	import type { Invitation, GuestbookItem } from '$lib/types/invitation';
	import Countdown from '$lib/invitation/components/Countdown.svelte';
	import RSVPSection from '$lib/invitation/components/RSVPSection.svelte';
	import GuestbookSection from '$lib/invitation/components/GuestbookSection.svelte';
	import GiftSection from '$lib/invitation/components/GiftSection.svelte';
	import { Calendar, Clock, MapPin, ExternalLink, Sparkles } from '@lucide/svelte';

	let {
		invitation,
		initialGuestbook = []
	}: {
		invitation: Invitation;
		initialGuestbook?: GuestbookItem[];
	} = $props();

	const { content } = $derived(invitation);
</script>

<article
	class="font-sans-clean min-h-screen bg-[#faf3ee] leading-relaxed text-[#1d2d44] selection:bg-[#c85a32] selection:text-white"
>
	<!-- Contemporary Header -->
	<ThemeHeader theme="contemporary-color" {content} />

	<!-- Color Blocked Hero -->
	{#if content.hero?.coverUrl}
		<section class="mx-auto mb-16 max-w-6xl px-6">
			<div class="relative rounded-3xl bg-[#c85a32] p-3 shadow-xl sm:p-6">
				<div class="aspect-16/9 overflow-hidden rounded-2xl bg-neutral-100">
					<img
						src={content.hero.coverUrl}
						alt={content.hero.headline}
						class="h-full w-full object-cover"
					/>
				</div>
				{#if content.hero.subheadline}
					<div class="py-4 text-center text-sm font-medium text-white sm:text-base">
						"{content.hero.subheadline}"
					</div>
				{/if}
			</div>
		</section>
	{/if}

	<!-- Quote -->
	{#if content.opening?.quote}
		<section class="mx-auto max-w-3xl px-6 py-12 text-center sm:py-16">
			<blockquote
				class="font-syne text-lg leading-relaxed font-medium text-[#0d1b2a] italic sm:text-xl"
			>
				"{content.opening.quote}"
			</blockquote>
			{#if content.opening.quoteSource}
				<cite
					class="mt-4 block font-mono text-xs font-bold tracking-widest text-[#c85a32] uppercase not-italic"
				>
					— {content.opening.quoteSource}
				</cite>
			{/if}
		</section>
	{/if}

	<!-- Couple -->
	<section class="mx-auto max-w-5xl px-6 py-16 sm:py-24">
		<div class="mb-16 text-center">
			<span class="mb-2 block text-xs font-bold tracking-widest text-[#c85a32] uppercase"
				>The Couple</span
			>
			<h2 class="font-syne text-4xl font-bold text-[#0d1b2a] sm:text-5xl">Mempelai</h2>
		</div>

		<div class="grid grid-cols-1 gap-12 sm:gap-16 md:grid-cols-2">
			<div
				class="space-y-4 rounded-3xl border border-[#c85a32]/15 bg-white p-8 text-center shadow-sm"
			>
				{#if content.couple.partner1.photoUrl}
					<div class="mx-auto h-60 w-48 overflow-hidden rounded-2xl bg-neutral-100 shadow-md">
						<img
							src={content.couple.partner1.photoUrl}
							alt={content.couple.partner1.name}
							class="h-full w-full object-cover"
						/>
					</div>
				{/if}
				<h3 class="font-syne text-3xl font-bold text-[#0d1b2a]">
					{content.couple.partner1.fullName || content.couple.partner1.name}
				</h3>
				{#if content.couple.partner1.childOf}
					<p class="mx-auto max-w-xs text-xs text-[#415a77] sm:text-sm">
						{content.couple.partner1.childOf}
					</p>
				{/if}
			</div>

			<div
				class="space-y-4 rounded-3xl border border-[#c85a32]/15 bg-white p-8 text-center shadow-sm"
			>
				{#if content.couple.partner2.photoUrl}
					<div class="mx-auto h-60 w-48 overflow-hidden rounded-2xl bg-neutral-100 shadow-md">
						<img
							src={content.couple.partner2.photoUrl}
							alt={content.couple.partner2.name}
							class="h-full w-full object-cover"
						/>
					</div>
				{/if}
				<h3 class="font-syne text-3xl font-bold text-[#0d1b2a]">
					{content.couple.partner2.fullName || content.couple.partner2.name}
				</h3>
				{#if content.couple.partner2.childOf}
					<p class="mx-auto max-w-xs text-xs text-[#415a77] sm:text-sm">
						{content.couple.partner2.childOf}
					</p>
				{/if}
			</div>
		</div>
	</section>

	<!-- Story -->
	{#if content.story?.body}
		<section class="border-y border-[#c85a32]/15 bg-[#f0e6dd] px-6 py-16 sm:py-24">
			<div class="mx-auto max-w-3xl space-y-4 text-center">
				<span class="block text-xs font-bold tracking-widest text-[#c85a32] uppercase"
					>Our Story</span
				>
				<h2 class="font-syne text-3xl font-bold text-[#0d1b2a] sm:text-4xl">
					{content.story.title || 'How We Met'}
				</h2>
				<p class="text-sm leading-relaxed whitespace-pre-wrap text-[#1d2d44]/80 sm:text-base">
					{content.story.body}
				</p>
			</div>
		</section>
	{/if}

	<!-- Events -->
	{#if content.events && content.events.length > 0}
		<section class="mx-auto max-w-5xl px-6 py-16 sm:py-24">
			<div class="mb-16 text-center">
				<span class="mb-2 block text-xs font-bold tracking-widest text-[#c85a32] uppercase"
					>Save The Date</span
				>
				<h2 class="font-syne text-4xl font-bold text-[#0d1b2a] sm:text-5xl">Rangkaian Acara</h2>
			</div>

			<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
				{#each content.events as event}
					<div
						class="space-y-4 rounded-3xl border border-[#c85a32]/15 bg-white p-8 text-center shadow-sm"
					>
						<span
							class="inline-block rounded-full bg-[#c85a32]/10 px-3 py-1 text-xs font-bold tracking-wider text-[#c85a32] uppercase"
						>
							{event.type}
						</span>
						<h3 class="font-syne text-2xl font-bold text-[#0d1b2a]">{event.title}</h3>

						<div class="space-y-2 text-xs text-[#415a77] sm:text-sm">
							<div class="flex items-center justify-center gap-2">
								<Calendar class="h-4 w-4 text-[#c85a32]" />
								<span>{event.date}</span>
							</div>
							<div class="flex items-center justify-center gap-2">
								<Clock class="h-4 w-4 text-[#c85a32]" />
								<span>{event.startTime} - {event.endTime} WIB</span>
							</div>
							<div class="flex items-start justify-center gap-2 pt-2">
								<MapPin class="mt-0.5 h-4 w-4 shrink-0 text-[#c85a32]" />
								<div>
									<p class="font-bold text-[#0d1b2a]">{event.venue}</p>
									<p class="mt-0.5 text-xs text-[#415a77]">{event.address}</p>
								</div>
							</div>
						</div>

						{#if event.mapsUrl}
							<div class="pt-2">
								<a
									href={event.mapsUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center gap-1.5 rounded-full bg-[#c85a32] px-5 py-2.5 text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#a8441f]"
								>
									<span>Buka Peta</span>
									<ExternalLink class="h-3.5 w-3.5" />
								</a>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</section>
	{/if}

	<!-- Countdown -->
	{#if content.countdown?.targetDate}
		<section class="bg-[#0d1b2a] px-6 py-14 text-center text-white sm:py-20">
			<div class="mx-auto max-w-2xl space-y-6">
				<span class="block text-xs font-bold tracking-widest text-[#e0a96d] uppercase">
					Counting Down
				</span>
				<Countdown targetDate={content.countdown.targetDate} variant="contemporary" />
			</div>
		</section>
	{/if}

	<!-- Gallery -->
	{#if content.gallery && content.gallery.length > 0}
		<section class="mx-auto max-w-6xl px-6 py-16 sm:py-24">
			<div class="mb-16 text-center">
				<span class="mb-2 block text-xs font-bold tracking-widest text-[#c85a32] uppercase"
					>Gallery</span
				>
				<h2 class="font-syne text-4xl font-bold text-[#0d1b2a] sm:text-5xl">Galeri Foto</h2>
			</div>

			<div class="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
				{#each content.gallery as item}
					<div class="aspect-3/4 overflow-hidden rounded-2xl bg-neutral-100 shadow-md">
						<img src={item.url} alt="Gallery item" class="h-full w-full object-cover" />
					</div>
				{/each}
			</div>
		</section>
	{/if}

	<!-- Interactive Section -->
	<section class="border-t border-[#c85a32]/15 bg-[#f0e6dd] px-6 py-16 sm:py-24">
		<div class="mx-auto max-w-3xl space-y-16">
			{#if content.rsvp?.enabled}
				<div>
					<div class="mb-10 text-center">
						<span class="mb-2 block text-xs font-bold tracking-widest text-[#c85a32] uppercase"
							>RSVP</span
						>
						<h2 class="font-syne text-3xl font-bold text-[#0d1b2a]">Konfirmasi Kehadiran</h2>
					</div>
					<div class="[&_button[type=submit]]:rounded-full [&_button[type=submit]]:bg-[#c85a32]">
						<RSVPSection
							invitationId={invitation.id}
							settings={content.rsvp}
							theme="contemporary"
						/>
					</div>
				</div>
			{/if}

			{#if content.gift?.enabled}
				<div class="border-t border-[#c85a32]/15 pt-8">
					<div class="mb-10 text-center">
						<span class="mb-2 block text-xs font-bold tracking-widest text-[#c85a32] uppercase"
							>Wedding Gift</span
						>
						<h2 class="font-syne text-3xl font-bold text-[#0d1b2a]">Kirim Hadiah</h2>
					</div>
					<GiftSection gift={content.gift} theme="contemporary" />
				</div>
			{/if}

			{#if content.guestbook?.enabled}
				<div class="border-t border-[#c85a32]/15 pt-8">
					<div class="mb-10 text-center">
						<span class="mb-2 block text-xs font-bold tracking-widest text-[#c85a32] uppercase"
							>Wishes</span
						>
						<h2 class="font-syne text-3xl font-bold text-[#0d1b2a]">Doa & Ucapan</h2>
					</div>
					<div class="[&_button[type=submit]]:rounded-full [&_button[type=submit]]:bg-[#c85a32]">
						<GuestbookSection
							invitationId={invitation.id}
							settings={content.guestbook}
							initialEntries={initialGuestbook}
							theme="contemporary"
						/>
					</div>
				</div>
			{/if}
		</div>
	</section>

	<footer class="border-t border-[#c85a32]/15 px-6 py-12 text-center text-xs text-[#415a77]">
		<p class="font-syne mb-2 text-lg font-bold text-[#0d1b2a]">
			{content.couple.partner1.name} & {content.couple.partner2.name}
		</p>
		<p>Thank you for celebrating with us</p>
	</footer>
</article>
