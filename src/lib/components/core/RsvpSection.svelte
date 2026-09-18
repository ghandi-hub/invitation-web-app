<script lang="ts">
	import type { GuestDocument } from '$lib/types';
	import { MessageSquare, Users, CheckCircle2, XCircle, Send, Clock } from '@lucide/svelte';

	interface Props {
		slug: string;
		recipientName?: string;
		initialGreetings?: GuestDocument[];
		themeId?: string;
	}

	let { slug, recipientName = '', initialGreetings = [], themeId = 'floral-blush' }: Props = $props();

	let name = $state('');
	let pax = $state(1);
	let rsvpStatus = $state<'attending' | 'absent'>('attending');
	let greetingMessage = $state('');

	let isSubmitting = $state(false);
	let errorMessage = $state<string | null>(null);
	let successMessage = $state<string | null>(null);

	// Optimistic local state for greetings
	let greetingsList = $state<GuestDocument[]>([]);

	$effect(() => {
		if (recipientName && !name) {
			name = recipientName;
		}
	});

	$effect(() => {
		greetingsList = [...initialGreetings];
	});

	async function handleSubmit(e: Event) {
		e.preventDefault();
		errorMessage = null;
		successMessage = null;

		const trimmedName = name.trim();
		if (!trimmedName || trimmedName.length < 2) {
			errorMessage = 'Nama wajib diisi minimal 2 karakter.';
			return;
		}

		isSubmitting = true;

		// Optimistic item
		const optimisticGreeting: GuestDocument = {
			_id: 'temp-' + Date.now(),
			eventId: '',
			name: trimmedName,
			slug: trimmedName.toLowerCase().replace(/\s+/g, '-'),
			rsvpStatus,
			pax,
			greetingMessage: greetingMessage.trim(),
			submittedAt: new Date()
		};

		// Optimistic update
		if (greetingMessage.trim()) {
			greetingsList = [optimisticGreeting, ...greetingsList];
		}

		try {
			const res = await fetch(`/${slug}/api/rsvp`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: trimmedName,
					pax,
					rsvpStatus,
					greetingMessage: greetingMessage.trim()
				})
			});

			const json = await res.json();

			if (!res.ok || !json.success) {
				// Revert optimistic update on failure
				greetingsList = greetingsList.filter((g) => g._id !== optimisticGreeting._id);
				errorMessage = json.error || 'Gagal mengirim RSVP. Silakan coba kembali.';
			} else {
				successMessage = 'Terima kasih! Konfirmasi kehadiran & ucapan berhasil terkirim.';
				// Clear message input
				greetingMessage = '';
			}
		} catch (err) {
			greetingsList = greetingsList.filter((g) => g._id !== optimisticGreeting._id);
			errorMessage = 'Terjadi kesalahan koneksi jaringan.';
		} finally {
			isSubmitting = false;
		}
	}

	function formatTimeAgo(dateInput?: Date | string): string {
		if (!dateInput) return 'Baru saja';
		const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
		const diff = Math.floor((Date.now() - date.getTime()) / 1000);
		if (diff < 60) return 'Baru saja';
		if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
		if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
		return `${Math.floor(diff / 86400)} hari lalu`;
	}
</script>

<div class="w-full max-w-2xl mx-auto my-12 px-4">
	<div class="text-center mb-8">
		<div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 mb-3">
			<MessageSquare class="w-6 h-6" />
		</div>
		<h2 class="text-2xl md:text-3xl font-serif font-bold text-white mb-2">Konfirmasi Kehadiran & Doa Restu</h2>
		<p class="text-sm text-stone-300 max-w-md mx-auto">
			Mohon konfirmasi kehadiran Anda untuk mempermudah kami dalam menyiapkan jamuan terbaik.
		</p>
	</div>

	<!-- Form Card -->
	<div class="rounded-3xl bg-stone-900/90 border border-white/15 p-6 md:p-8 shadow-2xl backdrop-blur-md mb-10">
		<form onsubmit={handleSubmit} class="space-y-5">
			{#if errorMessage}
				<div class="p-3.5 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-200 text-xs font-medium">
					{errorMessage}
				</div>
			{/if}

			{#if successMessage}
				<div class="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-200 text-xs font-medium">
					{successMessage}
				</div>
			{/if}

			<!-- Nama Lengkap -->
			<div>
				<label for="rsvp-name" class="block text-xs font-semibold text-stone-200 uppercase tracking-wider mb-2">
					Nama Lengkap *
				</label>
				<input
					id="rsvp-name"
					type="text"
					bind:value={name}
					required
					placeholder="Masukkan nama Anda..."
					class="w-full rounded-xl bg-black/60 border border-white/20 px-4 py-3 text-sm text-white placeholder-stone-400 focus:outline-none focus:border-amber-400 transition"
				/>
			</div>

			<!-- Status Kehadiran -->
			<div>
				<span class="block text-xs font-semibold text-stone-200 uppercase tracking-wider mb-2">
					Konfirmasi Kehadiran *
				</span>
				<div class="grid grid-cols-2 gap-3">
					<button
						type="button"
						onclick={() => (rsvpStatus = 'attending')}
						class="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-sm font-medium transition cursor-pointer {rsvpStatus === 'attending' ? 'bg-emerald-600/40 border-emerald-400 text-emerald-200 font-semibold' : 'bg-black/50 border-white/20 text-stone-200 hover:border-white/40 hover:text-white'}"
					>
						<CheckCircle2 class="w-4 h-4 text-emerald-400" />
						<span>Ya, Akan Hadir</span>
					</button>

					<button
						type="button"
						onclick={() => (rsvpStatus = 'absent')}
						class="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-sm font-medium transition cursor-pointer {rsvpStatus === 'absent' ? 'bg-rose-600/40 border-rose-400 text-rose-200 font-semibold' : 'bg-black/50 border-white/20 text-stone-200 hover:border-white/40 hover:text-white'}"
					>
						<XCircle class="w-4 h-4 text-rose-400" />
						<span>Maaf, Berhalangan</span>
					</button>
				</div>
			</div>

			<!-- Jumlah Tamu (Pax) -->
			{#if rsvpStatus === 'attending'}
				<div>
					<label for="rsvp-pax" class="block text-xs font-semibold text-stone-200 uppercase tracking-wider mb-2">
						Jumlah Tamu yang Hadir
					</label>
					<div class="flex items-center gap-3">
						<select
							id="rsvp-pax"
							bind:value={pax}
							class="w-full rounded-xl bg-black/60 border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition"
						>
							{#each [1, 2, 3, 4, 5] as count}
								<option value={count} class="bg-stone-900 text-white">{count} Orang</option>
							{/each}
						</select>
					</div>
				</div>
			{/if}

			<!-- Pesan Ucapan & Doa -->
			<div>
				<label for="rsvp-greeting" class="block text-xs font-semibold text-stone-200 uppercase tracking-wider mb-2">
					Ucapan &amp; Doa Restu
				</label>
				<textarea
					id="rsvp-greeting"
					bind:value={greetingMessage}
					rows="3"
					placeholder="Tuliskan ucapan selamat atau doa restu Anda..."
					class="w-full rounded-xl bg-black/60 border border-white/20 px-4 py-3 text-sm text-white placeholder-stone-400 focus:outline-none focus:border-amber-400 transition resize-none"
				></textarea>
			</div>

			<button
				type="submit"
				disabled={isSubmitting}
				class="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-stone-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/20 transition-all duration-200 cursor-pointer disabled:opacity-50"
			>
				<Send class="w-4 h-4" />
				<span>{isSubmitting ? 'Mengirim...' : 'Kirim Konfirmasi'}</span>
			</button>
		</form>
	</div>

	<!-- Greetings List Stream -->
	<div>
		<div class="flex items-center justify-between mb-4">
			<h3 class="text-lg font-serif font-bold text-white flex items-center gap-2">
				<span>Buku Tamu &amp; Ucapan</span>
				<span class="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-white/10 text-stone-200">
					{greetingsList.length}
				</span>
			</h3>
		</div>

		{#if greetingsList.length === 0}
			<div class="rounded-2xl bg-black/30 border border-white/10 p-6 text-center text-sm text-stone-400">
				Belum ada ucapan. Jadilah yang pertama memberikan ucapan doa!
			</div>
		{:else}
			<div class="space-y-3 max-h-96 overflow-y-auto pr-1">
				{#each greetingsList as item (item._id || item.name)}
					<div class="rounded-2xl bg-stone-900/80 border border-white/10 p-4 backdrop-blur-sm">
						<div class="flex items-center justify-between gap-2 mb-2">
							<div class="flex items-center gap-2.5">
								<div class="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400/30 to-amber-600/30 text-amber-300 font-bold text-xs flex items-center justify-center uppercase">
									{item.name.charAt(0)}
								</div>
								<div>
									<h4 class="text-sm font-semibold text-white">{item.name}</h4>
									<div class="flex items-center gap-2 text-[11px] text-stone-300">
										<Clock class="w-3 h-3" />
										<span>{formatTimeAgo(item.submittedAt)}</span>
									</div>
								</div>
							</div>

							<!-- Attendance Tag -->
							<div class="flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium {item.rsvpStatus === 'attending' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'}">
								{#if item.rsvpStatus === 'attending'}
									<CheckCircle2 class="w-3 h-3" />
									<span>Hadir ({item.pax || 1})</span>
								{:else}
									<XCircle class="w-3 h-3" />
									<span>Berhalangan</span>
								{/if}
							</div>
						</div>

						{#if item.greetingMessage}
							<p class="text-xs text-stone-200 leading-relaxed pl-10">
								"{item.greetingMessage}"
							</p>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
