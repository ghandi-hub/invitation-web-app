<script lang="ts">
	import type { InvitationContent } from '$lib/types/invitation';
	import { Film } from '@lucide/svelte';

	let {
		content,
		preview = false
	}: {
		content: Pick<InvitationContent, 'couple' | 'hero' | 'opening'>;
		preview?: boolean;
	} = $props();
</script>

<svelte:element
	this={preview ? 'div' : 'header'}
	class="relative flex min-h-screen flex-col items-center justify-between bg-cover bg-center p-8 text-center"
	style={content.hero?.coverUrl
		? `background-image: linear-gradient(to bottom, rgba(13,13,17,0.4), rgba(13,13,17,0.75) 70%, #0d0d11 100%), url('${content.hero.coverUrl}')`
		: 'background: radial-gradient(circle at center, #1f1f28 0%, #0d0d11 100%)'}
>
	<div class="pt-8">
		<span
			class="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-black/40 px-5 py-2 text-[10px] tracking-[0.35em] text-[#d4af37] uppercase backdrop-blur-md shadow-lg"
		>
			<Film class="h-3 w-3" />
			<span>Kisah Cinta Sejati</span>
		</span>
	</div>

	<div class="mx-auto my-auto max-w-4xl space-y-6 py-12">
		<span class="block text-xs font-mono tracking-[0.4em] text-[#d4af37] uppercase">
			{content.opening?.greeting || 'Undangan Pernikahan'}
		</span>
		<svelte:element
			this={preview ? 'h3' : 'h1'}
			class="font-cinzel text-5xl font-normal tracking-wide text-white drop-shadow-lg sm:text-8xl"
		>
			{content.couple.partner1.name} <span class="text-3xl text-[#d4af37] sm:text-6xl">&amp;</span>
			{content.couple.partner2.name}
		</svelte:element>
		{#if content.hero?.subheadline}
			<p class="mx-auto max-w-xl text-sm font-light tracking-wide text-white/80 sm:text-lg">
				"{content.hero.subheadline}"
			</p>
		{/if}
		{#if content.hero?.dateBadge}
			<div class="pt-4">
				<span
					class="border border-[#d4af37]/50 bg-black/60 px-6 py-2 font-mono text-xs tracking-[0.3em] text-[#d4af37] uppercase backdrop-blur-xs sm:text-sm shadow-xl"
				>
					{content.hero.dateBadge}
				</span>
			</div>
		{/if}
	</div>

	<div class="pb-6 opacity-40">
		<span class="text-[10px] tracking-[0.3em] uppercase text-white font-mono">Gulir ke bawah</span>
	</div>
</svelte:element>
