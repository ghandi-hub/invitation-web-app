<script lang="ts">
	import type { InvitationContent } from '$lib/types/invitation';

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
	class="mx-auto max-w-4xl border-b border-[#4a6741]/20 px-6 py-16 text-center sm:py-24"
>
	<div class="mb-4 inline-flex items-center justify-center gap-2 text-[#4a6741]">
		<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
			<path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C12 16 16 12 22 12C22 6.5 17.5 2 12 2Z" />
		</svg>
		<span class="text-[11px] font-semibold tracking-[0.35em] uppercase text-[#606c38]">
			{content.opening?.greeting || 'Undangan Pernikahan'}
		</span>
		<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" class="-scale-x-100">
			<path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C12 16 16 12 22 12C22 6.5 17.5 2 12 2Z" />
		</svg>
	</div>
	<svelte:element
		this={preview ? 'h3' : 'h1'}
		class="font-italiana mb-4 text-4xl tracking-normal text-[#1b2710] sm:text-7xl"
	>
		{content.couple.partner1.name}
		<span class="font-playfair font-light italic text-[#4a6741] opacity-70">&amp;</span>
		{content.couple.partner2.name}
	</svelte:element>
	{#if content.hero?.dateBadge}
		<p class="font-mono text-xs tracking-[0.25em] text-[#606c38] uppercase font-medium">
			{content.hero.dateBadge}
		</p>
	{/if}
</svelte:element>
