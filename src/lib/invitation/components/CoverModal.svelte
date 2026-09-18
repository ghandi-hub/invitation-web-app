<script lang="ts">
	import { MailOpen } from '@lucide/svelte';
	import PaperTexture from '$lib/invitation/ornaments/PaperTexture.svelte';
	import { fade } from 'svelte/transition';

	let {
		partner1,
		partner2,
		coverUrl,
		headline = 'Undangan Pernikahan',
		dateText = '',
		recipientName = '',
		onOpen
	}: {
		partner1: string;
		partner2: string;
		coverUrl?: string | null;
		headline?: string;
		dateText?: string;
		recipientName?: string;
		onOpen: () => void;
	} = $props();

	let isOpen = $state(true);

	function handleOpen() {
		isOpen = false;
		onOpen();
	}
</script>

{#if isOpen}
	<div
		transition:fade={{ duration: 700 }}
		class="fixed inset-0 z-50 flex flex-col items-center justify-between overflow-hidden bg-cover bg-center p-8 text-center transition-all duration-700 ease-out"
		style={coverUrl
			? `background-image: linear-gradient(to bottom, rgba(15,15,20,0.5), rgba(15,15,20,0.85)), url('${coverUrl}')`
			: 'background-color: #16161c'}
	>
		<!-- Subtle stationery grain -->
		<PaperTexture opacity={0.04} blendMode="screen" />

		<div class="relative z-10 pt-8">
			<div class="inline-block border-b border-white/20 pb-1">
				<span
					class="font-mono text-[10px] font-light tracking-[0.35em] text-white/80 uppercase sm:text-xs"
				>
					{headline}
				</span>
			</div>
		</div>

		<div class="relative z-10 mx-auto max-w-lg space-y-4 text-white">
			<h1 class="font-playfair text-4xl leading-tight font-light tracking-wide sm:text-6xl">
				{partner1}
				<span class="font-serif text-2xl font-light text-white/60 italic sm:text-4xl">&amp;</span>
				{partner2}
			</h1>

			{#if dateText}
				<div class="pt-2">
					<span
						class="inline-block border border-white/20 bg-white/5 px-4 py-1.5 font-mono text-xs tracking-[0.25em] text-white/90 uppercase backdrop-blur-xs sm:text-sm"
					>
						{dateText}
					</span>
				</div>
			{/if}
		</div>

		```svelte
		<div class="relative z-10 flex flex-col items-center pb-10">
			{#if recipientName}
				<div
					class="mb-6 w-fit max-w-sm rounded-xl border border-white/15 bg-white/10 p-4 text-center text-white shadow-lg backdrop-blur-md"
				>
					<p class="mb-1 font-mono text-[11px] tracking-wider text-white/70 uppercase">
						Kepada Yth. Bapak/Ibu/Saudara/i
					</p>
					<p class="font-serif text-xl font-medium break-words">
						{recipientName}
					</p>
				</div>
			{/if}

			<button
				type="button"
				onclick={handleOpen}
				class="flex w-fit transform cursor-pointer items-center justify-center gap-2.5 rounded-full bg-white px-8 py-3.5 text-xs font-semibold tracking-[0.2em] text-black uppercase shadow-2xl transition-all hover:-translate-y-0.5 hover:bg-neutral-100 active:translate-y-0"
			>
				<MailOpen class="h-4 w-4" />
				<span>Buka Undangan</span>
			</button>
		</div>
		```
	</div>
{/if}
