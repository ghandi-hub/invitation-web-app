<script lang="ts">
	import type { GiftRegistryItem } from '$lib/types';
	import { Copy, Check, Gift, CreditCard, MapPin, Building2 } from '@lucide/svelte';

	interface Props {
		giftRegistries?: GiftRegistryItem[];
		themeId?: string;
	}

	let { giftRegistries = [], themeId = 'floral-blush' }: Props = $props();

	let copiedIndex = $state<number | null>(null);
	let toastMessage = $state<string | null>(null);
	let toastTimeout: NodeJS.Timeout | null = null;

	async function copyToClipboard(text: string, index: number) {
		try {
			await navigator.clipboard.writeText(text);
			copiedIndex = index;
			toastMessage = `Berhasil menyalin: ${text}`;

			if (toastTimeout) clearTimeout(toastTimeout);
			toastTimeout = setTimeout(() => {
				copiedIndex = null;
				toastMessage = null;
			}, 3000);
		} catch (err) {
			console.error('Failed to copy: ', err);
		}
	}
</script>

<div class="w-full max-w-2xl mx-auto my-12 px-4">
	<div class="text-center mb-8">
		<div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/10 text-amber-400 mb-3">
			<Gift class="w-6 h-6" />
		</div>
		<h2 class="text-2xl md:text-3xl font-serif font-bold text-white mb-2">Tanda Kasih (Kado Digital)</h2>
		<p class="text-sm text-stone-400 max-w-md mx-auto">
			Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda bermaksud memberikan tanda kasih, Anda dapat menggunakan amplop digital di bawah ini:
		</p>
	</div>

	<!-- Gift Registry Cards Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-5">
		{#each giftRegistries as registry, i (i)}
			<div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-stone-900/90 to-stone-800/80 border border-white/10 p-6 shadow-xl backdrop-blur-md flex flex-col justify-between">
				<!-- Card Chip / Header -->
				<div class="flex items-center justify-between mb-4">
					<div class="flex items-center gap-2">
						{#if registry.type === 'bank'}
							<Building2 class="w-5 h-5 text-amber-400" />
						{:else if registry.type === 'ewallet'}
							<CreditCard class="w-5 h-5 text-cyan-400" />
						{:else}
							<MapPin class="w-5 h-5 text-rose-400" />
						{/if}
						<span class="font-bold text-white tracking-wider uppercase text-sm">
							{registry.provider || (registry.type === 'address' ? 'Kirim Kado Fisik' : 'Bank')}
						</span>
					</div>
					<div class="w-8 h-6 rounded bg-amber-400/20 border border-amber-400/30 flex items-center justify-center">
						<div class="w-5 h-3 rounded-sm border border-amber-400/40"></div>
					</div>
				</div>

				<!-- Card Content Details -->
				<div class="space-y-1 mb-6">
					{#if registry.accountNumber}
						<p class="text-xs text-stone-400 uppercase tracking-wider">Nomor Rekening / Akun</p>
						<p class="text-lg md:text-xl font-mono font-bold tracking-widest text-amber-300">
							{registry.accountNumber}
						</p>
					{/if}

					{#if registry.accountHolder}
						<p class="text-xs text-stone-400 uppercase tracking-wider mt-2">Atas Nama</p>
						<p class="text-sm font-semibold text-white">
							{registry.accountHolder}
						</p>
					{/if}

					{#if registry.address}
						<p class="text-xs text-stone-400 uppercase tracking-wider">Alamat Penerima</p>
						<p class="text-xs text-stone-200 leading-relaxed mt-1">
							{registry.address}
						</p>
					{/if}
				</div>

				<!-- Copy Button -->
				<div>
					{#if registry.accountNumber}
						<button
							type="button"
							onclick={() => copyToClipboard(registry.accountNumber!, i)}
							class="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer {copiedIndex === i ? 'bg-emerald-600 text-white' : 'bg-white/10 hover:bg-white/20 text-stone-200 border border-white/10'}"
						>
							{#if copiedIndex === i}
								<Check class="w-4 h-4 text-emerald-300" />
								<span>Tersalin ke Clipboard!</span>
							{:else}
								<Copy class="w-4 h-4" />
								<span>Salin Nomor Rekening</span>
							{/if}
						</button>
					{:else if registry.address}
						<button
							type="button"
							onclick={() => copyToClipboard(registry.address!, i)}
							class="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer {copiedIndex === i ? 'bg-emerald-600 text-white' : 'bg-white/10 hover:bg-white/20 text-stone-200 border border-white/10'}"
						>
							{#if copiedIndex === i}
								<Check class="w-4 h-4 text-emerald-300" />
								<span>Alamat Tersalin!</span>
							{:else}
								<Copy class="w-4 h-4" />
								<span>Salin Alamat Lengkap</span>
							{/if}
						</button>
					{/if}
				</div>
			</div>
		{/each}
	</div>

	<!-- Toast Notification -->
	{#if toastMessage}
		<div class="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-stone-900/95 text-amber-300 text-xs font-medium shadow-2xl border border-amber-400/40 backdrop-blur-md flex items-center gap-2 transition-all">
			<Check class="w-4 h-4 text-emerald-400" />
			<span>{toastMessage}</span>
		</div>
	{/if}
</div>
