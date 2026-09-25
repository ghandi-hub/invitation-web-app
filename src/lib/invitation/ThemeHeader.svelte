<script lang="ts">
	import type { InvitationContent, InvitationTheme } from '$lib/types/invitation';
	import type { Component } from 'svelte';
	import EditorialHeader from './themes/editorial/components/EditorialHeader.svelte';
	import CinematicHeader from './themes/cinematic/components/CinematicHeader.svelte';
	import MinimalHeader from './themes/minimal/components/MinimalHeader.svelte';
	import BotanicalHeader from './themes/botanical/components/BotanicalHeader.svelte';
	import RomanticClassicHeader from './themes/romantic-classic/components/RomanticClassicHeader.svelte';
	import ModernMonoHeader from './themes/modern-mono/components/ModernMonoHeader.svelte';
	import BrutalistHeader from './themes/brutalist/components/BrutalistHeader.svelte';
	import ContemporaryColorHeader from './themes/contemporary-color/components/ContemporaryColorHeader.svelte';
	import JavaneseHeader from './themes/javanese-heritage/components/JavaneseHeader.svelte';

	let {
		theme,
		content,
		preview = false
	}: {
		theme: InvitationTheme;
		content: Pick<InvitationContent, 'couple' | 'hero' | 'opening'>;
		preview?: boolean;
	} = $props();

	const headers: Record<InvitationTheme, Component<any>> = {
		'editorial': EditorialHeader,
		'cinematic': CinematicHeader,
		'minimal': MinimalHeader,
		'botanical': BotanicalHeader,
		'romantic-classic': RomanticClassicHeader,
		'modern-mono': ModernMonoHeader,
		'brutalist': BrutalistHeader,
		'contemporary-color': ContemporaryColorHeader,
		'javanese-heritage': JavaneseHeader
	};

	const SelectedHeader = $derived(headers[theme] || headers.editorial);
</script>

<div class="theme-header" class:thumbnail={preview} class:brutalist={theme === 'brutalist'}>
	<SelectedHeader {content} {preview} />
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
		font-size: clamp(20px, 10cqw, 38px) !important;
		line-height: 1.15;
		overflow-wrap: anywhere;
		margin-bottom: 12px;
	}
	.thumbnail > :global(div) {
		width: 100%;
		min-height: 100%;
		padding: 24px 16px !important;
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
		padding-top: 24px;
		padding-bottom: 24px;
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
