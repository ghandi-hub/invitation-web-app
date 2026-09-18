<script lang="ts">
	import type { GuestbookSettings } from '$lib/types/invitation';

	let { guestbook = $bindable() }: { guestbook: GuestbookSettings } = $props();
</script>

<div class="space-y-6">
	<div class="creator-border creator-shadow-sm flex items-center justify-between bg-[#fffdf7] p-5">
		<div>
			<span class="block text-sm font-bold tracking-wider uppercase">Aktifkan Buku Tamu & Doa</span>
			<span class="text-xs text-[#64685e]"
				>Tamu dapat mengirimkan pesan selamat dan doa restu secara publik.</span
			>
		</div>
		<label class="relative inline-flex cursor-pointer items-center">
			<input type="checkbox" bind:checked={guestbook.enabled} class="peer sr-only" />
			<div
				class="peer h-6 w-12 rounded-full border-2 border-[#c9ccbf] bg-[#c9ccbf] peer-checked:bg-[#dce881] peer-focus:outline-hidden after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border-2 after:border-[#c9ccbf] after:bg-[#fffdf7] after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-[#c9ccbf]"
			></div>
		</label>
	</div>
</div>
