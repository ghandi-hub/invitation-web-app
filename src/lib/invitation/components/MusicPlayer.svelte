<script lang="ts">
	import { onMount } from 'svelte';
	import { Music, VolumeX } from '@lucide/svelte';

	let {
		audioUrl,
		title = 'Wedding Music',
		autoPlayTrigger = false
	}: {
		audioUrl?: string;
		title?: string;
		autoPlayTrigger?: boolean;
	} = $props();

	let audioEl: HTMLAudioElement | undefined = $state();
	let isPlaying = $state(false);

	export function play() {
		if (audioEl) {
			audioEl
				.play()
				.then(() => {
					isPlaying = true;
				})
				.catch((err) => {
					console.warn('Audio play restricted by browser:', err);
				});
		}
	}

	export function pause() {
		if (audioEl) {
			audioEl.pause();
			isPlaying = false;
		}
	}

	export function toggle() {
		if (isPlaying) {
			pause();
		} else {
			play();
		}
	}

	$effect(() => {
		if (autoPlayTrigger && audioEl && !isPlaying) {
			play();
		}
	});

	onMount(() => {
		return () => {
			if (audioEl) {
				audioEl.pause();
			}
		};
	});
</script>

{#if audioUrl}
	<audio
		bind:this={audioEl}
		src={audioUrl}
		loop
		preload="auto"
		onplay={() => (isPlaying = true)}
		onpause={() => (isPlaying = false)}
	></audio>

	<div class="fixed bottom-6 right-6 z-50">
		<button
			type="button"
			onclick={toggle}
			class="flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-black/80 hover:bg-black text-white text-xs backdrop-blur-md shadow-lg border border-white/20 transition-all duration-300 transform hover:scale-105"
			aria-label={isPlaying ? 'Pause music' : 'Play music'}
		>
			<div class="relative flex items-center justify-center">
				{#if isPlaying}
					<Music class="w-4 h-4 animate-spin" style="animation-duration: 4s;" />
				{:else}
					<VolumeX class="w-4 h-4 opacity-70" />
				{/if}
			</div>
			<span class="hidden sm:inline-block max-w-[120px] truncate font-medium">
				{title}
			</span>
		</button>
	</div>
{/if}
