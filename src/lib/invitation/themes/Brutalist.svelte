<script lang="ts">
	import ThemeHeader from '$lib/invitation/ThemeHeader.svelte';
	import type { Invitation, GuestbookItem } from '$lib/types/invitation';
	import Countdown from '$lib/invitation/components/Countdown.svelte';
	import RSVPSection from '$lib/invitation/components/RSVPSection.svelte';
	import GuestbookSection from '$lib/invitation/components/GuestbookSection.svelte';
	import GiftSection from '$lib/invitation/components/GiftSection.svelte';
	import { Calendar, Clock, MapPin, ExternalLink, Zap, Heart } from '@lucide/svelte';

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
	class="font-grotesk min-h-screen bg-[#fffdf5] px-4 py-8 leading-relaxed text-black selection:bg-[#facc15] selection:text-black sm:px-8"
>
	<!-- Brutalist Hero Container -->
	<div class="border-brutal-thick shadow-brutal-lg mx-auto mb-12 max-w-5xl bg-white p-6 sm:p-12">
		<ThemeHeader theme="brutalist" {content} />

		<!-- Hero Cover -->
		{#if content.hero?.coverUrl}
			<div class="border-brutal-thick shadow-brutal mt-10 overflow-hidden">
				<img
					src={content.hero.coverUrl}
					alt={content.hero.headline}
					class="aspect-16/9 w-full object-cover"
				/>
			</div>
		{/if}

		{#if content.hero?.subheadline}
			<div
				class="border-brutal mt-6 bg-[#facc15]/30 p-4 text-center text-sm font-bold sm:text-base"
			>
				{content.hero.subheadline}
			</div>
		{/if}
	</div>

	<!-- Quote Card -->
	{#if content.opening?.quote}
		<div
			class="border-brutal shadow-brutal mx-auto mb-12 max-w-4xl bg-[#facc15] p-6 text-center sm:p-10"
		>
			<p class="font-syne text-base leading-snug font-bold text-black sm:text-xl">
				"{content.opening.quote}"
			</p>
			{#if content.opening.quoteSource}
				<p class="mt-4 font-mono text-xs font-bold tracking-wider uppercase opacity-80">
					— {content.opening.quoteSource}
				</p>
			{/if}
		</div>
	{/if}

	<!-- Couple Cards -->
	<div class="mx-auto mb-12 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
		<!-- Groom -->
		<div class="border-brutal-thick shadow-brutal space-y-4 bg-white p-6 sm:p-8">
			<div class="inline-block bg-black px-3 py-1 font-mono text-xs font-bold text-white uppercase">
				The Groom
			</div>
			{#if content.couple.partner1.photoUrl}
				<div class="border-brutal aspect-4/5 overflow-hidden">
					<img
						src={content.couple.partner1.photoUrl}
						alt={content.couple.partner1.name}
						class="h-full w-full object-cover"
					/>
				</div>
			{/if}
			<div>
				<h3 class="font-syne text-3xl font-black uppercase">
					{content.couple.partner1.fullName || content.couple.partner1.name}
				</h3>
				{#if content.couple.partner1.childOf}
					<p class="mt-2 text-xs font-medium opacity-80 sm:text-sm">
						{content.couple.partner1.childOf}
					</p>
				{/if}
			</div>
		</div>

		<!-- Bride -->
		<div class="border-brutal-thick shadow-brutal space-y-4 bg-white p-6 sm:p-8">
			<div
				class="border-brutal inline-block bg-[#facc15] px-3 py-1 font-mono text-xs font-bold text-black uppercase"
			>
				The Bride
			</div>
			{#if content.couple.partner2.photoUrl}
				<div class="border-brutal aspect-4/5 overflow-hidden">
					<img
						src={content.couple.partner2.photoUrl}
						alt={content.couple.partner2.name}
						class="h-full w-full object-cover"
					/>
				</div>
			{/if}
			<div>
				<h3 class="font-syne text-3xl font-black uppercase">
					{content.couple.partner2.fullName || content.couple.partner2.name}
				</h3>
				{#if content.couple.partner2.childOf}
					<p class="mt-2 text-xs font-medium opacity-80 sm:text-sm">
						{content.couple.partner2.childOf}
					</p>
				{/if}
			</div>
		</div>
	</div>

	<!-- Story -->
	{#if content.story?.body}
		<div class="border-brutal-thick shadow-brutal mx-auto mb-12 max-w-4xl bg-white p-6 sm:p-10">
			<span
				class="mb-4 inline-block bg-black px-3 py-1 font-mono text-xs font-bold text-white uppercase"
			>
				Story
			</span>
			<h2 class="font-syne mb-4 text-3xl font-black uppercase sm:text-4xl">
				{content.story.title || 'Our Story'}
			</h2>
			<p class="text-sm leading-relaxed font-medium whitespace-pre-wrap opacity-90 sm:text-base">
				{content.story.body}
			</p>
		</div>
	{/if}

	<!-- Events -->
	{#if content.events && content.events.length > 0}
		<div class="mx-auto mb-12 max-w-5xl">
			<div class="mb-8 text-center">
				<h2 class="font-syne text-4xl font-black uppercase sm:text-5xl">Rangkaian Acara</h2>
			</div>

			<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
				{#each content.events as event}
					<div class="border-brutal-thick shadow-brutal space-y-4 bg-white p-6 sm:p-8">
						<div
							class="border-brutal inline-block bg-[#facc15] px-3 py-1 font-mono text-xs font-bold uppercase"
						>
							{event.type}
						</div>
						<h3 class="font-syne text-2xl font-bold uppercase">{event.title}</h3>

						<div class="space-y-2 border-t-2 border-black pt-4 text-sm font-medium">
							<p class="flex items-center gap-2">
								<Calendar class="h-4 w-4" />
								<span>{event.date}</span>
							</p>
							<p class="flex items-center gap-2">
								<Clock class="h-4 w-4" />
								<span>{event.startTime} - {event.endTime} WIB</span>
							</p>
							<div class="flex items-start gap-2 pt-2">
								<MapPin class="mt-0.5 h-4 w-4 shrink-0" />
								<div>
									<p class="font-bold">{event.venue}</p>
									<p class="text-xs opacity-75">{event.address}</p>
								</div>
							</div>
						</div>

						{#if event.mapsUrl}
							<div class="pt-4">
								<a
									href={event.mapsUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="border-brutal shadow-brutal-sm inline-block bg-black px-5 py-2.5 font-mono text-xs font-bold text-white uppercase transition-all hover:bg-[#facc15] hover:text-black"
								>
									Google Maps →
								</a>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Countdown -->
	{#if content.countdown?.targetDate}
		<div
			class="border-brutal-thick shadow-brutal mx-auto mb-12 max-w-2xl bg-black p-8 text-center text-white"
		>
			<span class="mb-4 block font-mono text-xs font-bold tracking-widest text-[#facc15] uppercase">
				Waktu Menuju Hari H
			</span>
			<Countdown targetDate={content.countdown.targetDate} variant="brutalist" />
		</div>
	{/if}

	<!-- Gallery -->
	{#if content.gallery && content.gallery.length > 0}
		<div class="mx-auto mb-12 max-w-5xl">
			<div class="mb-8 text-center">
				<h2 class="font-syne text-4xl font-black uppercase sm:text-5xl">Foto Kenangan</h2>
			</div>

			<div class="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
				{#each content.gallery as item}
					<div class="border-brutal-thick shadow-brutal aspect-square overflow-hidden bg-white">
						<img src={item.url} alt="Gallery item" class="h-full w-full object-cover" />
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Interactive Section -->
	<div class="mx-auto max-w-4xl space-y-12">
		{#if content.rsvp?.enabled}
			<div class="border-brutal-thick shadow-brutal bg-white p-6 sm:p-10">
				<h2 class="font-syne mb-6 text-3xl font-black uppercase">Konfirmasi Kehadiran</h2>
				<div
					class="[&_button[type=submit]]:shadow-brutal-sm [&_button[type=submit]]:border-2 [&_button[type=submit]]:border-black [&_button[type=submit]]:bg-black [&_input]:border-2 [&_input]:border-black [&_textarea]:border-2 [&_textarea]:border-black"
				>
					<RSVPSection invitationId={invitation.id} settings={content.rsvp} theme="brutalist" />
				</div>
			</div>
		{/if}

		{#if content.gift?.enabled}
			<div class="border-brutal-thick shadow-brutal bg-[#facc15] p-6 sm:p-10">
				<h2 class="font-syne mb-6 text-3xl font-black text-black uppercase">Hadiah Pernikahan</h2>
				<div
					class="[&_button]:shadow-brutal-sm [&_button]:border-2 [&_button]:border-black [&_button]:bg-white [&_button]:text-black [&_div]:border-2 [&_div]:border-black"
				>
					<GiftSection gift={content.gift} theme="brutalist" />
				</div>
			</div>
		{/if}

		{#if content.guestbook?.enabled}
			<div class="border-brutal-thick shadow-brutal bg-white p-6 sm:p-10">
				<h2 class="font-syne mb-6 text-3xl font-black uppercase">Buku Ucapan & Doa</h2>
				<div
					class="[&_button[type=submit]]:border-2 [&_button[type=submit]]:border-black [&_button[type=submit]]:bg-black [&_form]:border-2 [&_form]:border-black [&_input]:border-2 [&_input]:border-black [&_textarea]:border-2 [&_textarea]:border-black"
				>
					<GuestbookSection
						invitationId={invitation.id}
						settings={content.guestbook}
						initialEntries={initialGuestbook}
						theme="brutalist"
					/>
				</div>
			</div>
		{/if}
	</div>

	<footer class="mt-16 text-center font-mono text-xs font-bold uppercase opacity-60">
		{content.couple.partner1.name} & {content.couple.partner2.name} — WE ARE MARRIED!
	</footer>
</article>
