<script lang="ts">
	import type { RsvpSettings, AttendanceStatus } from '$lib/types/invitation';
	import { CheckCircle, AlertCircle, Loader2 } from '@lucide/svelte';

	let {
		invitationId,
		settings,
		onSuccess
	}: {
		invitationId: string;
		settings: RsvpSettings;
		onSuccess?: () => void;
	} = $props();

	let name = $state('');
	let attendance = $state<AttendanceStatus>('attending');
	let guestCount = $state(1);
	let message = $state('');
	let submitting = $state(false);
	let submitted = $state(false);
	let errorMessage = $state('');

	async function handleSubmit(e: Event) {
		e.preventDefault();
		if (!name.trim()) {
			errorMessage = 'Nama wajib diisi.';
			return;
		}

		submitting = true;
		errorMessage = '';

		try {
			const res = await fetch('/api/rsvps', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					invitationId,
					name: name.trim(),
					attendance,
					guestCount: Number(guestCount) || 1,
					message: message.trim() || null
				})
			});

			if (!res.ok) {
				const err = await res.json().catch(() => ({}));
				throw new Error(err.message || 'Gagal mengirim konfirmasi kehadiran');
			}

			submitted = true;
			if (onSuccess) onSuccess();
		} catch (err: any) {
			errorMessage = err.message || 'Terjadi kesalahan saat mengirim RSVP';
		} finally {
			submitting = false;
		}
	}
</script>

{#if settings.enabled}
	<div class="w-full max-w-xl mx-auto">
		{#if submitted}
			<div class="p-8 text-center rounded-2xl border border-[#A39275]/60 bg-[#072A5A] text-[#F3E7D7] shadow-2xl">
				<CheckCircle class="w-10 h-10 mx-auto mb-3 text-[#E5C378]" />
				<h4 class="text-xl font-semibold mb-1 text-[#F3E7D7]">Terima Kasih atas Konfirmasinya</h4>
				<p class="text-sm text-[#FAF3E0]/80">
					Konfirmasi kehadiran Anda telah tersimpan dengan baik.
				</p>
			</div>
		{:else}
			<form onsubmit={handleSubmit} class="space-y-5">
				{#if errorMessage}
					<div class="p-3.5 text-sm flex items-center gap-2 rounded-lg bg-rose-950/80 text-rose-200 border border-rose-500/50">
						<AlertCircle class="w-4 h-4 shrink-0" />
						<span>{errorMessage}</span>
					</div>
				{/if}

				<div>
					<label for="javanese-rsvp-name" class="block text-xs uppercase tracking-wider font-semibold mb-1.5 text-[#E5C378]">
						Nama Lengkap <span class="text-red-400">*</span>
					</label>
					<input
						id="javanese-rsvp-name"
						type="text"
						bind:value={name}
						required
						placeholder="Contoh: Budi Santoso & Pasangan"
						class="w-full px-4 py-3 text-sm transition-all rounded-lg bg-[#011B3E] border border-[#A39275]/50 text-[#F3E7D7] placeholder:text-[#A39275]/60 focus:border-[#E5C378] focus:ring-1 focus:ring-[#E5C378] focus:outline-hidden"
					/>
				</div>

				<div>
					<label for="javanese-rsvp-attendance" class="block text-xs uppercase tracking-wider font-semibold mb-1.5 text-[#E5C378]">
						Konfirmasi Kehadiran <span class="text-red-400">*</span>
					</label>
					<div class="grid grid-cols-3 gap-2">
						<button
							type="button"
							onclick={() => (attendance = 'attending')}
							class="py-2.5 px-3 text-xs font-semibold border text-center transition-all cursor-pointer rounded-lg {attendance === 'attending'
								? 'bg-gradient-to-r from-[#F5EFE1] to-[#D8C5A4] text-[#092A57] border-[#A39275] shadow-md'
								: 'bg-[#072A5A] text-[#F3E7D7]/80 border-[#A39275]/40 hover:border-[#E5C378] hover:text-white'}"
						>
							Hadir
						</button>
						<button
							type="button"
							onclick={() => (attendance = 'maybe')}
							class="py-2.5 px-3 text-xs font-semibold border text-center transition-all cursor-pointer rounded-lg {attendance === 'maybe'
								? 'bg-gradient-to-r from-[#F5EFE1] to-[#D8C5A4] text-[#092A57] border-[#A39275] shadow-md'
								: 'bg-[#072A5A] text-[#F3E7D7]/80 border-[#A39275]/40 hover:border-[#E5C378] hover:text-white'}"
						>
							Belum Pasti
						</button>
						<button
							type="button"
							onclick={() => (attendance = 'not_attending')}
							class="py-2.5 px-3 text-xs font-semibold border text-center transition-all cursor-pointer rounded-lg {attendance === 'not_attending'
								? 'bg-rose-950 text-rose-200 border-rose-500/70'
								: 'bg-[#072A5A] text-[#F3E7D7]/80 border-[#A39275]/40 hover:border-[#E5C378] hover:text-white'}"
						>
							Tidak Hadir
						</button>
					</div>
				</div>

				{#if settings.allowGuestCount && attendance !== 'not_attending'}
					<div>
						<label for="javanese-rsvp-count" class="block text-xs uppercase tracking-wider font-semibold mb-1.5 text-[#E5C378]">
							Jumlah Tamu
						</label>
						<select
							id="javanese-rsvp-count"
							bind:value={guestCount}
							class="w-full px-4 py-3 text-sm rounded-lg transition-all bg-[#011B3E] border border-[#A39275]/50 text-[#F3E7D7] focus:border-[#E5C378] focus:ring-1 focus:ring-[#E5C378] focus:outline-hidden"
						>
							{#each [1, 2, 3, 4, 5] as count}
								<option value={count} class="bg-[#011B3E] text-[#F3E7D7]">
									{count} {count === 5 ? '5+ Orang' : 'Orang'}
								</option>
							{/each}
						</select>
					</div>
				{/if}

				<div>
					<label for="javanese-rsvp-message" class="block text-xs uppercase tracking-wider font-semibold mb-1.5 text-[#E5C378]">
						Pesan / Ucapan
					</label>
					<textarea
						id="javanese-rsvp-message"
						bind:value={message}
						rows={3}
						placeholder="Tuliskan ucapan selamat atau catatan untuk kedua mempelai..."
						class="w-full px-4 py-3 text-sm transition-all resize-none rounded-lg bg-[#011B3E] border border-[#A39275]/50 text-[#F3E7D7] placeholder:text-[#A39275]/60 focus:border-[#E5C378] focus:ring-1 focus:ring-[#E5C378] focus:outline-hidden"
					></textarea>
				</div>

				<button
					type="submit"
					disabled={submitting}
					class="w-full py-3.5 px-6 text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 rounded-full border-2 border-[#A39275] bg-gradient-to-r from-[#F5EFE1] to-[#D8C5A4] text-[#092A57] font-bold shadow-lg hover:brightness-105"
				>
					{#if submitting}
						<Loader2 class="w-4 h-4 animate-spin" />
						<span>Mengirimkan...</span>
					{:else}
						<span>Kirim Konfirmasi</span>
					{/if}
				</button>
			</form>
		{/if}
	</div>
{/if}
