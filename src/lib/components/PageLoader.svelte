<script lang="ts">
	import { navigating } from '$app/state';
	import { onMount } from 'svelte';
	import { Loader2 } from '@lucide/svelte';

	let visible = $state(false);
	let progress = $state(0);
	let showSlowBadge = $state(false);

	let trickleInterval: ReturnType<typeof setInterval> | null = null;
	let slowTimer: ReturnType<typeof setTimeout> | null = null;
	let hideTimeout: ReturnType<typeof setTimeout> | null = null;
	let resetTimeout: ReturnType<typeof setTimeout> | null = null;

	function clearAllTimers() {
		if (trickleInterval) {
			clearInterval(trickleInterval);
			trickleInterval = null;
		}
		if (slowTimer) {
			clearTimeout(slowTimer);
			slowTimer = null;
		}
		if (hideTimeout) {
			clearTimeout(hideTimeout);
			hideTimeout = null;
		}
		if (resetTimeout) {
			clearTimeout(resetTimeout);
			resetTimeout = null;
		}
	}

	function start() {
		clearAllTimers();
		visible = true;
		progress = 18;
		showSlowBadge = false;

		// Jika navigasi memakan waktu lebih dari 260ms (jaringan lambat), tampilkan badge
		slowTimer = setTimeout(() => {
			if (visible && progress < 100) {
				showSlowBadge = true;
			}
		}, 260);

		// Animasi trickle bertahap
		trickleInterval = setInterval(() => {
			if (progress < 90) {
				const remaining = 90 - progress;
				const step = Math.max(0.4, remaining * 0.12);
				progress = Math.min(88, progress + step);
			}
		}, 100);
	}

	function complete() {
		if (trickleInterval) {
			clearInterval(trickleInterval);
			trickleInterval = null;
		}
		if (slowTimer) {
			clearTimeout(slowTimer);
			slowTimer = null;
		}

		progress = 100;
		showSlowBadge = false;

		// Tunggu transisi width ke 100% selesai, lalu fade out
		hideTimeout = setTimeout(() => {
			visible = false;
			resetTimeout = setTimeout(() => {
				progress = 0;
			}, 300);
		}, 180);
	}

	$effect(() => {
		const isNavigating = Boolean(navigating.to);
		if (isNavigating) {
			start();
		} else if (visible && progress < 100) {
			complete();
		}
	});

	onMount(() => {
		return () => {
			clearAllTimers();
		};
	});
</script>

<!-- Top Navigation Progress Bar -->
<div
	class="progress-wrapper"
	class:visible
	role="progressbar"
	aria-valuemin={0}
	aria-valuemax={100}
	aria-valuenow={Math.round(progress)}
	aria-label="Memuat halaman"
>
	<div
		class="progress-bar"
		style="width: {progress}%; transition-duration: {progress === 100 ? '180ms' : '150ms'};"
	>
		<div class="progress-glow"></div>
	</div>
</div>

<!-- Floating Pill Indicator for Slow Connections (> 260ms) -->
{#if visible && showSlowBadge}
	<aside
		class="slow-network-pill"
		role="status"
		aria-live="polite"
	>
		<span class="ping-dot" aria-hidden="true">
			<span class="ping-wave"></span>
			<span class="ping-core"></span>
		</span>
		<Loader2 class="spinner-icon" />
		<span class="pill-text">Memuat halaman...</span>
	</aside>
{/if}

<style>
	.progress-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		z-index: 99999;
		pointer-events: none;
		opacity: 0;
		transition: opacity 250ms ease-out;
	}

	@media (min-width: 640px) {
		.progress-wrapper {
			height: 3.5px;
		}
	}

	.progress-wrapper.visible {
		opacity: 1;
	}

	.progress-bar {
		position: relative;
		height: 100%;
		background: linear-gradient(90deg, #c85a32 0%, #e07a5f 45%, #f4a261 80%, #d4af37 100%);
		box-shadow:
			0 0 10px rgba(200, 90, 50, 0.7),
			0 0 5px rgba(212, 175, 55, 0.8);
		transition-property: width;
		transition-timing-function: cubic-bezier(0.1, 0.8, 0.2, 1);
	}

	.progress-glow {
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		width: 60px;
		background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.8) 100%);
		box-shadow: 0 0 12px rgba(255, 255, 255, 0.9);
	}

	.slow-network-pill {
		position: fixed;
		top: 14px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 99998;
		pointer-events: none;
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 7px 16px;
		border-radius: 9999px;
		background: rgba(18, 18, 22, 0.9);
		color: #ffffff;
		border: 1px solid rgba(255, 255, 255, 0.15);
		box-shadow:
			0 10px 25px -5px rgba(0, 0, 0, 0.4),
			0 8px 10px -6px rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		animation: dropIn 240ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}

	@keyframes dropIn {
		from {
			opacity: 0;
			transform: translate(-50%, -12px) scale(0.94);
		}
		to {
			opacity: 1;
			transform: translate(-50%, 0) scale(1);
		}
	}

	.ping-dot {
		position: relative;
		display: flex;
		width: 8px;
		height: 8px;
	}

	.ping-wave {
		position: absolute;
		display: inline-flex;
		height: 100%;
		width: 100%;
		border-radius: 9999px;
		background-color: #f59e0b;
		opacity: 0.75;
		animation: ping 1.2s cubic-bezier(0, 0, 0.2, 1) infinite;
	}

	.ping-core {
		position: relative;
		display: inline-flex;
		border-radius: 9999px;
		height: 8px;
		width: 8px;
		background-color: #f59e0b;
	}

	@keyframes ping {
		75%, 100% {
			transform: scale(2);
			opacity: 0;
		}
	}

	:global(.spinner-icon) {
		width: 13px;
		height: 13px;
		animation: spin 1s linear infinite;
		color: #f59e0b;
	}

	@keyframes spin {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}

	.pill-text {
		font-size: 11.5px;
		font-weight: 500;
		letter-spacing: 0.02em;
		white-space: nowrap;
	}
</style>
