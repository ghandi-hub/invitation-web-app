<script lang="ts">
	import type { RsvpSettings, AttendanceStatus } from '$lib/types/invitation';
	import { CheckCircle, AlertCircle, Loader2 } from '@lucide/svelte';

	let {
		invitationId,
		settings,
		theme = 'editorial',
		onSuccess
	}: {
		invitationId: string;
		settings: RsvpSettings;
		theme?: string;
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
			<div class="p-8 text-center bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-sm">
				<CheckCircle class="w-10 h-10 mx-auto mb-3 text-emerald-600" />
				<h4 class="text-xl font-semibold mb-1">Terima Kasih atas Konfirmasinya</h4>
				<p class="text-sm text-emerald-700">
					Konfirmasi kehadiran Anda telah tersimpan dengan baik.
				</p>
			</div>
		{:else}
			<form onsubmit={handleSubmit} class="space-y-5">
				{#if errorMessage}
					<div class="p-3 text-sm bg-red-50 text-red-700 border border-red-200 flex items-center gap-2">
						<AlertCircle class="w-4 h-4 shrink-0" />
						<span>{errorMessage}</span>
					</div>
				{/if}

				<div>
					<label for="rsvp-name" class="block text-xs uppercase tracking-wider font-semibold mb-1.5 opacity-80">
						Nama Lengkap <span class="text-red-500">*</span>
					</label>
					<input
						id="rsvp-name"
						type="text"
						bind:value={name}
						required
						placeholder="Contoh: Budi Santoso & Pasangan"
						class="w-full px-4 py-3 bg-white/70 backdrop-blur-xs border border-current/20 focus:border-current focus:outline-hidden text-sm transition-colors"
					/>
				</div>

				<div>
					<label for="rsvp-attendance" class="block text-xs uppercase tracking-wider font-semibold mb-1.5 opacity-80">
						Konfirmasi Kehadiran <span class="text-red-500">*</span>
					</label>
					<div class="grid grid-cols-3 gap-2">
						<button
							type="button"
							onclick={() => (attendance = 'attending')}
							class="py-2.5 px-3 text-xs font-medium border text-center transition-all {attendance === 'attending' ? 'bg-black text-white border-black' : 'border-current/20 hover:border-current/50'}"
						>
							Hadir
						</button>
						<button
							type="button"
							onclick={() => (attendance = 'maybe')}
							class="py-2.5 px-3 text-xs font-medium border text-center transition-all {attendance === 'maybe' ? 'bg-black text-white border-black' : 'border-current/20 hover:border-current/50'}"
						>
							Belum Pasti
						</button>
						<button
							type="button"
							onclick={() => (attendance = 'not_attending')}
							class="py-2.5 px-3 text-xs font-medium border text-center transition-all {attendance === 'not_attending' ? 'bg-black text-white border-black' : 'border-current/20 hover:border-current/50'}"
						>
							Tidak Hadir
						</button>
					</div>
				</div>

				{#if settings.allowGuestCount && attendance !== 'not_attending'}
					<div>
						<label for="rsvp-count" class="block text-xs uppercase tracking-wider font-semibold mb-1.5 opacity-80">
							Jumlah Tamu
						</label>
						<select
							id="rsvp-count"
							bind:value={guestCount}
							class="w-full px-4 py-3 bg-white/70 backdrop-blur-xs border border-current/20 focus:border-current focus:outline-hidden text-sm"
						>
							<option value={1}>1 Orang</option>
							<option value={2}>2 Orang</option>
							<option value={3}>3 Orang</option>
							<option value={4}>4 Orang</option>
							<option value={5}>5+ Orang</option>
						</select>
					</div>
				{/if}

				<div>
					<label for="rsvp-message" class="block text-xs uppercase tracking-wider font-semibold mb-1.5 opacity-80">
						Pesan / Ucapan
					</label>
					<textarea
						id="rsvp-message"
						bind:value={message}
						rows={3}
						placeholder="Tuliskan ucapan selamat atau catatan untuk kedua mempelai..."
						class="w-full px-4 py-3 bg-white/70 backdrop-blur-xs border border-current/20 focus:border-current focus:outline-hidden text-sm transition-colors resize-none"
					></textarea>
				</div>

				<button
					type="submit"
					disabled={submitting}
					class="w-full py-3.5 px-6 bg-black text-white font-medium text-xs uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
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
