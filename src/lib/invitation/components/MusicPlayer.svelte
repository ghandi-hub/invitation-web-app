<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { beforeNavigate } from '$app/navigation';
	import { Music, VolumeX, Play } from '@lucide/svelte';

	let {
		audioUrl,
		title = 'Musik Latar',
		autoPlay = true,
		autoPlayTrigger = false
	}: {
		audioUrl?: string;
		title?: string;
		autoPlay?: boolean;
		autoPlayTrigger?: boolean;
	} = $props();

	let audioEl: HTMLAudioElement | undefined = $state();
	let directAudioRef: HTMLAudioElement | null = null;
	let fadeTimer: ReturnType<typeof setInterval> | null = null;
	let isPlaying = $state(false);
	let playBlocked = $state(false);
	let userPaused = $state(false);
	let listenersAttached = false;

	$effect(() => {
		if (audioEl) {
			directAudioRef = audioEl;
		}
	});

	export function stop() {
		userPaused = true;
		if (fadeTimer) {
			clearInterval(fadeTimer);
			fadeTimer = null;
		}
		removeInteractionListeners();
		const el = directAudioRef || audioEl;
		if (el) {
			try {
				el.pause();
				el.currentTime = 0;
			} catch (e) {
				console.warn('Error pausing audio element:', e);
			}
		}
		// Also ensure any audio playing on document is halted
		if (typeof document !== 'undefined') {
			document.querySelectorAll<HTMLAudioElement>('audio').forEach((a) => {
				try {
					a.pause();
					a.currentTime = 0;
				} catch {}
			});
		}
		isPlaying = false;
	}

	export function pause() {
		userPaused = true;
		removeInteractionListeners();
		if (fadeTimer) {
			clearInterval(fadeTimer);
			fadeTimer = null;
		}
		const el = directAudioRef || audioEl;
		if (el) {
			try {
				el.pause();
			} catch (e) {
				console.warn('Error pausing audio:', e);
			}
		}
		isPlaying = false;
	}

	export function play() {
		const el = audioEl || directAudioRef;
		if (!el) return;
		if (isPlaying && !el.paused) return;

		userPaused = false;

		if (fadeTimer) {
			clearInterval(fadeTimer);
			fadeTimer = null;
		}
		el.volume = 0.2;
		const playPromise = el.play();
		if (playPromise !== undefined) {
			playPromise
				.then(() => {
					isPlaying = true;
					playBlocked = false;
					removeInteractionListeners();
					// Smooth fade-in volume ramp up to 0.85
					let v = 0.2;
					fadeTimer = setInterval(() => {
						v = Math.min(0.85, v + 0.1);
						if (el) el.volume = v;
						if (v >= 0.85) {
							if (fadeTimer) clearInterval(fadeTimer);
							fadeTimer = null;
						}
					}, 120);
				})
				.catch((err) => {
					console.warn('Audio play restricted by browser, waiting for user gesture:', err);
					isPlaying = false;
					playBlocked = true;
					if (!userPaused) {
						setupInteractionListener();
					}
				});
		}
	}

	function handleFirstInteraction() {
		if (!userPaused && !isPlaying) {
			play();
		}
		removeInteractionListeners();
	}

	const INTERACTION_EVENTS = ['click', 'touchstart', 'touchend', 'pointerdown', 'scroll', 'keydown'];

	function setupInteractionListener() {
		if (typeof window === 'undefined' || listenersAttached) return;
		listenersAttached = true;
		for (const ev of INTERACTION_EVENTS) {
			window.addEventListener(ev, handleFirstInteraction, { once: true, passive: true });
			document.addEventListener(ev, handleFirstInteraction, { once: true, passive: true });
		}
	}

	function removeInteractionListeners() {
		if (typeof window === 'undefined' || !listenersAttached) return;
		listenersAttached = false;
		for (const ev of INTERACTION_EVENTS) {
			window.removeEventListener(ev, handleFirstInteraction);
			document.removeEventListener(ev, handleFirstInteraction);
		}
	}

	export function toggle(e?: Event) {
		if (e) {
			e.stopPropagation();
		}
		if (isPlaying) {
			pause();
		} else {
			userPaused = false;
			play();
		}
	}

	let prevTrigger = false;
	$effect(() => {
		if (autoPlayTrigger && !prevTrigger) {
			userPaused = false;
			play();
		}
		prevTrigger = autoPlayTrigger;
	});

	onMount(() => {
		if (autoPlay && !userPaused) {
			// Mencoba putar otomatis di awal
			play();
			// Pasang listener jika browser memblokir sebelum ada gesture
			setupInteractionListener();
		}
	});

	// Stop audio immediately as soon as user navigates to any other page (e.g. Back to Editor)
	beforeNavigate(() => {
		stop();
	});

	onDestroy(() => {
		removeInteractionListeners();
		stop();
	});
</script>

{#if audioUrl}
	<audio
		bind:this={audioEl}
		src={audioUrl}
		loop
		preload="auto"
		onplay={() => {
			isPlaying = true;
			playBlocked = false;
		}}
		onpause={() => (isPlaying = false)}
	></audio>

	<!-- Floating Music Controller Button -->
	<aside
		class="fixed right-4 z-50 transition-all duration-300 pointer-events-auto"
		style="bottom: calc(1.25rem + env(safe-area-inset-bottom, 0px));"
		aria-label="Pemutar musik latar"
	>
		<button
			type="button"
			onclick={(e) => toggle(e)}
			class="group flex items-center gap-2.5 rounded-full bg-neutral-900/90 text-white pl-2.5 pr-4 py-2 text-xs shadow-2xl backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer {playBlocked
				? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-black animate-pulse'
				: ''}"
			aria-label={isPlaying ? 'Hentikan musik' : 'Putar musik'}
		>
			<!-- Spinning Disc / Visualizer -->
			<div
				class="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-amber-600 to-rose-600 shadow-md {isPlaying
					? 'animate-spin'
					: ''}"
				style="animation-duration: 3.5s;"
			>
				<div class="h-2 w-2 rounded-full bg-neutral-900 border border-white/50"></div>
				{#if isPlaying}
					<Music class="absolute h-3.5 w-3.5 text-white/90" />
				{:else}
					<VolumeX class="absolute h-3.5 w-3.5 text-white/90" />
				{/if}
			</div>

			<!-- Title and Sound Bars -->
			<div class="flex flex-col text-left">
				<span class="max-w-[130px] sm:max-w-[160px] truncate font-medium text-[11px] leading-tight text-white/95">
					{playBlocked ? 'Putar Musik 🎵' : title}
				</span>
				{#if isPlaying}
					<!-- Animated Equalizer Waves -->
					<div class="flex items-end gap-0.5 h-2 mt-0.5">
						<span class="eq-bar eq-bar-1"></span>
						<span class="eq-bar eq-bar-2"></span>
						<span class="eq-bar eq-bar-3"></span>
					</div>
				{:else}
					<span class="text-[9px] text-white/60 leading-none">Jeda</span>
				{/if}
			</div>
		</button>
	</aside>
{/if}

<style>
	.eq-bar {
		width: 2px;
		background-color: #f59e0b;
		border-radius: 1px;
		display: inline-block;
	}
	.eq-bar-1 {
		animation: bounceWave 0.8s ease-in-out infinite alternate;
	}
	.eq-bar-2 {
		animation: bounceWave 0.6s ease-in-out infinite 0.2s alternate;
	}
	.eq-bar-3 {
		animation: bounceWave 0.9s ease-in-out infinite 0.4s alternate;
	}

	@keyframes bounceWave {
		0% {
			height: 2px;
		}
		100% {
			height: 8px;
		}
	}
</style>
