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
	class="font-mono-code min-h-screen bg-[#f5f5f5] leading-relaxed text-black selection:bg-black selection:text-white"
>
	<!-- Top Bar Grid -->
	<ThemeHeader theme="modern-mono" {content} />

	<!-- Cover Image with High Fashion Grid -->
	{#if content.hero?.coverUrl}
		<section class="border-b-2 border-black">
			<div
				class="mx-auto grid max-w-6xl grid-cols-1 border-x-0 border-black md:grid-cols-12 md:border-x-2"
			>
				<div class="border-b-2 border-black md:col-span-8 md:border-r-2 md:border-b-0">
					<img
						src={content.hero.coverUrl}
						alt={content.hero.headline}
						class="aspect-16/10 w-full object-cover contrast-125 grayscale"
					/>
				</div>
				<div class="flex flex-col justify-between bg-white p-8 md:col-span-4">
					<span class="text-[11px] text-neutral-400 uppercase">// INTRO</span>
					<p class="my-6 text-xs leading-relaxed tracking-wide uppercase sm:text-sm">
						{content.hero.subheadline || content.opening?.greeting}
					</p>
					<span class="text-[10px] text-neutral-400">STATUS: CONFIRMED</span>
				</div>
			</div>
		</section>
	{/if}

	<!-- Couple Columns -->
	<section class="border-b-2 border-black">
		<div
			class="mx-auto grid max-w-6xl grid-cols-1 divide-y-2 divide-black border-x-0 border-black md:grid-cols-2 md:divide-x-2 md:divide-y-0 md:border-x-2"
		>
			<!-- Groom -->
			<div class="space-y-6 bg-white p-8 sm:p-12">
				<span class="text-[10px] text-neutral-400 uppercase">[PARTNER_01]</span>
				{#if content.couple.partner1.photoUrl}
					<div class="aspect-4/5 overflow-hidden border-2 border-black">
						<img
							src={content.couple.partner1.photoUrl}
							alt={content.couple.partner1.name}
							class="h-full w-full object-cover contrast-125 grayscale"
						/>
					</div>
				{/if}
				<div>
					<h3 class="text-2xl font-bold uppercase">
						{content.couple.partner1.fullName || content.couple.partner1.name}
					</h3>
					{#if content.couple.partner1.childOf}
						<p class="mt-2 text-xs text-neutral-500">{content.couple.partner1.childOf}</p>
					{/if}
				</div>
			</div>

			<!-- Bride -->
			<div class="space-y-6 bg-white p-8 sm:p-12">
				<span class="text-[10px] text-neutral-400 uppercase">[PARTNER_02]</span>
				{#if content.couple.partner2.photoUrl}
					<div class="aspect-4/5 overflow-hidden border-2 border-black">
						<img
							src={content.couple.partner2.photoUrl}
							alt={content.couple.partner2.name}
							class="h-full w-full object-cover contrast-125 grayscale"
						/>
					</div>
				{/if}
				<div>
					<h3 class="text-2xl font-bold uppercase">
						{content.couple.partner2.fullName || content.couple.partner2.name}
					</h3>
					{#if content.couple.partner2.childOf}
						<p class="mt-2 text-xs text-neutral-500">{content.couple.partner2.childOf}</p>
					{/if}
				</div>
			</div>
		</div>
	</section>

	<!-- Events -->
	{#if content.events && content.events.length > 0}
		<section class="border-b-2 border-black">
			<div class="mx-auto max-w-6xl border-x-0 border-black md:border-x-2">
				<div class="bg-black p-6 text-white sm:p-8">
					<span class="text-xs tracking-widest uppercase">// SCHEDULE_OF_EVENTS</span>
				</div>
				<div
					class="grid grid-cols-1 divide-y-2 divide-black md:grid-cols-2 md:divide-x-2 md:divide-y-0"
				>
					{#each content.events as event}
						<div class="space-y-4 bg-white p-8 sm:p-12">
							<h4 class="text-xl font-bold uppercase">{event.title}</h4>
							<div class="space-y-1 text-xs text-neutral-600">
								<p>DATE: {event.date}</p>
								<p>TIME: {event.startTime} - {event.endTime} WIB</p>
								<p class="pt-2 font-bold text-black">LOC: {event.venue}</p>
								<p class="text-neutral-500">{event.address}</p>
							</div>
							{#if event.mapsUrl}
								<div class="pt-4">
									<a
										href={event.mapsUrl}
										target="_blank"
										rel="noopener noreferrer"
										class="inline-block border-2 border-black px-4 py-2 text-xs font-bold uppercase transition-colors hover:bg-black hover:text-white"
									>
										MAP_COORDINATES →
									</a>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</section>
	{/if}

	<!-- Countdown -->
	{#if content.countdown?.targetDate}
		<section class="border-b-2 border-black bg-black px-6 py-16 text-center text-white">
			<span class="mb-6 block text-[10px] tracking-widest text-neutral-400 uppercase"
				>// T_MINUS</span
			>
			<Countdown targetDate={content.countdown.targetDate} variant="mono" />
		</section>
	{/if}

	<!-- Gallery -->
	{#if content.gallery && content.gallery.length > 0}
		<section class="border-b-2 border-black">
			<div class="mx-auto max-w-6xl border-x-0 border-black md:border-x-2">
				<div class="border-b-2 border-black bg-neutral-200 p-6">
					<span class="text-xs font-bold tracking-widest uppercase">// ARCHIVE_GALLERY</span>
				</div>
				<div
					class="grid grid-cols-2 divide-x-2 divide-y-2 divide-black md:grid-cols-4 md:divide-y-0"
				>
					{#each content.gallery as item}
						<div class="aspect-square overflow-hidden bg-neutral-100">
							<img src={item.url} alt="Gallery item" class="h-full w-full object-cover grayscale" />
						</div>
					{/each}
				</div>
			</div>
		</section>
	{/if}

	<!-- Interactive Section -->
	<section class="mx-auto max-w-4xl space-y-16 px-6 py-16">
		{#if content.rsvp?.enabled}
			<div>
				<span class="mb-2 block text-xs tracking-widest text-neutral-500 uppercase"
					>// FORM_RSVP</span
				>
				<h2 class="mb-6 text-2xl font-bold uppercase">Konfirmasi Kehadiran</h2>
				<RSVPSection invitationId={invitation.id} settings={content.rsvp} theme="mono" />
			</div>
		{/if}

		{#if content.gift?.enabled}
			<div class="border-t-2 border-black pt-12">
				<span class="mb-2 block text-xs tracking-widest text-neutral-500 uppercase"
					>// FINANCIAL_GIFT</span
				>
				<h2 class="mb-6 text-2xl font-bold uppercase">Hadiah Pernikahan</h2>
				<GiftSection gift={content.gift} theme="mono" />
			</div>
		{/if}

		{#if content.guestbook?.enabled}
			<div class="border-t-2 border-black pt-12">
				<span class="mb-2 block text-xs tracking-widest text-neutral-500 uppercase"
					>// GUESTBOOK_LOG</span
				>
				<h2 class="mb-6 text-2xl font-bold uppercase">Ucapan & Doa</h2>
				<GuestbookSection
					invitationId={invitation.id}
					settings={content.guestbook}
					initialEntries={initialGuestbook}
					theme="mono"
				/>
			</div>
		{/if}
	</section>

	<footer class="border-t-2 border-black px-6 py-12 text-center text-xs text-neutral-500">
		EOF // {content.couple.partner1.name} & {content.couple.partner2.name}
	</footer>
</article>
