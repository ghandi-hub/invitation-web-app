<script lang="ts">
	import type { OpeningContent } from '$lib/types/invitation';

	let { opening = $bindable() }: { opening: OpeningContent } = $props();
</script>

<div class="space-y-5">
	<div>
		<label for="op-greeting" class="mb-1 block text-xs font-bold tracking-wider uppercase">
			Salam Pembuka / Headline
		</label>
		<input
			id="op-greeting"
			type="text"
			bind:value={opening.greeting}
			placeholder="Undangan Pernikahan"
			class="creator-border creator-shadow-sm w-full bg-[#fffdf7] px-3.5 py-2.5 text-sm font-medium focus:outline-hidden"
		/>
	</div>

	<div>
		<label for="op-quote" class="mb-1 block text-xs font-bold tracking-wider uppercase">
			Kutipan / Ayat Suci
		</label>
		<textarea
			id="op-quote"
			bind:value={opening.quote}
			rows={4}
			placeholder="Tuliskan ayat atau kutipan romantis pembuka undangan..."
			class="creator-border creator-shadow-sm w-full resize-none bg-[#fffdf7] px-3.5 py-2.5 text-sm font-medium focus:outline-hidden"
		></textarea>
	</div>

	<div>
		<label for="op-source" class="mb-1 block text-xs font-bold tracking-wider uppercase">
			Sumber Kutipan
		</label>
		<input
			id="op-source"
			type="text"
			bind:value={opening.quoteSource}
			placeholder="Contoh: QS. Ar-Rum: 21"
			class="creator-border creator-shadow-sm w-full bg-[#fffdf7] px-3.5 py-2.5 text-sm font-medium focus:outline-hidden"
		/>
	</div>
</div>
