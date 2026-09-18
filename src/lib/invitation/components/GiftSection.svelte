<script lang="ts">
	import type { GiftContent } from '$lib/types/invitation';
	import { Copy, Check, CreditCard, Gift as GiftIcon } from '@lucide/svelte';

	let {
		gift,
		theme = 'editorial'
	}: {
		gift: GiftContent;
		theme?: string;
	} = $props();

	let copiedIndex = $state<number | null>(null);

	async function copyToClipboard(text: string, index: number) {
		try {
			await navigator.clipboard.writeText(text);
			copiedIndex = index;
			setTimeout(() => {
				if (copiedIndex === index) copiedIndex = null;
			}, 2500);
		} catch (err) {
			console.warn('Clipboard copy failed:', err);
		}
	}
	const isCinematic = $derived(theme === 'cinematic');
</script>

{#if gift.enabled && gift.items && gift.items.length > 0}
	<div class="w-full max-w-xl mx-auto space-y-4">
		<div class="text-center mb-6">
			<GiftIcon class="w-8 h-8 mx-auto mb-2 {isCinematic ? 'text-[#d4af37]' : 'opacity-70 text-neutral-800'}" />
			<p class="text-xs sm:text-sm max-w-md mx-auto {isCinematic ? 'text-stone-300' : 'text-neutral-600'}">
				Doa restu Anda merupakan karunia terindah bagi kami. Namun jika ingin memberikan tanda kasih,
				dapat melalui sarana berikut:
			</p>
		</div>

		<div class="space-y-3">
			{#each gift.items as item, index}
				<div class="p-4 sm:p-5 backdrop-blur-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl transition-all {isCinematic
					? 'bg-[#181824]/90 border border-[#d4af37]/30 shadow-lg'
					: 'bg-white/80 border border-neutral-200 shadow-xs'}">
					<div class="space-y-1">
						<span class="inline-block px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-xs {isCinematic
							? 'bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37]'
							: 'bg-neutral-100 text-neutral-800 border border-neutral-200'}">
							{item.label || item.type}
						</span>
						<div class="text-base sm:text-lg font-mono font-bold tracking-wider select-all {isCinematic ? 'text-white' : 'text-neutral-900'}">
							{item.accountNumber}
						</div>
						<div class="text-xs {isCinematic ? 'text-stone-300' : 'text-neutral-600'}">
							a.n. <span class="font-semibold {isCinematic ? 'text-white' : 'text-neutral-900'}">{item.accountName}</span>
						</div>
					</div>

					<button
						type="button"
						onclick={() => copyToClipboard(item.accountNumber, index)}
						class="px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0 rounded-sm {isCinematic
							? 'border border-[#d4af37]/50 bg-[#d4af37]/10 text-[#d4af37] hover:bg-[#d4af37] hover:text-black font-bold'
							: 'border border-neutral-400 bg-white text-neutral-800 hover:bg-neutral-900 hover:text-white'}"
					>
						{#if copiedIndex === index}
							<Check class="w-3.5 h-3.5 {isCinematic ? 'text-emerald-400' : 'text-emerald-600'}" />
							<span class={isCinematic ? 'text-emerald-400 font-bold' : 'text-emerald-700 font-bold'}>Tersalin!</span>
						{:else}
							<Copy class="w-3.5 h-3.5" />
							<span>Salin Nomor</span>
						{/if}
					</button>
				</div>
			{/each}
		</div>
	</div>
{/if}
