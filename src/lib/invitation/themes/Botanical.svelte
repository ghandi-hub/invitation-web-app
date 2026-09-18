<script lang="ts">
	import ThemeHeader from '$lib/invitation/ThemeHeader.svelte';
	import type { Invitation, GuestbookItem } from '$lib/types/invitation';
	import Countdown from '$lib/invitation/components/Countdown.svelte';
	import RSVPSection from '$lib/invitation/components/RSVPSection.svelte';
	import GuestbookSection from '$lib/invitation/components/GuestbookSection.svelte';
	import GiftSection from '$lib/invitation/components/GiftSection.svelte';
	import { Calendar, Clock, MapPin, ExternalLink, Leaf } from '@lucide/svelte';

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
	class="font-sans-clean min-h-screen bg-[#f4f6f0] leading-relaxed text-[#283618] selection:bg-[#4a6741] selection:text-white"
>
	<!-- Botanical Header -->
	<ThemeHeader theme="botanical" {content} />

	<!-- Cover Photo with rounded organic arches -->
	{#if content.hero?.coverUrl}
		<section class="mx-auto my-12 max-w-4xl px-6 sm:my-20">
			<div
				class="relative aspect-4/3 overflow-hidden rounded-t-full border-2 border-[#4a6741]/20 bg-white p-2 shadow-lg sm:aspect-16/9"
			>
				<img
					src={content.hero.coverUrl}
					alt={content.hero.headline}
					class="h-full w-full rounded-t-full object-cover"
				/>
			</div>
			{#if content.hero.subheadline}
				<p
					class="font-cormorant mt-6 text-center text-sm font-medium text-[#4a6741] italic sm:text-base"
				>
					"{content.hero.subheadline}"
				</p>
			{/if}
		</section>
	{/if}

	<!-- Quote -->
	{#if content.opening?.quote}
		<section class="mx-auto max-w-3xl px-6 py-12 text-center sm:py-20">
			<blockquote class="font-cormorant text-base leading-relaxed text-[#283618] italic sm:text-lg">
				"{content.opening.quote}"
			</blockquote>
			{#if content.opening.quoteSource}
				<cite
					class="mt-4 block font-sans text-xs font-semibold tracking-widest text-[#606c38] uppercase not-italic"
				>
					— {content.opening.quoteSource}
				</cite>
			{/if}
		</section>
	{/if}

	<!-- Couple -->
	<section class="mx-auto max-w-5xl px-6 py-16 sm:py-24">
		<div class="mb-16 text-center">
			<span class="mb-2 block text-[11px] font-semibold tracking-[0.3em] text-[#606c38] uppercase">
				The Happy Couple
			</span>
			<h2 class="font-italiana text-3xl text-[#1b2710] sm:text-5xl">Mempelai</h2>
		</div>

		<div class="grid grid-cols-1 items-start gap-12 sm:gap-16 md:grid-cols-2">
			<div class="space-y-4 text-center">
				{#if content.couple.partner1.photoUrl}
					<div
						class="mx-auto h-64 w-48 overflow-hidden rounded-t-full border-2 border-[#4a6741]/20 bg-white p-1.5 shadow-md"
					>
						<img
							src={content.couple.partner1.photoUrl}
							alt={content.couple.partner1.name}
							class="h-full w-full rounded-t-full object-cover"
						/>
					</div>
				{/if}
				<h3 class="font-italiana text-2xl text-[#1b2710] sm:text-3xl">
					{content.couple.partner1.fullName || content.couple.partner1.name}
				</h3>
				{#if content.couple.partner1.childOf}
					<p class="mx-auto max-w-xs text-xs text-[#4a6741] sm:text-sm">
						{content.couple.partner1.childOf}
					</p>
				{/if}
			</div>

			<div class="space-y-4 text-center">
				{#if content.couple.partner2.photoUrl}
					<div
						class="mx-auto h-64 w-48 overflow-hidden rounded-t-full border-2 border-[#4a6741]/20 bg-white p-1.5 shadow-md"
					>
						<img
							src={content.couple.partner2.photoUrl}
							alt={content.couple.partner2.name}
							class="h-full w-full rounded-t-full object-cover"
						/>
					</div>
				{/if}
				<h3 class="font-italiana text-2xl text-[#1b2710] sm:text-3xl">
					{content.couple.partner2.fullName || content.couple.partner2.name}
				</h3>
				{#if content.couple.partner2.childOf}
					<p class="mx-auto max-w-xs text-xs text-[#4a6741] sm:text-sm">
						{content.couple.partner2.childOf}
					</p>
				{/if}
			</div>
		</div>
	</section>

	<!-- Story -->
	{#if content.story?.body}
		<section class="border-y border-[#4a6741]/15 bg-[#ebefe5] px-6 py-16 sm:py-20">
			<div class="mx-auto max-w-2xl space-y-4 text-center">
				<span class="block text-[11px] font-semibold tracking-[0.3em] text-[#606c38] uppercase">
					Our Journey
				</span>
				<h2 class="font-italiana text-3xl text-[#1b2710] sm:text-4xl">
					{content.story.title || 'A Loving Story'}
				</h2>
				<p class="text-sm leading-relaxed whitespace-pre-wrap text-[#283618]/80 sm:text-base">
					{content.story.body}
				</p>
			</div>
		</section>
	{/if}

	<!-- Events -->
	{#if content.events && content.events.length > 0}
		<section class="mx-auto max-w-5xl px-6 py-16 sm:py-24">
			<div class="mb-16 text-center">
				<span
					class="mb-2 block text-[11px] font-semibold tracking-[0.3em] text-[#606c38] uppercase"
				>
					Save The Date
				</span>
				<h2 class="font-italiana text-3xl text-[#1b2710] sm:text-5xl">Rangkaian Acara</h2>
			</div>

			<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
				{#each content.events as event}
					<div
						class="space-y-4 rounded-2xl border border-[#4a6741]/20 bg-white/80 p-8 text-center shadow-sm"
					>
						<h3 class="font-italiana text-2xl text-[#1b2710]">{event.title}</h3>
						<div class="space-y-2 text-xs text-[#4a6741] sm:text-sm">
							<div class="flex items-center justify-center gap-2">
								<Calendar class="h-4 w-4 text-[#606c38]" />
								<span>{event.date}</span>
							</div>
							<div class="flex items-center justify-center gap-2">
								<Clock class="h-4 w-4 text-[#606c38]" />
								<span>{event.startTime} - {event.endTime} WIB</span>
							</div>
							<div class="flex items-start justify-center gap-2 pt-2">
								<MapPin class="mt-0.5 h-4 w-4 shrink-0 text-[#606c38]" />
								<div>
									<p class="font-semibold text-[#1b2710]">{event.venue}</p>
									<p class="mt-0.5 text-xs text-[#606c38]">{event.address}</p>
								</div>
							</div>
						</div>
						{#if event.mapsUrl}
							<div class="pt-2">
								<a
									href={event.mapsUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center gap-1.5 rounded-full bg-[#4a6741] px-4 py-2 text-xs font-semibold tracking-wider text-white uppercase transition-colors hover:bg-[#395032]"
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
		<section class="bg-[#395032] px-6 py-14 text-center text-white sm:py-20">
			<div class="mx-auto max-w-2xl space-y-6">
				<span class="block text-[11px] font-semibold tracking-[0.3em] text-[#d4e09b] uppercase">
					Counting Down
				</span>
				<Countdown targetDate={content.countdown.targetDate} variant="botanical" />
			</div>
		</section>
	{/if}

	<!-- Gallery -->
	{#if content.gallery && content.gallery.length > 0}
		<section class="mx-auto max-w-6xl px-6 py-16 sm:py-24">
			<div class="mb-16 text-center">
				<span
					class="mb-2 block text-[11px] font-semibold tracking-[0.3em] text-[#606c38] uppercase"
				>
					Sweet Moments
				</span>
				<h2 class="font-italiana text-3xl text-[#1b2710] sm:text-5xl">Galeri Foto</h2>
			</div>

			<div class="grid grid-cols-2 gap-4 md:grid-cols-4">
				{#each content.gallery as item}
					<div class="aspect-3/4 overflow-hidden rounded-xl border border-[#4a6741]/20 bg-white">
						<img src={item.url} alt="Gallery item" class="h-full w-full object-cover" />
					</div>
				{/each}
			</div>
		</section>
	{/if}

	<!-- Interactive Section -->
	<section class="border-t border-[#4a6741]/15 bg-[#ebefe5] px-6 py-16 sm:py-24">
		<div class="mx-auto max-w-3xl space-y-16">
			{#if content.rsvp?.enabled}
				<div>
					<div class="mb-10 text-center">
						<span
							class="mb-2 block text-[11px] font-semibold tracking-[0.3em] text-[#606c38] uppercase"
							>RSVP</span
						>
						<h2 class="font-italiana text-3xl text-[#1b2710]">Konfirmasi Kehadiran</h2>
					</div>
					<div class="[&_button[type=submit]]:rounded-full [&_button[type=submit]]:bg-[#4a6741]">
						<RSVPSection invitationId={invitation.id} settings={content.rsvp} theme="botanical" />
					</div>
				</div>
			{/if}

			{#if content.gift?.enabled}
				<div class="border-t border-[#4a6741]/15 pt-8">
					<div class="mb-10 text-center">
						<span
							class="mb-2 block text-[11px] font-semibold tracking-[0.3em] text-[#606c38] uppercase"
							>Wedding Gift</span
						>
						<h2 class="font-italiana text-3xl text-[#1b2710]">Kirim Hadiah</h2>
					</div>
					<GiftSection gift={content.gift} theme="botanical" />
				</div>
			{/if}

			{#if content.guestbook?.enabled}
				<div class="border-t border-[#4a6741]/15 pt-8">
					<div class="mb-10 text-center">
						<span
							class="mb-2 block text-[11px] font-semibold tracking-[0.3em] text-[#606c38] uppercase"
							>Wishes</span
						>
						<h2 class="font-italiana text-3xl text-[#1b2710]">Doa & Ucapan</h2>
					</div>
					<div class="[&_button[type=submit]]:rounded-full [&_button[type=submit]]:bg-[#4a6741]">
						<GuestbookSection
							invitationId={invitation.id}
							settings={content.guestbook}
							initialEntries={initialGuestbook}
							theme="botanical"
						/>
					</div>
				</div>
			{/if}
		</div>
	</section>

	<footer class="border-t border-[#4a6741]/15 px-6 py-12 text-center text-xs text-[#4a6741]">
		<p class="font-italiana mb-2 text-base text-[#1b2710]">
			{content.couple.partner1.name} & {content.couple.partner2.name}
		</p>
		<p>Semoga berkah alam semesta senantiasa menyertai kita</p>
	</footer>
</article>
