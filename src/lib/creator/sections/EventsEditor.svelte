<script lang="ts">
	import type { WeddingEvent } from '$lib/types/invitation';
	import { Plus, Trash2 } from '@lucide/svelte';

	let { events = $bindable() }: { events: WeddingEvent[] } = $props();

	function addEvent() {
		events = [
			...events,
			{
				id: `event-${Date.now()}`,
				type: 'reception',
				title: '',
				date: '',
				startTime: '',
				endTime: '',
				venue: '',
				address: '',
				mapsUrl: ''
			}
		];
	}

	function removeEvent(index: number) {
		events = events.filter((_, i) => i !== index);
	}
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<span class="text-xs font-bold tracking-wider uppercase">Daftar Acara ({events.length})</span>
		<button
			type="button"
			onclick={addEvent}
			class="creator-border creator-shadow-sm flex cursor-pointer items-center gap-1.5 bg-[#dce881] px-3 py-1.5 text-xs font-bold uppercase transition-colors hover:bg-[#cfdd6c]"
		>
			<Plus class="h-3.5 w-3.5" />
			<span>Tambah Acara</span>
		</button>
	</div>

	{#if events.length === 0}
		<p
			class="border border-dashed border-[#c9ccbf] bg-[#f7f5ef] p-6 text-sm leading-relaxed text-[#64685e]"
		>
			Belum ada acara. Tambahkan akad, pemberkatan, atau resepsi, lalu isi waktu dan lokasinya.
		</p>
	{/if}
	{#each events as event, index (event.id || index)}
		<div class="creator-border creator-shadow-sm relative space-y-4 bg-[#fffdf7] p-5">
			<div class="flex items-center justify-between border-b-2 border-[#c9ccbf] pb-2">
				<span class="font-mono text-xs font-black uppercase">
					Acara #{index + 1}
				</span>
				{#if events.length > 0}
					<button
						type="button"
						onclick={() => removeEvent(index)}
						class="cursor-pointer p-1 text-red-600 hover:text-red-800"
						title="Hapus acara"
					>
						<Trash2 class="h-4 w-4" />
					</button>
				{/if}
			</div>

			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<div>
					<label
						for="ev-title-{index}"
						class="mb-1 block text-[11px] font-bold tracking-wider uppercase"
					>
						Nama Acara
					</label>
					<input
						id="ev-title-{index}"
						type="text"
						bind:value={event.title}
						placeholder="Akad Nikah / Resepsi"
						class="creator-border w-full bg-[#f7f5ef] px-3 py-2 text-xs font-medium focus:outline-hidden"
					/>
				</div>

				<div>
					<label
						for="ev-type-{index}"
						class="mb-1 block text-[11px] font-bold tracking-wider uppercase"
					>
						Jenis Acara
					</label>
					<select
						id="ev-type-{index}"
						bind:value={event.type}
						class="creator-border w-full bg-[#f7f5ef] px-3 py-2 text-xs font-medium focus:outline-hidden"
					>
						<option value="ceremony">Akad Nikah / Pemberkatan</option>
						<option value="reception">Resepsi Pernikahan</option>
						<option value="unduh-mantu">Unduh Mantu</option>
						<option value="other">Lainnya</option>
					</select>
				</div>
			</div>

			<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
				<div>
					<label
						for="ev-date-{index}"
						class="mb-1 block text-[11px] font-bold tracking-wider uppercase"
					>
						Tanggal Acara
					</label>
					<input
						id="ev-date-{index}"
						type="date"
						bind:value={event.date}
						class="creator-border w-full bg-[#f7f5ef] px-3 py-2 text-xs font-medium focus:outline-hidden"
					/>
				</div>

				<div>
					<label
						for="ev-start-{index}"
						class="mb-1 block text-[11px] font-bold tracking-wider uppercase"
					>
						Waktu Mulai
					</label>
					<input
						id="ev-start-{index}"
						type="time"
						bind:value={event.startTime}
						class="creator-border w-full bg-[#f7f5ef] px-3 py-2 text-xs font-medium focus:outline-hidden"
					/>
				</div>

				<div>
					<label
						for="ev-end-{index}"
						class="mb-1 block text-[11px] font-bold tracking-wider uppercase"
					>
						Waktu Selesai
					</label>
					<input
						id="ev-end-{index}"
						type="time"
						bind:value={event.endTime}
						class="creator-border w-full bg-[#f7f5ef] px-3 py-2 text-xs font-medium focus:outline-hidden"
					/>
				</div>
			</div>

			<div>
				<label
					for="ev-venue-{index}"
					class="mb-1 block text-[11px] font-bold tracking-wider uppercase"
				>
					Nama Tempat / Gedung
				</label>
				<input
					id="ev-venue-{index}"
					type="text"
					bind:value={event.venue}
					placeholder="The Grand Ballroom, Hotel Mulia"
					class="creator-border w-full bg-[#f7f5ef] px-3 py-2 text-xs font-medium focus:outline-hidden"
				/>
			</div>

			<div>
				<label
					for="ev-addr-{index}"
					class="mb-1 block text-[11px] font-bold tracking-wider uppercase"
				>
					Alamat Lengkap
				</label>
				<textarea
					id="ev-addr-{index}"
					bind:value={event.address}
					rows={2}
					placeholder="Jl. Jendral Sudirman Kav. 50, Jakarta"
					class="creator-border w-full resize-none bg-[#f7f5ef] px-3 py-2 text-xs font-medium focus:outline-hidden"
				></textarea>
			</div>

			<div>
				<label
					for="ev-map-{index}"
					class="mb-1 block text-[11px] font-bold tracking-wider uppercase"
				>
					Link Google Maps
				</label>
				<input
					id="ev-map-{index}"
					type="url"
					bind:value={event.mapsUrl}
					placeholder="https://maps.google.com/..."
					class="creator-border w-full bg-[#f7f5ef] px-3 py-2 text-xs font-medium focus:outline-hidden"
				/>
			</div>
		</div>
	{/each}
</div>
