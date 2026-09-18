<script lang="ts">
	import { onMount } from 'svelte';

	let {
		targetDate,
		variant = 'editorial'
	}: {
		targetDate: string;
		variant?: string;
	} = $props();

	let days = $state(0);
	let hours = $state(0);
	let minutes = $state(0);
	let seconds = $state(0);
	let isPassed = $state(false);

	function updateCountdown() {
		const target = new Date(targetDate).getTime();
		const now = Date.now();
		const diff = target - now;

		if (!Number.isFinite(target) || diff <= 0) {
			isPassed = true;
			days = 0;
			hours = 0;
			minutes = 0;
			seconds = 0;
			return;
		}

		isPassed = false;
		days = Math.floor(diff / (1000 * 60 * 60 * 24));
		hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
		minutes = Math.floor((diff / (1000 * 60)) % 60);
		seconds = Math.floor((diff / 1000) % 60);
	}

	onMount(() => {
		updateCountdown();
		const interval = setInterval(updateCountdown, 1000);
		return () => clearInterval(interval);
	});
</script>

<div class="flex items-center justify-center gap-3 text-center sm:gap-6">
	<div class="flex flex-col items-center">
		<span class="text-2xl font-bold tracking-tight sm:text-4xl">
			{String(days).padStart(2, '0')}
		</span>
		<span class="mt-1 text-[10px] tracking-widest uppercase opacity-70 sm:text-xs">Hari</span>
	</div>
	<span class="-mt-3 text-xl font-light opacity-40 sm:text-3xl">:</span>
	<div class="flex flex-col items-center">
		<span class="text-2xl font-bold tracking-tight sm:text-4xl">
			{String(hours).padStart(2, '0')}
		</span>
		<span class="mt-1 text-[10px] tracking-widest uppercase opacity-70 sm:text-xs">Jam</span>
	</div>
	<span class="-mt-3 text-xl font-light opacity-40 sm:text-3xl">:</span>
	<div class="flex flex-col items-center">
		<span class="text-2xl font-bold tracking-tight sm:text-4xl">
			{String(minutes).padStart(2, '0')}
		</span>
		<span class="mt-1 text-[10px] tracking-widest uppercase opacity-70 sm:text-xs">Menit</span>
	</div>
	<span class="-mt-3 text-xl font-light opacity-40 sm:text-3xl">:</span>
	<div class="flex flex-col items-center">
		<span class="text-2xl font-bold tracking-tight sm:text-4xl">
			{String(seconds).padStart(2, '0')}
		</span>
		<span class="mt-1 text-[10px] tracking-widest uppercase opacity-70 sm:text-xs">Detik</span>
	</div>
</div>
