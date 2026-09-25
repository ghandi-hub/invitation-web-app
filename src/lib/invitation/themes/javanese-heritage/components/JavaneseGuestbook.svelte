<script lang="ts">
	import { untrack } from 'svelte';
	import type { GuestbookItem, GuestbookSettings } from '$lib/types/invitation';
	import { MessageSquare, Send, Loader2 } from '@lucide/svelte';

	let {
		invitationId,
		settings,
		initialEntries = []
	}: {
		invitationId: string;
		settings: GuestbookSettings;
		initialEntries?: GuestbookItem[];
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
</script>

{#if settings.enabled}
	<div class="mx-auto w-full max-w-2xl space-y-8">
		<!-- Submission Form -->
		<form
			onsubmit={handleSubmit}
			class="space-y-4 p-6 sm:p-8 backdrop-blur-xs rounded-2xl bg-[#072A5A]/90 border border-[#A39275]/50 shadow-2xl transition-all"
		>
			<h4 class="flex items-center gap-2 text-base font-semibold text-[#F3E7D7]">
				<MessageSquare class="h-4 w-4 text-[#E5C378]" />
				<span>Tuliskan Doa & Ucapan</span>
			</h4>

			{#if errorMsg}
				<p class="text-xs text-rose-300">{errorMsg}</p>
			{/if}

			<div>
				<label
					for="javanese-gb-name"
					class="mb-1 block font-semibold tracking-wider uppercase text-[#E5C378] text-xs"
				>
					Nama Anda
				</label>
				<input
					id="javanese-gb-name"
					type="text"
					bind:value={name}
					required
					placeholder="Contoh: Sarah & Rekan Kerja"
					class="w-full px-4 py-2.5 text-sm rounded-lg transition-all bg-[#011B3E] border border-[#A39275]/50 text-[#F3E7D7] placeholder:text-[#A39275]/60 focus:border-[#E5C378] focus:ring-1 focus:ring-[#E5C378] focus:outline-hidden"
				/>
			</div>

			<div>
				<label
					for="javanese-gb-msg"
					class="mb-1 block font-semibold tracking-wider uppercase text-[#E5C378] text-xs"
				>
					Ucapan & Doa Restu
				</label>
				<textarea
					id="javanese-gb-msg"
					bind:value={message}
					required
					rows={3}
					placeholder="Semoga senantiasa dilimpahkan kebahagiaan dan berkah dalam rumah tangga..."
					class="w-full resize-none px-4 py-2.5 text-sm rounded-lg transition-all bg-[#011B3E] border border-[#A39275]/50 text-[#F3E7D7] placeholder:text-[#A39275]/60 focus:border-[#E5C378] focus:ring-1 focus:ring-[#E5C378] focus:outline-hidden"
				></textarea>
			</div>

			<button
				type="submit"
				disabled={submitting}
				class="flex w-full cursor-pointer items-center justify-center gap-2 px-7 py-3 text-xs font-bold tracking-widest uppercase transition-all disabled:opacity-50 sm:w-auto rounded-full border-2 border-[#A39275] bg-gradient-to-r from-[#F5EFE1] to-[#D8C5A4] text-[#092A57] hover:brightness-105 shadow-md"
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
				<div class="p-8 text-center text-sm rounded-2xl bg-[#072A5A]/60 border border-dashed border-[#A39275]/40 text-[#FAF3E0]/70">
					Belum ada ucapan. Jadilah yang pertama memberikan doa dan restu!
				</div>
			{:else}
				{#each entries as entry (entry.id)}
					<div
						class="guestbook-entry space-y-2 p-4 sm:p-5 backdrop-blur-xs rounded-2xl bg-[#072A5A]/90 border border-[#A39275]/35 text-[#F3E7D7] shadow-lg transition-all"
					>
						<div class="flex items-center justify-between gap-2">
							<div class="flex items-center gap-2">
								<div
									class="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold bg-[#092A57] border border-[#A39275]/60 text-[#E5C378]"
								>
									{entry.name.charAt(0).toUpperCase()}
								</div>
								<span class="text-sm font-semibold text-[#D8C5A4]">{entry.name}</span>
							</div>
							<span class="text-[11px] text-[#FAF3E0]/60">{formatDate(entry.createdAt)}</span>
						</div>
						<p class="pl-9 text-xs leading-relaxed whitespace-pre-wrap sm:text-sm text-[#F3E7D7]/90 font-lora">
							{entry.message}
						</p>
					</div>
				{/each}
			{/if}
		</div>
	</div>
{/if}
