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
	class="relative min-h-screen bg-[#f5f5f5] font-mono-code leading-relaxed text-black overflow-x-hidden selection:bg-black selection:text-white"
>
	<!-- Fine Monochrome Grain -->
	<PaperTexture opacity={0.03} />

	<!-- Top Bar Grid -->
	<header class="relative z-10">
		<ThemeHeader theme="modern-mono" {content} />
	</header>

	<!-- Monogram Badge -->
	<div class="relative z-10 flex justify-center -mt-5 mb-8">
		<MonogramFrame
			partner1={content.couple.partner1.name}
			partner2={content.couple.partner2.name}
			variant="modern"
			color="#000000"
			size={88}
		/>
	</div>

	<!-- Cover Image with High Fashion Grid -->
	{#if content.hero?.coverUrl}
		<section class="relative z-10 border-b-2 border-black">
			<div
				class="mx-auto grid max-w-6xl grid-cols-1 border-x-0 border-black md:grid-cols-12 md:border-x-2"
			>
				<div class="border-b-2 border-black md:col-span-8 md:border-r-2 md:border-b-0 p-2 sm:p-4 bg-white">
					<div class="overflow-hidden border border-black">
						<img
							src={content.hero.coverUrl}
							alt={content.hero.headline}
							class="aspect-16/10 w-full object-cover contrast-125 grayscale"
							loading="eager"
						/>
					</div>
				</div>
				<div class="flex flex-col justify-between bg-white p-6 sm:p-8 md:col-span-4">
					<div>
						<div class="flex justify-between items-center text-[10px] text-neutral-400 uppercase">
							<span>// MANIFESTO</span>
							<span>TAHUN: 2026</span>
						</div>
						<div class="h-0.5 w-8 bg-black mt-2 mb-4"></div>
						<p class="text-xs sm:text-sm leading-relaxed tracking-wide uppercase">
							{content.hero.subheadline || content.opening?.greeting}
						</p>
					</div>
					<div class="pt-6 border-t border-neutral-200 mt-6 flex justify-between text-[10px] text-neutral-500">
						<span>STATUS: TERKONFIRMASI</span>
						<span>LOKASI: INDONESIA</span>
					</div>
				</div>
			</div>
		</section>
	{/if}

	<!-- Opening Quote -->
	{#if content.opening?.quote}
		<section class="relative z-10 border-b-2 border-black bg-white px-6 py-12 sm:py-16 text-center">
			<div class="mx-auto max-w-3xl space-y-4">
				<span use:scrollReveal class="text-[10px] text-neutral-400 uppercase block tracking-widest">// KATA_PEMBUKA</span>
				<blockquote use:scrollReveal={{ variant: 'blur-in', duration: 900 }} class="text-base sm:text-xl font-bold uppercase tracking-tight text-neutral-900 leading-snug">
					"{content.opening.quote}"
				</blockquote>
				{#if content.opening.quoteSource}
					<cite use:scrollReveal={{ delay: 150 }} class="block text-xs font-bold text-neutral-500 uppercase not-italic tracking-wider">
						— {content.opening.quoteSource}
					</cite>
				{/if}
			</div>
		</section>
	{/if}

	<!-- Couple Columns -->
	<section class="relative z-10 border-b-2 border-black">
		<div
			class="mx-auto grid max-w-6xl grid-cols-1 divide-y-2 divide-black border-x-0 border-black md:grid-cols-2 md:divide-x-2 md:divide-y-0 md:border-x-2"
		>
			<!-- Groom -->
			<div class="space-y-6 bg-white p-8 sm:p-12">
				<div use:scrollReveal class="flex justify-between items-center text-[10px] text-neutral-400 uppercase">
					<span>[MEMPELAI_01]</span>
					<span>MEMPELAI PRIA</span>
				</div>
				{#if content.couple.partner1.photoUrl}
					<div class="aspect-4/5 overflow-hidden border-2 border-black p-1 bg-neutral-100">
						<img
							use:parallax={{ speed: 0.02, scale: 1.06 }}
							src={content.couple.partner1.photoUrl}
							alt={content.couple.partner1.name}
							class="h-full w-full object-cover contrast-125 grayscale"
							loading="lazy"
						/>
					</div>
				{/if}
				<div use:scrollReveal={{ delay: 100 }}>
					<h3 class="text-2xl font-bold uppercase tracking-tight">
						{content.couple.partner1.fullName || content.couple.partner1.name}
					</h3>
					{#if content.couple.partner1.childOf}
						<p class="mt-2 text-xs text-neutral-500">{content.couple.partner1.childOf}</p>
					{/if}
				</div>
			</div>

			<!-- Bride -->
			<div class="space-y-6 bg-white p-8 sm:p-12">
				<div use:scrollReveal class="flex justify-between items-center text-[10px] text-neutral-400 uppercase">
					<span>[MEMPELAI_02]</span>
					<span>MEMPELAI WANITA</span>
				</div>
				{#if content.couple.partner2.photoUrl}
					<div class="aspect-4/5 overflow-hidden border-2 border-black p-1 bg-neutral-100">
						<img
							use:parallax={{ speed: 0.02, scale: 1.06 }}
							src={content.couple.partner2.photoUrl}
							alt={content.couple.partner2.name}
							class="h-full w-full object-cover contrast-125 grayscale"
							loading="lazy"
						/>
					</div>
				{/if}
				<div use:scrollReveal={{ delay: 100 }}>
					<h3 class="text-2xl font-bold uppercase tracking-tight">
						{content.couple.partner2.fullName || content.couple.partner2.name}
					</h3>
					{#if content.couple.partner2.childOf}
						<p class="mt-2 text-xs text-neutral-500">{content.couple.partner2.childOf}</p>
					{/if}
				</div>
			</div>
		</div>
	</section>

	<!-- Story -->
	{#if content.story?.body}
		<section class="relative z-10 border-b-2 border-black bg-white p-8 sm:p-12">
			<div use:scrollReveal class="mx-auto max-w-4xl space-y-4">
				<span class="text-[10px] text-neutral-400 uppercase tracking-widest">// CATATAN_KISAH</span>
				<h3 class="text-2xl font-bold uppercase tracking-tight">
					{content.story.title || 'Catatan Kisah'}
				</h3>
				<p class="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap text-neutral-700">
					{content.story.body}
				</p>
			</div>
		</section>
	{/if}

	<!-- Events: Schedule of Events -->
	{#if content.events && content.events.length > 0}
		<section class="relative z-10 border-b-2 border-black">
			<div class="mx-auto max-w-6xl border-x-0 border-black md:border-x-2">
				<div use:scrollReveal class="bg-black p-6 text-white sm:p-8 flex justify-between items-center">
					<span class="text-xs tracking-widest uppercase">// JADWAL_RANGKAIAN_ACARA</span>
					<span class="text-[10px] text-neutral-400">AGENDA</span>
				</div>
				<div
					class="grid grid-cols-1 divide-y-2 divide-black md:grid-cols-2 md:divide-x-2 md:divide-y-0"
				>
					{#each content.events as event}
						<div use:scrollReveal={{ delay: 100 }} class="space-y-4 bg-white p-8 sm:p-10">
							<div class="inline-block bg-black px-2 py-0.5 text-[10px] font-bold text-white uppercase">
								{event.type}
							</div>
							<h4 class="text-xl font-bold uppercase tracking-tight">{event.title}</h4>
							<div class="space-y-1.5 text-xs text-neutral-600 font-mono">
								<p>TANGGAL: <span class="font-bold text-black">{event.date}</span></p>
								<p>WAKTU: {event.startTime} - {event.endTime} WIB</p>
								<p class="pt-2 font-bold text-black">LOKASI: {event.venue}</p>
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
										LOKASI GOOGLE MAPS →
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
		<section class="relative z-10 border-b-2 border-black bg-white p-8 sm:p-12 text-center">
			<div use:scrollReveal>
				<span class="text-[10px] text-neutral-400 uppercase tracking-widest block mb-4">
					// HITUNG_MUNDUR
				</span>
				<Countdown targetDate={content.countdown.targetDate} variant="mono" />
			</div>
		</section>
	{/if}

	<!-- Gallery -->
	{#if content.gallery && content.gallery.length > 0}
		<section class="relative z-10 border-b-2 border-black">
			<div class="mx-auto max-w-6xl border-x-0 border-black md:border-x-2">
				<div use:scrollReveal class="bg-black p-6 text-white sm:p-8">
					<span class="text-xs tracking-widest uppercase">// ARSIP_FOTO</span>
				</div>
				<div class="grid grid-cols-2 divide-x divide-y divide-black md:grid-cols-4 bg-white">
					{#each content.gallery as item}
						<div class="aspect-square p-2 overflow-hidden">
							<img
								src={item.url}
								alt="Gallery item"
								class="h-full w-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
								loading="lazy"
							/>
						</div>
					{/each}
				</div>
			</div>
		</section>
	{/if}

	<!-- Interactive Section -->
	<section class="relative z-10 mx-auto max-w-4xl p-6 sm:p-12">
		<div class="space-y-16">
			{#if content.rsvp?.enabled}
				<div use:scrollReveal class="border-2 border-black bg-white p-6 sm:p-10">
					<span class="text-[10px] text-neutral-400 uppercase tracking-widest block mb-2">
						// KONFIRMASI_KEHADIRAN
					</span>
					<h3 class="text-2xl font-bold uppercase mb-8">Konfirmasi Kehadiran</h3>
					<div class="[&_button[type=submit]]:rounded-none [&_button[type=submit]]:border-2 [&_button[type=submit]]:border-black [&_button[type=submit]]:bg-black [&_button[type=submit]]:text-white [&_button[type=submit]]:hover:bg-neutral-800">
						<RSVPSection invitationId={invitation.id} settings={content.rsvp} theme="mono" />
					</div>
				</div>
			{/if}

			{#if content.gift?.enabled}
				<div use:scrollReveal class="border-2 border-black bg-white p-6 sm:p-10">
					<span class="text-[10px] text-neutral-400 uppercase tracking-widest block mb-2">
						// TANDA_KASIH
					</span>
					<h3 class="text-2xl font-bold uppercase mb-8">Tanda Kasih</h3>
					<GiftSection gift={content.gift} theme="mono" />
				</div>
			{/if}

			{#if content.guestbook?.enabled}
				<div use:scrollReveal class="border-2 border-black bg-white p-6 sm:p-10">
					<span class="text-[10px] text-neutral-400 uppercase tracking-widest block mb-2">
						// DOA_DAN_UCAPAN
					</span>
					<h3 class="text-2xl font-bold uppercase mb-8">Doa & Ucapan</h3>
					<GuestbookSection
						invitationId={invitation.id}
						settings={content.guestbook}
						initialEntries={initialGuestbook}
						theme="mono"
					/>
				</div>
			{/if}
		</div>
	</section>

	<!-- Footer -->
	<footer class="relative z-10 border-t-2 border-black bg-black p-8 text-center text-xs text-white">
		<p class="font-bold uppercase tracking-widest mb-1">
			{content.couple.partner1.name} + {content.couple.partner2.name}
		</p>
		<p class="text-neutral-400 text-[10px]">DENGAN PENUH CINTA // 2026</p>
	</footer>
</article>
