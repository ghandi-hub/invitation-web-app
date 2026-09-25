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

<svelte:element this={preview ? 'div' : 'header'} class="border-b-2 border-black p-6 sm:p-12">
	<div class="mx-auto flex max-w-5xl flex-col justify-between gap-6 sm:flex-row sm:items-end">
		<div>
			<div class="flex items-center gap-2 mb-2">
				<span class="text-xs text-neutral-400 font-mono">✛</span>
				<span class="text-[10px] tracking-widest text-neutral-500 uppercase font-bold">
					UNDANGAN PERNIKAHAN
				</span>
			</div>
			<svelte:element
				this={preview ? 'h3' : 'h1'}
				class="text-4xl font-bold tracking-tight uppercase sm:text-7xl"
			>
				{content.couple.partner1.name} + {content.couple.partner2.name}
			</svelte:element>
		</div>
		{#if content.hero?.dateBadge}
			<div class="text-left sm:text-right">
				<span
					class="inline-block bg-black px-4 py-1.5 text-xs font-bold tracking-widest text-white uppercase shadow-sm"
				>
					{content.hero.dateBadge}
				</span>
			</div>
		{/if}
	</div>
</svelte:element>
