<script lang="ts">
	import ThemeHeader from '$lib/invitation/ThemeHeader.svelte';
	import type { Invitation, GuestbookItem } from '$lib/types/invitation';
	import Countdown from '$lib/invitation/components/Countdown.svelte';
	import RSVPSection from '$lib/invitation/components/RSVPSection.svelte';
	import GuestbookSection from '$lib/invitation/components/GuestbookSection.svelte';
	import GiftSection from '$lib/invitation/components/GiftSection.svelte';
	import MonogramFrame from '$lib/invitation/ornaments/MonogramFrame.svelte';
	import PaperTexture from '$lib/invitation/ornaments/PaperTexture.svelte';
	import { parallax } from '$lib/actions/parallax';
	import { scrollReveal } from '$lib/actions/scrollReveal';
	import { Calendar, Clock, MapPin, ExternalLink, Zap } from '@lucide/svelte';

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
	class="relative min-h-screen bg-[#fffdf5] px-4 py-8 font-grotesk leading-relaxed text-black overflow-x-hidden selection:bg-[#facc15] selection:text-black sm:px-8"
>
	<!-- Tactile Grain -->
	<PaperTexture opacity={0.035} />

	<!-- Brutalist Hero Container -->
	<div class="relative z-10 mx-auto mb-12 max-w-5xl border-brutal-thick bg-white p-6 shadow-brutal-lg sm:p-12">
		<!-- Header -->
		<ThemeHeader theme="brutalist" {content} />

		<!-- Monogram Block -->
		<div class="flex justify-center my-6">
			<div class="border-brutal bg-[#facc15] p-2 shadow-brutal -rotate-1">
				<MonogramFrame
					partner1={content.couple.partner1.name}
					partner2={content.couple.partner2.name}
					variant="modern"
					color="#000000"
					size={84}
				/>
			</div>
		</div>

		<!-- Hero Cover -->
		{#if content.hero?.coverUrl}
			<div class="border-brutal-thick shadow-brutal mt-6 overflow-hidden bg-black p-1">
				<img
					src={content.hero.coverUrl}
					alt={content.hero.headline}
					class="aspect-16/9 w-full object-cover"
					loading="eager"
				/>
			</div>
		{/if}

		{#if content.hero?.subheadline}
			<div
				class="border-brutal shadow-brutal-sm mt-6 bg-[#facc15] p-4 text-center text-sm sm:text-base font-bold"
			>
				"{content.hero.subheadline}"
			</div>
		{/if}
	</div>

	<!-- Quote Card -->
	{#if content.opening?.quote}
		<div
			use:scrollReveal={{ variant: 'fade-up', duration: 800 }}
			class="relative z-10 border-brutal-thick shadow-brutal mx-auto mb-12 max-w-4xl bg-[#facc15] p-6 text-center sm:p-10 -rotate-0.5"
		>
			<p class="font-syne text-lg sm:text-2xl leading-snug font-bold text-black">
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
	<div class="relative z-10 mx-auto mb-12 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
		<!-- Groom -->
		<div use:scrollReveal={{ delay: 100 }} class="border-brutal-thick shadow-brutal space-y-4 bg-white p-6 sm:p-8">
			<div class="border-brutal inline-block bg-black px-3 py-1 font-mono text-xs font-bold text-white uppercase shadow-brutal-sm">
				MEMPELAI PRIA
			</div>
			{#if content.couple.partner1.photoUrl}
				<div class="border-brutal aspect-4/5 overflow-hidden bg-neutral-100">
					<img
						use:parallax={{ speed: 0.02, scale: 1.08 }}
						src={content.couple.partner1.photoUrl}
						alt={content.couple.partner1.name}
						class="h-full w-full object-cover"
						loading="lazy"
					/>
				</div>
			{/if}
			<div>
				<h3 class="font-syne text-3xl font-black uppercase tracking-tight">
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
		<div use:scrollReveal={{ delay: 200 }} class="border-brutal-thick shadow-brutal space-y-4 bg-white p-6 sm:p-8">
			<div
				class="border-brutal inline-block bg-[#facc15] px-3 py-1 font-mono text-xs font-bold text-black uppercase shadow-brutal-sm"
			>
				MEMPELAI WANITA
			</div>
			{#if content.couple.partner2.photoUrl}
				<div class="border-brutal aspect-4/5 overflow-hidden bg-neutral-100">
					<img
						use:parallax={{ speed: 0.02, scale: 1.08 }}
						src={content.couple.partner2.photoUrl}
						alt={content.couple.partner2.name}
						class="h-full w-full object-cover"
						loading="lazy"
					/>
				</div>
			{/if}
			<div>
				<h3 class="font-syne text-3xl font-black uppercase tracking-tight">
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
		<div use:scrollReveal class="relative z-10 border-brutal-thick shadow-brutal mx-auto mb-12 max-w-4xl bg-white p-6 sm:p-10">
			<span
				class="border-brutal mb-4 inline-block bg-black px-3 py-1 font-mono text-xs font-bold text-white uppercase shadow-brutal-sm"
			>
				KISAH KAMI
			</span>
			<h2 class="font-syne mb-4 text-3xl font-black uppercase sm:text-4xl">
				{content.story.title || 'Cerita Cinta'}
			</h2>
			<p class="text-sm leading-relaxed font-medium whitespace-pre-wrap opacity-90 sm:text-base">
				{content.story.body}
			</p>
		</div>
	{/if}

	<!-- Events -->
	{#if content.events && content.events.length > 0}
		<div class="relative z-10 mx-auto mb-12 max-w-5xl">
			<div use:scrollReveal class="border-brutal-thick shadow-brutal mb-8 bg-[#facc15] p-4 text-center">
				<h2 class="font-syne text-3xl font-black uppercase sm:text-5xl">Rangkaian Acara</h2>
			</div>

			<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
				{#each content.events as event}
					<div
						use:scrollReveal={{ delay: 100 }}
						class="border-brutal-thick shadow-brutal space-y-4 bg-white p-6 sm:p-8 transition-transform hover:-translate-y-1"
					>
						<span
							class="border-brutal inline-block bg-black px-3 py-1 font-mono text-xs font-bold text-white uppercase"
						>
							{event.type}
						</span>
						<h3 class="font-syne text-2xl font-black uppercase">{event.title}</h3>
						<div class="space-y-2 border-t-2 border-black pt-4 font-mono text-xs font-bold sm:text-sm">
							<div class="flex items-center gap-2">
								<Calendar class="h-4 w-4" />
								<span>{event.date}</span>
							</div>
							<div class="flex items-center gap-2">
								<Clock class="h-4 w-4" />
								<span>{event.startTime} - {event.endTime} WIB</span>
							</div>
							<div class="flex items-start gap-2 pt-2">
								<MapPin class="mt-0.5 h-4 w-4 shrink-0" />
								<div>
									<p class="font-bold uppercase">{event.venue}</p>
									<p class="text-xs font-normal opacity-80">{event.address}</p>
								</div>
							</div>
						</div>
						{#if event.mapsUrl}
							<div class="pt-2">
								<a
									href={event.mapsUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="border-brutal shadow-brutal-sm inline-flex items-center gap-2 bg-[#facc15] px-4 py-2 font-mono text-xs font-black uppercase transition-all hover:translate-x-0.5 hover:translate-y-0.5"
								>
									<span>Google Maps</span>
									<ExternalLink class="h-3.5 w-3.5" />
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
			use:scrollReveal
			class="relative z-10 border-brutal-thick shadow-brutal mx-auto mb-12 max-w-2xl bg-black p-8 text-center text-white sm:p-12"
		>
			<span class="mb-4 block font-mono text-xs font-bold tracking-widest text-[#facc15] uppercase">
				HITUNG MUNDUR
			</span>
			<Countdown targetDate={content.countdown.targetDate} variant="brutalist" />
		</div>
	{/if}

	<!-- Gallery -->
	{#if content.gallery && content.gallery.length > 0}
		<div class="relative z-10 mx-auto mb-12 max-w-6xl">
			<div use:scrollReveal class="border-brutal-thick shadow-brutal mb-8 bg-white p-4 text-center">
				<h2 class="font-syne text-3xl font-black uppercase sm:text-5xl">Galeri Foto</h2>
			</div>
			<div class="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
				{#each content.gallery as item}
					<div class="border-brutal-thick shadow-brutal aspect-square overflow-hidden bg-white p-1">
						<img
							src={item.url}
							alt="Gallery item"
							class="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
							loading="lazy"
						/>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Interactive Section -->
	<div class="relative z-10 mx-auto max-w-4xl space-y-8">
		{#if content.rsvp?.enabled}
			<div use:scrollReveal class="border-brutal-thick shadow-brutal-lg bg-white p-6 sm:p-10">
				<div class="mb-8 border-b-2 border-black pb-4 text-center">
					<span
						class="border-brutal mb-2 inline-block bg-[#facc15] px-3 py-1 font-mono text-xs font-bold uppercase shadow-brutal-sm"
					>
						KONFIRMASI KEHADIRAN
					</span>
					<h2 class="font-syne text-3xl font-black uppercase">Konfirmasi Kehadiran</h2>
				</div>
				<div class="[&_button[type=submit]]:border-brutal [&_button[type=submit]]:shadow-brutal [&_button[type=submit]]:rounded-none [&_button[type=submit]]:bg-[#facc15] [&_button[type=submit]]:text-black [&_button[type=submit]]:font-bold [&_input]:border-brutal [&_textarea]:border-brutal [&_select]:border-brutal">
					<RSVPSection invitationId={invitation.id} settings={content.rsvp} theme="brutalist" />
				</div>
			</div>
		{/if}

		{#if content.gift?.enabled}
			<div use:scrollReveal class="border-brutal-thick shadow-brutal-lg bg-white p-6 sm:p-10">
				<div class="mb-8 border-b-2 border-black pb-4 text-center">
					<span
						class="border-brutal mb-2 inline-block bg-black px-3 py-1 font-mono text-xs font-bold text-white uppercase shadow-brutal-sm"
					>
						TANDA KASIH
					</span>
					<h2 class="font-syne text-3xl font-black uppercase">Kirim Hadiah</h2>
				</div>
				<div class="[&_.bg-white\/70]:border-brutal [&_.bg-white\/70]:shadow-brutal [&_.bg-white\/70]:rounded-none [&_button]:border-brutal [&_button]:shadow-brutal-sm [&_button]:bg-[#facc15] [&_button]:text-black">
					<GiftSection gift={content.gift} theme="brutalist" />
				</div>
			</div>
		{/if}

		{#if content.guestbook?.enabled}
			<div use:scrollReveal class="border-brutal-thick shadow-brutal-lg bg-white p-6 sm:p-10">
				<div class="mb-8 border-b-2 border-black pb-4 text-center">
					<span
						class="border-brutal mb-2 inline-block bg-[#facc15] px-3 py-1 font-mono text-xs font-bold uppercase shadow-brutal-sm"
					>
						DOA & UCAPAN
					</span>
					<h2 class="font-syne text-3xl font-black uppercase">Doa & Ucapan</h2>
				</div>
				<GuestbookSection
					invitationId={invitation.id}
					settings={content.guestbook}
					initialEntries={initialGuestbook}
					theme="brutalist"
				/>
			</div>
		{/if}
	</div>

	<!-- Footer -->
	<footer class="relative z-10 border-brutal-thick shadow-brutal mx-auto mt-12 max-w-5xl bg-black p-8 text-center text-xs font-bold text-white uppercase">
		<p class="font-syne mb-1 text-xl text-[#facc15]">
			{content.couple.partner1.name} & {content.couple.partner2.name}
		</p>
		<p class="font-mono text-[11px]">SAMPAI JUMPA DI HARI BAHAGIA KAMI!</p>
	</footer>
</article>
