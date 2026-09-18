<script lang="ts">
	import type { EventDocument, GuestDocument } from '$lib/types';
	import { parallax } from '$lib/actions/parallax';
	import { formatDate, formatTime } from '$lib/utils';
	import DigitalEnvelope from '$lib/components/core/DigitalEnvelope.svelte';
	import RsvpSection from '$lib/components/core/RsvpSection.svelte';
	import { Calendar, MapPin, ExternalLink, Heart, Clock } from 'lucide-svelte';
	import { onMount } from 'svelte';

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

	// Countdown logic to the first schedule
	let countdown = $state({ days: 0, hours: 0, minutes: 0, seconds: 0 });

	function updateCountdown() {
		if (schedules.length === 0) return;
		const target = new Date(schedules[0].startTime).getTime();
		const now = Date.now();
		const diff = target - now;

		if (diff > 0) {
			countdown = {
				days: Math.floor(diff / (1000 * 60 * 60 * 24)),
				hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
				minutes: Math.floor((diff / 1000 / 60) % 60),
				seconds: Math.floor((diff / 1000) % 60)
			};
		}
	}

	onMount(() => {
		updateCountdown();
		const interval = setInterval(updateCountdown, 1000);
		return () => clearInterval(interval);
	});
</script>

<div class="relative min-h-screen bg-stone-950 text-stone-100 overflow-x-hidden selection:bg-rose-400 selection:text-stone-950 font-serif">
	<!-- Background Ambient Glows & Floral Depth Layering -->
	<div class="pointer-events-none fixed inset-0 z-0">
		<div
			use:parallax={{ speed: 0.08 }}
			class="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-rose-950/40 blur-[130px]"
		></div>
		<div
			use:parallax={{ speed: -0.06 }}
			class="absolute top-2/3 -left-40 w-[500px] h-[500px] rounded-full bg-amber-950/20 blur-[140px]"
		></div>
	</div>

	<!-- SECTION: HERO -->
	<header class="relative z-20 min-h-screen flex flex-col items-center justify-center text-center px-4 py-16">
		<div use:parallax={{ speed: 0.18 }} class="mb-4 text-rose-300 flex flex-col items-center">
			<Heart class="w-8 h-8 mb-2 fill-rose-400/40 text-rose-300 animate-pulse" />
			<p class="text-xs uppercase tracking-[0.3em] text-rose-200/80">
				The Wedding of
			</p>
		</div>

		<div class="my-6 max-w-2xl">
			<h1 class="text-5xl md:text-7xl font-bold text-white tracking-tight leading-none drop-shadow-lg">
				{honored.name}
			</h1>
			<p class="text-3xl md:text-4xl italic text-rose-300 font-light my-3">&amp;</p>
			<h1 class="text-5xl md:text-7xl font-bold text-white tracking-tight leading-none drop-shadow-lg">
				{honored.secondaryName || ''}
			</h1>
		</div>

		<!-- Wedding Date Highlight -->
		{#if schedules.length > 0}
			<div class="mt-4 px-6 py-2 rounded-full bg-rose-950/50 border border-rose-400/30 text-rose-200 text-sm font-sans tracking-widest uppercase">
				{formatDate(schedules[0].startTime, { day: 'numeric', month: 'long', year: 'numeric' })}
			</div>
		{/if}

		<!-- Countdown Timer -->
		<div class="mt-10 grid grid-cols-4 gap-3 md:gap-6 font-sans">
			{#each [
				{ label: 'Hari', val: countdown.days },
				{ label: 'Jam', val: countdown.hours },
				{ label: 'Menit', val: countdown.minutes },
				{ label: 'Detik', val: countdown.seconds }
			] as item}
				<div class="flex flex-col items-center p-3 md:p-4 rounded-2xl bg-stone-900/60 border border-rose-300/20 backdrop-blur-sm min-w-[65px] md:min-w-[85px]">
					<span class="text-2xl md:text-3xl font-bold text-rose-200 font-mono">
						{String(item.val).padStart(2, '0')}
					</span>
					<span class="text-[10px] uppercase tracking-wider text-stone-400 mt-1">
						{item.label}
					</span>
				</div>
			{/each}
		</div>

		<!-- Scroll Indicator -->
		<div class="mt-14 text-stone-500 text-xs font-sans flex flex-col items-center gap-2 animate-pulse">
			<span>Gulir ke bawah</span>
			<div class="w-4 h-7 rounded-full border-2 border-stone-600 flex justify-center p-1">
				<div class="w-1 h-2 bg-rose-400 rounded-full animate-bounce"></div>
			</div>
		</div>
	</header>

	<!-- SECTION: BRIDE & GROOM PROFILE -->
	<section class="relative z-20 py-16 px-4 max-w-4xl mx-auto font-sans">
		<!-- Romantic Quote -->
		{#if event.content.quote}
			<div class="max-w-xl mx-auto mb-16 p-8 rounded-3xl bg-stone-900/50 border border-rose-400/20 backdrop-blur-sm text-center">
				<p class="font-serif text-base md:text-lg italic text-rose-100 leading-relaxed">
					"{event.content.quote.text}"
				</p>
				{#if event.content.quote.source}
					<p class="text-xs font-semibold text-rose-300 mt-3 uppercase tracking-widest">
						— {event.content.quote.source}
					</p>
				{/if}
			</div>
		{/if}

		<div class="text-center mb-12">
			<span class="text-xs font-semibold text-rose-300 uppercase tracking-widest font-sans">Mempelai</span>
			<h2 class="text-3xl md:text-4xl font-serif font-bold text-white mt-1">Kedua Mempelai</h2>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
			<!-- Groom -->
			<div class="flex flex-col items-center text-center p-6 rounded-3xl bg-stone-900/40 border border-rose-300/15 backdrop-blur-sm">
				{#if honored.avatarUrl}
					<div class="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden p-1 bg-gradient-to-tr from-rose-400 via-stone-700 to-amber-300 shadow-xl mb-6">
						<img
							src={honored.avatarUrl}
							alt={honored.name}
							class="w-full h-full object-cover rounded-full"
						/>
					</div>
				{/if}
				<h3 class="font-serif text-2xl font-bold text-white">{honored.name}</h3>
				{#if honored.parentNames}
					<p class="text-xs text-stone-400 mt-2 leading-relaxed">
						{honored.parentNames}
					</p>
				{/if}
			</div>

			<!-- Bride -->
			<div class="flex flex-col items-center text-center p-6 rounded-3xl bg-stone-900/40 border border-rose-300/15 backdrop-blur-sm">
				{#if honored.secondaryAvatarUrl}
					<div class="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden p-1 bg-gradient-to-tr from-rose-400 via-stone-700 to-amber-300 shadow-xl mb-6">
						<img
							src={honored.secondaryAvatarUrl}
							alt={honored.secondaryName}
							class="w-full h-full object-cover rounded-full"
						/>
					</div>
				{/if}
				<h3 class="font-serif text-2xl font-bold text-white">{honored.secondaryName}</h3>
				{#if honored.secondaryParentNames}
					<p class="text-xs text-stone-400 mt-2 leading-relaxed">
						{honored.secondaryParentNames}
					</p>
				{/if}
			</div>
		</div>
	</section>

	<!-- SECTION: SCHEDULE / ACARA -->
	<section class="relative z-20 py-16 px-4 max-w-4xl mx-auto font-sans">
		<div class="text-center mb-12">
			<span class="text-xs font-semibold text-rose-300 uppercase tracking-widest">Waktu &amp; Lokasi</span>
			<h2 class="text-3xl md:text-4xl font-serif font-bold text-white mt-1">Agenda Bahagia</h2>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			{#each schedules as schedule}
				<div class="rounded-3xl bg-gradient-to-b from-stone-900/80 to-stone-900/50 border border-rose-400/20 p-6 md:p-8 backdrop-blur-md shadow-xl flex flex-col justify-between">
					<div>
						<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-400/20 text-xs font-medium mb-4">
							<Calendar class="w-3.5 h-3.5" />
							<span>{schedule.title}</span>
						</div>

						<div class="space-y-2 mb-6">
							<p class="text-lg font-bold text-white">
								{formatDate(schedule.startTime)}
							</p>
							<p class="text-sm text-rose-300 font-mono">
								{formatTime(schedule.startTime)}
								{#if schedule.endTime}
									- {formatTime(schedule.endTime)}
								{/if}
							</p>
						</div>

						<div class="border-t border-white/10 pt-4 space-y-2">
							<p class="text-sm font-semibold text-stone-200 flex items-center gap-2">
								<MapPin class="w-4 h-4 text-rose-400 shrink-0" />
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
								class="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 transition shadow-md shadow-rose-500/20"
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
		<section class="relative z-20 py-16 px-4 max-w-4xl mx-auto font-sans">
			<div class="text-center mb-10">
				<span class="text-xs font-semibold text-rose-300 uppercase tracking-widest">Our Love Journey</span>
				<h2 class="text-3xl font-serif font-bold text-white mt-1">Galeri Kisah Cinta</h2>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				{#each galleries as photo}
					<div class="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-stone-900 border border-rose-400/20 shadow-lg">
						<img
							src={photo.url}
							alt={photo.caption || 'Foto Prewedding'}
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

	<!-- SECTION: DIGITAL ENVELOPE -->
	{#if event.features.giftEnabled && gifts.length > 0}
		<div class="font-sans">
			<DigitalEnvelope giftRegistries={gifts} themeId={event.themeId} />
		</div>
	{/if}

	<!-- SECTION: RSVP -->
	{#if event.features.rsvpEnabled}
		<div class="font-sans">
			<RsvpSection
				slug={event.slug}
				recipientName={guest?.name}
				initialGreetings={greetings}
				themeId={event.themeId}
			/>
		</div>
	{/if}

	<!-- FOOTER -->
	<footer class="relative z-20 py-12 text-center text-stone-500 text-xs border-t border-white/5 font-sans">
		<p class="mb-2">Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Anda berkenan hadir.</p>
		<p class="font-serif text-sm text-stone-300">
			{honored.name} &amp; {honored.secondaryName}
		</p>
	</footer>
</div>
