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
	import { ExternalLink } from '@lucide/svelte';

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
	class="relative min-h-screen bg-[#fafaf9] font-grotesk leading-relaxed text-[#171717] overflow-x-hidden selection:bg-black selection:text-white"
>
	<!-- Tactile Matte Paper Grain -->
	<PaperTexture opacity={0.025} />

	<!-- Top Clean Minimalist Header -->
	<header class="relative z-10">
		<ThemeHeader theme="minimal" {content} />
	</header>

	<!-- Monogram Badge -->
	<div class="relative z-10 flex justify-center -mt-6 mb-12">
		<MonogramFrame
			partner1={content.couple.partner1.name}
			partner2={content.couple.partner2.name}
			variant="arch"
			color="#171717"
			size={90}
		/>
	</div>

	<!-- Cover Photo: Architectural Hairline Frame -->
	{#if content.hero?.coverUrl}
		<section class="relative z-10 mx-auto my-8 max-w-5xl px-6">
			<div class="overflow-hidden border border-neutral-200 bg-neutral-100 p-2 sm:p-3">
				<div class="aspect-16/9 overflow-hidden bg-neutral-200">
					<img
						src={content.hero.coverUrl}
						alt={content.hero.headline}
						class="h-full w-full object-cover"
						loading="eager"
					/>
				</div>
			</div>
			{#if content.hero.subheadline}
				<p class="mt-6 text-center text-xs sm:text-sm font-light tracking-wide text-neutral-500 max-w-md mx-auto">
					{content.hero.subheadline}
				</p>
			{/if}
		</section>
	{/if}

	<!-- Opening Quote -->
	{#if content.opening?.quote}
		<section class="relative z-10 mx-auto max-w-3xl px-6 py-12 sm:py-20 text-center">
			<span class="mb-4 block font-mono text-[10px] tracking-[0.3em] text-neutral-400 uppercase">
				PREMISE
			</span>
			<blockquote class="text-xl sm:text-3xl font-light leading-snug tracking-tight text-neutral-900 max-w-2xl mx-auto">
				"{content.opening.quote}"
			</blockquote>
			{#if content.opening.quoteSource}
				<cite class="mt-4 block font-mono text-xs tracking-widest text-neutral-400 uppercase not-italic">
					— {content.opening.quoteSource}
				</cite>
			{/if}
		</section>
		<BotanicalDivider variant="minimal" color="#171717" />
	{/if}

	<!-- Couple Section: Asymmetric Swiss Column Grid -->
	<section class="relative z-10 mx-auto max-w-5xl border-b border-neutral-200 px-6 py-16 sm:py-24">
		<div class="mb-14">
			<span class="font-mono text-xs tracking-widest text-neutral-400 uppercase block mb-2">
				01 / THE UNION
			</span>
			<h2 class="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900">Mempelai</h2>
		</div>

		<div class="grid grid-cols-1 gap-12 sm:gap-16 md:grid-cols-2">
			<!-- Groom -->
			<div class="space-y-4">
				{#if content.couple.partner1.photoUrl}
					<div class="aspect-4/5 overflow-hidden border border-neutral-200 bg-neutral-100 p-2">
						<img
							use:parallax={{ speed: 0.02, scale: 1.05 }}
							src={content.couple.partner1.photoUrl}
							alt={content.couple.partner1.name}
							class="h-full w-full object-cover contrast-105"
							loading="lazy"
						/>
					</div>
				{/if}
				<div>
					<span class="font-mono text-[10px] tracking-widest text-neutral-400 uppercase block mb-1">
						GROOM
					</span>
					<h3 class="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
						{content.couple.partner1.fullName || content.couple.partner1.name}
					</h3>
					{#if content.couple.partner1.childOf}
						<p class="mt-2 text-xs font-light text-neutral-500 sm:text-sm">
							{content.couple.partner1.childOf}
						</p>
					{/if}
				</div>
			</div>

			<!-- Bride -->
			<div class="space-y-4">
				{#if content.couple.partner2.photoUrl}
					<div class="aspect-4/5 overflow-hidden border border-neutral-200 bg-neutral-100 p-2">
						<img
							use:parallax={{ speed: 0.02, scale: 1.05 }}
							src={content.couple.partner2.photoUrl}
							alt={content.couple.partner2.name}
							class="h-full w-full object-cover contrast-105"
							loading="lazy"
						/>
					</div>
				{/if}
				<div>
					<span class="font-mono text-[10px] tracking-widest text-neutral-400 uppercase block mb-1">
						BRIDE
					</span>
					<h3 class="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
						{content.couple.partner2.fullName || content.couple.partner2.name}
					</h3>
					{#if content.couple.partner2.childOf}
						<p class="mt-2 text-xs font-light text-neutral-500 sm:text-sm">
							{content.couple.partner2.childOf}
						</p>
					{/if}
				</div>
			</div>
		</div>
	</section>

	<!-- Story -->
	{#if content.story?.body}
		<section class="relative z-10 mx-auto max-w-4xl border-b border-neutral-200 px-6 py-16 sm:py-24">
			<span class="font-mono text-xs tracking-widest text-neutral-400 uppercase block mb-2">
				02 / PERSPECTIVE
			</span>
			<h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mb-6">
				{content.story.title || 'Our Story'}
			</h2>
			<p class="text-sm sm:text-base leading-relaxed font-light whitespace-pre-wrap text-neutral-600 max-w-2xl">
				{content.story.body}
			</p>
		</section>
	{/if}

	<!-- Events: Architectural Timetable -->
	{#if content.events && content.events.length > 0}
		<section class="relative z-10 mx-auto max-w-4xl border-b border-neutral-200 px-6 py-16 sm:py-24">
			<span class="font-mono text-xs tracking-widest text-neutral-400 uppercase block mb-2">
				03 / SCHEDULE
			</span>
			<h2 class="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 mb-12">
				Rangkaian Acara
			</h2>

			<div class="divide-y divide-neutral-200">
				{#each content.events as event}
					<div class="flex flex-col justify-between gap-6 py-8 md:flex-row md:items-start">
						<div>
							<span class="font-mono text-[10px] tracking-widest text-neutral-400 uppercase block mb-1">
								{event.type.toUpperCase()}
							</span>
							<h3 class="text-2xl font-bold tracking-tight text-neutral-900">{event.title}</h3>
							<p class="mt-2 text-sm font-medium text-neutral-900">{event.venue}</p>
							<p class="mt-1 max-w-md text-xs text-neutral-500">{event.address}</p>
						</div>
						<div class="space-y-2 text-left md:text-right">
							<p class="font-mono text-sm font-medium text-neutral-900">{event.date}</p>
							<p class="font-mono text-xs text-neutral-500">
								{event.startTime} - {event.endTime} WIB
							</p>
							{#if event.mapsUrl}
								<div class="pt-2">
									<a
										href={event.mapsUrl}
										target="_blank"
										rel="noopener noreferrer"
										class="inline-flex items-center gap-1.5 text-xs font-semibold underline underline-offset-4 hover:text-neutral-500 transition-colors"
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
		<section class="relative z-10 mx-auto max-w-2xl border-b border-neutral-200 px-6 py-16 text-center">
			<span class="mb-6 block font-mono text-xs tracking-widest text-neutral-400 uppercase">
				COUNTDOWN
			</span>
			<Countdown targetDate={content.countdown.targetDate} variant="minimal" />
		</section>
	{/if}

	<!-- Gallery -->
	{#if content.gallery && content.gallery.length > 0}
		<section class="relative z-10 mx-auto max-w-6xl border-b border-neutral-200 px-6 py-16 sm:py-24">
			<span class="font-mono text-xs tracking-widest text-neutral-400 uppercase block mb-2">
				04 / VISUAL ARCHIVE
			</span>
			<h2 class="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 mb-10">Galeri Foto</h2>
			<div class="grid grid-cols-2 gap-4 md:grid-cols-4">
				{#each content.gallery as item}
					<div class="aspect-square overflow-hidden border border-neutral-200 bg-neutral-100 p-1">
						<img src={item.url} alt="Gallery" class="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
					</div>
				{/each}
			</div>
		</section>
	{/if}

	<!-- Interactive Section -->
	<section class="relative z-10 mx-auto max-w-3xl px-6 py-16 sm:py-24">
		<div class="space-y-16">
			{#if content.rsvp?.enabled}
				<div>
					<span class="font-mono text-xs tracking-widest text-neutral-400 uppercase block mb-2 text-center">
						05 / ATTENDANCE
					</span>
					<h2 class="text-3xl font-bold tracking-tight text-neutral-900 text-center mb-10">
						Konfirmasi Kehadiran
					</h2>
					<div class="[&_button[type=submit]]:rounded-none [&_button[type=submit]]:bg-black [&_button[type=submit]]:hover:bg-neutral-800">
						<RSVPSection invitationId={invitation.id} settings={content.rsvp} theme="minimal" />
					</div>
				</div>
			{/if}

			{#if content.gift?.enabled}
				<div class="border-t border-neutral-200 pt-10">
					<span class="font-mono text-xs tracking-widest text-neutral-400 uppercase block mb-2 text-center">
						06 / GIFT
					</span>
					<h2 class="text-3xl font-bold tracking-tight text-neutral-900 text-center mb-10">
						Tanda Kasih
					</h2>
					<GiftSection gift={content.gift} theme="minimal" />
				</div>
			{/if}

			{#if content.guestbook?.enabled}
				<div class="border-t border-neutral-200 pt-10">
					<span class="font-mono text-xs tracking-widest text-neutral-400 uppercase block mb-2 text-center">
						07 / MESSAGES
					</span>
					<h2 class="text-3xl font-bold tracking-tight text-neutral-900 text-center mb-10">
						Doa & Ucapan
					</h2>
					<GuestbookSection
						invitationId={invitation.id}
						settings={content.guestbook}
						initialEntries={initialGuestbook}
						theme="minimal"
					/>
				</div>
			{/if}
		</div>
	</section>

	<!-- Footer -->
	<footer class="relative z-10 border-t border-neutral-200 px-6 py-12 text-center text-xs text-neutral-500 font-mono">
		<p class="text-sm font-bold text-neutral-900 mb-1 uppercase">
			{content.couple.partner1.name} + {content.couple.partner2.name}
		</p>
		<p>THANK YOU FOR YOUR PRESENCE & WISHES</p>
	</footer>
</article>
