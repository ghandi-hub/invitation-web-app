import IslamicEmeraldTheme from './islamic-emerald/IslamicEmeraldTheme.svelte';
import FloralBlushTheme from './floral-blush/FloralBlushTheme.svelte';
import CyberPartyTheme from './cyber-party/CyberPartyTheme.svelte';
import type { Component } from 'svelte';
import type { ThemeConfig } from '$lib/types';

// Registry of theme components
export const themeRegistry: Record<string, Component<any>> = {
	'islamic-emerald': IslamicEmeraldTheme,
	'floral-blush': FloralBlushTheme,
	'cyber-party': CyberPartyTheme,
	'default': FloralBlushTheme
};

// Theme configurations / metadata for SaaS catalog
export const themeConfigs: ThemeConfig[] = [
	{
		id: 'islamic-emerald',
		name: 'Islamic Emerald',
		description: 'Nuansa hijau zamrud & emas mewah khas Timur Tengah, ideal untuk Walimatul Khitan, Aqiqah, & Syukuran Islami.',
		eventType: 'khitanan',
		primaryColor: '#064e3b',
		accentColor: '#f59e0b'
	},
	{
		id: 'floral-blush',
		name: 'Floral Blush',
		description: 'Desain romantis warna dusty rose & emas hangat dengan ornamen bunga gugur, ideal untuk Undangan Pernikahan.',
		eventType: 'wedding',
		primaryColor: '#881337',
		accentColor: '#fb7185'
	},
	{
		id: 'cyber-party',
		name: 'Cyber Party',
		description: 'Gaya neon futuristik, modern, dan energik dengan efek visual bold, ideal untuk Pesta Ulang Tahun & Gathering.',
		eventType: 'birthday',
		primaryColor: '#0891b2',
		accentColor: '#c026d3'
	}
];
