<script lang="ts">
	import type { InvitationMusic, MusicItem } from '$lib/types/invitation';
	import { onMount, onDestroy } from 'svelte';
	import { beforeNavigate } from '$app/navigation';
	import { Play, Pause, Music, CheckCircle2, VolumeX, Clock } from '@lucide/svelte';

	let { music = $bindable() }: { music?: InvitationMusic } = $props();

	let tracks = $state<MusicItem[]>([]);
	let loading = $state(true);
	let loadError = $state('');
	let playingTrackId = $state<string | null>(null);
	let previewAudio: HTMLAudioElement | undefined = $state();

	function stopPreview() {
		if (previewAudio) {
			try {
				previewAudio.pause();
				previewAudio.currentTime = 0;
			} catch {}
			previewAudio = undefined;
		}
		playingTrackId = null;
	}

	onMount(() => {
		async function loadTracks() {
			try {
				const res = await fetch('/api/music');
				if (!res.ok) throw new Error('Gagal memuat musik');
				const data = await res.json();
				if (data.tracks) {
					tracks = data.tracks;
				}
			} catch (err) {
				console.warn('Failed to load music tracks:', err);
				loadError = 'Musik belum dapat dimuat. Silakan buka kembali bagian ini.';
			} finally {
				loading = false;
			}
		}

		loadTracks();

		return () => {
			stopPreview();
		};
	});

	beforeNavigate(() => {
		stopPreview();
	});

	onDestroy(() => {
		stopPreview();
	});

	function formatDuration(sec?: number): string {
		if (!sec) return '';
		const m = Math.floor(sec / 60);
		const s = Math.floor(sec % 60);
		return `${m}:${s.toString().padStart(2, '0')}`;
	}

	function togglePreview(track: MusicItem) {
		if (playingTrackId === track.id) {
			if (previewAudio) previewAudio.pause();
			playingTrackId = null;
		} else {
			if (previewAudio) previewAudio.pause();
			previewAudio = new Audio(track.cloudinary.secureUrl);
			previewAudio.play().catch((err) => {
				console.warn('Preview play error:', err);
			});
			previewAudio.onended = () => {
				playingTrackId = null;
			};
			playingTrackId = track.id;
		}
	}

	function selectTrack(track: MusicItem) {
		if (previewAudio) {
			previewAudio.pause();
			playingTrackId = null;
		}
		music = {
			type: 'library',
			musicId: track.id,
			url: track.cloudinary.secureUrl,
			title: track.name
		};
	}

	function removeTrack() {
		if (previewAudio) {
			previewAudio.pause();
			playingTrackId = null;
		}
		music = undefined;
	}
</script>

<div class="space-y-5">
	<div>
		<span class="mb-1 block text-xs font-bold tracking-wider uppercase"> Musik Latar Undangan </span>
		<p class="text-xs text-[#64685e]">
			Musik akan otomatis mengalun lembut begitu tamu menekan tombol <strong>"Buka Undangan"</strong>.
		</p>
	</div>

	<!-- Status Musik Terpilih Saat Ini -->
	{#if music?.url}
		<div class="creator-border creator-shadow-sm flex items-center justify-between gap-4 bg-[#eff2dd] p-4 border-2 border-[#727f3c]">
			<div class="flex items-center gap-3">
				<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#727f3c] text-white">
					<Music class="h-5 w-5" />
				</div>
				<div>
					<span class="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#4d5726]">
						Musik Aktif
					</span>
					<p class="text-sm font-bold text-[#242820]">{music.title || 'Musik Pernikahan'}</p>
				</div>
			</div>

			<button
				type="button"
				onclick={removeTrack}
				class="creator-border creator-shadow-sm flex items-center gap-1.5 bg-white px-3 py-1.5 text-xs font-bold text-red-700 hover:bg-red-50 cursor-pointer transition-colors"
			>
				<VolumeX class="h-3.5 w-3.5" />
				<span>Tanpa Musik</span>
			</button>
		</div>
	{:else}
		<div class="border border-dashed border-[#c9ccbf] bg-[#f7f5ef] p-4 text-center">
			<p class="text-xs text-[#64685e]">
				Belum ada musik latar yang dipilih. Pilih salah satu lagu di bawah ini untuk menemani undangan Anda.
			</p>
		</div>
	{/if}

	{#if loading}
		<p class="p-5 text-sm text-[#64685e]" role="status">Memuat pilihan musik...</p>
	{:else if loadError}
		<p class="border border-red-200 bg-red-50 p-5 text-sm text-red-700" role="alert">
			{loadError}
		</p>
	{:else if tracks.length === 0}
		<div class="border border-dashed border-[#c9ccbf] bg-[#f7f5ef] p-6">
			<p class="text-sm font-semibold">Belum ada musik tersedia</p>
			<p class="mt-2 text-xs leading-relaxed text-[#64685e]">
				Undangan tetap dapat dibagikan tanpa musik. Pilihan musik akan muncul setelah tersedia.
			</p>
		</div>
	{:else}
		<div class="space-y-3">
			{#each tracks as track}
				{@const isSelected = music?.musicId === track.id || music?.url === track.cloudinary.secureUrl}
				<div
					class="creator-border creator-shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#fffdf7] p-4 transition-all {isSelected
						? 'bg-[#eff2dd]/60 ring-2 ring-[#727f3c]'
						: 'hover:bg-[#f7f5ef]'}"
				>
					<div class="flex items-center gap-3">
						<button
							type="button"
							onclick={() => togglePreview(track)}
							class="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#242820] text-white transition-transform hover:scale-105 active:scale-95"
							title={playingTrackId === track.id ? 'Hentikan pratinjau' : 'Putar pratinjau lagu'}
						>
							{#if playingTrackId === track.id}
								<Pause class="h-4 w-4 fill-white animate-pulse" />
							{:else}
								<Play class="ml-0.5 h-4 w-4 fill-white" />
							{/if}
						</button>

						<div>
							<p class="text-sm font-bold text-[#242820]">{track.name}</p>
							<div class="flex items-center gap-2 mt-0.5">
								<span class="font-mono text-[10px] tracking-wider text-[#64685e] uppercase">
									{track.category}
								</span>
								{#if track.duration}
									<span class="text-[#c9ccbf]">•</span>
									<span class="inline-flex items-center gap-1 font-mono text-[10px] text-[#64685e]">
										<Clock class="h-2.5 w-2.5" />
										{formatDuration(track.duration)}
									</span>
								{/if}
							</div>
						</div>
					</div>

					<div class="flex items-center justify-end gap-2">
						{#if isSelected}
							<span
								class="inline-flex items-center gap-1.5 bg-[#727f3c] px-3 py-1.5 font-mono text-xs font-bold text-white uppercase shadow-xs"
							>
								<CheckCircle2 class="h-3.5 w-3.5 text-white" />
								<span>Terpilih</span>
							</span>
						{:else}
							<button
								type="button"
								onclick={() => selectTrack(track)}
								class="creator-border creator-shadow-sm cursor-pointer bg-[#dce881] px-4 py-1.5 text-xs font-bold uppercase transition-colors hover:bg-[#cfdd6c]"
							>
								Pilih Lagu
							</button>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
