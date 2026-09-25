<script lang="ts">
	import type { InvitationContent } from '$lib/types/invitation';
	import { Zap } from '@lucide/svelte';

	let {
		content,
		preview = false
	}: {
		content: Pick<InvitationContent, 'couple' | 'hero' | 'opening'>;
		preview?: boolean;
	} = $props();
</script>

<svelte:element this={preview ? 'div' : 'header'} class="space-y-6 text-center">
	<div
		class="border-brutal shadow-brutal-sm inline-flex items-center gap-2 bg-[#facc15] px-4 py-1.5 font-mono text-xs font-black tracking-wider uppercase"
	>
		<Zap class="h-3.5 w-3.5 fill-black" />
		<span>{content.opening?.greeting || 'Undangan Pernikahan Resmi'}</span>
	</div>

	<svelte:element
		this={preview ? 'h3' : 'h1'}
		class="font-syne text-5xl font-black tracking-tight text-black uppercase sm:text-8xl"
	>
		{content.couple.partner1.name} <br />
		<span class="border-brutal shadow-brutal-sm inline-block -rotate-2 bg-[#facc15] px-4"
			>&amp;</span
		> <br />
		{content.couple.partner2.name}
	</svelte:element>

	{#if content.hero?.dateBadge}
		<div class="pt-2">
			<span
				class="border-brutal shadow-brutal-sm inline-block bg-black px-6 py-2 font-mono text-sm font-bold tracking-widest text-white uppercase sm:text-base"
			>
				{content.hero.dateBadge}
			</span>
		</div>
	{/if}
</svelte:element>
