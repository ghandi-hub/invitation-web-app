<script lang="ts">
	import type { EventDocument, GuestDocument } from '$lib/types';
	import { parallax } from '$lib/actions/parallax';
	import { formatDate, formatTime } from '$lib/utils';
	import DigitalEnvelope from '$lib/components/core/DigitalEnvelope.svelte';
	import RsvpSection from '$lib/components/core/RsvpSection.svelte';
	import { Calendar, MapPin, ExternalLink, Heart, Sparkles, Moon } from '@lucide/svelte';

	interface Props {
		event: EventDocument;
		guest?: GuestDocument | null;
		greetings?: GuestDocument[];
	}

	let { event, guest, greetings = [] }: Props = $props();

	const honored = $derived(event.content.honored);
	const schedules = $derived(event.content.schedules || []);
	const galleries = $derived(event.content.galleries || []);
	const gifts = $derived(event.content.giftRegistries || []);
</script>

<div class="relative min-h-screen bg-stone-950 text-stone-100 overflow-x-hidden selection:bg-amber-400 selection:text-stone-950 font-sans">
	<!-- Background Ambient Glows -->
	<div class="pointer-events-none fixed inset-0 z-0">
		<div
			use:parallax={{ speed: 0.08 }}
			class="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-emerald-900/30 blur-[120px]"
		></div>
		<div
			use:parallax={{ speed: -0.05 }}
			class="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full bg-teal-900/20 blur-[140px]"
		></div>
	</div>

	<!-- SECTION: HERO -->
	<header class="relative z-20 min-h-screen flex flex-col items-center justify-center text-center px-4 py-16">
		<!-- Top Islamic Ornament Arch -->
		<div use:parallax={{ speed: 0.2 }} class="mb-4 text-amber-400/90 flex flex-col items-center">
			<Moon class="w-10 h-10 mb-2 drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]" />
			<p class="font-serif text-2xl md:text-3xl text-amber-300/90 tracking-wide font-normal">
				بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
			</p>
			<p class="text-xs uppercase tracking-widest text-emerald-400/80 mt-2">
				Walimatul Khitan
			</p>
		</div>

		<!-- Honored Name -->
		<div class="my-6 max-w-xl">
			{#if honored.avatarUrl}
				<div class="relative mx-auto mb-6 w-36 h-36 md:w-44 md:h-44 rounded-full p-1.5 bg-gradient-to-tr from-amber-400 via-emerald-500 to-amber-300 shadow-2xl">
					<img
						src={honored.avatarUrl}
						alt={honored.name}
						class="w-full h-full object-cover rounded-full border-4 border-stone-950"
					/>
				</div>
			{/if}

			<h1 class="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight drop-shadow-md">
				{honored.name}
			</h1>

			{#if honored.roleOrTitle}
				<p class="text-base md:text-lg font-medium text-amber-300 mt-2">
					{honored.roleOrTitle}
				</p>
			{/if}

			{#if honored.parentNames}
				<p class="text-xs md:text-sm text-stone-400 mt-1">
					{honored.parentNames}
				</p>
			{/if}
		</div>

		<!-- Quote / Doa -->
		{#if event.content.quote}
			<div class="max-w-lg mt-6 p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/20 backdrop-blur-sm text-center">
				<p class="text-sm italic text-stone-300 leading-relaxed">
					"{event.content.quote.text}"
				</p>
				{#if event.content.quote.source}
					<p class="text-xs font-semibold text-amber-400 mt-3 uppercase tracking-wider">
						— {event.content.quote.source}
					</p>
				{/if}
			</div>
		{/if}

		<!-- Scroll Indicator -->
		<div class="mt-12 text-stone-500 text-xs flex flex-col items-center gap-2 animate-pulse">
			<span>Gulir ke bawah</span>
			<div class="w-4 h-7 rounded-full border-2 border-stone-600 flex justify-center p-1">
				<div class="w-1 h-2 bg-amber-400 rounded-full animate-bounce"></div>
			</div>
		</div>
	</header>

	<!-- SECTION: SCHEDULE / ACARA -->
	<section class="relative z-20 py-16 px-4 max-w-4xl mx-auto">
		<div class="text-center mb-12">
			<span class="text-xs font-semibold text-amber-400 uppercase tracking-widest">Waktu &amp; Tempat</span>
			<h2 class="text-3xl font-serif font-bold text-white mt-1">Rangkaian Acara</h2>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			{#each schedules as schedule, idx}
				<div class="rounded-3xl bg-gradient-to-b from-emerald-950/50 to-stone-900/80 border border-emerald-500/20 p-6 md:p-8 backdrop-blur-md shadow-xl flex flex-col justify-between">
					<div>
						<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20 text-xs font-medium mb-4">
							<Calendar class="w-3.5 h-3.5" />
							<span>{schedule.title}</span>
						</div>

						<div class="space-y-2 mb-6">
							<p class="text-lg font-bold text-white">
								{formatDate(schedule.startTime)}
							</p>
							<p class="text-sm text-amber-300 font-mono">
								{formatTime(schedule.startTime)}
								{#if schedule.endTime}
									- {formatTime(schedule.endTime)}
								{/if}
							</p>
						</div>

						<div class="border-t border-white/10 pt-4 space-y-2">
							<p class="text-sm font-semibold text-stone-200 flex items-center gap-2">
								<MapPin class="w-4 h-4 text-emerald-400 shrink-0" />
								<span>{schedule.venue}</span>
							</p>
							<p class="text-xs text-stone-400 pl-6 leading-relaxed">
								{schedule.address}
							</p>
						</div>
					</div>

					{#if schedule.mapsUrl}
						<div class="mt-6 pt-2">
							<a
								href={schedule.mapsUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 transition shadow-md shadow-amber-400/20"
							>
								<ExternalLink class="w-3.5 h-3.5" />
								<span>Buka Petunjuk Google Maps</span>
							</a>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</section>

	<!-- SECTION: GALLERIES -->
	{#if galleries.length > 0}
		<section class="relative z-20 py-16 px-4 max-w-4xl mx-auto">
			<div class="text-center mb-10">
				<span class="text-xs font-semibold text-amber-400 uppercase tracking-widest">Dokumentasi</span>
				<h2 class="text-3xl font-serif font-bold text-white mt-1">Galeri Kenangan</h2>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				{#each galleries as photo, idx}
					<div class="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-stone-900 border border-emerald-500/20 shadow-lg">
						<img
							src={photo.url}
							alt={photo.caption || 'Foto Galeri'}
							class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
							loading="lazy"
						/>
						{#if photo.caption}
							<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
								<p class="text-xs text-white font-medium">{photo.caption}</p>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</section>
	{/if}

	<!-- SECTION: DIGITAL ENVELOPE / GIFTS -->
	{#if event.features.giftEnabled && gifts.length > 0}
		<DigitalEnvelope giftRegistries={gifts} themeId={event.themeId} />
	{/if}

	<!-- SECTION: RSVP & GUESTBOOK -->
	{#if event.features.rsvpEnabled}
		<RsvpSection
			slug={event.slug}
			recipientName={guest?.name}
			initialGreetings={greetings}
			themeId={event.themeId}
		/>
	{/if}

	<!-- FOOTER -->
	<footer class="relative z-20 py-12 text-center text-stone-500 text-xs border-t border-white/5">
		<p class="mb-2">Merupakan suatu kehormatan & kebahagiaan atas kehadiran Bapak/Ibu/Saudara/i.</p>
		<p class="font-serif text-sm text-stone-400">{event.content.hosts.join(' & ')}</p>
	</footer>
</div>
