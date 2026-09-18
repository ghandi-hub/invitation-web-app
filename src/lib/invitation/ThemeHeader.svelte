<script lang="ts">
	import type { InvitationContent, InvitationTheme } from '$lib/types/invitation';
	import { Film, Leaf, Zap, Sparkles } from '@lucide/svelte';
	let {
		theme,
		content,
		preview = false
	}: {
		theme: InvitationTheme;
		content: Pick<InvitationContent, 'couple' | 'hero' | 'opening'>;
		preview?: boolean;
	} = $props();
</script>

<div class="theme-header" class:thumbnail={preview} class:brutalist={theme === 'brutalist'}>
	{#if theme === 'editorial'}
		<svelte:element
			this={preview ? 'div' : 'header'}
			class="mx-auto max-w-5xl border-b border-[#2c2825]/10 px-6 py-12 text-center sm:py-20"
		>
			<span class="mb-3 block text-[11px] font-semibold tracking-[0.35em] text-[#8c7051] uppercase">
				{content.opening?.greeting || 'The Wedding Celebration Of'}
			</span>
			<svelte:element
				this={preview ? 'h3' : 'h1'}
				class="font-playfair mb-4 text-4xl font-normal tracking-tight text-[#1a1715] sm:text-7xl"
			>
				{content.couple.partner1.name} <span class="font-light italic opacity-50">&</span>
				{content.couple.partner2.name}
			</svelte:element>
			{#if content.hero?.dateBadge}
				<p class="font-mono text-xs tracking-[0.25em] uppercase opacity-60">
					{content.hero.dateBadge}
				</p>
			{/if}
		</svelte:element>
	{:else if theme === 'cinematic'}
		<svelte:element
			this={preview ? 'div' : 'header'}
			class="relative flex min-h-screen flex-col items-center justify-between bg-cover bg-center p-8 text-center"
			style={content.hero?.coverUrl
				? `background-image: linear-gradient(to bottom, rgba(13,13,17,0.4), rgba(13,13,17,0.7) 70%, #0d0d11 100%), url('${content.hero.coverUrl}')`
				: 'background: radial-gradient(circle at center, #1f1f28 0%, #0d0d11 100%)'}
		>
			<div class="pt-8">
				<span
					class="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-white/10 px-4 py-1.5 text-[10px] tracking-[0.3em] text-[#d4af37] uppercase backdrop-blur-md"
				>
					<Film class="h-3 w-3" />
					<span>A True Love Story</span>
				</span>
			</div>

			<div class="mx-auto my-auto max-w-4xl space-y-6 py-12">
				<span class="block text-xs font-semibold tracking-[0.4em] text-[#d4af37] uppercase">
					{content.opening?.greeting || 'The Wedding Celebration Of'}
				</span>
				<svelte:element
					this={preview ? 'h3' : 'h1'}
					class="font-cinzel text-5xl font-normal tracking-wide text-white drop-shadow-md sm:text-8xl"
				>
					{content.couple.partner1.name} <span class="text-3xl text-[#d4af37] sm:text-6xl">&</span>
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
							class="border border-[#d4af37]/40 bg-black/40 px-6 py-2 font-mono text-xs tracking-[0.3em] text-[#d4af37] uppercase backdrop-blur-xs sm:text-sm"
						>
							{content.hero.dateBadge}
						</span>
					</div>
				{/if}
			</div>

			<div class="pb-6 opacity-40">
				<span class="text-[10px] tracking-[0.3em] uppercase">Scroll to reveal</span>
			</div>
		</svelte:element>
	{:else if theme === 'minimal'}
		<svelte:element
			this={preview ? 'div' : 'header'}
			class="mx-auto max-w-4xl border-b border-neutral-100 px-6 py-20 text-left sm:py-32"
		>
			<span class="mb-4 block font-mono text-xs tracking-[0.2em] text-neutral-400 uppercase">
				{content.opening?.greeting || 'The Wedding Of'}
			</span>
			<svelte:element
				this={preview ? 'h3' : 'h1'}
				class="mb-6 text-5xl font-bold tracking-tighter text-black sm:text-8xl"
			>
				{content.couple.partner1.name} <br />
				<span class="font-light text-neutral-300">&</span>
				{content.couple.partner2.name}
			</svelte:element>
			{#if content.hero?.subheadline}
				<p class="mb-8 max-w-lg text-base font-light text-neutral-600 sm:text-xl">
					{content.hero.subheadline}
				</p>
			{/if}
			{#if content.hero?.dateBadge}
				<p class="font-mono text-xs tracking-widest text-black uppercase">
					Date: {content.hero.dateBadge}
				</p>
			{/if}
		</svelte:element>
	{:else if theme === 'botanical'}
		<svelte:element
			this={preview ? 'div' : 'header'}
			class="mx-auto max-w-4xl border-b border-[#4a6741]/15 px-6 py-16 text-center sm:py-24"
		>
			<div class="mb-4 inline-flex items-center justify-center gap-2 text-[#4a6741]">
				<Leaf class="h-4 w-4" />
				<span class="text-[11px] font-semibold tracking-[0.3em] uppercase">
					{content.opening?.greeting || 'The Wedding Celebration Of'}
				</span>
				<Leaf class="h-4 w-4" />
			</div>
			<svelte:element
				this={preview ? 'h3' : 'h1'}
				class="font-italiana mb-4 text-4xl tracking-normal text-[#1b2710] sm:text-7xl"
			>
				{content.couple.partner1.name}
				<span class="font-playfair font-light italic opacity-50">&</span>
				{content.couple.partner2.name}
			</svelte:element>
			{#if content.hero?.dateBadge}
				<p class="font-mono text-xs tracking-[0.25em] text-[#606c38] uppercase">
					{content.hero.dateBadge}
				</p>
			{/if}
		</svelte:element>
	{:else if theme === 'romantic-classic'}
		<svelte:element
			this={preview ? 'div' : 'header'}
			class="mx-auto max-w-4xl border-b border-[#a87474]/20 px-6 py-16 text-center sm:py-24"
		>
			<span class="font-script mb-2 block text-3xl text-[#a87474] sm:text-4xl">
				{content.opening?.greeting || 'The Wedding Celebration Of'}
			</span>
			<svelte:element
				this={preview ? 'h3' : 'h1'}
				class="font-cormorant mb-4 text-4xl font-normal text-[#2a1e20] sm:text-7xl"
			>
				{content.couple.partner1.name}
				<span class="font-script text-3xl text-[#a87474] sm:text-5xl">&</span>
				{content.couple.partner2.name}
			</svelte:element>
			{#if content.hero?.dateBadge}
				<p class="font-mono text-xs tracking-[0.3em] text-[#a87474] uppercase">
					{content.hero.dateBadge}
				</p>
			{/if}
		</svelte:element>
	{:else if theme === 'modern-mono'}
		<svelte:element this={preview ? 'div' : 'header'} class="border-b-2 border-black p-6 sm:p-12">
			<div class="mx-auto flex max-w-5xl flex-col justify-between gap-6 sm:flex-row sm:items-end">
				<div>
					<span class="mb-2 block text-[10px] tracking-widest text-neutral-500 uppercase">
						UNDANGAN PERNIKAHAN
					</span>
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
							class="inline-block bg-black px-3 py-1 text-xs font-bold tracking-widest text-white uppercase"
						>
							{content.hero.dateBadge}
						</span>
					</div>
				{/if}
			</div>
		</svelte:element>
	{:else if theme === 'brutalist'}
		<svelte:element this={preview ? 'div' : 'header'} class="space-y-6 text-center">
			<div
				class="border-brutal shadow-brutal-sm inline-flex items-center gap-2 bg-[#facc15] px-4 py-1.5 font-mono text-xs font-black tracking-wider uppercase"
			>
				<Zap class="h-3.5 w-3.5 fill-black" />
				<span>{content.opening?.greeting || 'Official Wedding Invitation'}</span>
			</div>

			<svelte:element
				this={preview ? 'h3' : 'h1'}
				class="font-syne text-5xl font-black tracking-tight text-black uppercase sm:text-8xl"
			>
				{content.couple.partner1.name} <br />
				<span class="border-brutal shadow-brutal-sm inline-block -rotate-2 bg-[#facc15] px-4"
					>&</span
				> <br />
				{content.couple.partner2.name}
			</svelte:element>

			{#if content.hero?.dateBadge}
				<div class="pt-2">
					<span
						class="inline-block bg-black px-6 py-2 font-mono text-sm font-bold tracking-widest text-white uppercase sm:text-base"
					>
						{content.hero.dateBadge}
					</span>
				</div>
			{/if}
		</svelte:element>
	{:else if theme === 'contemporary-color'}
		<svelte:element
			this={preview ? 'div' : 'header'}
			class="mx-auto max-w-5xl px-6 py-16 text-center sm:py-24"
		>
			<div
				class="mb-6 inline-flex items-center gap-2 rounded-full bg-[#c85a32]/10 px-4 py-1.5 text-xs font-bold tracking-widest text-[#c85a32] uppercase"
			>
				<Sparkles class="h-3.5 w-3.5" />
				<span>{content.opening?.greeting || 'The Wedding Celebration'}</span>
			</div>
			<svelte:element
				this={preview ? 'h3' : 'h1'}
				class="font-syne mb-6 text-5xl font-bold tracking-tight text-[#0d1b2a] sm:text-8xl"
			>
				{content.couple.partner1.name} <span class="text-[#c85a32]">&</span>
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
	{/if}
</div>

<style>
	.theme-header {
		display: contents;
	}
	.thumbnail {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		container-type: inline-size;
	}
	.thumbnail :global(h3) {
		font-size: clamp(22px, 11cqw, 42px) !important;
		line-height: 1.15;
		overflow-wrap: anywhere;
		margin-bottom: 14px;
	}
	.thumbnail > :global(div) {
		width: 100%;
		min-height: 100%;
		padding: 28px 18px !important;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.thumbnail :global(span),
	.thumbnail :global(p) {
		font-size: 8px !important;
		letter-spacing: 1.2px;
	}
	.thumbnail :global(h3 span) {
		font-size: 0.8em !important;
		letter-spacing: inherit;
	}
	.thumbnail :global(svg) {
		width: 10px;
		height: 10px;
		flex-shrink: 0;
	}
	.thumbnail :global(.pt-8),
	.thumbnail :global(.pb-6) {
		padding: 0;
	}
	.thumbnail :global(.py-12) {
		padding-top: 28px;
		padding-bottom: 28px;
	}
	.thumbnail :global(.sm\:flex-row) {
		flex-direction: column;
		align-items: flex-start;
	}
	.thumbnail :global(.sm\:text-right) {
		text-align: left;
	}
	.thumbnail.brutalist {
		padding: 16px;
	}
	.thumbnail.brutalist > :global(div) {
		min-height: auto;
		border: 2px solid black;
		background: white;
		box-shadow: 4px 4px black;
		padding: 24px 12px !important;
	}
</style>
