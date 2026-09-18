<script lang="ts">
	import type { InvitationContent, InvitationTheme } from '$lib/types/invitation';
	import { getThemeConfig } from './theme-registry';
	import ThemeHeader from './ThemeHeader.svelte';
	let { theme, content }: { theme: InvitationTheme; content?: InvitationContent } = $props();
	const config = $derived(getThemeConfig(theme));
	// Display-only labels; never written to the invitation or database.
	const header = $derived({
		opening: { greeting: content?.opening.greeting || 'The Wedding Of' },
		couple: {
			partner1: { name: content?.couple.partner1.name || 'Mempelai' },
			partner2: { name: content?.couple.partner2.name || 'Pasangan' }
		},
		hero: {
			headline: content?.hero.headline || '',
			subheadline: content?.hero.subheadline || '',
			coverUrl: content?.hero.coverUrl || null,
			dateBadge: content?.hero.dateBadge || 'Tanggal pernikahan'
		}
	});
</script>

<div
	class="header-preview {config.fontFamilyBody}"
	style:background={config.bgColor}
	aria-label="Pratinjau header {config.name}"
>
	<ThemeHeader {theme} content={header} preview />
</div>

<style>
	.header-preview {
		width: 100%;
		aspect-ratio: 4 / 5;
		overflow: hidden;
		border: 1px solid #24282030;
		color: #242820;
		line-height: 1.5;
	}
</style>
