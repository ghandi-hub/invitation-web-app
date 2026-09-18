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
	class="relative min-h-screen bg-[#faf6f5] font-sans-clean leading-relaxed text-[#3d2c2e] overflow-x-hidden selection:bg-[#a87474] selection:text-white"
>
	<!-- Tactile Warm Ivory Paper -->
	<PaperTexture opacity={0.04} />

	<!-- Delicate Rococo Corner Flourishes -->
	<div class="absolute top-4 left-4 z-10 opacity-65 sm:top-6 sm:left-6">
		<FloralCorner position="top-left" variant="romantic" size={80} color="#a87474" />
	</div>
	<div class="absolute top-4 right-4 z-10 opacity-65 sm:top-6 sm:right-6">
		<FloralCorner position="top-right" variant="romantic" size={80} color="#a87474" />
	</div>

	<!-- Header -->
	<header class="relative z-10 pt-8 pb-4">
		<ThemeHeader theme="romantic-classic" {content} />
	</header>

	<!-- Monogram Oval Crest -->
	<div class="relative z-10 flex justify-center -mt-4 mb-8">
		<MonogramFrame
			partner1={content.couple.partner1.name}
			partner2={content.couple.partner2.name}
			variant="oval"
			color="#a87474"
			size={110}
		/>
	</div>

	<!-- Cover Photo: Classical Romantic Oval Portrait Frame with Parallax -->
	{#if content.hero?.coverUrl}
		<section class="relative z-10 mx-auto my-6 max-w-4xl px-6 text-center sm:my-10">
			<div class="relative mx-auto max-w-xl">
				<!-- Parallax Floating Flourish Background -->
				<div
					use:parallax={{ speed: 0.12 }}
					class="pointer-events-none absolute -top-8 -left-6 z-0 hidden opacity-40 sm:block text-[#a87474]"
				>
					<FloralCorner position="top-left" variant="romantic" size={90} color="#a87474" />
				</div>

				<!-- Main Oval Frame -->
				<div
					class="relative mx-auto aspect-4/3 sm:aspect-16/11 w-full overflow-hidden rounded-[80px] sm:rounded-[120px] border-4 border-[#a87474]/30 bg-white p-2 sm:p-3 shadow-xl"
				>
					<div class="h-full w-full overflow-hidden rounded-[70px] sm:rounded-[110px]">
						<img
							src={content.hero.coverUrl}
							alt={content.hero.headline}
							class="h-full w-full object-cover"
							loading="eager"
						/>
					</div>
				</div>

				<!-- Parallax Foreground Accent -->
				<div
					use:parallax={{ speed: -0.08 }}
					class="pointer-events-none absolute -bottom-6 -right-4 z-20 opacity-75"
				>
					<FloralCorner position="bottom-right" variant="romantic" size={76} color="#a87474" />
				</div>
			</div>

			{#if content.hero.subheadline}
				<p class="font-cormorant mx-auto mt-8 max-w-md text-base sm:text-lg text-[#7a5555] italic">
					"{content.hero.subheadline}"
				</p>
			{/if}
		</section>
	{/if}

	<BotanicalDivider variant="flourish" color="#a87474" />

	<!-- Opening Quote -->
	{#if content.opening?.quote}
		<section class="relative z-10 mx-auto max-w-2xl px-6 py-10 text-center">
			<Heart class="mx-auto mb-3 h-5 w-5 fill-current text-[#a87474]/70" />
			<blockquote class="font-cormorant text-xl sm:text-2xl leading-relaxed text-[#4a3638] italic">
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
		<BotanicalDivider variant="minimal" color="#a87474" />
	{/if}

	<!-- The Couple Section -->
	<section class="relative z-10 mx-auto max-w-5xl px-6 py-12 sm:py-20">
		<div class="mb-14 text-center">
			<span class="font-script mb-1 block text-2xl sm:text-3xl text-[#a87474]">
				With Joyful Hearts
			</span>
			<h2 class="font-cormorant text-3xl sm:text-5xl text-[#2a1e20] font-normal">
				Mempelai Pengantin
			</h2>
		</div>

		<div class="grid grid-cols-1 items-start gap-12 sm:gap-16 md:grid-cols-2 max-w-4xl mx-auto">
			<!-- Groom -->
			<div class="space-y-4 text-center">
				{#if content.couple.partner1.photoUrl}
					<div
						class="mx-auto h-64 w-52 sm:h-76 sm:w-60 overflow-hidden rounded-t-[100px] border-2 border-[#a87474]/30 bg-white p-2 shadow-md"
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
					<span class="font-script text-xl text-[#a87474] block mb-0.5">Mempelai Pria</span>
					<h3 class="font-cormorant text-2xl sm:text-3xl font-medium text-[#2a1e20]">
						{content.couple.partner1.fullName || content.couple.partner1.name}
					</h3>
					{#if content.couple.partner1.childOf}
						<p class="mx-auto mt-2 max-w-xs text-xs sm:text-sm text-[#7a5555] font-serif italic">
							{content.couple.partner1.childOf}
						</p>
					{/if}
				</div>
			</div>

			<!-- Bride -->
			<div class="space-y-4 text-center">
				{#if content.couple.partner2.photoUrl}
					<div
						class="mx-auto h-64 w-52 sm:h-76 sm:w-60 overflow-hidden rounded-t-[100px] border-2 border-[#a87474]/30 bg-white p-2 shadow-md"
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
					<span class="font-script text-xl text-[#a87474] block mb-0.5">Mempelai Wanita</span>
					<h3 class="font-cormorant text-2xl sm:text-3xl font-medium text-[#2a1e20]">
						{content.couple.partner2.fullName || content.couple.partner2.name}
					</h3>
					{#if content.couple.partner2.childOf}
						<p class="mx-auto mt-2 max-w-xs text-xs sm:text-sm text-[#7a5555] font-serif italic">
							{content.couple.partner2.childOf}
						</p>
					{/if}
				</div>
			</div>
		</div>
	</section>

	<!-- Story -->
	{#if content.story?.body}
		<section class="relative z-10 border-y border-[#a87474]/20 bg-[#f3eae8]/70 px-6 py-14 sm:py-20 backdrop-blur-xs">
			<div class="mx-auto max-w-2xl space-y-4 text-center">
				<span class="font-script block text-2xl sm:text-3xl text-[#a87474]">
					Our Love Story
				</span>
				<h2 class="font-cormorant text-3xl sm:text-4xl text-[#2a1e20]">
					{content.story.title || 'A Journey of Two Hearts'}
				</h2>
				<p class="font-cormorant text-base sm:text-lg leading-relaxed whitespace-pre-wrap text-[#553b3d] italic">
					{content.story.body}
				</p>
			</div>
		</section>
	{/if}

	<!-- Events -->
	{#if content.events && content.events.length > 0}
		<section class="relative z-10 mx-auto max-w-5xl px-6 py-14 sm:py-24">
			<div class="mb-14 text-center">
				<span class="font-script mb-1 block text-2xl sm:text-3xl text-[#a87474]">Save The Date</span>
				<h2 class="font-cormorant text-3xl sm:text-5xl text-[#2a1e20]">Rangkaian Acara</h2>
			</div>

			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
				{#each content.events as event}
					<div
						class="relative space-y-5 rounded-xl border border-[#a87474]/20 bg-white/95 p-8 text-center shadow-xs transition-shadow hover:shadow-md"
					>
						<h3 class="font-cormorant text-2xl font-medium text-[#2a1e20]">{event.title}</h3>
						<div class="mx-auto h-px w-10 bg-[#a87474]/30"></div>

						<div class="space-y-2.5 text-xs sm:text-sm text-[#7a5555]">
							<div class="flex items-center justify-center gap-2">
								<Calendar class="h-4 w-4 text-[#a87474]" />
								<span class="font-medium text-[#2a1e20]">{event.date}</span>
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
							<div class="pt-3">
								<a
									href={event.mapsUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center gap-2 rounded-full border border-[#a87474] bg-[#a87474] px-5 py-2.5 text-xs font-semibold tracking-wider text-white uppercase transition-all hover:bg-[#8e5e5e]"
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
		<section class="relative z-10 bg-[#593d40] px-6 py-14 text-center text-white sm:py-20 shadow-inner">
			<div class="mx-auto max-w-2xl space-y-6">
				<span class="font-script block text-2xl text-[#f3d2d2]">
					Counting Down The Days
				</span>
				<Countdown targetDate={content.countdown.targetDate} variant="romantic" />
			</div>
		</section>
	{/if}

	<!-- Gallery -->
	{#if content.gallery && content.gallery.length > 0}
		<section class="relative z-10 mx-auto max-w-6xl px-6 py-14 sm:py-24">
			<div class="mb-14 text-center">
				<span class="font-script mb-1 block text-2xl sm:text-3xl text-[#a87474]">Sweet Memories</span>
				<h2 class="font-cormorant text-3xl sm:text-5xl text-[#2a1e20]">Galeri Momen</h2>
			</div>

			<div class="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
				{#each content.gallery as item}
					<div
						class="group aspect-3/4 overflow-hidden rounded-2xl border border-[#a87474]/20 bg-white p-1.5 shadow-xs"
					>
						<div class="relative h-full w-full overflow-hidden rounded-xl">
							<img
								src={item.url}
								alt="Gallery item"
								class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
								loading="lazy"
							/>
						</div>
					</div>
				{/each}
			</div>
		</section>
	{/if}

	<!-- Interactive Section -->
	<section class="relative z-10 border-t border-[#a87474]/20 bg-[#f3eae8]/50 px-6 py-14 sm:py-24">
		<div class="mx-auto max-w-3xl space-y-16">
			{#if content.rsvp?.enabled}
				<div>
					<div class="mb-10 text-center">
						<span class="font-script block text-2xl text-[#a87474]">RSVP</span>
						<h2 class="font-cormorant text-3xl sm:text-4xl text-[#2a1e20]">Konfirmasi Kehadiran</h2>
					</div>
					<div class="[&_button[type=submit]]:rounded-full [&_button[type=submit]]:bg-[#a87474] [&_button[type=submit]]:hover:bg-[#8e5e5e]">
						<RSVPSection invitationId={invitation.id} settings={content.rsvp} theme="romantic" />
					</div>
				</div>
			{/if}

			{#if content.gift?.enabled}
				<div class="border-t border-[#a87474]/20 pt-8">
					<div class="mb-10 text-center">
						<span class="font-script block text-2xl text-[#a87474]">Wedding Gift</span>
						<h2 class="font-cormorant text-3xl sm:text-4xl text-[#2a1e20]">Tanda Kasih</h2>
					</div>
					<GiftSection gift={content.gift} theme="romantic" />
				</div>
			{/if}

			{#if content.guestbook?.enabled}
				<div class="border-t border-[#a87474]/20 pt-8">
					<div class="mb-10 text-center">
						<span class="font-script block text-2xl text-[#a87474]">Wishes</span>
						<h2 class="font-cormorant text-3xl sm:text-4xl text-[#2a1e20]">Doa & Ucapan</h2>
					</div>
					<GuestbookSection
						invitationId={invitation.id}
						settings={content.guestbook}
						initialEntries={initialGuestbook}
						theme="romantic"
					/>
				</div>
			{/if}
		</div>
	</section>

	<!-- Footer -->
	<footer class="relative z-10 border-t border-[#a87474]/20 px-6 py-12 text-center text-xs text-[#7a5555]">
		<p class="font-cormorant mb-1 text-xl text-[#2a1e20]">
			{content.couple.partner1.name} & {content.couple.partner2.name}
		</p>
		<p>Terima kasih atas segala doa restu Anda yang teramat berharga bagi kami.</p>
	</footer>
</article>
