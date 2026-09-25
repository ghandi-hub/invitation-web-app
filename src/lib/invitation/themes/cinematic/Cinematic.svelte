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
	import { Calendar, Clock, MapPin, ExternalLink, Film, Sparkles } from '@lucide/svelte';

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
	class="font-sans-clean relative min-h-screen overflow-x-hidden bg-[#0d0d11] leading-relaxed text-[#e8e6e3] selection:bg-[#d4af37] selection:text-black"
>
	<!-- Subtle Dark Film Texture -->
	<PaperTexture opacity={0.03} blendMode="screen" />

	<!-- Cinematic Full-Bleed Hero -->
	<header class="relative z-10">
		<ThemeHeader theme="cinematic" {content} />
	</header>

	<!-- Monogram Emblem -->
	<div class="relative z-10 -mt-6 mb-10 flex justify-center">
		<MonogramFrame
			partner1={content.couple.partner1.name}
			partner2={content.couple.partner2.name}
			variant="arch"
			color="#d4af37"
			size={110}
		/>
	</div>

	<!-- Dramatic Quote with Art Deco Golden Dividers -->
	{#if content.opening?.quote}
		<section class="relative z-10 mx-auto max-w-3xl px-6 py-10 text-center sm:py-16">
			<BotanicalDivider variant="cinematic" color="#d4af37" />
			<blockquote
				use:scrollReveal={{ duration: 400 }}
				class="font-cormorant my-4 text-xl leading-relaxed text-white/95 italic sm:text-3xl font-normal tracking-wide"
			>
				"{content.opening.quote}"
			</blockquote>
			{#if content.opening.quoteSource}
				<cite
					use:scrollReveal
					class="mt-4 block font-mono text-xs tracking-[0.3em] text-[#d4af37] uppercase not-italic"
				>
					— {content.opening.quoteSource}
				</cite>
			{/if}
			<BotanicalDivider variant="cinematic" color="#d4af37" />
		</section>
	{/if}

	<!-- Couple Stars Section: Film Premiere Casting Layout -->
	<section class="relative z-10 mx-auto max-w-5xl px-6 py-12 sm:py-20">
		<div use:scrollReveal class="mb-14 text-center">
			<div class="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-white/5 px-4 py-1 text-[10px] tracking-[0.35em] text-[#d4af37] uppercase mb-3 backdrop-blur-xs">
				<Sparkles class="h-3 w-3" />
				<span>KEDUA MEMPELAI</span>
			</div>
			<h2 class="font-cinzel text-3xl sm:text-5xl text-white tracking-wide">Pemeran Utama</h2>
		</div>

		<div class="grid grid-cols-1 items-center gap-12 sm:gap-16 md:grid-cols-2 max-w-4xl mx-auto">
			<!-- Groom -->
			<div class="space-y-5 text-center">
				{#if content.couple.partner1.photoUrl}
					<div
						class="relative mx-auto h-72 w-56 sm:h-88 sm:w-68 overflow-hidden border border-[#d4af37]/40 bg-neutral-900 p-2 shadow-2xl shadow-black/80"
					>
						<div class="h-full w-full overflow-hidden">
							<img
								use:parallax={{ speed: 0.03, scale: 1.1 }}
								src={content.couple.partner1.photoUrl}
								alt={content.couple.partner1.name}
								class="h-full w-full object-cover contrast-105"
								loading="eager"
								decoding="async"
							/>
						</div>
						<div class="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-[10px] font-mono tracking-[0.2em] text-[#d4af37] uppercase">
							MEMPELAI PRIA
						</div>
					</div>
				{/if}
				<div use:scrollReveal>
					<h3 class="font-cinzel text-2xl sm:text-3xl text-white tracking-wide">
						{content.couple.partner1.fullName || content.couple.partner1.name}
					</h3>
					{#if content.couple.partner1.childOf}
						<p class="mx-auto mt-2 max-w-xs text-xs text-white/60 sm:text-sm font-light">
							{content.couple.partner1.childOf}
						</p>
					{/if}
				</div>
			</div>

			<!-- Bride -->
			<div class="space-y-5 text-center">
				{#if content.couple.partner2.photoUrl}
					<div
						class="relative mx-auto h-72 w-56 sm:h-88 sm:w-68 overflow-hidden border border-[#d4af37]/40 bg-neutral-900 p-2 shadow-2xl shadow-black/80"
					>
						<div class="h-full w-full overflow-hidden">
							<img
								use:parallax={{ speed: 0.03, scale: 1.1 }}
								src={content.couple.partner2.photoUrl}
								alt={content.couple.partner2.name}
								class="h-full w-full object-cover contrast-105"
								loading="eager"
								decoding="async"
							/>
						</div>
						<div class="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-[10px] font-mono tracking-[0.2em] text-[#d4af37] uppercase">
							MEMPELAI WANITA
						</div>
					</div>
				{/if}
				<div use:scrollReveal>
					<h3 class="font-cinzel text-2xl sm:text-3xl text-white tracking-wide">
						{content.couple.partner2.fullName || content.couple.partner2.name}
					</h3>
					{#if content.couple.partner2.childOf}
						<p class="mx-auto mt-2 max-w-xs text-xs text-white/60 sm:text-sm font-light">
							{content.couple.partner2.childOf}
						</p>
					{/if}
				</div>
			</div>
		</div>
	</section>

	<!-- Story Section: Cinematic Narrative Script -->
	{#if content.story?.body}
		<section class="relative z-10 border-y border-[#d4af37]/20 bg-[#14141a] px-6 py-14 sm:py-20">
			<div use:scrollReveal class="mx-auto max-w-3xl space-y-6 text-center">
				<span class="block text-[10px] font-mono tracking-[0.4em] text-[#d4af37] uppercase">
					KISAH / SINOPSIS
				</span>
				<h2 class="font-cinzel text-3xl sm:text-4xl text-white tracking-wide">
					{content.story.title || 'Kisah Cinta Kami'}
				</h2>
				<p class="font-sans text-sm sm:text-base leading-relaxed whitespace-pre-wrap text-white/80 max-w-2xl mx-auto font-light">
					{content.story.body}
				</p>
			</div>
		</section>
	{/if}

	<!-- Events Schedule: Premiere Screening Itinerary -->
	{#if content.events && content.events.length > 0}
		<section class="relative z-10 mx-auto max-w-5xl px-6 py-14 sm:py-24">
			<div use:scrollReveal class="mb-14 text-center">
				<span class="mb-2 block text-[10px] font-mono tracking-[0.35em] text-[#d4af37] uppercase">
					JADWAL ACARA
				</span>
				<h2 class="font-cinzel text-3xl tracking-wide text-white sm:text-5xl">Rangkaian Acara</h2>
			</div>

			<div class="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
				{#each content.events as event}
					<div
						class="relative space-y-5 rounded-sm border border-[#d4af37]/30 bg-[#15151c] p-8 text-center shadow-xl transition-all hover:border-[#d4af37]/60"
					>
						<span class="block font-mono text-[10px] tracking-[0.3em] text-[#d4af37] uppercase">
							{event.type.toUpperCase()}
						</span>
						<h3 class="font-cinzel text-2xl text-white">{event.title}</h3>
						<div class="mx-auto h-px w-10 bg-[#d4af37]/40"></div>

						<div class="space-y-2.5 text-xs text-white/70 sm:text-sm">
							<div class="flex items-center justify-center gap-2">
								<Calendar class="h-4 w-4 text-[#d4af37]" />
								<span class="font-medium text-white">{event.date}</span>
							</div>
							<div class="flex items-center justify-center gap-2">
								<Clock class="h-4 w-4 text-[#d4af37]" />
								<span>{event.startTime} - {event.endTime} WIB</span>
							</div>
							<div class="flex items-start justify-center gap-2 pt-2">
								<MapPin class="mt-0.5 h-4 w-4 shrink-0 text-[#d4af37]" />
								<div>
									<p class="font-medium text-white">{event.venue}</p>
									<p class="mt-0.5 text-xs text-white/50">{event.address}</p>
								</div>
							</div>
						</div>

						{#if event.mapsUrl}
							<div class="pt-4">
								<a
									href={event.mapsUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center gap-2 border border-[#d4af37]/60 bg-transparent px-6 py-2.5 font-mono text-xs tracking-widest text-[#d4af37] uppercase transition-all hover:bg-[#d4af37] hover:text-black"
								>
									<span>LIHAT LOKASI</span>
									<ExternalLink class="h-3.5 w-3.5" />
								</a>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</section>
	{/if}

	<!-- Countdown Timer -->
	{#if content.countdown?.targetDate}
		<section
			class="relative z-10 border-y border-[#d4af37]/20 bg-[#08080a] px-6 py-14 text-center text-white sm:py-20"
		>
			<div class="mx-auto max-w-2xl space-y-6">
				<span class="block font-mono text-[10px] tracking-[0.35em] text-[#d4af37] uppercase">
					MENGHITUNG HARI
				</span>
				<div class="[&_span]:text-[#d4af37]">
					<Countdown targetDate={content.countdown.targetDate} variant="cinematic" />
				</div>
			</div>
		</section>
	{/if}

	<!-- Photo Gallery: Film Reel Grid -->
	{#if content.gallery && content.gallery.length > 0}
		<section class="relative z-10 mx-auto max-w-6xl px-6 py-14 sm:py-24">
			<div class="mb-14 text-center">
				<span class="mb-2 block font-mono text-[10px] tracking-[0.35em] text-[#d4af37] uppercase">
					GALERI FOTO
				</span>
				<h2 class="font-cinzel text-3xl tracking-wide text-white sm:text-5xl">Galeri Momen</h2>
			</div>

			<div class="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
				{#each content.gallery as item}
					<div
						class="group relative aspect-3/4 overflow-hidden border border-[#d4af37]/30 bg-black p-1 shadow-lg transition-transform duration-500 hover:-translate-y-1"
					>
						<div class="relative h-full w-full overflow-hidden bg-neutral-900">
							<img
								src={item.url}
								alt={item.caption || 'Foto Galeri'}
								class="h-full w-full object-cover contrast-105 transition-transform duration-700 group-hover:scale-110"
								loading="lazy"
							/>
							{#if item.caption}
								<div
									class="font-cinzel absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 text-xs text-[#d4af37] opacity-0 transition-opacity group-hover:opacity-100"
								>
									<p>{item.caption}</p>
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</section>
	{/if}

	<!-- RSVP & Interactive Section -->
	<section class="relative z-10 border-t border-[#d4af37]/20 bg-[#121218] px-6 py-14 sm:py-24 text-white">
		<div class="mx-auto max-w-3xl space-y-16">
			{#if content.rsvp?.enabled}
				<div>
					<div class="mb-10 text-center">
						<span
							class="mb-2 block font-mono text-[10px] tracking-[0.35em] text-[#d4af37] uppercase"
						>
							KONFIRMASI KEHADIRAN
						</span>
						<h2 class="font-cinzel text-3xl text-white sm:text-4xl">Konfirmasi Kehadiran</h2>
					</div>
					<div>
						<RSVPSection invitationId={invitation.id} settings={content.rsvp} theme="cinematic" />
					</div>
				</div>
			{/if}

			{#if content.gift?.enabled}
				<div class="border-t border-[#d4af37]/20 pt-10">
					<div class="mb-10 text-center">
						<span
							class="mb-2 block font-mono text-[10px] tracking-[0.35em] text-[#d4af37] uppercase"
						>
							TANDA KASIH
						</span>
						<h2 class="font-cinzel text-3xl text-white sm:text-4xl">Kirim Hadiah</h2>
					</div>
					<div>
						<GiftSection gift={content.gift} theme="cinematic" />
					</div>
				</div>
			{/if}

			{#if content.guestbook?.enabled}
				<div class="border-t border-[#d4af37]/20 pt-10">
					<div class="mb-10 text-center">
						<span
							class="mb-2 block font-mono text-[10px] tracking-[0.35em] text-[#d4af37] uppercase"
						>
							DOA & UCAPAN
						</span>
						<h2 class="font-cinzel text-3xl text-white sm:text-4xl">Ucapan Selamat</h2>
					</div>
					<GuestbookSection
						invitationId={invitation.id}
						settings={content.guestbook}
						initialEntries={initialGuestbook}
						theme="cinematic"
					/>
				</div>
			{/if}
		</div>
	</section>

	<!-- Footer -->
	<footer
		class="relative z-10 border-t border-[#d4af37]/20 px-6 py-12 text-center text-xs text-white/50"
	>
		<p class="font-cinzel mb-2 text-xl text-[#d4af37]">
			{content.couple.partner1.name} & {content.couple.partner2.name}
		</p>
		<p>Terima kasih telah menjadi bagian dari kisah bahagia kami.</p>
	</footer>
</article>
