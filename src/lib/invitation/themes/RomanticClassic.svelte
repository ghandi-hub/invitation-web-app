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
		initialGuestbook = []
	}: {
		invitation: Invitation;
		initialGuestbook?: GuestbookItem[];
	} = $props();

	const { content } = $derived(invitation);
</script>

<article
	class="font-sans-clean min-h-screen bg-[#faf6f5] leading-relaxed text-[#3d2c2e] selection:bg-[#a87474] selection:text-white"
>
	<!-- Romantic Classic Header -->
	<ThemeHeader theme="romantic-classic" {content} />

	<!-- Cover Image with romantic oval frame -->
	{#if content.hero?.coverUrl}
		<section class="mx-auto my-12 max-w-4xl px-6 text-center sm:my-16">
			<div
				class="relative mx-auto aspect-4/3 w-full max-w-2xl overflow-hidden rounded-full border-4 border-[#a87474]/30 bg-white p-2 shadow-xl"
			>
				<img
					src={content.hero.coverUrl}
					alt={content.hero.headline}
					class="h-full w-full rounded-full object-cover"
				/>
			</div>
			{#if content.hero.subheadline}
				<p class="font-cormorant mx-auto mt-6 max-w-lg text-sm text-[#7a5555] italic sm:text-base">
					"{content.hero.subheadline}"
				</p>
			{/if}
		</section>
	{/if}

	<!-- Quote -->
	{#if content.opening?.quote}
		<section class="mx-auto max-w-2xl px-6 py-12 text-center sm:py-16">
			<Heart class="mx-auto mb-4 h-5 w-5 fill-current text-[#a87474]" />
			<blockquote class="font-cormorant text-base leading-relaxed text-[#4a3638] italic sm:text-lg">
				"{content.opening.quote}"
			</blockquote>
			{#if content.opening.quoteSource}
				<cite
					class="mt-4 block font-sans text-xs font-semibold tracking-widest text-[#a87474] uppercase not-italic"
				>
					— {content.opening.quoteSource}
				</cite>
			{/if}
		</section>
	{/if}

	<!-- The Couple -->
	<section class="mx-auto max-w-5xl px-6 py-16 sm:py-24">
		<div class="mb-16 text-center">
			<span class="font-script mb-1 block text-2xl text-[#a87474] sm:text-3xl">
				With Joyful Hearts
			</span>
			<h2 class="font-cormorant text-3xl text-[#2a1e20] sm:text-5xl">Mempelai</h2>
		</div>

		<div class="grid grid-cols-1 items-start gap-12 sm:gap-16 md:grid-cols-2">
			<div class="space-y-4 text-center">
				{#if content.couple.partner1.photoUrl}
					<div
						class="mx-auto h-64 w-48 overflow-hidden rounded-t-full border-2 border-[#a87474]/30 bg-white p-1.5 shadow-md"
					>
						<img
							src={content.couple.partner1.photoUrl}
							alt={content.couple.partner1.name}
							class="h-full w-full rounded-t-full object-cover"
						/>
					</div>
				{/if}
				<h3 class="font-cormorant text-2xl font-medium text-[#2a1e20] sm:text-3xl">
					{content.couple.partner1.fullName || content.couple.partner1.name}
				</h3>
				{#if content.couple.partner1.childOf}
					<p class="mx-auto max-w-xs text-xs text-[#7a5555] sm:text-sm">
						{content.couple.partner1.childOf}
					</p>
				{/if}
			</div>

			<div class="space-y-4 text-center">
				{#if content.couple.partner2.photoUrl}
					<div
						class="mx-auto h-64 w-48 overflow-hidden rounded-t-full border-2 border-[#a87474]/30 bg-white p-1.5 shadow-md"
					>
						<img
							src={content.couple.partner2.photoUrl}
							alt={content.couple.partner2.name}
							class="h-full w-full rounded-t-full object-cover"
						/>
					</div>
				{/if}
				<h3 class="font-cormorant text-2xl font-medium text-[#2a1e20] sm:text-3xl">
					{content.couple.partner2.fullName || content.couple.partner2.name}
				</h3>
				{#if content.couple.partner2.childOf}
					<p class="mx-auto max-w-xs text-xs text-[#7a5555] sm:text-sm">
						{content.couple.partner2.childOf}
					</p>
				{/if}
			</div>
		</div>
	</section>

	<!-- Story -->
	{#if content.story?.body}
		<section class="border-y border-[#a87474]/20 bg-[#f3eae8] px-6 py-16 sm:py-20">
			<div class="mx-auto max-w-2xl space-y-4 text-center">
				<span class="font-script block text-2xl text-[#a87474]">How It Began</span>
				<h2 class="font-cormorant text-3xl text-[#2a1e20] sm:text-4xl">
					{content.story.title || 'Our Love Story'}
				</h2>
				<p
					class="font-cormorant text-lg text-sm leading-relaxed whitespace-pre-wrap text-[#553b3d] sm:text-base"
				>
					{content.story.body}
				</p>
			</div>
		</section>
	{/if}

	<!-- Events -->
	{#if content.events && content.events.length > 0}
		<section class="mx-auto max-w-5xl px-6 py-16 sm:py-24">
			<div class="mb-16 text-center">
				<span class="font-script mb-1 block text-2xl text-[#a87474]">Save The Date</span>
				<h2 class="font-cormorant text-3xl text-[#2a1e20] sm:text-5xl">Rangkaian Acara</h2>
			</div>

			<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
				{#each content.events as event}
					<div
						class="space-y-4 rounded-lg border border-[#a87474]/20 bg-white/90 p-8 text-center shadow-sm"
					>
						<h3 class="font-cormorant text-2xl font-medium text-[#2a1e20]">{event.title}</h3>
						<div class="space-y-2 text-xs text-[#7a5555] sm:text-sm">
							<div class="flex items-center justify-center gap-2">
								<Calendar class="h-4 w-4 text-[#a87474]" />
								<span>{event.date}</span>
							</div>
							<div class="flex items-center justify-center gap-2">
								<Clock class="h-4 w-4 text-[#a87474]" />
								<span>{event.startTime} - {event.endTime} WIB</span>
							</div>
							<div class="flex items-start justify-center gap-2 pt-2">
								<MapPin class="mt-0.5 h-4 w-4 shrink-0 text-[#a87474]" />
								<div>
									<p class="font-semibold text-[#2a1e20]">{event.venue}</p>
									<p class="mt-0.5 text-xs text-[#7a5555]">{event.address}</p>
								</div>
							</div>
						</div>
						{#if event.mapsUrl}
							<div class="pt-2">
								<a
									href={event.mapsUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center gap-1.5 rounded-full border border-[#a87474] px-5 py-2 text-xs font-semibold tracking-wider text-[#a87474] uppercase transition-colors hover:bg-[#a87474] hover:text-white"
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

	<!-- Countdown -->
	{#if content.countdown?.targetDate}
		<section class="bg-[#442f2f] px-6 py-14 text-center text-white sm:py-20">
			<div class="mx-auto max-w-2xl space-y-6">
				<span class="font-script block text-2xl text-[#f3cfc6]">Counting The Days</span>
				<Countdown targetDate={content.countdown.targetDate} variant="romantic" />
			</div>
		</section>
	{/if}

	<!-- Gallery -->
	{#if content.gallery && content.gallery.length > 0}
		<section class="mx-auto max-w-6xl px-6 py-16 sm:py-24">
			<div class="mb-16 text-center">
				<span class="font-script mb-1 block text-2xl text-[#a87474]">Our Romance</span>
				<h2 class="font-cormorant text-3xl text-[#2a1e20] sm:text-5xl">Galeri Foto</h2>
			</div>

			<div class="grid grid-cols-2 gap-4 md:grid-cols-4">
				{#each content.gallery as item}
					<div
						class="aspect-3/4 overflow-hidden rounded-lg border border-[#a87474]/20 bg-stone-100 shadow-sm"
					>
						<img src={item.url} alt="Gallery item" class="h-full w-full object-cover" />
					</div>
				{/each}
			</div>
		</section>
	{/if}

	<!-- Interactive Section -->
	<section class="border-t border-[#a87474]/20 bg-[#f3eae8] px-6 py-16 sm:py-24">
		<div class="mx-auto max-w-3xl space-y-16">
			{#if content.rsvp?.enabled}
				<div>
					<div class="mb-10 text-center">
						<span class="font-script mb-1 block text-2xl text-[#a87474]">RSVP</span>
						<h2 class="font-cormorant text-3xl text-[#2a1e20]">Konfirmasi Kehadiran</h2>
					</div>
					<div class="[&_button[type=submit]]:rounded-full [&_button[type=submit]]:bg-[#a87474]">
						<RSVPSection invitationId={invitation.id} settings={content.rsvp} theme="romantic" />
					</div>
				</div>
			{/if}

			{#if content.gift?.enabled}
				<div class="border-t border-[#a87474]/20 pt-8">
					<div class="mb-10 text-center">
						<span class="font-script mb-1 block text-2xl text-[#a87474]">Wedding Gift</span>
						<h2 class="font-cormorant text-3xl text-[#2a1e20]">Kirim Hadiah</h2>
					</div>
					<GiftSection gift={content.gift} theme="romantic" />
				</div>
			{/if}

			{#if content.guestbook?.enabled}
				<div class="border-t border-[#a87474]/20 pt-8">
					<div class="mb-10 text-center">
						<span class="font-script mb-1 block text-2xl text-[#a87474]">Wishes</span>
						<h2 class="font-cormorant text-3xl text-[#2a1e20]">Doa & Ucapan</h2>
					</div>
					<div class="[&_button[type=submit]]:rounded-full [&_button[type=submit]]:bg-[#a87474]">
						<GuestbookSection
							invitationId={invitation.id}
							settings={content.guestbook}
							initialEntries={initialGuestbook}
							theme="romantic"
						/>
					</div>
				</div>
			{/if}
		</div>
	</section>

	<footer class="border-t border-[#a87474]/20 px-6 py-12 text-center text-xs text-[#a87474]">
		<p class="font-cormorant mb-2 text-xl text-[#2a1e20]">
			{content.couple.partner1.name} & {content.couple.partner2.name}
		</p>
		<p>Semoga kasih sayang senantiasa mengikat kita selamanya</p>
	</footer>
</article>
