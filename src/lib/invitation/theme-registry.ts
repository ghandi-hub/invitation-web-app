import type { InvitationTheme, ThemeConfig } from '$lib/invitation/types';
import type { Component } from 'svelte';
import Editorial from '$lib/invitation/themes/editorial/Editorial.svelte';
import Cinematic from '$lib/invitation/themes/cinematic/Cinematic.svelte';
import Minimal from '$lib/invitation/themes/minimal/Minimal.svelte';
import Botanical from '$lib/invitation/themes/botanical/Botanical.svelte';
import RomanticClassic from '$lib/invitation/themes/romantic-classic/RomanticClassic.svelte';
import ModernMono from '$lib/invitation/themes/modern-mono/ModernMono.svelte';
import Brutalist from '$lib/invitation/themes/brutalist/Brutalist.svelte';
import ContemporaryColor from '$lib/invitation/themes/contemporary-color/ContemporaryColor.svelte';
import JavaneseHeritage from '$lib/invitation/themes/javanese-heritage/JavaneseHeritage.svelte';

export const THEME_REGISTRY: Record<InvitationTheme, ThemeConfig> = {
	editorial: {
		id: 'editorial',
		name: 'Editorial Vogue',
		description: 'Serif display, generous whitespace, asymmetric layout & modern editorial aesthetics.',
		fontFamilyDisplay: 'font-playfair',
		fontFamilyBody: 'font-sans-clean',
		aesthetic: 'Warm beige & high-fashion editorial magazine feeling',
		supportsParallax: true,
		primaryColor: '#8c7051',
		bgColor: '#fbf9f5'
	},
	cinematic: {
		id: 'cinematic',
		name: 'Cinematic Noir',
		description: 'Dramatic full-bleed photography, bold cinema titles, moody lighting & film atmosphere.',
		fontFamilyDisplay: 'font-cinzel',
		fontFamilyBody: 'font-sans-clean',
		aesthetic: 'Deep charcoal black, golden accents & theatrical movie premiere vibes',
		supportsParallax: true,
		primaryColor: '#d4af37',
		bgColor: '#0d0d11'
	},
	minimal: {
		id: 'minimal',
		name: 'Swiss Minimal',
		description: 'Grid-based precision, high-contrast typography, objective simplicity.',
		fontFamilyDisplay: 'font-sans-clean',
		fontFamilyBody: 'font-mono',
		aesthetic: 'Pure black & white, stark minimalist beauty & Swiss modernist geometry',
		supportsParallax: false,
		primaryColor: '#171717',
		bgColor: '#ffffff'
	},
	botanical: {
		id: 'botanical',
		name: 'Botanical Garden',
		description: 'Delicate foliage illustrations, organic earth tones, soft romantic serif.',
		fontFamilyDisplay: 'font-italiana',
		fontFamilyBody: 'font-sans-clean',
		aesthetic: 'Sage green, organic olive & delicate hand-drawn wild flora',
		supportsParallax: true,
		primaryColor: '#4a6741',
		bgColor: '#f8faf7'
	},
	'romantic-classic': {
		id: 'romantic-classic',
		name: 'Romantic Classic',
		description: 'Timeless calligraphy, soft blush accents, refined serif body text.',
		fontFamilyDisplay: 'font-script',
		fontFamilyBody: 'font-cormorant',
		aesthetic: 'Dusty rose, romantic handwritten scripts & vintage gold leafing',
		supportsParallax: true,
		primaryColor: '#a87474',
		bgColor: '#fffbfa'
	},
	'modern-mono': {
		id: 'modern-mono',
		name: 'Modern Mono',
		description: 'Brutalist monospace, technical details, raw editorial energy.',
		fontFamilyDisplay: 'font-mono',
		fontFamilyBody: 'font-mono',
		aesthetic: 'Bold terminal monospace, raw stamps & contemporary architectural grit',
		supportsParallax: false,
		primaryColor: '#000000',
		bgColor: '#ffffff'
	},
	brutalist: {
		id: 'brutalist',
		name: 'Neo Brutalist',
		description: 'High contrast, bold borders, vivid accent colors, unapologetic statement.',
		fontFamilyDisplay: 'font-syne',
		fontFamilyBody: 'font-mono',
		aesthetic: 'Electric yellow, thick hard borders, stark shadows & street posters',
		supportsParallax: false,
		primaryColor: '#000000',
		bgColor: '#fffdf5'
	},
	'contemporary-color': {
		id: 'contemporary-color',
		name: 'Contemporary Color',
		description: 'Rich terracotta and cobalt accents, modern typography & striking color blocks.',
		fontFamilyDisplay: 'font-syne',
		fontFamilyBody: 'font-sans-clean',
		aesthetic: 'Vibrant Mediterranean terracotta & modern artistic poise',
		supportsParallax: true,
		primaryColor: '#c85a32',
		bgColor: '#faf3ee'
	},
	'javanese-heritage': {
		id: 'javanese-heritage',
		name: 'Javanese Heritage (Azurite)',
		description: 'Kemegahan tradisi Jawa berpadu Royal Navy Azurite & Emas Prada. Dihiasi Gunungan Wayang Kamajaya-Ratih beranimasi swing, motif Mega Mendung, dan divider pita klasik.',
		fontFamilyDisplay: 'font-philosopher',
		fontFamilyBody: 'font-lora',
		aesthetic: 'Royal Navy Azurite, Gunungan & Wayang Kamajaya-Ratih beranimasi, ornamen pita Jawa & aksen emas mewah',
		supportsParallax: true,
		primaryColor: '#c59b27',
		bgColor: '#00163D'
	}
};

export const THEME_LIST = Object.values(THEME_REGISTRY);

export function getThemeConfig(themeName: string): ThemeConfig {
	return THEME_REGISTRY[themeName as InvitationTheme] || THEME_REGISTRY.editorial;
}

export const THEME_COMPONENTS: Record<InvitationTheme, Component<any>> = {
	'editorial': Editorial,
	'cinematic': Cinematic,
	'minimal': Minimal,
	'botanical': Botanical,
	'romantic-classic': RomanticClassic,
	'modern-mono': ModernMono,
	'brutalist': Brutalist,
	'contemporary-color': ContemporaryColor,
	'javanese-heritage': JavaneseHeritage
};

export function getThemeComponent(themeName: string): Component<any> {
	return THEME_COMPONENTS[themeName as InvitationTheme] || THEME_COMPONENTS.editorial;
}
