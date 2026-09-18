<script lang="ts">
	import { Upload, Loader2 } from '@lucide/svelte';
	import { getContext } from 'svelte';
	import { MEDIA_EDITOR, type MediaEditorContext } from './media-context';
	const mediaEditor = getContext<MediaEditorContext>(MEDIA_EDITOR);

	let {
		currentUrl,
		currentMediaId,
		label = 'Upload Foto',
		aspectRatio = 'aspect-square',
		onUploadSuccess,
		onRemove
	}: {
		currentUrl?: string | null;
		currentMediaId?: string | null;
		label?: string;
		aspectRatio?: string;
		onUploadSuccess: (url: string, id?: string) => void;
		onRemove?: () => void;
	} = $props();

	let fileInput: HTMLInputElement | undefined = $state();
	let uploading = $state(false);
	let errorMsg = $state('');

	async function handleFileChange(e: Event) {
		const target = e.target as HTMLInputElement;
		const file = target.files?.[0];
		if (!file || uploading) return;

		uploading = true;
		mediaEditor.setUploading(true);
		const previousId = currentMediaId;
		errorMsg = '';

		const formData = new FormData();
		formData.append('file', file);
		formData.append('invitationId', mediaEditor.invitationId);

		try {
			const res = await fetch('/api/media/upload', {
				method: 'POST',
				body: formData
			});

			if (!res.ok) {
				const err = await res.json().catch(() => ({}));
				throw new Error(err.message || 'Gagal mengupload gambar');
			}

			const data = await res.json();
			if (data.media?.url) {
				onUploadSuccess(data.media.url, data.media.id);
				mediaEditor.queueRemoval(previousId);
			}
		} catch (err: any) {
			errorMsg = err.message || 'Gagal mengupload gambar';
		} finally {
			uploading = false;
			mediaEditor.setUploading(false);
			if (fileInput) fileInput.value = '';
		}
	}
</script>

<div class="space-y-2">
	<span class="block text-xs font-bold tracking-wider text-[#242820] uppercase">
		{label}
	</span>

	{#if currentUrl}
		<div
			class="group creator-border relative overflow-hidden bg-[#fffdf7] {aspectRatio} creator-shadow-sm max-w-xs"
		>
			<img src={currentUrl} alt="Preview" class="h-full w-full object-cover" />
			<div
				class="absolute inset-0 flex items-center justify-center gap-3 bg-[#242820]/60 opacity-100 transition-opacity sm:opacity-0 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100"
			>
				<button
					type="button"
					disabled={uploading}
					onclick={() => fileInput?.click()}
					class="creator-border creator-shadow-sm cursor-pointer bg-[#dce881] px-3 py-1.5 text-xs font-bold text-[#242820] uppercase transition-colors hover:bg-[#cfdd6c]"
				>
					Ganti
				</button>
				{#if onRemove}
					<button
						type="button"
						disabled={uploading}
						onclick={() => {
							mediaEditor.queueRemoval(currentMediaId);
							onRemove?.();
						}}
						class="creator-border creator-shadow-sm cursor-pointer bg-red-500 px-3 py-1.5 text-xs font-bold text-white uppercase transition-colors hover:bg-red-600"
					>
						Hapus
					</button>
				{/if}
			</div>
		</div>
	{:else}
		<div
			role="button"
			tabindex="0"
			onclick={() => fileInput?.click()}
			onkeydown={(e) => e.key === 'Enter' && fileInput?.click()}
			class="flex max-w-xs cursor-pointer flex-col items-center justify-center gap-2 border-2 border-dashed border-[#c9ccbf] bg-[#f7f5ef] p-6 text-center transition-colors hover:bg-[#eff2dd]/50"
		>
			{#if uploading}
				<Loader2 class="h-6 w-6 animate-spin text-[#242820]" />
				<span class="text-xs font-bold">Mengupload...</span>
			{:else}
				<Upload class="h-6 w-6 text-[#242820]" />
				<span class="text-xs font-bold text-[#242820]">Klik untuk upload foto</span>
				<span class="text-[10px] text-[#64685e]">JPG, PNG, WebP (maks. 10MB)</span>
			{/if}
		</div>
	{/if}

	{#if uploading}<p class="text-xs text-[#64685e]" role="status">Mengupload foto?</p>{/if}
	{#if errorMsg}
		<p role="alert" class="text-xs font-bold text-red-600">{errorMsg}</p>
	{/if}

	<input
		bind:this={fileInput}
		type="file"
		disabled={uploading}
		accept="image/*"
		onchange={handleFileChange}
		class="hidden"
	/>
</div>
