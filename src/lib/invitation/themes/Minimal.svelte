<script lang="ts">
	import ThemeHeader from '$lib/invitation/ThemeHeader.svelte';
	import type { Invitation, GuestbookItem } from '$lib/types/invitation';
	import Countdown from '$lib/invitation/components/Countdown.svelte';
	import RSVPSection from '$lib/invitation/components/RSVPSection.svelte';
	import GuestbookSection from '$lib/invitation/components/GuestbookSection.svelte';
	import GiftSection from '$lib/invitation/components/GiftSection.svelte';
	import { Calendar, Clock, MapPin, ExternalLink } from '@lucide/svelte';

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
	class="font-grotesk min-h-screen bg-[#ffffff] leading-relaxed text-[#1a1a1a] selection:bg-black selection:text-white"
>
	<!-- Hero Header -->
	<ThemeHeader theme="minimal" {content} />

	<!-- Cover Photo -->
	{#if content.hero?.coverUrl}
		<section class="mx-auto my-12 max-w-6xl px-6 sm:my-20">
			<div class="aspect-16/9 overflow-hidden bg-neutral-100">
				<img
					src={content.hero.coverUrl}
					alt={content.hero.headline}
					class="h-full w-full object-cover"
				/>
			</div>
		</section>
	{/if}

	<!-- Couple Grid -->
	<section class="mx-auto max-w-5xl border-b border-neutral-100 px-6 py-16 sm:py-24">
		<div class="grid grid-cols-1 gap-12 sm:gap-16 md:grid-cols-2">
			<div class="space-y-4">
				{#if content.couple.partner1.photoUrl}
					<div class="aspect-square overflow-hidden bg-neutral-100">
						<img
							src={content.couple.partner1.photoUrl}
							alt={content.couple.partner1.name}
							class="h-full w-full object-cover"
						/>
					</div>
				{/if}
				<h3 class="text-2xl font-bold tracking-tight sm:text-3xl">
					{content.couple.partner1.fullName || content.couple.partner1.name}
				</h3>
				{#if content.couple.partner1.childOf}
					<p class="text-xs font-light text-neutral-500 sm:text-sm">
						{content.couple.partner1.childOf}
					</p>
				{/if}
			</div>

			<div class="space-y-4">
				{#if content.couple.partner2.photoUrl}
					<div class="aspect-square overflow-hidden bg-neutral-100">
						<img
							src={content.couple.partner2.photoUrl}
							alt={content.couple.partner2.name}
							class="h-full w-full object-cover"
						/>
					</div>
				{/if}
				<h3 class="text-2xl font-bold tracking-tight sm:text-3xl">
					{content.couple.partner2.fullName || content.couple.partner2.name}
				</h3>
				{#if content.couple.partner2.childOf}
					<p class="text-xs font-light text-neutral-500 sm:text-sm">
						{content.couple.partner2.childOf}
					</p>
				{/if}
			</div>
		</div>
	</section>

	<!-- Story -->
	{#if content.story?.body}
		<section class="mx-auto max-w-3xl space-y-4 border-b border-neutral-100 px-6 py-16 sm:py-24">
			<span class="font-mono text-xs tracking-widest text-neutral-400 uppercase">01 / Story</span>
			<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
				{content.story.title || 'Our Story'}
			</h2>
			<p
				class="text-sm leading-relaxed font-light whitespace-pre-wrap text-neutral-600 sm:text-base"
			>
				{content.story.body}
			</p>
		</section>
	{/if}

	<!-- Events -->
	{#if content.events && content.events.length > 0}
		<section class="mx-auto max-w-4xl space-y-8 border-b border-neutral-100 px-6 py-16 sm:py-24">
			<span class="font-mono text-xs tracking-widest text-neutral-400 uppercase">02 / Schedule</span
			>
			<div class="divide-y divide-neutral-200">
				{#each content.events as event}
					<div class="flex flex-col justify-between gap-6 py-8 md:flex-row md:items-start">
						<div>
							<h3 class="text-2xl font-bold tracking-tight">{event.title}</h3>
							<p class="mt-2 text-sm font-semibold text-neutral-900">{event.venue}</p>
							<p class="mt-1 max-w-md text-xs text-neutral-500">{event.address}</p>
						</div>
						<div class="space-y-2 text-left md:text-right">
							<p class="font-mono text-sm">{event.date}</p>
							<p class="font-mono text-xs text-neutral-500">
								{event.startTime} - {event.endTime} WIB
							</p>
							{#if event.mapsUrl}
								<div class="pt-2">
									<a
										href={event.mapsUrl}
										target="_blank"
										rel="noopener noreferrer"
										class="inline-flex items-center gap-1.5 text-xs font-semibold underline underline-offset-4 hover:text-neutral-500"
									>
										<span>Google Maps</span>
										<ExternalLink class="h-3 w-3" />
									</a>
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</section>
	{/if}

	<!-- Countdown -->
	{#if content.countdown?.targetDate}
		<section class="mx-auto max-w-2xl border-b border-neutral-100 px-6 py-16 text-center">
			<span class="mb-6 block font-mono text-xs tracking-widest text-neutral-400 uppercase"
				>Countdown</span
			>
			<Countdown targetDate={content.countdown.targetDate} variant="minimal" />
		</section>
	{/if}

	<!-- Gallery -->
	{#if content.gallery && content.gallery.length > 0}
		<section class="mx-auto max-w-6xl space-y-8 border-b border-neutral-100 px-6 py-16 sm:py-24">
			<span class="font-mono text-xs tracking-widest text-neutral-400 uppercase">03 / Gallery</span>
			<div class="grid grid-cols-2 gap-4 md:grid-cols-4">
				{#each content.gallery as item}
					<div class="aspect-square overflow-hidden bg-neutral-100">
						<img src={item.url} alt="Gallery" class="h-full w-full object-cover" />
					</div>
				{/each}
			</div>
		</section>
	{/if}

	<!-- Interactive Section -->
	<section class="mx-auto max-w-3xl space-y-16 px-6 py-16 sm:py-24">
		{#if content.rsvp?.enabled}
			<div>
				<span class="mb-2 block font-mono text-xs tracking-widest text-neutral-400 uppercase"
					>04 / RSVP</span
				>
				<h2 class="mb-8 text-3xl font-bold tracking-tight">Konfirmasi Kehadiran</h2>
				<RSVPSection invitationId={invitation.id} settings={content.rsvp} theme="minimal" />
			</div>
		{/if}

		{#if content.gift?.enabled}
			<div class="border-t border-neutral-100 pt-12">
				<span class="mb-2 block font-mono text-xs tracking-widest text-neutral-400 uppercase"
					>05 / Gift</span
				>
				<h2 class="mb-8 text-3xl font-bold tracking-tight">Tanda Kasih</h2>
				<GiftSection gift={content.gift} theme="minimal" />
			</div>
		{/if}

		{#if content.guestbook?.enabled}
			<div class="border-t border-neutral-100 pt-12">
				<span class="mb-2 block font-mono text-xs tracking-widest text-neutral-400 uppercase"
					>06 / Guestbook</span
				>
				<h2 class="mb-8 text-3xl font-bold tracking-tight">Buku Tamu & Doa</h2>
				<GuestbookSection
					invitationId={invitation.id}
					settings={content.guestbook}
					initialEntries={initialGuestbook}
					theme="minimal"
				/>
			</div>
		{/if}
	</section>

	<footer
		class="border-t border-neutral-100 px-6 py-12 text-center font-mono text-xs text-neutral-400"
	>
		{content.couple.partner1.name} & {content.couple.partner2.name} — 2026
	</footer>
</article>
