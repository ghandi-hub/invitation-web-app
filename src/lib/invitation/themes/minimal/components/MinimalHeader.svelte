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
	class="mx-auto max-w-4xl border-b border-neutral-200 px-6 py-20 text-left sm:py-32"
>
	<span class="mb-4 block font-mono text-xs tracking-[0.25em] text-neutral-400 uppercase">
		{content.opening?.greeting || 'Undangan Pernikahan'}
	</span>
	<svelte:element
		this={preview ? 'h3' : 'h1'}
		class="mb-6 text-5xl font-bold tracking-tighter text-neutral-900 sm:text-8xl"
	>
		{content.couple.partner1.name} <br />
		<span class="font-light text-neutral-300">&amp;</span>
		{content.couple.partner2.name}
	</svelte:element>
	{#if content.hero?.subheadline}
		<p class="mb-8 max-w-lg text-base font-light text-neutral-600 sm:xl">
			{content.hero.subheadline}
		</p>
	{/if}
	{#if content.hero?.dateBadge}
		<p class="font-mono text-xs tracking-widest text-neutral-900 uppercase font-medium">
			Tanggal: {content.hero.dateBadge}
		</p>
	{/if}
</svelte:element>
