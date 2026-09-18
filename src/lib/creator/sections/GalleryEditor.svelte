<script lang="ts">
	import { getContext } from 'svelte';
	import { MEDIA_EDITOR, type MediaEditorContext } from '../media-context';
	const mediaEditor = getContext<MediaEditorContext>(MEDIA_EDITOR);
	import type { GalleryItem } from '$lib/types/invitation';
	import ImageUploader from '$lib/creator/ImageUploader.svelte';
	import { Trash2 } from '@lucide/svelte';

	let { gallery = $bindable() }: { gallery: GalleryItem[] } = $props();

	function handleAddImage(url: string, id?: string) {
		gallery = [
			...gallery,
			{
				mediaId: id || `gal-${Date.now()}`,
				url,
				sortOrder: gallery.length + 1,
				caption: ''
			}
		];
	}

	function removeImage(index: number) {
		mediaEditor.queueRemoval(gallery[index].mediaId);
		gallery = gallery.filter((_, i) => i !== index);
	}
</script>

<div class="space-y-6">
	<div class="creator-border creator-shadow-sm bg-[#fffdf7] p-5">
		<span class="mb-3 block text-xs font-bold tracking-wider uppercase">
			Tambah Foto ke Galeri
		</span>
		<ImageUploader label="" onUploadSuccess={handleAddImage} />
	</div>

	<div class="space-y-4">
		<span class="block text-xs font-bold tracking-wider uppercase">
			Foto di Galeri ({gallery.length})
		</span>

		{#if gallery.length === 0}
			<div class="border-2 border-dashed border-[#c9ccbf] p-6 text-center text-xs text-[#64685e]">
				Belum ada foto di galeri. Upload foto pertama Anda di atas.
			</div>
		{:else}
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
				{#each gallery as item, index}
					<div class="creator-border creator-shadow-sm space-y-2 bg-[#fffdf7] p-3">
						<div class="creator-border relative aspect-4/3 overflow-hidden bg-[#efeee5]">
							<img src={item.url} alt={item.caption || 'Foto'} class="h-full w-full object-cover" />
							<button
								type="button"
								onclick={() => removeImage(index)}
								class="creator-border creator-shadow-sm absolute top-2 right-2 cursor-pointer bg-red-600 p-1.5 text-white hover:bg-red-700"
								title="Hapus foto"
							>
								<Trash2 class="h-3.5 w-3.5" />
							</button>
						</div>
						<input
							type="text"
							bind:value={item.caption}
							placeholder="Tuliskan keterangan foto (opsional)..."
							class="creator-border w-full bg-[#f7f5ef] px-2.5 py-1.5 text-xs focus:outline-hidden"
						/>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
