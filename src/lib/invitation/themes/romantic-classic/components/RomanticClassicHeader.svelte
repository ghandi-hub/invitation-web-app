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
	class="mx-auto max-w-4xl border-b border-[#a87474]/20 px-6 py-16 text-center sm:py-24"
>
	<span class="font-script mb-2 block text-3xl text-[#a87474] sm:text-4xl">
		{content.opening?.greeting || 'Undangan Pernikahan'}
	</span>
	<svelte:element
		this={preview ? 'h3' : 'h1'}
		class="font-cormorant mb-4 text-4xl font-normal text-[#2a1e20] sm:text-7xl"
	>
		{content.couple.partner1.name}
		<span class="font-script text-3xl text-[#a87474] sm:text-5xl">&amp;</span>
		{content.couple.partner2.name}
	</svelte:element>
	{#if content.hero?.dateBadge}
		<p class="font-mono text-xs tracking-[0.3em] text-[#a87474] uppercase">
			{content.hero.dateBadge}
		</p>
	{/if}
</svelte:element>
