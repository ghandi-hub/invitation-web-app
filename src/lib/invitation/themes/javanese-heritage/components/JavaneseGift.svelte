<script lang="ts">
	import type { GiftContent } from '$lib/types/invitation';
	import { Copy, Check, Gift as GiftIcon } from '@lucide/svelte';

	let { gift }: { gift: GiftContent } = $props();

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
			<GiftIcon class="w-8 h-8 mx-auto mb-2 text-[#E5C378]" />
			<p class="text-xs sm:text-sm max-w-md mx-auto text-[#FAF3E0]/80">
				Doa restu Anda merupakan karunia terindah bagi kami. Namun jika ingin memberikan tanda kasih secara cashless,
				dapat melalui sarana berikut:
			</p>
		</div>

		<div class="space-y-3">
			{#each gift.items as item, index}
				<div class="p-4 sm:p-5 backdrop-blur-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-[#072A5A]/90 border border-[#A39275]/50 shadow-xl transition-all">
					<div class="space-y-1">
						<span class="inline-block px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-md bg-[#011B3E] border border-[#A39275]/50 text-[#E5C378]">
							{item.label || item.type}
						</span>
						<div class="text-base sm:text-lg font-mono font-bold tracking-wider select-all text-[#F3E7D7]">
							{item.accountNumber}
						</div>
						<div class="text-xs text-[#FAF3E0]/70">
							a.n. <span class="font-semibold text-[#E5C378]">{item.accountName}</span>
						</div>
					</div>

					<button
						type="button"
						onclick={() => copyToClipboard(item.accountNumber, index)}
						class="px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0 rounded-full border border-[#A39275] bg-gradient-to-r from-[#F5EFE1] to-[#D8C5A4] text-[#092A57] font-bold hover:brightness-105 shadow-md"
					>
						{#if copiedIndex === index}
							<Check class="w-3.5 h-3.5 text-emerald-700" />
							<span class="text-emerald-800 font-bold">Tersalin!</span>
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
