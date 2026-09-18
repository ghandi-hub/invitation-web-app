<script lang="ts">
	import type { EventDocument } from '$lib/types';
	import { MailOpen, Heart, Sparkles, Moon } from '@lucide/svelte';

	interface Props {
		event: EventDocument;
		recipientName?: string;
		onopen?: () => void;
	}

	let { event, recipientName, onopen }: Props = $props();

	let isOpening = $state(false);

	function handleOpen() {
		isOpening = true;
		setTimeout(() => {
			if (onopen) onopen();
		}, 600);
	}

	// Helper for theme styling
	const themeStyles = $derived.by(() => {
		switch (event.themeId) {
			case 'islamic-emerald':
				return {
					bg: 'from-emerald-950 via-teal-900 to-stone-900',
					cardBg: 'bg-emerald-900/60 border-amber-400/40',
					badge: 'bg-amber-400/20 text-amber-300 border-amber-400/30',
					textGold: 'text-amber-300',
					button: 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 shadow-amber-500/30'
				};
			case 'cyber-party':
				return {
					bg: 'from-slate-950 via-purple-950 to-stone-950',
					cardBg: 'bg-slate-900/80 border-cyan-400/40',
					badge: 'bg-cyan-400/20 text-cyan-300 border-cyan-400/40',
					textGold: 'text-fuchsia-400',
					button: 'bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-violet-600 hover:opacity-95 text-white shadow-fuchsia-500/40'
				};
			case 'floral-blush':
			default:
				return {
					bg: 'from-stone-900 via-rose-950 to-stone-900',
					cardBg: 'bg-stone-900/70 border-rose-300/30',
					badge: 'bg-rose-500/20 text-rose-200 border-rose-300/30',
					textGold: 'text-rose-200',
					button: 'bg-gradient-to-r from-rose-400 to-rose-600 hover:from-rose-300 hover:to-rose-500 text-white shadow-rose-500/30'
				};
		}
	});
</script>

<div
	class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-b {themeStyles.bg} transition-all duration-700 ease-out"
	class:opacity-0={isOpening}
	class:pointer-events-none={isOpening}
	class:scale-105={isOpening}
>
	<!-- Decorative background glows -->
	<div class="pointer-events-none absolute inset-0 overflow-hidden">
		<div class="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl"></div>
		<div class="absolute -bottom-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-rose-500/10 blur-3xl"></div>
	</div>

	<!-- Main Invitation Envelope Card -->
	<div
		class="relative w-full max-w-md rounded-3xl p-8 md:p-10 text-center shadow-2xl backdrop-blur-xl border {themeStyles.cardBg} transition-transform duration-500"
		class:scale-95={isOpening}
	>
		<!-- Event Type Badge -->
		<div class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase border mb-6 {themeStyles.badge}">
			{#if event.themeId === 'islamic-emerald'}
				<Moon class="w-3.5 h-3.5" />
				<span>Walimatul Khitan</span>
			{:else if event.themeId === 'cyber-party'}
				<Sparkles class="w-3.5 h-3.5" />
				<span>Birthday Celebration</span>
			{:else}
				<Heart class="w-3.5 h-3.5" />
				<span>The Wedding Invitation</span>
			{/if}
		</div>

		<!-- Honored Names -->
		<h1 class="text-3xl md:text-4xl font-serif font-bold tracking-tight text-white mb-2 leading-tight">
			{#if event.content.honored.secondaryName}
				<span class="block">{event.content.honored.name}</span>
				<span class="text-xl md:text-2xl font-light italic opacity-80">&amp;</span>
				<span class="block">{event.content.honored.secondaryName}</span>
			{:else}
				{event.content.honored.name}
			{/if}
		</h1>

		{#if event.content.honored.roleOrTitle}
			<p class="text-sm font-medium {themeStyles.textGold} tracking-wide mb-6">
				{event.content.honored.roleOrTitle}
			</p>
		{/if}

		<!-- Recipient Invitation Card Box -->
		<div class="my-6 rounded-2xl bg-black/30 p-5 border border-white/10 text-stone-200">
			<p class="text-xs uppercase tracking-widest text-stone-400 mb-1">Kepada Yth. Bapak/Ibu/Saudara/i</p>
			<h2 class="text-xl font-bold text-white tracking-wide mt-1">
				{recipientName || 'Tamu Undangan'}
			</h2>
			<p class="text-xs text-stone-400 mt-2 italic">
				*Mohon maaf bila ada kesalahan penulisan nama/gelar
			</p>
		</div>

		<!-- Open Invitation Action Button -->
		<button
			type="button"
			onclick={handleOpen}
			disabled={isOpening}
			class="inline-flex items-center justify-center gap-2.5 w-full py-3.5 px-6 rounded-2xl font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] {themeStyles.button} cursor-pointer"
		>
			<MailOpen class="w-5 h-5 animate-bounce" />
			<span>Buka Undangan</span>
		</button>
	</div>
</div>
