<script lang="ts">
	import ThemeHeader from '$lib/invitation/ThemeHeader.svelte';
	import type { Invitation, GuestbookItem } from '$lib/types/invitation';
	import Countdown from '$lib/invitation/components/Countdown.svelte';
	import RSVPSection from '$lib/invitation/components/RSVPSection.svelte';
	import GuestbookSection from '$lib/invitation/components/GuestbookSection.svelte';
	import GiftSection from '$lib/invitation/components/GiftSection.svelte';
	import GununganOrnament from '$lib/invitation/ornaments/GununganOrnament.svelte';
	import GebyokCorner from '$lib/invitation/ornaments/GebyokCorner.svelte';
	import JavaneseDivider from '$lib/invitation/ornaments/JavaneseDivider.svelte';
	import BatikKawungTexture from '$lib/invitation/ornaments/BatikKawungTexture.svelte';
	import MelatiFloating from '$lib/invitation/ornaments/MelatiFloating.svelte';
	import MonogramFrame from '$lib/invitation/ornaments/MonogramFrame.svelte';
	import PaperTexture from '$lib/invitation/ornaments/PaperTexture.svelte';
	import { parallax } from '$lib/actions/parallax';
	import { scrollReveal } from '$lib/actions/scrollReveal';
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
	class="javanese-heritage relative min-h-screen bg-[#faf5eb] text-[#2b1810] font-sans-clean leading-relaxed overflow-x-hidden selection:bg-[#c59b27] selection:text-white"
>
	<!-- Layer 1: Background Atmospheric Textures (Paper Grain + Batik Kawung) -->
	<PaperTexture opacity={0.05} />
	<BatikKawungTexture opacity={0.045} color="#4a2e18" />

	<!-- Layer 3: Foreground Delicate Floating Jasmine Blossoms & Ronce Buds -->
	<MelatiFloating count={7} />

	<!-- Top Corner Ornaments (Jepara Gebyok Woodcarving & Prada Gold) -->
	<div class="pointer-events-none absolute top-3 left-3 z-10 opacity-75 sm:top-6 sm:left-6">
		<GebyokCorner position="top-left" size={88} color="#c59b27" />
	</div>
	<div class="pointer-events-none absolute top-3 right-3 z-10 opacity-75 sm:top-6 sm:right-6">
		<GebyokCorner position="top-right" size={88} color="#c59b27" />
	</div>

	<!-- Theme Header (Pawiwahan Ageng) -->
	<header class="relative z-10 pt-10 pb-4">
		<ThemeHeader theme="javanese-heritage" {content} />
	</header>

	<!-- Royal Monogram Seal with Asthabrata Lotus Petals & Aksara Jawa -->
	<div class="relative z-10 flex justify-center -mt-3 mb-10">
		<MonogramFrame
			partner1={content.couple.partner1.name}
			partner2={content.couple.partner2.name}
			variant="keraton"
			color="#c59b27"
			size={120}
		/>
	</div>

	<!-- Hero Cover Photo Section with Layered Gunungan Arch -->
	{#if content.hero?.coverUrl}
		<section class="relative z-10 mx-auto my-6 max-w-4xl px-4 sm:px-6">
			<div class="relative mx-auto max-w-2xl">
				<!-- Parallax Background Layer: Gunungan Kayon Silhouette -->
				<div
					use:parallax={{ speed: 0.15 }}
					class="pointer-events-none absolute -top-12 -left-10 z-0 hidden opacity-35 sm:block text-[#c59b27]"
				>
					<GununganOrnament variant="silhouette" size={140} color="#c59b27" />
				</div>

				<div
					use:parallax={{ speed: 0.12 }}
					class="pointer-events-none absolute -top-12 -right-10 z-0 hidden opacity-35 sm:block text-[#c59b27] -scale-x-100"
				>
					<GununganOrnament variant="silhouette" size={140} color="#c59b27" />
				</div>

				<!-- Main Arch Frame (Keraton Joglo Gateway) -->
				<div class="relative overflow-hidden rounded-t-[140px] sm:rounded-t-[200px] border-2 border-[#c59b27]/40 bg-[#fffdfa] p-3 sm:p-4 shadow-xl">
					<!-- Gunungan Arch Crest Cap -->
					<div class="absolute top-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-[#c59b27]">
						<GununganOrnament variant="arch-cap" size={76} color="#c59b27" />
					</div>

					<div class="aspect-4/5 sm:aspect-16/11 overflow-hidden rounded-t-[130px] sm:rounded-t-[188px] relative border border-[#c59b27]/25">
						<img
							src={content.hero.coverUrl}
							alt={content.hero.headline || 'Foto Mempelai'}
							class="h-full w-full object-cover"
							loading="eager"
						/>
						<!-- Gentle gold/sepia gradient vignette -->
						<div class="absolute inset-0 bg-gradient-to-t from-[#2b1810]/40 via-transparent to-transparent pointer-events-none"></div>
					</div>
				</div>

				<!-- Parallax Foreground Layer: Gebyok Carved Corner overlapping the frame -->
				<div
					use:parallax={{ speed: -0.1 }}
					class="pointer-events-none absolute -bottom-6 -right-3 z-20 opacity-90 text-[#7a4b27]"
				>
					<GebyokCorner position="bottom-right" size={76} color="#c59b27" />
				</div>
				<div
					use:parallax={{ speed: -0.08 }}
					class="pointer-events-none absolute -bottom-6 -left-3 z-20 opacity-90 text-[#7a4b27]"
				>
					<GebyokCorner position="bottom-left" size={76} color="#c59b27" />
				</div>
			</div>

			{#if content.hero.subheadline}
				<div class="mx-auto mt-10 max-w-lg text-center">
					<p class="font-cormorant text-lg sm:text-xl font-medium text-[#7a4b27] italic">
						"{content.hero.subheadline}"
					</p>
				</div>
			{/if}
		</section>
	{/if}

	<JavaneseDivider variant="gunungan" color="#c59b27" />

	<!-- Opening Quote & Javanese Blessing (Purwaka) -->
	{#if content.opening?.quote}
		<section class="relative z-10 mx-auto max-w-3xl px-6 py-10 text-center">
			<!-- Aksara Jawa / Keraton Blessing Subtitle -->
			<div use:scrollReveal class="mb-3">
				<span class="inline-block border-y border-[#c59b27]/40 px-4 py-1 font-cinzel text-[10px] tracking-[0.3em] uppercase text-[#7a4b27]">
					Purwaka & Pandonga
				</span>
			</div>

			<blockquote
				use:scrollReveal={{ variant: 'blur-in', duration: 900 }}
				class="font-cormorant text-xl sm:text-2xl leading-relaxed text-[#2b1810] italic"
			>
				"{content.opening.quote}"
			</blockquote>

			{#if content.opening.quoteSource}
				<cite
					use:scrollReveal={{ delay: 150 }}
					class="mt-4 block font-cinzel text-xs font-semibold tracking-[0.25em] text-[#7a4b27] uppercase not-italic"
				>
					— {content.opening.quoteSource}
				</cite>
			{/if}
		</section>
		<JavaneseDivider variant="minimal" color="#c59b27" />
	{/if}

	<!-- Couple Section (Pinanganten / Mempelai) -->
	<section class="relative z-10 mx-auto max-w-5xl px-6 py-14 sm:py-24">
		<!-- Atmospheric Gunungan Backdrop Watermark -->
		<div class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-15">
			<GununganOrnament variant="full" size={320} color="#c59b27" />
		</div>

		<div use:scrollReveal class="relative z-10 mb-16 text-center">
			<span class="mb-2 block font-cinzel text-[11px] font-semibold tracking-[0.4em] text-[#7a4b27] uppercase">
				Pinanganten Pawiwahan
			</span>
			<h2 class="font-cinzel text-3xl sm:text-5xl font-normal text-[#2b1810]">
				Sang Pengantin
			</h2>
			<div class="mx-auto mt-3 h-0.5 w-16 bg-[#c59b27]/60"></div>
		</div>

		<div class="relative z-10 grid grid-cols-1 items-start gap-12 sm:gap-16 md:grid-cols-2 max-w-4xl mx-auto">
			<!-- Groom (Pinanganten Kakung) -->
			<div class="relative space-y-5 text-center group">
				{#if content.couple.partner1.photoUrl}
					<div
						class="relative mx-auto h-68 w-56 sm:h-80 sm:w-64 overflow-hidden rounded-t-[110px] border-2 border-[#c59b27]/40 bg-[#fffdfa] p-2.5 shadow-lg"
					>
						<!-- Corner Gold Accent -->
						<div class="absolute top-2 right-2 z-10 opacity-70">
							<GebyokCorner position="top-right" size={36} color="#c59b27" />
						</div>

						<img
							use:parallax={{ speed: 0.02, scale: 1.06 }}
							src={content.couple.partner1.photoUrl}
							alt={content.couple.partner1.name}
							class="h-full w-full rounded-t-[98px] object-cover"
							loading="lazy"
						/>
					</div>
				{/if}
				<div use:scrollReveal={{ delay: 100 }} class="space-y-2">
					<span class="inline-block border-b border-[#c59b27]/40 pb-0.5 font-cinzel text-[10px] tracking-[0.35em] font-semibold uppercase text-[#7a4b27]">
						Pengantin Pria
					</span>
					<h3 class="font-cinzel text-2xl sm:text-3xl text-[#2b1810]">
						{content.couple.partner1.fullName || content.couple.partner1.name}
					</h3>
					{#if content.couple.partner1.childOf}
						<p class="mx-auto max-w-xs text-xs sm:text-sm text-[#7a4b27] font-cormorant italic leading-relaxed">
							{content.couple.partner1.childOf}
						</p>
					{/if}
				</div>
			</div>

			<!-- Bride (Pinanganten Putri) -->
			<div class="relative space-y-5 text-center group">
				{#if content.couple.partner2.photoUrl}
					<div
						class="relative mx-auto h-68 w-56 sm:h-80 sm:w-64 overflow-hidden rounded-t-[110px] border-2 border-[#c59b27]/40 bg-[#fffdfa] p-2.5 shadow-lg"
					>
						<!-- Corner Gold Accent -->
						<div class="absolute top-2 left-2 z-10 opacity-70">
							<GebyokCorner position="top-left" size={36} color="#c59b27" />
						</div>

						<img
							use:parallax={{ speed: 0.02, scale: 1.06 }}
							src={content.couple.partner2.photoUrl}
							alt={content.couple.partner2.name}
							class="h-full w-full rounded-t-[98px] object-cover"
							loading="lazy"
						/>
					</div>
				{/if}
				<div use:scrollReveal={{ delay: 100 }} class="space-y-2">
					<span class="inline-block border-b border-[#c59b27]/40 pb-0.5 font-cinzel text-[10px] tracking-[0.35em] font-semibold uppercase text-[#7a4b27]">
						Pengantin Wanita
					</span>
					<h3 class="font-cinzel text-2xl sm:text-3xl text-[#2b1810]">
						{content.couple.partner2.fullName || content.couple.partner2.name}
					</h3>
					{#if content.couple.partner2.childOf}
						<p class="mx-auto max-w-xs text-xs sm:text-sm text-[#7a4b27] font-cormorant italic leading-relaxed">
							{content.couple.partner2.childOf}
						</p>
					{/if}
				</div>
			</div>
		</div>
	</section>

	<!-- Story Section (Serat Tresna / Cerita Cinta) -->
	{#if content.story?.body}
		<section class="relative z-10 border-y border-[#c59b27]/30 bg-[#f4ece0]/90 px-6 py-16 sm:py-24 backdrop-blur-xs">
			<div class="pointer-events-none absolute top-3 left-3 opacity-50">
				<GebyokCorner position="top-left" size={60} color="#c59b27" />
			</div>
			<div class="pointer-events-none absolute bottom-3 right-3 opacity-50">
				<GebyokCorner position="bottom-right" size={60} color="#c59b27" />
			</div>

			<div use:scrollReveal class="mx-auto max-w-2xl space-y-6 text-center">
				<span class="block font-cinzel text-[11px] font-semibold tracking-[0.4em] text-[#7a4b27] uppercase">
					Lelampahan Tresna
				</span>
				<h2 class="font-cinzel text-3xl sm:text-4xl text-[#2b1810]">
					{content.story.title || 'Serat Tresna'}
				</h2>
				<div class="mx-auto h-px w-20 bg-[#c59b27]/60"></div>
				<p class="font-sans text-sm sm:text-base leading-relaxed whitespace-pre-wrap text-[#2b1810]/85">
					{content.story.body}
				</p>
			</div>
		</section>
	{/if}

	<!-- Wedding Events (Rangkaian Adicara Pawiwahan) -->
	{#if content.events && content.events.length > 0}
		<section class="relative z-10 mx-auto max-w-5xl px-6 py-16 sm:py-24">
			<div use:scrollReveal class="mb-14 text-center">
				<span class="mb-2 block font-cinzel text-[11px] font-semibold tracking-[0.4em] text-[#7a4b27] uppercase">
					Titik Wanci & Papan Adicara
				</span>
				<h2 class="font-cinzel text-3xl sm:text-5xl text-[#2b1810]">
					Rangkaian Acara
				</h2>
				<div class="mx-auto mt-3 h-0.5 w-16 bg-[#c59b27]/60"></div>
			</div>

			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
				{#each content.events as event}
					<div
						class="relative space-y-5 rounded-xl border-2 border-[#c59b27]/30 bg-[#fffdfa]/95 p-8 text-center shadow-md transition-all hover:shadow-xl hover:border-[#c59b27]/60"
					>
						<!-- Corner Ornament Accent -->
						<div class="absolute top-2 right-2 opacity-50">
							<GebyokCorner position="top-right" size={48} color="#c59b27" />
						</div>

						<!-- Event Title -->
						<div class="space-y-1">
							<span class="text-[9px] font-cinzel font-semibold tracking-[0.3em] uppercase text-[#7a4b27]">
								Adicara
							</span>
							<h3 class="font-cinzel text-2xl text-[#2b1810]">{event.title}</h3>
						</div>

						<div class="mx-auto h-px w-14 bg-[#c59b27]/50"></div>

						<!-- Time & Date Info -->
						<div class="space-y-3 text-xs sm:text-sm text-[#7a4b27]">
							<div class="flex items-center justify-center gap-2">
								<Calendar class="h-4 w-4 text-[#c59b27]" />
								<span class="font-semibold text-[#2b1810]">{event.date}</span>
							</div>
							<div class="flex items-center justify-center gap-2">
								<Clock class="h-4 w-4 text-[#c59b27]" />
								<span>{event.startTime} - {event.endTime} WIB</span>
							</div>
							<div class="flex items-start justify-center gap-2 pt-2">
								<MapPin class="mt-0.5 h-4 w-4 shrink-0 text-[#c59b27]" />
								<div>
									<p class="font-semibold text-[#2b1810]">{event.venue}</p>
									<p class="mt-0.5 text-xs text-[#7a4b27]">{event.address}</p>
								</div>
							</div>
						</div>

						<!-- Maps Location Button -->
						{#if event.mapsUrl}
							<div class="pt-3">
								<a
									href={event.mapsUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center gap-2 rounded-full border border-[#c59b27] bg-[#2b1810] px-6 py-2.5 text-xs font-semibold tracking-wider text-[#faf5eb] uppercase transition-all hover:bg-[#c59b27] hover:text-[#1c120a] shadow-xs"
								>
									<span>Pitedah Lokasi</span>
									<ExternalLink class="h-3.5 w-3.5" />
								</a>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</section>
	{/if}

	<!-- Countdown Timer Section (Ngetang Dinten - Deep Royal Keraton Midnight Palette) -->
	{#if content.countdown?.targetDate}
		<section class="relative z-10 bg-[#1c120a] px-6 py-16 text-center text-[#faf5eb] sm:py-24 shadow-inner overflow-hidden">
			<!-- Flanking Gunungan Silhouettes -->
			<div class="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 opacity-15 hidden sm:block">
				<GununganOrnament variant="full" size={160} color="#c59b27" />
			</div>
			<div class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 opacity-15 -scale-x-100 hidden sm:block">
				<GununganOrnament variant="full" size={160} color="#c59b27" />
			</div>

			<div class="relative z-10 mx-auto max-w-2xl space-y-6">
				<div class="inline-flex items-center gap-2 text-[#c59b27]">
					<span class="text-xs">❖</span>
					<span class="font-cinzel text-[11px] font-semibold tracking-[0.4em] uppercase text-[#dfb743]">
						Ngetang Dinten Bahagia
					</span>
					<span class="text-xs">❖</span>
				</div>

				<div class="[&_.text-2xl]:font-cinzel [&_.text-2xl]:text-[#dfb743] [&_.sm\\:text-4xl]:text-[#dfb743]">
					<Countdown targetDate={content.countdown.targetDate} variant="editorial" />
				</div>
			</div>
		</section>
	{/if}

	<!-- Photo Gallery (Pasinaon Momen / Galeri Momen) -->
	{#if content.gallery && content.gallery.length > 0}
		<section class="relative z-10 mx-auto max-w-6xl px-6 py-16 sm:py-24">
			<div class="mb-14 text-center">
				<span class="mb-2 block font-cinzel text-[11px] font-semibold tracking-[0.4em] text-[#7a4b27] uppercase">
					Momen Kabagyan
				</span>
				<h2 class="font-cinzel text-3xl sm:text-5xl text-[#2b1810]">
					Galeri Momen
				</h2>
				<div class="mx-auto mt-3 h-0.5 w-16 bg-[#c59b27]/60"></div>
			</div>

			<div class="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
				{#each content.gallery as item}
					<div
						class="group aspect-3/4 overflow-hidden rounded-xl border-2 border-[#c59b27]/30 bg-[#fffdfa] p-2 shadow-xs transition-all hover:border-[#c59b27] hover:shadow-md"
					>
						<div class="relative h-full w-full overflow-hidden rounded-lg">
							<img
								src={item.url}
								alt={item.caption || 'Foto Galeri Pawiwahan'}
								class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
								loading="lazy"
							/>
							{#if item.caption}
								<div
									class="absolute inset-0 flex items-end bg-gradient-to-t from-[#1c120a]/80 via-transparent to-transparent p-3 text-xs text-[#faf5eb] opacity-0 transition-opacity group-hover:opacity-100"
								>
									<p class="font-cormorant italic">{item.caption}</p>
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</section>
	{/if}

	<!-- RSVP & Interactive Section (Pawartos Rawuh, Tanda Tresna & Buku Rawuh) -->
	<section class="relative z-10 border-t border-[#c59b27]/25 bg-[#f4ece0]/70 px-6 py-16 sm:py-24">
		<div class="mx-auto max-w-3xl space-y-16">
			{#if content.rsvp?.enabled}
				<div>
					<div class="mb-10 text-center">
						<span class="mb-2 block font-cinzel text-[11px] font-semibold tracking-[0.4em] text-[#7a4b27] uppercase">
							Pawartos Rawuh
						</span>
						<h2 class="font-cinzel text-3xl sm:text-4xl text-[#2b1810]">
							Konfirmasi Kehadiran
						</h2>
						<div class="mx-auto mt-2 h-0.5 w-12 bg-[#c59b27]/60"></div>
					</div>
					<!-- Custom Styled RSVP Container with Javanese Heritage Palette -->
					<div
						class="[&_button[type=submit]]:rounded-full [&_button[type=submit]]:bg-[#2b1810] [&_button[type=submit]]:border [&_button[type=submit]]:border-[#c59b27] [&_button[type=submit]]:text-[#faf5eb] [&_button[type=submit]]:font-cinzel [&_button[type=submit]]:hover:bg-[#c59b27] [&_button[type=submit]]:hover:text-[#1c120a] [&_input]:bg-[#fffdfa] [&_input]:border-[#c59b27]/40 [&_textarea]:bg-[#fffdfa] [&_textarea]:border-[#c59b27]/40 [&_select]:bg-[#fffdfa] [&_select]:border-[#c59b27]/40"
					>
						<RSVPSection invitationId={invitation.id} settings={content.rsvp} theme="javanese-heritage" />
					</div>
				</div>
			{/if}

			{#if content.gift?.enabled}
				<div class="border-t border-[#c59b27]/25 pt-10">
					<div class="mb-10 text-center">
						<span class="mb-2 block font-cinzel text-[11px] font-semibold tracking-[0.4em] text-[#7a4b27] uppercase">
							Tanda Tresna
						</span>
						<h2 class="font-cinzel text-3xl sm:text-4xl text-[#2b1810]">
							Kirim Kado / Tanda Kasih
						</h2>
						<div class="mx-auto mt-2 h-0.5 w-12 bg-[#c59b27]/60"></div>
					</div>
					<div
						class="[&_button]:rounded-full [&_button]:border-[#c59b27] [&_button]:hover:bg-[#c59b27] [&_button]:hover:text-[#1c120a] [&_.rounded-xl]:border-[#c59b27]/30 [&_.rounded-xl]:bg-[#fffdfa]/90"
					>
						<GiftSection gift={content.gift} theme="javanese-heritage" />
					</div>
				</div>
			{/if}

			{#if content.guestbook?.enabled}
				<div class="border-t border-[#c59b27]/25 pt-10">
					<div class="mb-10 text-center">
						<span class="mb-2 block font-cinzel text-[11px] font-semibold tracking-[0.4em] text-[#7a4b27] uppercase">
							Pangestu & Pandonga
						</span>
						<h2 class="font-cinzel text-3xl sm:text-4xl text-[#2b1810]">
							Buku Tamu / Rawuh
						</h2>
						<div class="mx-auto mt-2 h-0.5 w-12 bg-[#c59b27]/60"></div>
					</div>
					<div
						class="[&_button[type=submit]]:rounded-full [&_button[type=submit]]:bg-[#2b1810] [&_button[type=submit]]:border [&_button[type=submit]]:border-[#c59b27] [&_button[type=submit]]:text-[#faf5eb] [&_button[type=submit]]:font-cinzel [&_button[type=submit]]:hover:bg-[#c59b27] [&_button[type=submit]]:hover:text-[#1c120a] [&_input]:bg-[#fffdfa] [&_input]:border-[#c59b27]/40 [&_textarea]:bg-[#fffdfa] [&_textarea]:border-[#c59b27]/40 [&_.guestbook-entry]:border-[#c59b27]/25 [&_.guestbook-entry]:bg-[#fffdfa]/90"
					>
						<GuestbookSection
							invitationId={invitation.id}
							settings={content.guestbook}
							initialEntries={initialGuestbook}
							theme="javanese-heritage"
						/>
					</div>
				</div>
			{/if}
		</div>
	</section>

	<!-- Footer / Panutup -->
	<footer class="relative z-10 border-t border-[#c59b27]/25 px-6 py-14 text-center text-xs text-[#7a4b27] space-y-4">
		<div class="flex justify-center">
			<GununganOrnament variant="divider" size={32} color="#c59b27" />
		</div>
		<p class="font-cinzel text-xl sm:text-2xl text-[#2b1810]">
			{content.couple.partner1.name} <span class="font-cormorant italic text-[#c59b27]">&</span> {content.couple.partner2.name}
		</p>
		<p class="max-w-md mx-auto leading-relaxed">
			Matur nuwun sanget awit saking sih kawigatosan, donga, lan pangestu panjenengan sami dumateng pinanganten kekalih.
		</p>
		<p class="text-[10px] tracking-widest text-[#c59b27] uppercase font-cinzel">
			Mugi Tansah Rahayu Widodo Basuki
		</p>
	</footer>
</article>
