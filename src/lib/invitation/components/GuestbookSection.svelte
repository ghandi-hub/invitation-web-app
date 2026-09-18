<script lang="ts">
	import { untrack } from 'svelte';
	import type { GuestbookItem, GuestbookSettings } from '$lib/types/invitation';
	import { MessageSquare, Send, Loader2, User } from '@lucide/svelte';

	let {
		invitationId,
		settings,
		initialEntries = [],
		theme = 'editorial'
	}: {
		invitationId: string;
		settings: GuestbookSettings;
		initialEntries?: GuestbookItem[];
		theme?: string;
	} = $props();

	let entries = $state<GuestbookItem[]>([...untrack(() => initialEntries)]);
	let name = $state('');
	let message = $state('');
	let submitting = $state(false);
	let errorMsg = $state('');

	async function handleSubmit(e: Event) {
		e.preventDefault();
		if (!name.trim() || !message.trim()) {
			errorMsg = 'Nama dan ucapan tidak boleh kosong.';
			return;
		}

		submitting = true;
		errorMsg = '';

		try {
			const res = await fetch('/api/guestbook', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					invitationId,
					name: name.trim(),
					message: message.trim()
				})
			});

			if (!res.ok) {
				const err = await res.json().catch(() => ({}));
				throw new Error(err.message || 'Gagal mengirim ucapan');
			}

			const data = await res.json();
			if (data.entry) {
				entries = [data.entry, ...entries];
			}
			name = '';
			message = '';
		} catch (err: any) {
			errorMsg = err.message || 'Terjadi kesalahan saat mengirim ucapan';
		} finally {
			submitting = false;
		}
	}

	function formatDate(d: string | Date): string {
		try {
			const date = new Date(d);
			return date.toLocaleDateString('id-ID', {
				day: 'numeric',
				month: 'short',
				year: 'numeric'
			});
		} catch {
			return '';
		}
	}
	const isCinematic = $derived(theme === 'cinematic');
</script>

{#if settings.enabled}
	<div class="mx-auto w-full max-w-2xl space-y-8">
		<!-- Submission Form -->
		<form
			onsubmit={handleSubmit}
			class="space-y-4 p-6 sm:p-8 backdrop-blur-xs rounded-xl transition-all {isCinematic
				? 'bg-[#181824]/90 border border-[#d4af37]/30 shadow-2xl'
				: 'bg-white/80 border border-neutral-300 shadow-sm'}"
		>
			<h4 class="flex items-center gap-2 text-base font-semibold {isCinematic ? 'text-white' : 'text-neutral-900'}">
				<MessageSquare class="h-4 w-4 {isCinematic ? 'text-[#d4af37]' : 'text-neutral-600'}" />
				<span>Tuliskan Doa & Ucapan</span>
			</h4>

			{#if errorMsg}
				<p class="text-xs {isCinematic ? 'text-rose-400' : 'text-red-600'}">{errorMsg}</p>
			{/if}

			<div>
				<label
					for="gb-name"
					class="mb-1 block font-semibold tracking-wider uppercase {isCinematic ? 'text-[#d4af37] font-mono text-[11px]' : 'text-neutral-700 text-xs'}"
				>
					Nama Anda
				</label>
				<input
					id="gb-name"
					type="text"
					bind:value={name}
					required
					placeholder="Contoh: Sarah & Rekan Kerja"
					class="w-full px-3.5 py-2.5 text-sm rounded-sm transition-all {isCinematic
						? 'bg-[#101016] border border-[#d4af37]/40 text-white placeholder:text-stone-400 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] focus:outline-hidden'
						: 'bg-white border border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-hidden'}"
				/>
			</div>

			<div>
				<label
					for="gb-msg"
					class="mb-1 block font-semibold tracking-wider uppercase {isCinematic ? 'text-[#d4af37] font-mono text-[11px]' : 'text-neutral-700 text-xs'}"
				>
					Ucapan & Doa Restu
				</label>
				<textarea
					id="gb-msg"
					bind:value={message}
					required
					rows={3}
					placeholder="Semoga senantiasa dilimpahkan kebahagiaan dan berkah dalam rumah tangga..."
					class="w-full resize-none px-3.5 py-2.5 text-sm rounded-sm transition-all {isCinematic
						? 'bg-[#101016] border border-[#d4af37]/40 text-white placeholder:text-stone-400 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] focus:outline-hidden'
						: 'bg-white border border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-hidden'}"
				></textarea>
			</div>

			<button
				type="submit"
				disabled={submitting}
				class="flex w-full cursor-pointer items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold tracking-widest uppercase transition-all disabled:opacity-50 sm:w-auto rounded-sm {isCinematic
					? 'bg-[#d4af37] hover:bg-[#f1c40f] text-black font-cinzel shadow-md shadow-[#d4af37]/20'
					: 'bg-black text-white hover:opacity-90'}"
			>
				{#if submitting}
					<Loader2 class="h-3.5 w-3.5 animate-spin" />
					<span>Mengirim...</span>
				{:else}
					<Send class="h-3.5 w-3.5" />
					<span>Kirim Ucapan</span>
				{/if}
			</button>
		</form>

		<!-- Entries Stream -->
		<div class="max-h-[460px] space-y-4 overflow-y-auto pr-1">
			{#if entries.length === 0}
				<div class="p-8 text-center text-sm rounded-xl {isCinematic
					? 'bg-[#181824]/50 border border-dashed border-[#d4af37]/30 text-stone-300'
					: 'border border-dashed border-neutral-300 text-neutral-600'}">
					Belum ada ucapan. Jadilah yang pertama memberikan doa dan restu!
				</div>
			{:else}
				{#each entries as entry (entry.id)}
					<div
						class="guestbook-entry space-y-2 p-4 sm:p-5 backdrop-blur-xs rounded-xl transition-all {isCinematic
							? 'bg-[#181824]/90 border border-[#d4af37]/25 text-white shadow-md'
							: 'bg-white/80 border border-neutral-200 text-neutral-900 shadow-xs'}"
					>
						<div class="flex items-center justify-between gap-2">
							<div class="flex items-center gap-2">
								<div
									class="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold {isCinematic
										? 'bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37]'
										: 'bg-neutral-100 text-neutral-800'}"
								>
									{entry.name.charAt(0).toUpperCase()}
								</div>
								<span class="text-sm font-semibold {isCinematic ? 'text-white' : 'text-neutral-900'}">{entry.name}</span>
							</div>
							<span class="text-[11px] {isCinematic ? 'text-[#d4af37]/80 font-mono' : 'text-neutral-500'}">{formatDate(entry.createdAt)}</span>
						</div>
						<p class="pl-9 text-xs leading-relaxed whitespace-pre-wrap sm:text-sm {isCinematic ? 'text-stone-200' : 'text-neutral-700'}">
							{entry.message}
						</p>
					</div>
				{/each}
			{/if}
		</div>
	</div>
{/if}
