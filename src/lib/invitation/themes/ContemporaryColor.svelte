<script lang="ts">
	import ThemeHeader from '$lib/invitation/ThemeHeader.svelte';
	import type { Invitation, GuestbookItem } from '$lib/types/invitation';
	import Countdown from '$lib/invitation/components/Countdown.svelte';
	import RSVPSection from '$lib/invitation/components/RSVPSection.svelte';
	import GuestbookSection from '$lib/invitation/components/GuestbookSection.svelte';
	import GiftSection from '$lib/invitation/components/GiftSection.svelte';
	import BotanicalDivider from '$lib/invitation/ornaments/BotanicalDivider.svelte';
	import MonogramFrame from '$lib/invitation/ornaments/MonogramFrame.svelte';
	import PaperTexture from '$lib/invitation/ornaments/PaperTexture.svelte';
	import { parallax } from '$lib/actions/parallax';
	import { scrollReveal } from '$lib/actions/scrollReveal';
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
	class="relative min-h-screen bg-[#faf3ee] font-sans-clean leading-relaxed text-[#1d2d44] overflow-x-hidden selection:bg-[#c85a32] selection:text-white"
>
	<!-- Warm Mediterranean Grain -->
	<PaperTexture opacity={0.035} />

	<!-- Top Contemporary Header -->
	<header class="relative z-10">
		<ThemeHeader theme="contemporary-color" {content} />
	</header>

	<!-- Monogram Badge -->
	<div class="relative z-10 flex justify-center -mt-6 mb-10">
		<MonogramFrame
			partner1={content.couple.partner1.name}
			partner2={content.couple.partner2.name}
			variant="arch"
			color="#c85a32"
			size={100}
		/>
	</div>

	<!-- Color Blocked Hero Cover with Layered Parallax -->
	{#if content.hero?.coverUrl}
		<section class="relative z-10 mx-auto mb-16 max-w-5xl px-6">
			<div class="relative">
				<!-- Parallax Floating Shape Behind -->
				<div
					use:parallax={{ speed: 0.1 }}
					class="pointer-events-none absolute -top-8 -right-6 h-40 w-40 rounded-full bg-[#c85a32]/15 blur-xl sm:h-64 sm:w-64"
				></div>

				<div class="relative rounded-3xl bg-[#c85a32] p-3 shadow-xl sm:p-5">
					<div class="aspect-16/9 overflow-hidden rounded-2xl bg-neutral-100">
						<img
							src={content.hero.coverUrl}
							alt={content.hero.headline}
							class="h-full w-full object-cover"
							loading="eager"
						/>
					</div>
					{#if content.hero.subheadline}
						<div class="py-4 text-center text-sm font-medium text-white sm:text-base">
							"{content.hero.subheadline}"
						</div>
					{/if}
				</div>
			</div>
		</section>
	{/if}

	<BotanicalDivider variant="modern" color="#c85a32" />

	<!-- Quote Section -->
	{#if content.opening?.quote}
		<section class="relative z-10 mx-auto max-w-3xl px-6 py-10 sm:py-16 text-center">
			<div use:scrollReveal class="mb-4 inline-flex items-center justify-center gap-1 text-[#c85a32]">
				<Sparkles class="h-4 w-4" />
			</div>
			<blockquote
				use:scrollReveal={{ variant: 'blur-in', duration: 900 }}
				class="font-syne text-lg sm:text-2xl leading-relaxed font-medium text-[#0d1b2a] italic max-w-2xl mx-auto"
			>
				"{content.opening.quote}"
			</blockquote>
			{#if content.opening.quoteSource}
				<cite
					use:scrollReveal={{ delay: 150 }}
					class="mt-4 block font-mono text-xs font-bold tracking-widest text-[#c85a32] uppercase not-italic"
				>
					— {content.opening.quoteSource}
				</cite>
			{/if}
		</section>
		<BotanicalDivider variant="minimal" color="#c85a32" />
	{/if}

	<!-- Couple Section: Modern Terracotta Arch Profiles -->
	<section class="relative z-10 mx-auto max-w-5xl px-6 py-12 sm:py-20">
		<div use:scrollReveal class="mb-14 text-center">
			<span class="mb-2 block text-xs font-bold tracking-widest text-[#c85a32] uppercase">
				THE CELEBRATION
			</span>
			<h2 class="font-syne text-4xl sm:text-5xl font-bold text-[#0d1b2a]">Mempelai</h2>
		</div>

		<div class="grid grid-cols-1 gap-12 sm:gap-16 md:grid-cols-2 max-w-4xl mx-auto">
			<!-- Groom -->
			<div
				class="space-y-4 rounded-3xl border border-[#c85a32]/20 bg-white p-8 text-center shadow-sm transition-all hover:shadow-md"
			>
				{#if content.couple.partner1.photoUrl}
					<div class="mx-auto h-64 w-52 overflow-hidden rounded-t-[100px] rounded-b-2xl bg-neutral-100 shadow-md">
						<img
							use:parallax={{ speed: 0.02, scale: 1.08 }}
							src={content.couple.partner1.photoUrl}
							alt={content.couple.partner1.name}
							class="h-full w-full object-cover"
							loading="lazy"
						/>
					</div>
				{/if}
				<div use:scrollReveal={{ delay: 100 }}>
					<span class="text-[10px] font-bold tracking-widest text-[#c85a32] uppercase block mb-1">
						THE GROOM
					</span>
					<h3 class="font-syne text-3xl font-bold text-[#0d1b2a]">
						{content.couple.partner1.fullName || content.couple.partner1.name}
					</h3>
					{#if content.couple.partner1.childOf}
						<p class="mx-auto mt-2 max-w-xs text-xs sm:text-sm text-[#415a77]">
							{content.couple.partner1.childOf}
						</p>
					{/if}
				</div>
			</div>

			<!-- Bride -->
			<div
				class="space-y-4 rounded-3xl border border-[#c85a32]/20 bg-white p-8 text-center shadow-sm transition-all hover:shadow-md"
			>
				{#if content.couple.partner2.photoUrl}
					<div class="mx-auto h-64 w-52 overflow-hidden rounded-t-[100px] rounded-b-2xl bg-neutral-100 shadow-md">
						<img
							use:parallax={{ speed: 0.02, scale: 1.08 }}
							src={content.couple.partner2.photoUrl}
							alt={content.couple.partner2.name}
							class="h-full w-full object-cover"
							loading="lazy"
						/>
					</div>
				{/if}
				<div use:scrollReveal={{ delay: 100 }}>
					<span class="text-[10px] font-bold tracking-widest text-[#c85a32] uppercase block mb-1">
						THE BRIDE
					</span>
					<h3 class="font-syne text-3xl font-bold text-[#0d1b2a]">
						{content.couple.partner2.fullName || content.couple.partner2.name}
					</h3>
					{#if content.couple.partner2.childOf}
						<p class="mx-auto mt-2 max-w-xs text-xs sm:text-sm text-[#415a77]">
							{content.couple.partner2.childOf}
						</p>
					{/if}
				</div>
			</div>
		</div>
	</section>

	<!-- Story -->
	{#if content.story?.body}
		<section class="relative z-10 border-y border-[#c85a32]/15 bg-[#f0e6dd]/80 px-6 py-14 sm:py-20 backdrop-blur-xs">
			<div use:scrollReveal class="mx-auto max-w-3xl space-y-4 text-center">
				<span class="block text-xs font-bold tracking-widest text-[#c85a32] uppercase">
					JOURNEY
				</span>
				<h2 class="font-syne text-3xl sm:text-4xl font-bold text-[#0d1b2a]">
					{content.story.title || 'How We Met'}
				</h2>
				<p class="text-sm sm:text-base leading-relaxed whitespace-pre-wrap text-[#1d2d44]/80 max-w-2xl mx-auto">
					{content.story.body}
				</p>
			</div>
		</section>
	{/if}

	<!-- Events -->
	{#if content.events && content.events.length > 0}
		<section class="relative z-10 mx-auto max-w-5xl px-6 py-14 sm:py-24">
			<div use:scrollReveal class="mb-14 text-center">
				<span class="mb-2 block text-xs font-bold tracking-widest text-[#c85a32] uppercase">
					SCHEDULE
				</span>
				<h2 class="font-syne text-3xl sm:text-5xl font-bold text-[#0d1b2a]">Rangkaian Acara</h2>
			</div>

			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
				{#each content.events as event}
					<div
						use:scrollReveal={{ delay: 100 }}
						class="space-y-4 rounded-3xl border border-[#c85a32]/20 bg-white p-8 text-center shadow-sm transition-all hover:shadow-md"
					>
						<span class="inline-block rounded-full bg-[#c85a32]/10 px-3 py-1 font-mono text-[10px] font-bold text-[#c85a32] uppercase">
							{event.type}
						</span>
						<h3 class="font-syne text-2xl font-bold text-[#0d1b2a]">{event.title}</h3>
						<div class="mx-auto h-0.5 w-8 bg-[#c85a32]/30"></div>

						<div class="space-y-2 text-xs sm:text-sm text-[#415a77]">
							<div class="flex items-center justify-center gap-2">
								<Calendar class="h-4 w-4 text-[#c85a32]" />
								<span class="font-medium text-[#0d1b2a]">{event.date}</span>
							</div>
							<div class="flex items-center justify-center gap-2">
								<Clock class="h-4 w-4 text-[#c85a32]" />
								<span>{event.startTime} - {event.endTime} WIB</span>
							</div>
							<div class="flex items-start justify-center gap-2 pt-2">
								<MapPin class="mt-0.5 h-4 w-4 shrink-0 text-[#c85a32]" />
								<div>
									<p class="font-medium text-[#0d1b2a]">{event.venue}</p>
									<p class="mt-0.5 text-xs text-[#778da9]">{event.address}</p>
								</div>
							</div>
						</div>

						{#if event.mapsUrl}
							<div class="pt-4">
								<a
									href={event.mapsUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center gap-2 rounded-full bg-[#c85a32] px-6 py-2.5 text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#b04b25]"
								>
									<span>Google Maps</span>
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
		<section class="relative z-10 bg-[#c85a32] px-6 py-14 text-center text-white sm:py-20 shadow-inner">
			<div use:scrollReveal class="mx-auto max-w-2xl space-y-6">
				<span class="block font-mono text-xs font-bold tracking-widest uppercase text-white/80">
					COUNTING DOWN
				</span>
				<Countdown targetDate={content.countdown.targetDate} variant="contemporary" />
			</div>
		</section>
	{/if}

	<!-- Gallery -->
	{#if content.gallery && content.gallery.length > 0}
		<section class="relative z-10 mx-auto max-w-6xl px-6 py-14 sm:py-24">
			<div use:scrollReveal class="mb-14 text-center">
				<span class="mb-2 block text-xs font-bold tracking-widest text-[#c85a32] uppercase">
					GALLERY
				</span>
				<h2 class="font-syne text-3xl sm:text-5xl font-bold text-[#0d1b2a]">Galeri Momen</h2>
			</div>

			<div class="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
				{#each content.gallery as item}
					<div
						class="aspect-3/4 overflow-hidden rounded-3xl border-2 border-[#c85a32]/20 bg-white p-1.5 shadow-sm"
					>
						<div class="h-full w-full overflow-hidden rounded-2xl">
							<img
								src={item.url}
								alt="Gallery item"
								class="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
								loading="lazy"
							/>
						</div>
					</div>
				{/each}
			</div>
		</section>
	{/if}

	<!-- Interactive Section -->
	<section class="relative z-10 border-t border-[#c85a32]/15 bg-[#f0e6dd]/60 px-6 py-14 sm:py-24">
		<div class="mx-auto max-w-3xl space-y-16">
			{#if content.rsvp?.enabled}
				<div>
					<div use:scrollReveal class="mb-10 text-center">
						<span class="mb-2 block text-xs font-bold tracking-widest text-[#c85a32] uppercase">
							RSVP
						</span>
						<h2 class="font-syne text-3xl sm:text-4xl font-bold text-[#0d1b2a]">
							Konfirmasi Kehadiran
						</h2>
					</div>
					<div class="[&_button[type=submit]]:rounded-full [&_button[type=submit]]:bg-[#c85a32] [&_button[type=submit]]:hover:bg-[#b04b25]">
						<RSVPSection invitationId={invitation.id} settings={content.rsvp} theme="contemporary" />
					</div>
				</div>
			{/if}

			{#if content.gift?.enabled}
				<div class="border-t border-[#c85a32]/15 pt-8">
					<div use:scrollReveal class="mb-10 text-center">
						<span class="mb-2 block text-xs font-bold tracking-widest text-[#c85a32] uppercase">
							WEDDING GIFT
						</span>
						<h2 class="font-syne text-3xl sm:text-4xl font-bold text-[#0d1b2a]">Tanda Kasih</h2>
					</div>
					<div class="[&_button]:rounded-full [&_button]:bg-[#c85a32] [&_button]:text-white [&_button]:border-none [&_button]:hover:bg-[#b04b25]">
						<GiftSection gift={content.gift} theme="contemporary" />
					</div>
				</div>
			{/if}

			{#if content.guestbook?.enabled}
				<div class="border-t border-[#c85a32]/15 pt-8">
					<div use:scrollReveal class="mb-10 text-center">
						<span class="mb-2 block text-xs font-bold tracking-widest text-[#c85a32] uppercase">
							MESSAGES
						</span>
						<h2 class="font-syne text-3xl sm:text-4xl font-bold text-[#0d1b2a]">Doa & Ucapan</h2>
					</div>
					<GuestbookSection
						invitationId={invitation.id}
						settings={content.guestbook}
						initialEntries={initialGuestbook}
						theme="contemporary"
					/>
				</div>
			{/if}
		</div>
	</section>

	<!-- Footer -->
	<footer class="relative z-10 border-t border-[#c85a32]/15 px-6 py-12 text-center text-xs text-[#415a77]">
		<p class="font-syne mb-2 text-xl font-bold text-[#0d1b2a]">
			{content.couple.partner1.name} & {content.couple.partner2.name}
		</p>
		<p>Thank you for celebrating this wonderful chapter with us.</p>
	</footer>
</article>
