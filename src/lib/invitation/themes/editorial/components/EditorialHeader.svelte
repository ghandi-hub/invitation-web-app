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
	class="mx-auto max-w-5xl border-b border-[#2c2825]/15 px-6 py-12 text-center sm:py-20"
>
	<span class="mb-3 block text-[10px] sm:text-[11px] font-mono font-semibold tracking-[0.35em] text-[#8c7051] uppercase">
		{content.opening?.greeting || 'Undangan Pernikahan'}
	</span>
	<svelte:element
		this={preview ? 'h3' : 'h1'}
		class="font-playfair mb-4 text-4xl font-normal tracking-tight text-[#1a1715] sm:text-7xl"
	>
		{content.couple.partner1.name} <span class="font-light italic text-[#8c7051] opacity-70">&amp;</span>
		{content.couple.partner2.name}
	</svelte:element>
	{#if content.hero?.dateBadge}
		<p class="font-mono text-xs tracking-[0.25em] text-[#8c7051] uppercase">
			{content.hero.dateBadge}
		</p>
	{/if}
</svelte:element>
