<script lang="ts">
	import type { GiftContent, GiftItem } from '$lib/types/invitation';
	import { Plus, Trash2 } from '@lucide/svelte';

	let { gift = $bindable() }: { gift: GiftContent } = $props();

	function addItem() {
		gift.items = [
			...gift.items,
			{
				type: 'bank',
				label: '',
				accountNumber: '',
				accountName: ''
			}
		];
	}

	function removeItem(index: number) {
		gift.items = gift.items.filter((_, i) => i !== index);
	}
</script>

<div class="space-y-6">
	<div class="creator-border creator-shadow-sm flex items-center justify-between bg-[#fffdf7] p-5">
		<div>
			<span class="block text-sm font-bold tracking-wider uppercase"
				>Aktifkan Amplop Digital / Hadiah</span
			>
			<span class="text-xs text-[#64685e]"
				>Tampilkan rekening bank atau e-wallet untuk kado pernikahan.</span
			>
		</div>
		<label class="relative inline-flex cursor-pointer items-center">
			<input type="checkbox" bind:checked={gift.enabled} class="peer sr-only" />
			<div
				class="peer h-6 w-12 rounded-full border-2 border-[#c9ccbf] bg-[#c9ccbf] peer-checked:bg-[#dce881] peer-focus:outline-hidden after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border-2 after:border-[#c9ccbf] after:bg-[#fffdf7] after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-[#c9ccbf]"
			></div>
		</label>
	</div>

	{#if gift.enabled}
		<div class="space-y-4">
			<div class="flex items-center justify-between">
				<span class="text-xs font-bold tracking-wider uppercase">Daftar Rekening / E-Wallet</span>
				<button
					type="button"
					onclick={addItem}
					class="creator-border creator-shadow-sm flex cursor-pointer items-center gap-1.5 bg-[#dce881] px-3 py-1.5 text-xs font-bold uppercase hover:bg-[#cfdd6c]"
				>
					<Plus class="h-3.5 w-3.5" />
					<span>Tambah Rekening</span>
				</button>
			</div>

			{#if gift.items.length === 0}
				<div class="border-2 border-dashed border-[#c9ccbf] p-6 text-center text-xs text-[#64685e]">
					Belum ada rekening atau e-wallet yang ditambahkan.
				</div>
			{:else}
				{#each gift.items as item, index}
					<div class="creator-border creator-shadow-sm relative space-y-3 bg-[#fffdf7] p-5">
						<div class="flex items-center justify-between border-b-2 border-[#c9ccbf] pb-2">
							<span class="font-mono text-xs font-bold uppercase">Rekening #{index + 1}</span>
							<button
								type="button"
								onclick={() => removeItem(index)}
								class="cursor-pointer p-1 text-red-600 hover:text-red-800"
								title="Hapus rekening"
							>
								<Trash2 class="h-4 w-4" />
							</button>
						</div>

						<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
							<div>
								<label
									for="gift-type-{index}"
									class="mb-1 block text-[11px] font-bold tracking-wider uppercase"
								>
									Kategori
								</label>
								<select
									id="gift-type-{index}"
									bind:value={item.type}
									class="creator-border w-full bg-[#f7f5ef] px-3 py-2 text-xs focus:outline-hidden"
								>
									<option value="bank">Bank Transfer</option>
									<option value="ewallet">E-Wallet (GoPay, OVO, Dana)</option>
									<option value="address">Alamat Pengiriman Kado Fisik</option>
								</select>
							</div>

							<div>
								<label
									for="gift-lbl-{index}"
									class="mb-1 block text-[11px] font-bold tracking-wider uppercase"
								>
									Nama Bank / Provider
								</label>
								<input
									id="gift-lbl-{index}"
									type="text"
									bind:value={item.label}
									placeholder="BCA / Mandiri / GoPay"
									class="creator-border w-full bg-[#f7f5ef] px-3 py-2 text-xs focus:outline-hidden"
								/>
							</div>
						</div>

						<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
							<div>
								<label
									for="gift-num-{index}"
									class="mb-1 block text-[11px] font-bold tracking-wider uppercase"
								>
									Nomor Rekening / No. HP
								</label>
								<input
									id="gift-num-{index}"
									type="text"
									bind:value={item.accountNumber}
									placeholder="1234567890"
									class="creator-border w-full bg-[#f7f5ef] px-3 py-2 font-mono text-xs focus:outline-hidden"
								/>
							</div>

							<div>
								<label
									for="gift-name-{index}"
									class="mb-1 block text-[11px] font-bold tracking-wider uppercase"
								>
									Atas Nama (Pemilik)
								</label>
								<input
									id="gift-name-{index}"
									type="text"
									bind:value={item.accountName}
									placeholder="Nama pemilik rekening"
									class="creator-border w-full bg-[#f7f5ef] px-3 py-2 text-xs focus:outline-hidden"
								/>
							</div>
						</div>
					</div>
				{/each}
			{/if}
		</div>
	{/if}
</div>
