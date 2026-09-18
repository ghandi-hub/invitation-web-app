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
</script>

{#if gift.enabled && gift.items && gift.items.length > 0}
	<div class="w-full max-w-xl mx-auto space-y-4">
		<div class="text-center mb-6">
			<GiftIcon class="w-8 h-8 mx-auto mb-2 opacity-70" />
			<p class="text-xs sm:text-sm opacity-75 max-w-md mx-auto">
				Doa restu Anda merupakan karunia terindah bagi kami. Namun jika ingin memberikan tanda kasih,
				dapat melalui sarana berikut:
			</p>
		</div>

		<div class="space-y-3">
			{#each gift.items as item, index}
				<div class="p-4 sm:p-5 bg-white/70 backdrop-blur-xs border border-current/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
					<div class="space-y-1">
						<span class="inline-block px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-current/10 rounded-xs">
							{item.label || item.type}
						</span>
						<div class="text-base sm:text-lg font-mono font-bold tracking-wider select-all">
							{item.accountNumber}
						</div>
						<div class="text-xs opacity-70">
							a.n. <span class="font-semibold">{item.accountName}</span>
						</div>
					</div>

					<button
						type="button"
						onclick={() => copyToClipboard(item.accountNumber, index)}
						class="px-4 py-2 text-xs font-semibold uppercase tracking-wider border border-current/30 hover:bg-current hover:text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
					>
						{#if copiedIndex === index}
							<Check class="w-3.5 h-3.5 text-emerald-600" />
							<span>Tersalin!</span>
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
