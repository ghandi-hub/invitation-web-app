<script lang="ts">
	import type { CountdownContent } from '$lib/types/invitation';

	let { countdown = $bindable() }: { countdown: CountdownContent } = $props();

	// Format datetime-local string (YYYY-MM-DDTHH:mm)
	let localDateTime = $derived.by(() => {
		if (!countdown.targetDate) return '';
		try {
			const d = new Date(countdown.targetDate);
			const year = d.getFullYear();
			const month = String(d.getMonth() + 1).padStart(2, '0');
			const day = String(d.getDate()).padStart(2, '0');
			const hours = String(d.getHours()).padStart(2, '0');
			const minutes = String(d.getMinutes()).padStart(2, '0');
			return `${year}-${month}-${day}T${hours}:${minutes}`;
		} catch {
			return '';
		}
	});

	function handleChange(e: Event) {
		const target = e.target as HTMLInputElement;
		if (target.value) {
			countdown.targetDate = new Date(target.value).toISOString();
		}
	}
</script>

<div class="space-y-5">
	<div>
		<label for="cd-target" class="mb-1 block text-xs font-bold tracking-wider uppercase">
			Waktu Target Hitung Mundur (Hari H)
		</label>
		<input
			id="cd-target"
			type="datetime-local"
			value={localDateTime}
			onchange={handleChange}
			class="creator-border creator-shadow-sm w-full bg-[#fffdf7] px-3.5 py-2.5 font-mono text-sm focus:outline-hidden"
		/>
		<p class="mt-2 text-[11px] text-[#64685e]">
			Timer countdown pada undangan akan menghitung mundur otomatis sampai tanggal dan jam ini.
		</p>
	</div>
</div>
