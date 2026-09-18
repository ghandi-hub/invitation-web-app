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
</script>

{#if settings.enabled}
	<div class="mx-auto w-full max-w-2xl space-y-8">
		<!-- Submission Form -->
		<form
			onsubmit={handleSubmit}
			class="space-y-4 border border-current/15 bg-white/70 p-6 backdrop-blur-xs sm:p-8"
		>
			<h4 class="flex items-center gap-2 text-base font-semibold">
				<MessageSquare class="h-4 w-4 opacity-70" />
				<span>Tuliskan Doa & Ucapan</span>
			</h4>

			{#if errorMsg}
				<p class="text-xs text-red-600">{errorMsg}</p>
			{/if}

			<div>
				<label
					for="gb-name"
					class="mb-1 block text-[11px] font-semibold tracking-wider uppercase opacity-70"
				>
					Nama Anda
				</label>
				<input
					id="gb-name"
					type="text"
					bind:value={name}
					required
					placeholder="Contoh: Sarah & Rekan Kerja"
					class="w-full border border-current/20 bg-white px-3.5 py-2.5 text-sm focus:border-current focus:outline-hidden"
				/>
			</div>

			<div>
				<label
					for="gb-msg"
					class="mb-1 block text-[11px] font-semibold tracking-wider uppercase opacity-70"
				>
					Ucapan & Doa Restu
				</label>
				<textarea
					id="gb-msg"
					bind:value={message}
					required
					rows={3}
					placeholder="Semoga senantiasa dilimpahkan kebahagiaan dan berkah dalam rumah tangga..."
					class="w-full resize-none border border-current/20 bg-white px-3.5 py-2.5 text-sm focus:border-current focus:outline-hidden"
				></textarea>
			</div>

			<button
				type="submit"
				disabled={submitting}
				class="flex w-full cursor-pointer items-center justify-center gap-2 bg-black px-6 py-2.5 text-xs font-semibold tracking-widest text-white uppercase transition-opacity hover:opacity-90 disabled:opacity-50 sm:w-auto"
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
				<div class="border border-dashed border-current/20 p-8 text-center text-sm opacity-60">
					Belum ada ucapan. Jadilah yang pertama memberikan doa dan restu!
				</div>
			{:else}
				{#each entries as entry (entry.id)}
					<div
						class="guestbook-entry space-y-2 border border-current/10 bg-white/60 p-4 backdrop-blur-xs sm:p-5"
					>
						<div class="flex items-center justify-between gap-2">
							<div class="flex items-center gap-2">
								<div
									class="flex h-7 w-7 items-center justify-center rounded-full bg-current/10 text-xs font-bold"
								>
									{entry.name.charAt(0).toUpperCase()}
								</div>
								<span class="text-sm font-semibold">{entry.name}</span>
							</div>
							<span class="text-[11px] opacity-50">{formatDate(entry.createdAt)}</span>
						</div>
						<p class="pl-9 text-xs leading-relaxed whitespace-pre-wrap opacity-80 sm:text-sm">
							{entry.message}
						</p>
					</div>
				{/each}
			{/if}
		</div>
	</div>
{/if}
