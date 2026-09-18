<script lang="ts">
	import type { InvitationStatus } from '$lib/types/invitation';
	import { Check, Copy, ExternalLink, Globe, Loader2, AlertCircle, Sparkles } from '@lucide/svelte';

	let {
		invitationId,
		slug = $bindable(),
		status = $bindable(),
		onSave,
		onPublishToggle
	}: {
		invitationId: string;
		slug: string;
		status: InvitationStatus;
		onSave: () => Promise<void>;
		onPublishToggle: () => Promise<void>;
	} = $props();

	let slugChecking = $state(false);
	let slugAvailable = $state<boolean | null>(null);
	let copying = $state(false);
	let publishing = $state(false);
	let publishError = $state('');

	let checkTimeout: any;

	function handleSlugInput(e: Event) {
		const target = e.target as HTMLInputElement;
		const raw = target.value
			.toLowerCase()
			.replace(/[^a-z0-9-]/g, '-')
			.replace(/-+/g, '-')
			.replace(/^-|-$/g, '')
			.slice(0, 60);

		slug = raw;
		slugAvailable = null;

		clearTimeout(checkTimeout);
		if (!raw) return;

		slugChecking = true;
		checkTimeout = setTimeout(async () => {
			try {
				const res = await fetch(
					`/api/invitations/check-slug?slug=${encodeURIComponent(raw)}&excludeId=${invitationId}`
				);
				const data = await res.json();
				slugAvailable = data.available;
			} catch {
				slugAvailable = null;
			} finally {
				slugChecking = false;
			}
		}, 400);
	}

	async function handleToggle() {
		publishing = true;
		publishError = '';
		try {
			// First make sure any pending edits are saved
			await onSave();
			await onPublishToggle();
		} catch (err: any) {
			publishError = err.message || 'Gagal mengubah status publikasi';
		} finally {
			publishing = false;
		}
	}

	async function copyUrl(url: string) {
		try {
			await navigator.clipboard.writeText(url);
			copying = true;
			setTimeout(() => (copying = false), 2500);
		} catch (err) {
			console.warn('Copy failed:', err);
		}
	}

	let publicUrl = $derived(
		typeof window !== 'undefined'
			? `${window.location.origin}/invitation/${slug}`
			: `/invitation/${slug}`
	);
</script>

<div class="space-y-6">
	<!-- Slug Settings -->
	<div class="creator-border creator-shadow-sm space-y-4 bg-[#fffdf7] p-5">
		<div>
			<label for="pub-slug" class="mb-1 block text-xs font-bold tracking-wider uppercase">
				Custom URL Link (Slug)
			</label>
			<div class="flex items-center">
				<span
					class="border-y-2 border-l-2 border-[#c9ccbf] bg-[#e7e9dd] px-3 py-2.5 font-mono text-xs text-[#64685e] select-none"
				>
					/invitation/
				</span>
				<input
					id="pub-slug"
					type="text"
					value={slug}
					oninput={handleSlugInput}
					placeholder="nama-kalian"
					class="creator-border w-full bg-[#f7f5ef] px-3 py-2.5 font-mono text-sm focus:outline-hidden"
				/>
			</div>

			<div class="mt-2 text-xs">
				{#if slugChecking}
					<span class="flex items-center gap-1.5 font-mono text-[#64685e]">
						<Loader2 class="h-3.5 w-3.5 animate-spin" />
						<span>Memeriksa ketersediaan slug...</span>
					</span>
				{:else if slugAvailable === true}
					<span class="flex items-center gap-1.5 font-bold text-emerald-700">
						<Check class="h-4 w-4 text-emerald-600" />
						<span>URL tersedia!</span>
					</span>
				{:else if slugAvailable === false}
					<span class="flex items-center gap-1.5 font-bold text-red-600">
						<AlertCircle class="h-4 w-4" />
						<span>URL sudah digunakan undangan lain. Silakan pilih kombinasi lain.</span>
					</span>
				{/if}
			</div>
		</div>
	</div>

	<!-- Publish Status & Action -->
	<div class="creator-border creator-shadow-sm space-y-5 bg-[#fffdf7] p-6">
		<div class="flex items-center justify-between border-b-2 border-[#c9ccbf] pb-4">
			<div>
				<span class="block text-xs font-bold tracking-wider text-[#64685e] uppercase">
					Status Undangan
				</span>
				<span
					class="mt-0.5 inline-block font-mono text-lg font-black uppercase {status === 'published'
						? 'text-emerald-600'
						: 'text-[#4e5646]'}"
				>
					{status === 'published'
						? '● Terpublikasi (Online)'
						: status === 'unpublished'
							? '○ Tidak Dipublikasikan'
							: '○ Draft'}
				</span>
			</div>

			<button
				type="button"
				onclick={handleToggle}
				disabled={publishing || slugAvailable === false}
				class="creator-border creator-shadow flex cursor-pointer items-center gap-2 px-6 py-3 text-xs font-bold tracking-wider uppercase transition-all disabled:opacity-50 {status ===
				'published'
					? 'bg-[#fffdf7] text-[#242820] hover:bg-[#efeee5]'
					: 'bg-[#dce881] text-[#242820] hover:bg-[#cfdd6c]'}"
			>
				{#if publishing}
					<Loader2 class="h-4 w-4 animate-spin" />
					<span>Memproses...</span>
				{:else if status === 'published'}
					<span>Tarik Publikasi (Unpublish)</span>
				{:else}
					<Sparkles class="h-4 w-4" />
					<span>Publikasikan Sekarang</span>
				{/if}
			</button>
		</div>

		{#if publishError}
			<p class="text-xs font-bold text-red-600">{publishError}</p>
		{/if}

		{#if status === 'published'}
			<div class="space-y-3 border border-emerald-300 bg-emerald-50 p-4">
				<span class="block text-xs font-bold text-emerald-900 uppercase">
					Undangan Anda Sudah Aktif & Siap Disebarkan!
				</span>

				<div class="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
					<input
						type="text"
						readonly
						value={publicUrl}
						class="w-full border border-emerald-400 bg-[#fffdf7] px-3 py-2 font-mono text-xs text-neutral-800 select-all"
					/>
					<div class="flex shrink-0 items-center gap-2">
						<button
							type="button"
							onclick={() => copyUrl(publicUrl)}
							class="flex cursor-pointer items-center justify-center gap-1.5 bg-[#242820] px-3.5 py-2 text-xs font-bold text-white uppercase transition-opacity hover:opacity-90"
						>
							{#if copying}
								<Check class="h-3.5 w-3.5 text-emerald-400" />
								<span>Tersalin!</span>
							{:else}
								<Copy class="h-3.5 w-3.5" />
								<span>Salin Link</span>
							{/if}
						</button>

						<a
							href="/invitation/{slug}"
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center justify-center gap-1.5 border border-[#c9ccbf] bg-[#fffdf7] px-3.5 py-2 text-xs font-bold text-[#242820] uppercase transition-colors hover:bg-[#efeee5]"
						>
							<ExternalLink class="h-3.5 w-3.5" />
							<span>Buka Undangan</span>
						</a>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
