<script lang="ts">
	import type { RsvpSettings } from '$lib/types/invitation';

	let { rsvp = $bindable() }: { rsvp: RsvpSettings } = $props();
</script>

<div class="space-y-6">
	<div class="creator-border creator-shadow-sm flex items-center justify-between bg-[#fffdf7] p-5">
		<div>
			<span class="block text-sm font-bold tracking-wider uppercase">Aktifkan Form RSVP</span>
			<span class="text-xs text-[#64685e]"
				>Tamu dapat mengonfirmasi kehadiran mereka secara langsung.</span
			>
		</div>
		<label class="relative inline-flex cursor-pointer items-center">
			<input type="checkbox" bind:checked={rsvp.enabled} class="peer sr-only" />
			<div
				class="peer h-6 w-12 rounded-full border-2 border-[#c9ccbf] bg-[#c9ccbf] peer-checked:bg-[#dce881] peer-focus:outline-hidden after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border-2 after:border-[#c9ccbf] after:bg-[#fffdf7] after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-[#c9ccbf]"
			></div>
		</label>
	</div>

	{#if rsvp.enabled}
		<div class="creator-border creator-shadow-sm space-y-4 bg-[#fffdf7] p-5">
			<div>
				<label for="rsvp-deadline" class="mb-1 block text-xs font-bold tracking-wider uppercase">
					Batas Waktu Konfirmasi (Deadline)
				</label>
				<input
					id="rsvp-deadline"
					type="date"
					bind:value={rsvp.deadline}
					class="creator-border w-full bg-[#f7f5ef] px-3.5 py-2.5 text-sm font-medium focus:outline-hidden"
				/>
			</div>

			<div class="flex items-center justify-between border-t border-[#d8dacc] pt-2">
				<div>
					<span class="block text-xs font-bold tracking-wider uppercase"
						>Izinkan Pilihan Jumlah Tamu</span
					>
					<span class="text-[11px] text-[#64685e]"
						>Tamu dapat memilih jumlah orang yang hadir bersama mereka.</span
					>
				</div>
				<input
					type="checkbox"
					bind:checked={rsvp.allowGuestCount}
					class="h-5 w-5 cursor-pointer accent-black"
				/>
			</div>
		</div>
	{/if}
</div>
