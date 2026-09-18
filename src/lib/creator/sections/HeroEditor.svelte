<script lang="ts">
	import type { HeroContent } from '$lib/types/invitation';
	import ImageUploader from '$lib/creator/ImageUploader.svelte';

	let { hero = $bindable() }: { hero: HeroContent } = $props();
</script>

<div class="space-y-5">
	<div>
		<label for="hero-title" class="mb-1 block text-xs font-bold tracking-wider uppercase">
			Judul Utama (Headline)
		</label>
		<input
			id="hero-title"
			type="text"
			bind:value={hero.headline}
			placeholder="Judul undangan Anda"
			class="creator-border creator-shadow-sm w-full bg-[#fffdf7] px-3.5 py-2.5 text-sm font-medium focus:outline-hidden"
		/>
	</div>

	<div>
		<label for="hero-sub" class="mb-1 block text-xs font-bold tracking-wider uppercase">
			Sub-Judul / Pesan Singkat
		</label>
		<textarea
			id="hero-sub"
			bind:value={hero.subheadline}
			rows={2}
			placeholder="Kami mengundang Anda untuk menjadi saksi hari bahagia pernikahan kami"
			class="creator-border creator-shadow-sm w-full resize-none bg-[#fffdf7] px-3.5 py-2.5 text-sm font-medium focus:outline-hidden"
		></textarea>
	</div>

	<div>
		<label for="hero-date" class="mb-1 block text-xs font-bold tracking-wider uppercase">
			Label Tanggal
		</label>
		<input
			id="hero-date"
			type="text"
			bind:value={hero.dateBadge}
			placeholder="Tanggal pernikahan"
			class="creator-border creator-shadow-sm w-full bg-[#fffdf7] px-3.5 py-2.5 text-sm font-medium focus:outline-hidden"
		/>
	</div>

	<div class="pt-2">
		<ImageUploader
			currentMediaId={hero.coverMediaId}
			currentUrl={hero.coverUrl}
			label="Foto Sampul Utama (Cover Hero)"
			aspectRatio="aspect-16/9"
			onUploadSuccess={(url, id) => {
				hero.coverUrl = url;
				hero.coverMediaId = id || null;
			}}
			onRemove={() => {
				hero.coverUrl = null;
				hero.coverMediaId = null;
			}}
		/>
	</div>
</div>
