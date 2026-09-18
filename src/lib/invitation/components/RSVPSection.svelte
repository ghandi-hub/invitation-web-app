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
	const isCinematic = $derived(theme === 'cinematic');
</script>

{#if settings.enabled}
	<div class="w-full max-w-xl mx-auto">
		{#if submitted}
			<div class="p-8 text-center rounded-xl border {isCinematic ? 'bg-[#181824] text-white border-emerald-500/40 shadow-xl' : 'bg-emerald-50 text-emerald-900 border-emerald-200'}">
				<CheckCircle class="w-10 h-10 mx-auto mb-3 {isCinematic ? 'text-emerald-400' : 'text-emerald-600'}" />
				<h4 class="text-xl font-semibold mb-1 {isCinematic ? 'text-white' : 'text-emerald-950'}">Terima Kasih atas Konfirmasinya</h4>
				<p class="text-sm {isCinematic ? 'text-stone-300' : 'text-emerald-700'}">
					Konfirmasi kehadiran Anda telah tersimpan dengan baik.
				</p>
			</div>
		{:else}
			<form onsubmit={handleSubmit} class="space-y-5">
				{#if errorMessage}
					<div class="p-3.5 text-sm flex items-center gap-2 rounded-lg {isCinematic ? 'bg-rose-950/70 text-rose-200 border border-rose-500/50' : 'bg-red-50 text-red-700 border border-red-200'}">
						<AlertCircle class="w-4 h-4 shrink-0" />
						<span>{errorMessage}</span>
					</div>
				{/if}

				<div>
					<label for="rsvp-name" class="block text-xs uppercase tracking-wider font-semibold mb-1.5 {isCinematic ? 'text-[#d4af37] font-mono text-[11px]' : 'text-neutral-800 opacity-80'}">
						Nama Lengkap <span class="text-red-500">*</span>
					</label>
					<input
						id="rsvp-name"
						type="text"
						bind:value={name}
						required
						placeholder="Contoh: Budi Santoso & Pasangan"
						class="w-full px-4 py-3 text-sm transition-all rounded-sm {isCinematic
							? 'bg-[#181824] border border-[#d4af37]/40 text-white placeholder:text-stone-400 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] focus:outline-hidden'
							: 'bg-white border border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-hidden'}"
					/>
				</div>

				<div>
					<label for="rsvp-attendance" class="block text-xs uppercase tracking-wider font-semibold mb-1.5 {isCinematic ? 'text-[#d4af37] font-mono text-[11px]' : 'text-neutral-800 opacity-80'}">
						Konfirmasi Kehadiran <span class="text-red-500">*</span>
					</label>
					<div class="grid grid-cols-3 gap-2">
						<button
							type="button"
							onclick={() => (attendance = 'attending')}
							class="py-2.5 px-3 text-xs font-semibold border text-center transition-all cursor-pointer rounded-sm {attendance === 'attending'
								? isCinematic
									? 'bg-[#d4af37] text-black border-[#d4af37] shadow-md shadow-[#d4af37]/25'
									: 'bg-black text-white border-black'
								: isCinematic
									? 'bg-[#181824] text-stone-200 border-[#d4af37]/30 hover:border-[#d4af37]/70 hover:text-white'
									: 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-600'}"
						>
							Hadir
						</button>
						<button
							type="button"
							onclick={() => (attendance = 'maybe')}
							class="py-2.5 px-3 text-xs font-semibold border text-center transition-all cursor-pointer rounded-sm {attendance === 'maybe'
								? isCinematic
									? 'bg-[#d4af37] text-black border-[#d4af37] shadow-md shadow-[#d4af37]/25'
									: 'bg-black text-white border-black'
								: isCinematic
									? 'bg-[#181824] text-stone-200 border-[#d4af37]/30 hover:border-[#d4af37]/70 hover:text-white'
									: 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-600'}"
						>
							Belum Pasti
						</button>
						<button
							type="button"
							onclick={() => (attendance = 'not_attending')}
							class="py-2.5 px-3 text-xs font-semibold border text-center transition-all cursor-pointer rounded-sm {attendance === 'not_attending'
								? isCinematic
									? 'bg-rose-900/70 text-rose-200 border-rose-500/70'
									: 'bg-black text-white border-black'
								: isCinematic
									? 'bg-[#181824] text-stone-200 border-[#d4af37]/30 hover:border-[#d4af37]/70 hover:text-white'
									: 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-600'}"
						>
							Tidak Hadir
						</button>
					</div>
				</div>

				{#if settings.allowGuestCount && attendance !== 'not_attending'}
					<div>
						<label for="rsvp-count" class="block text-xs uppercase tracking-wider font-semibold mb-1.5 {isCinematic ? 'text-[#d4af37] font-mono text-[11px]' : 'text-neutral-800 opacity-80'}">
							Jumlah Tamu
						</label>
						<select
							id="rsvp-count"
							bind:value={guestCount}
							class="w-full px-4 py-3 text-sm rounded-sm transition-all {isCinematic
								? 'bg-[#181824] border border-[#d4af37]/40 text-white focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] focus:outline-hidden'
								: 'bg-white border border-neutral-300 text-neutral-900 focus:border-neutral-900 focus:outline-hidden'}"
						>
							{#each [1, 2, 3, 4, 5] as count}
								<option value={count} class={isCinematic ? 'bg-[#181824] text-white' : 'bg-white text-neutral-900'}>
									{count} {count === 5 ? '5+ Orang' : 'Orang'}
								</option>
							{/each}
						</select>
					</div>
				{/if}

				<div>
					<label for="rsvp-message" class="block text-xs uppercase tracking-wider font-semibold mb-1.5 {isCinematic ? 'text-[#d4af37] font-mono text-[11px]' : 'text-neutral-800 opacity-80'}">
						Pesan / Ucapan
					</label>
					<textarea
						id="rsvp-message"
						bind:value={message}
						rows={3}
						placeholder="Tuliskan ucapan selamat atau catatan untuk kedua mempelai..."
						class="w-full px-4 py-3 text-sm transition-all resize-none rounded-sm {isCinematic
							? 'bg-[#181824] border border-[#d4af37]/40 text-white placeholder:text-stone-400 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] focus:outline-hidden'
							: 'bg-white border border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-hidden'}"
					></textarea>
				</div>

				<button
					type="submit"
					disabled={submitting}
					class="w-full py-3.5 px-6 text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 rounded-sm {isCinematic
						? 'bg-[#d4af37] hover:bg-[#f1c40f] text-black font-bold font-cinzel shadow-lg shadow-[#d4af37]/20'
						: 'bg-black hover:opacity-90 text-white font-medium'}"
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
