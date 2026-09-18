<script lang="ts">
	import type { EventDocument, GuestDocument } from '$lib/types';
	import { parallax } from '$lib/actions/parallax';
	import { formatDate, formatTime } from '$lib/utils';
	import DigitalEnvelope from '$lib/components/core/DigitalEnvelope.svelte';
	import RsvpSection from '$lib/components/core/RsvpSection.svelte';
	import { Calendar, MapPin, ExternalLink, Sparkles, Disc, Flame } from 'lucide-svelte';
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

	// Countdown logic to the party
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

<div class="relative min-h-screen bg-slate-950 text-stone-100 overflow-x-hidden selection:bg-cyan-400 selection:text-slate-950 font-sans">
	<!-- Ambient Neon Glows -->
	<div class="pointer-events-none fixed inset-0 z-0">
		<div
			use:parallax={{ speed: 0.1 }}
			class="absolute -top-32 -left-20 w-[500px] h-[500px] rounded-full bg-cyan-600/20 blur-[130px]"
		></div>
		<div
			use:parallax={{ speed: -0.08 }}
			class="absolute top-1/2 -right-32 w-[550px] h-[550px] rounded-full bg-fuchsia-600/20 blur-[140px]"
		></div>
		<div
			use:parallax={{ speed: 0.05 }}
			class="absolute -bottom-32 left-1/3 w-[500px] h-[500px] rounded-full bg-violet-600/20 blur-[130px]"
		></div>
	</div>

	<!-- SECTION: HERO -->
	<header class="relative z-20 min-h-screen flex flex-col items-center justify-center text-center px-4 py-16">
		<div use:parallax={{ speed: 0.2 }} class="mb-4 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-cyan-400/40 text-cyan-300 text-xs font-mono uppercase tracking-widest">
			<Sparkles class="w-3.5 h-3.5 text-cyan-400" />
			<span>Exclusive VIP Party Access</span>
			<Flame class="w-3.5 h-3.5 text-fuchsia-400" />
		</div>

		{#if honored.avatarUrl}
			<div class="relative mx-auto my-4 w-36 h-36 md:w-44 md:h-44 rounded-2xl p-1 bg-gradient-to-tr from-cyan-400 via-fuchsia-500 to-amber-300 shadow-[0_0_30px_rgba(34,211,238,0.3)]">
				<img
					src={honored.avatarUrl}
					alt={honored.name}
					class="w-full h-full object-cover rounded-xl"
				/>
			</div>
		{/if}

		<div class="my-4 max-w-3xl">
			<h1 class="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-300 drop-shadow-[0_0_20px_rgba(232,121,249,0.3)]">
				{honored.name}
			</h1>

			{#if honored.roleOrTitle}
				<p class="text-base md:text-xl font-mono text-cyan-300 tracking-wider mt-3">
					{honored.roleOrTitle}
				</p>
			{/if}
		</div>

		{#if event.content.quote}
			<div class="max-w-md mt-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
				<p class="text-sm italic text-stone-200">
					"{event.content.quote.text}"
				</p>
			</div>
		{/if}

		<!-- Countdown Section -->
		<div class="mt-10 grid grid-cols-4 gap-3 md:gap-5 font-mono">
			{#each [
				{ label: 'Days', val: countdown.days },
				{ label: 'Hours', val: countdown.hours },
				{ label: 'Mins', val: countdown.minutes },
				{ label: 'Secs', val: countdown.seconds }
			] as item}
				<div class="flex flex-col items-center p-3 md:p-4 rounded-2xl bg-slate-900/80 border border-cyan-400/30 backdrop-blur-md shadow-[0_0_15px_rgba(34,211,238,0.15)] min-w-[65px] md:min-w-[85px]">
					<span class="text-2xl md:text-4xl font-black text-cyan-300">
						{String(item.val).padStart(2, '0')}
					</span>
					<span class="text-[10px] uppercase tracking-widest text-stone-400 mt-1">
						{item.label}
					</span>
				</div>
			{/each}
		</div>

		<!-- Scroll Indicator -->
		<div class="mt-14 text-stone-500 text-xs flex flex-col items-center gap-2 animate-pulse">
			<span class="font-mono tracking-wider uppercase text-[11px]">Scroll Down</span>
			<div class="w-4 h-7 rounded-full border-2 border-stone-600 flex justify-center p-1">
				<div class="w-1 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
			</div>
		</div>
	</header>

	<!-- SECTION: LINEUP / SCHEDULE -->
	<section class="relative z-20 py-16 px-4 max-w-4xl mx-auto">
		<div class="text-center mb-12">
			<span class="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest">When &amp; Where</span>
			<h2 class="text-3xl md:text-4xl font-black uppercase text-white mt-1">Party Rundown</h2>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			{#each schedules as schedule}
				<div class="rounded-3xl bg-slate-900/80 border border-fuchsia-500/30 p-6 md:p-8 backdrop-blur-md shadow-2xl flex flex-col justify-between relative overflow-hidden group">
					<div class="absolute -right-10 -bottom-10 w-32 h-32 rounded-full bg-fuchsia-600/10 blur-xl group-hover:scale-150 transition-transform"></div>

					<div class="relative z-10">
						<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30 text-xs font-mono font-medium mb-4">
							<Disc class="w-3.5 h-3.5 animate-spin" />
							<span>{schedule.title}</span>
						</div>

						<div class="space-y-2 mb-6">
							<p class="text-lg font-bold text-white">
								{formatDate(schedule.startTime)}
							</p>
							<p class="text-sm text-cyan-300 font-mono font-bold">
								{formatTime(schedule.startTime)}
								{#if schedule.endTime}
									- {formatTime(schedule.endTime)}
								{/if}
							</p>
						</div>

						<div class="border-t border-white/10 pt-4 space-y-2">
							<p class="text-sm font-semibold text-stone-200 flex items-center gap-2">
								<MapPin class="w-4 h-4 text-cyan-400 shrink-0" />
								<span>{schedule.venue}</span>
							</p>
							<p class="text-xs text-stone-400 pl-6 leading-relaxed">
								{schedule.address}
							</p>
						</div>
					</div>

					{#if schedule.mapsUrl}
						<div class="mt-6 pt-2 relative z-10">
							<a
								href={schedule.mapsUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:opacity-90 transition shadow-lg shadow-cyan-500/20"
							>
								<ExternalLink class="w-3.5 h-3.5" />
								<span>Open in Google Maps</span>
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
				<span class="text-xs font-mono font-semibold text-fuchsia-400 uppercase tracking-widest">Memories &amp; Moments</span>
				<h2 class="text-3xl md:text-4xl font-black uppercase text-white mt-1">Photo Gallery</h2>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				{#each galleries as photo}
					<div class="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-slate-900 border border-white/10 shadow-xl">
						<img
							src={photo.url}
							alt={photo.caption || 'Party Gallery'}
							class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
							loading="lazy"
						/>
						{#if photo.caption}
							<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
								<p class="text-xs text-cyan-300 font-mono font-medium">{photo.caption}</p>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</section>
	{/if}

	<!-- SECTION: DIGITAL GIFT / ENVELOPE -->
	{#if event.features.giftEnabled && gifts.length > 0}
		<DigitalEnvelope giftRegistries={gifts} themeId={event.themeId} />
	{/if}

	<!-- SECTION: RSVP -->
	{#if event.features.rsvpEnabled}
		<RsvpSection
			slug={event.slug}
			recipientName={guest?.name}
			initialGreetings={greetings}
			themeId={event.themeId}
		/>
	{/if}

	<!-- FOOTER -->
	<footer class="relative z-20 py-12 text-center text-stone-500 text-xs border-t border-white/5 font-mono">
		<p class="mb-2">See you on the dance floor!</p>
		<p class="text-stone-300">{event.content.hosts.join(' & ')}</p>
	</footer>
</div>
