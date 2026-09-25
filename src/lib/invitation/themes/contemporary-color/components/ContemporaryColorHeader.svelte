<script lang="ts">
	import type { InvitationContent } from '$lib/types/invitation';
	import { Sparkles } from '@lucide/svelte';

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
	class="mx-auto max-w-5xl px-6 py-16 text-center sm:py-24"
>
	<div
		class="mb-6 inline-flex items-center gap-2 rounded-full bg-[#c85a32]/10 px-4 py-1.5 text-xs font-bold tracking-widest text-[#c85a32] uppercase"
	>
		<Sparkles class="h-3.5 w-3.5" />
		<span>{content.opening?.greeting || 'Perayaan Pernikahan'}</span>
	</div>
	<svelte:element
		this={preview ? 'h3' : 'h1'}
		class="font-syne mb-6 text-5xl font-bold tracking-tight text-[#0d1b2a] sm:text-8xl"
	>
		{content.couple.partner1.name} <span class="text-[#c85a32]">&amp;</span>
		{content.couple.partner2.name}
	</svelte:element>
	{#if content.hero?.dateBadge}
		<p
			class="font-mono text-xs font-semibold tracking-widest text-[#c85a32] uppercase sm:text-sm"
		>
			{content.hero.dateBadge}
		</p>
	{/if}
</svelte:element>
