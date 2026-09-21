import type { InvitationTheme, ThemeConfig } from '$lib/invitation/types';

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
		aesthetic: 'Deep charcoal, gold accents & cinematic widescreen drama',
		supportsParallax: true,
		primaryColor: '#d4af37',
		bgColor: '#0d0d11'
	},
	minimal: {
		id: 'minimal',
		name: 'Pure Minimalist',
		description: 'Pristine whitespace, purposeful typography, balanced proportion & zero visual noise.',
		fontFamilyDisplay: 'font-grotesk',
		fontFamilyBody: 'font-sans-clean',
		aesthetic: 'Clean architectural lines and serene quiet luxury',
		supportsParallax: false,
		primaryColor: '#2b2b2b',
		bgColor: '#ffffff'
	},
	botanical: {
		id: 'botanical',
		name: 'Botanical Garden',
		description: 'Natural organic elegance, muted sage & olive tones, refined serif & garden romance.',
		fontFamilyDisplay: 'font-italiana',
		fontFamilyBody: 'font-sans-clean',
		aesthetic: 'Earthy greens, soft cream & romantic botanical serenity',
		supportsParallax: true,
		primaryColor: '#4a6741',
		bgColor: '#f4f6f0'
	},
	'romantic-classic': {
		id: 'romantic-classic',
		name: 'Romantic Classic',
		description: 'Symmetrical grace, timeless script flourishes, champagne highlights & traditional elegance.',
		fontFamilyDisplay: 'font-cormorant',
		fontFamilyBody: 'font-sans-clean',
		aesthetic: 'Ivory, rose-gold accents & timeless fairytale vows',
		supportsParallax: false,
		primaryColor: '#a87474',
		bgColor: '#faf6f5'
	},
	'modern-mono': {
		id: 'modern-mono',
		name: 'Modern Monochrome',
		description: 'Stark black and white, monospace accents, strong grid lines & contemporary edge.',
		fontFamilyDisplay: 'font-mono-code',
		fontFamilyBody: 'font-mono-code',
		aesthetic: 'Editorial brutalism, precise grid rules & sharp contrast',
		supportsParallax: false,
		primaryColor: '#000000',
		bgColor: '#f5f5f5'
	},
	brutalist: {
		id: 'brutalist',
		name: 'Neo Brutalist',
		description: 'Thick black outlines, hard offset drop shadows, punchy badges & unapologetic energy.',
		fontFamilyDisplay: 'font-syne',
		fontFamilyBody: 'font-grotesk',
		aesthetic: 'Bold paper yellow, thick border lines & tactile block layout',
		supportsParallax: false,
		primaryColor: '#facc15',
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
		name: 'Javanese Heritage',
		description: 'Kemegahan tradisi Keraton Jawa dengan sentuhan Gunungan Wayang, ukiran gebyok, motif batik sogan & aksen prada emas nan agung.',
		fontFamilyDisplay: 'font-cinzel',
		fontFamilyBody: 'font-sans-clean',
		aesthetic: 'Batik sogan hangat, prada emas keraton & keanggunan ronce melati',
		supportsParallax: true,
		primaryColor: '#c59b27',
		bgColor: '#faf5eb'
	}
};

export const THEME_LIST = Object.values(THEME_REGISTRY);

export function getThemeConfig(themeName: string): ThemeConfig {
	return THEME_REGISTRY[themeName as InvitationTheme] || THEME_REGISTRY.editorial;
}
