<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Music, Volume2, VolumeX } from 'lucide-svelte';

	interface Props {
		musicUrl?: string;
		autoPlay?: boolean;
	}

	let { musicUrl, autoPlay = false }: Props = $props();

	let audioEl: HTMLAudioElement | null = null;
	let isPlaying = $state(false);
	let isMuted = $state(false);

	export function playAudio() {
		if (!audioEl && musicUrl) {
			initAudio();
		}
		if (audioEl) {
			audioEl.play().then(() => {
				isPlaying = true;
			}).catch((err) => {
				console.warn('Audio playback was prevented by browser policy:', err);
				isPlaying = false;
			});
		}
	}

	export function pauseAudio() {
		if (audioEl) {
			audioEl.pause();
			isPlaying = false;
		}
	}

	export function togglePlay() {
		if (isPlaying) {
			pauseAudio();
		} else {
			playAudio();
		}
	}

	function initAudio() {
		if (typeof window === 'undefined' || !musicUrl) return;
		if (audioEl) return;

		audioEl = new Audio(musicUrl);
		audioEl.loop = true;
		audioEl.preload = 'auto';

		audioEl.addEventListener('play', () => (isPlaying = true));
		audioEl.addEventListener('pause', () => (isPlaying = false));
		audioEl.addEventListener('ended', () => (isPlaying = false));
	}

	onMount(() => {
		if (musicUrl) {
			initAudio();
			if (autoPlay) {
				playAudio();
			}
		}
	});

	onDestroy(() => {
		if (audioEl) {
			audioEl.pause();
			audioEl.src = '';
			audioEl = null;
		}
	});
</script>

{#if musicUrl}
	<aside
		class="fixed bottom-6 right-6 z-50 flex items-center gap-2"
		aria-label="Pemutar Musik Latar"
	>
		<button
			type="button"
			onclick={togglePlay}
			class="group relative flex h-12 w-12 items-center justify-center rounded-full bg-stone-900/80 text-amber-300 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-stone-900 active:scale-95 border border-amber-400/40"
			aria-label={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
			title={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
		>
			<div
				class="flex items-center justify-center transition-transform duration-700"
				class:animate-spin-slow={isPlaying}
			>
				{#if isPlaying}
					<Music class="h-5 w-5 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
				{:else}
					<VolumeX class="h-5 w-5 text-stone-400" />
				{/if}
			</div>

			<!-- Pulse wave animation when active -->
			{#if isPlaying}
				<span class="absolute -inset-1 rounded-full border border-amber-400/50 animate-ping pointer-events-none opacity-40"></span>
			{/if}
		</button>
	</aside>
{/if}

<style>
	@keyframes spinSlow {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.animate-spin-slow {
		animation: spinSlow 6s linear infinite;
	}

	@media (prefers-reduced-motion: reduce) {
		.animate-spin-slow {
			animation: none !important;
		}
	}
</style>
