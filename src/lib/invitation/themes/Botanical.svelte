<script lang="ts">
	import ThemeHeader from '$lib/invitation/ThemeHeader.svelte';
	import type { Invitation, GuestbookItem } from '$lib/types/invitation';
	import Countdown from '$lib/invitation/components/Countdown.svelte';
	import RSVPSection from '$lib/invitation/components/RSVPSection.svelte';
	import GuestbookSection from '$lib/invitation/components/GuestbookSection.svelte';
	import GiftSection from '$lib/invitation/components/GiftSection.svelte';
	import FloralCorner from '$lib/invitation/ornaments/FloralCorner.svelte';
	import BotanicalDivider from '$lib/invitation/ornaments/BotanicalDivider.svelte';
	import MonogramFrame from '$lib/invitation/ornaments/MonogramFrame.svelte';
	import PaperTexture from '$lib/invitation/ornaments/PaperTexture.svelte';
	import { parallax } from '$lib/actions/parallax';
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
	class="relative min-h-screen bg-[#f4f6f0] text-[#283618] font-sans-clean leading-relaxed overflow-x-hidden selection:bg-[#4a6741] selection:text-white"
>
	<!-- Tactile Paper Texture -->
	<PaperTexture opacity={0.04} />

	<!-- Top Corner Botanical Ornaments (Layered) -->
	<div class="absolute top-4 left-4 z-10 opacity-70 sm:top-6 sm:left-6">
		<FloralCorner position="top-left" variant="botanical" size={88} color="#4a6741" />
	</div>
	<div class="absolute top-4 right-4 z-10 opacity-70 sm:top-6 sm:right-6">
		<FloralCorner position="top-right" variant="botanical" size={88} color="#4a6741" />
	</div>

	<!-- Botanical Header -->
	<header class="relative z-10 pt-8 pb-4">
		<ThemeHeader theme="botanical" {content} />
	</header>

	<!-- Monogram Badge -->
	<div class="relative z-10 flex justify-center -mt-4 mb-8">
		<MonogramFrame
			partner1={content.couple.partner1.name}
			partner2={content.couple.partner2.name}
			variant="wreath"
			color="#4a6741"
			size={115}
		/>
	</div>

	<!-- Hero Cover Section with Layered Parallax Arch -->
	{#if content.hero?.coverUrl}
		<section class="relative z-10 mx-auto my-6 max-w-4xl px-4 sm:px-6">
			<div class="relative mx-auto max-w-2xl">
				<!-- Parallax Background Leaf Sprig -->
				<div
					use:parallax={{ speed: 0.15 }}
					class="pointer-events-none absolute -top-8 -left-8 z-0 hidden opacity-40 sm:block text-[#4a6741]"
				>
					<svg width="100" height="100" viewBox="0 0 100 100" fill="currentColor">
						<path d="M10 90 C 20 40, 50 20, 90 10 C 60 40, 40 70, 10 90 Z" opacity="0.3" />
					</svg>
				</div>

				<!-- Main Arch Frame -->
				<div
					class="relative overflow-hidden rounded-t-[140px] sm:rounded-t-[200px] border-2 border-[#4a6741]/25 bg-white p-2.5 sm:p-3 shadow-xl"
				>
					<div class="aspect-4/5 sm:aspect-16/11 overflow-hidden rounded-t-[130px] sm:rounded-t-[190px]">
						<img
							src={content.hero.coverUrl}
							alt={content.hero.headline}
							class="h-full w-full object-cover"
							loading="eager"
						/>
					</div>
				</div>

				<!-- Parallax Foreground Botanical Accent overlapping the frame -->
				<div
					use:parallax={{ speed: -0.1 }}
					class="pointer-events-none absolute -bottom-6 -right-4 z-20 opacity-85 text-[#395032]"
				>
					<FloralCorner position="bottom-right" variant="botanical" size={80} color="#395032" />
				</div>
			</div>

			{#if content.hero.subheadline}
				<div class="mx-auto mt-8 max-w-md text-center">
					<p class="font-cormorant text-base sm:text-lg font-medium text-[#4a6741] italic">
						"{content.hero.subheadline}"
					</p>
				</div>
			{/if}
		</section>
	{/if}

	<BotanicalDivider variant="olive" color="#4a6741" />

	<!-- Opening Quote -->
	{#if content.opening?.quote}
		<section class="relative z-10 mx-auto max-w-2xl px-6 py-10 text-center">
			<blockquote class="font-cormorant text-lg sm:text-2xl leading-relaxed text-[#283618] italic">
				"{content.opening.quote}"
			</blockquote>
			{#if content.opening.quoteSource}
				<cite
					class="mt-4 block font-sans text-xs font-semibold tracking-[0.25em] text-[#606c38] uppercase not-italic"
				>
					— {content.opening.quoteSource}
				</cite>
			{/if}
		</section>
		<BotanicalDivider variant="minimal" color="#4a6741" />
	{/if}

	<!-- Couple Section -->
	<section class="relative z-10 mx-auto max-w-5xl px-6 py-12 sm:py-20">
		<div class="mb-14 text-center">
			<span class="mb-2 block text-[11px] font-semibold tracking-[0.35em] text-[#606c38] uppercase">
				Mempelai Pernikahan
			</span>
			<h2 class="font-italiana text-3xl sm:text-5xl text-[#1b2710]">Pengantin</h2>
		</div>

		<div class="grid grid-cols-1 items-start gap-12 sm:gap-16 md:grid-cols-2 max-w-4xl mx-auto">
			<!-- Groom -->
			<div class="relative space-y-4 text-center group">
				{#if content.couple.partner1.photoUrl}
					<div
						class="relative mx-auto h-64 w-52 sm:h-76 sm:w-60 overflow-hidden rounded-t-[100px] border-2 border-[#4a6741]/25 bg-white p-2 shadow-md transition-transform duration-500 hover:-translate-y-1"
					>
						<img
							src={content.couple.partner1.photoUrl}
							alt={content.couple.partner1.name}
							class="h-full w-full rounded-t-[90px] object-cover"
							loading="lazy"
						/>
					</div>
				{/if}
				<div>
					<span class="text-[10px] tracking-[0.3em] font-semibold uppercase text-[#606c38] block mb-1">
						Mempelai Pria
					</span>
					<h3 class="font-italiana text-2xl sm:text-3xl text-[#1b2710]">
						{content.couple.partner1.fullName || content.couple.partner1.name}
					</h3>
					{#if content.couple.partner1.childOf}
						<p class="mx-auto mt-2 max-w-xs text-xs sm:text-sm text-[#4a6741] font-cormorant italic">
							{content.couple.partner1.childOf}
						</p>
					{/if}
				</div>
			</div>

			<!-- Bride -->
			<div class="relative space-y-4 text-center group">
				{#if content.couple.partner2.photoUrl}
					<div
						class="relative mx-auto h-64 w-52 sm:h-76 sm:w-60 overflow-hidden rounded-t-[100px] border-2 border-[#4a6741]/25 bg-white p-2 shadow-md transition-transform duration-500 hover:-translate-y-1"
					>
						<img
							src={content.couple.partner2.photoUrl}
							alt={content.couple.partner2.name}
							class="h-full w-full rounded-t-[90px] object-cover"
							loading="lazy"
						/>
					</div>
				{/if}
				<div>
					<span class="text-[10px] tracking-[0.3em] font-semibold uppercase text-[#606c38] block mb-1">
						Mempelai Wanita
					</span>
					<h3 class="font-italiana text-2xl sm:text-3xl text-[#1b2710]">
						{content.couple.partner2.fullName || content.couple.partner2.name}
					</h3>
					{#if content.couple.partner2.childOf}
						<p class="mx-auto mt-2 max-w-xs text-xs sm:text-sm text-[#4a6741] font-cormorant italic">
							{content.couple.partner2.childOf}
						</p>
					{/if}
				</div>
			</div>
		</div>
	</section>

	<!-- Love Story -->
	{#if content.story?.body}
		<section class="relative z-10 border-y border-[#4a6741]/15 bg-[#ebefe5]/80 px-6 py-14 sm:py-20 backdrop-blur-xs">
			<div class="mx-auto max-w-2xl space-y-5 text-center">
				<span class="block text-[11px] font-semibold tracking-[0.35em] text-[#606c38] uppercase">
					Kisah Kasih
				</span>
				<h2 class="font-italiana text-3xl sm:text-4xl text-[#1b2710]">
					{content.story.title || 'Cerita Cinta'}
				</h2>
				<p class="font-sans text-sm sm:text-base leading-relaxed whitespace-pre-wrap text-[#283618]/85">
					{content.story.body}
				</p>
			</div>
		</section>
	{/if}

	<!-- Wedding Events -->
	{#if content.events && content.events.length > 0}
		<section class="relative z-10 mx-auto max-w-5xl px-6 py-14 sm:py-24">
			<div class="mb-14 text-center">
				<span class="mb-2 block text-[11px] font-semibold tracking-[0.35em] text-[#606c38] uppercase">
					Waktu & Tempat
				</span>
				<h2 class="font-italiana text-3xl sm:text-5xl text-[#1b2710]">Rangkaian Acara</h2>
			</div>

			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
				{#each content.events as event}
					<div
						class="relative space-y-5 rounded-2xl border border-[#4a6741]/20 bg-white/90 p-8 text-center shadow-xs transition-shadow hover:shadow-md"
					>
						<div class="absolute top-3 right-3 opacity-30">
							<FloralCorner position="top-right" variant="botanical" size={40} color="#4a6741" />
						</div>

						<h3 class="font-italiana text-2xl text-[#1b2710]">{event.title}</h3>
						<div class="mx-auto h-px w-10 bg-[#4a6741]/30"></div>

						<div class="space-y-2.5 text-xs sm:text-sm text-[#4a6741]">
							<div class="flex items-center justify-center gap-2">
								<Calendar class="h-4 w-4 text-[#606c38]" />
								<span class="font-medium text-[#1b2710]">{event.date}</span>
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
							<div class="pt-3">
								<a
									href={event.mapsUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center gap-2 rounded-full border border-[#4a6741] bg-[#4a6741] px-5 py-2.5 text-xs font-semibold tracking-wider text-white uppercase transition-all hover:bg-[#395032]"
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

	<!-- Countdown Timer -->
	{#if content.countdown?.targetDate}
		<section class="relative z-10 bg-[#395032] px-6 py-14 text-center text-white sm:py-20 shadow-inner">
			<div class="mx-auto max-w-2xl space-y-6">
				<span class="block text-[11px] font-semibold tracking-[0.35em] text-[#d4e09b] uppercase">
					Menghitung Hari Bahagia
				</span>
				<Countdown targetDate={content.countdown.targetDate} variant="botanical" />
			</div>
		</section>
	{/if}

	<!-- Photo Gallery -->
	{#if content.gallery && content.gallery.length > 0}
		<section class="relative z-10 mx-auto max-w-6xl px-6 py-14 sm:py-24">
			<div class="mb-14 text-center">
				<span class="mb-2 block text-[11px] font-semibold tracking-[0.35em] text-[#606c38] uppercase">
					Dokumentasi
				</span>
				<h2 class="font-italiana text-3xl sm:text-5xl text-[#1b2710]">Galeri Momen</h2>
			</div>

			<div class="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
				{#each content.gallery as item}
					<div
						class="group aspect-3/4 overflow-hidden rounded-2xl border border-[#4a6741]/20 bg-white p-1.5 shadow-xs"
					>
						<div class="relative h-full w-full overflow-hidden rounded-xl">
							<img
								src={item.url}
								alt={item.caption || 'Foto Galeri'}
								class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
								loading="lazy"
							/>
							{#if item.caption}
								<div
									class="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-3 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
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
	<section class="relative z-10 border-t border-[#4a6741]/15 bg-[#ebefe5]/60 px-6 py-14 sm:py-24">
		<div class="mx-auto max-w-3xl space-y-16">
			{#if content.rsvp?.enabled}
				<div>
					<div class="mb-10 text-center">
						<span class="mb-2 block text-[11px] font-semibold tracking-[0.35em] text-[#606c38] uppercase">
							RSVP
						</span>
						<h2 class="font-italiana text-3xl sm:text-4xl text-[#1b2710]">Konfirmasi Kehadiran</h2>
					</div>
					<div class="[&_button[type=submit]]:rounded-full [&_button[type=submit]]:bg-[#4a6741] [&_button[type=submit]]:hover:bg-[#395032]">
						<RSVPSection invitationId={invitation.id} settings={content.rsvp} theme="botanical" />
					</div>
				</div>
			{/if}

			{#if content.gift?.enabled}
				<div class="border-t border-[#4a6741]/15 pt-8">
					<div class="mb-10 text-center">
						<span class="mb-2 block text-[11px] font-semibold tracking-[0.35em] text-[#606c38] uppercase">
							Tanda Kasih
						</span>
						<h2 class="font-italiana text-3xl sm:text-4xl text-[#1b2710]">Kirim Hadiah</h2>
					</div>
					<GiftSection gift={content.gift} theme="botanical" />
				</div>
			{/if}

			{#if content.guestbook?.enabled}
				<div class="border-t border-[#4a6741]/15 pt-8">
					<div class="mb-10 text-center">
						<span class="mb-2 block text-[11px] font-semibold tracking-[0.35em] text-[#606c38] uppercase">
							Ucapan & Doa
						</span>
						<h2 class="font-italiana text-3xl sm:text-4xl text-[#1b2710]">Buku Tamu</h2>
					</div>
					<GuestbookSection
						invitationId={invitation.id}
						settings={content.guestbook}
						initialEntries={initialGuestbook}
						theme="botanical"
					/>
				</div>
			{/if}
		</div>
	</section>

	<!-- Footer -->
	<footer class="relative z-10 border-t border-[#4a6741]/15 px-6 py-12 text-center text-xs text-[#606c38]">
		<p class="font-italiana mb-2 text-xl text-[#1b2710]">
			{content.couple.partner1.name} & {content.couple.partner2.name}
		</p>
		<p>Merupakan kehormatan & kebahagiaan bagi kami atas kehadiran doa restu Anda.</p>
	</footer>
</article>
