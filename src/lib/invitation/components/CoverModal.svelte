<script lang="ts">
	import { MailOpen } from '@lucide/svelte';

	let {
		partner1,
		partner2,
		coverUrl,
		headline = 'The Wedding Of',
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
		class="fixed inset-0 z-50 flex flex-col items-center justify-between bg-cover bg-center p-8 text-center transition-all duration-700 ease-out"
		style={coverUrl
			? `background-image: linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.8)), url('${coverUrl}')`
			: 'background-color: #121214'}
	>
		<div class="pt-8">
			<span class="text-xs font-light tracking-[0.3em] text-white/75 uppercase">
				{headline}
			</span>
		</div>

		<div class="mx-auto max-w-lg space-y-4 text-white">
			<h1 class="font-serif text-4xl leading-tight font-light tracking-wide sm:text-6xl">
				{partner1} <span class="font-sans text-2xl font-thin opacity-60 sm:text-4xl">&</span>
				{partner2}
			</h1>

			{#if dateText}
				<p class="font-mono text-xs tracking-[0.25em] text-white/80 uppercase sm:text-sm">
					{dateText}
				</p>
			{/if}
		</div>

		<div class="pb-10">
			{#if recipientName}<div class="mb-6 max-w-sm text-white">
					<p class="mb-2 text-xs text-white/70">Kepada Yth. Bapak/Ibu/Saudara/i</p>
					<p class="text-xl font-medium break-words">{recipientName}</p>
				</div>{/if}
			<button
				type="button"
				onclick={handleOpen}
				class="flex transform cursor-pointer items-center gap-2.5 rounded-full bg-white px-8 py-3.5 text-xs font-medium tracking-[0.2em] text-black uppercase shadow-2xl transition-all hover:-translate-y-0.5 hover:bg-white/90 active:translate-y-0"
			>
				<MailOpen class="h-4 w-4" />
				<span>Buka Undangan</span>
			</button>
		</div>
	</div>
{/if}
