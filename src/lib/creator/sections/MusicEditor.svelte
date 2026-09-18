<script lang="ts">
	import type { InvitationMusic, MusicItem } from '$lib/types/invitation';
	import { onMount } from 'svelte';
	import { Play, Pause, Music, CheckCircle2 } from '@lucide/svelte';

	let { music = $bindable() }: { music?: InvitationMusic } = $props();

	let tracks = $state<MusicItem[]>([]);
	let loading = $state(true);
	let loadError = $state('');
	let playingTrackId = $state<string | null>(null);
	let previewAudio: HTMLAudioElement | undefined = $state();

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
			if (previewAudio) previewAudio.pause();
		};
	});

	function togglePreview(track: MusicItem) {
		if (playingTrackId === track.id) {
			if (previewAudio) previewAudio.pause();
			playingTrackId = null;
		} else {
			if (previewAudio) previewAudio.pause();
			previewAudio = new Audio(track.cloudinary.secureUrl);
			previewAudio.play().catch(() => {});
			previewAudio.onended = () => {
				playingTrackId = null;
			};
			playingTrackId = track.id;
		}
	}

	function selectTrack(track: MusicItem) {
		music = {
			type: 'library',
			musicId: track.id,
			url: track.cloudinary.secureUrl,
			title: track.name
		};
	}
</script>

<div class="space-y-4">
	<div>
		<span class="mb-1 block text-xs font-bold tracking-wider uppercase"> Musik latar </span>
		<p class="text-xs text-[#64685e]">
			Musik akan otomatis mengalun lembut begitu tamu membuka undangan.
		</p>
	</div>

	{#if loading}<p class="p-5 text-sm text-[#64685e]" role="status">Memuat pilihan musik?</p>
	{:else if loadError}<p
			class="border border-red-200 bg-red-50 p-5 text-sm text-red-700"
			role="alert"
		>
			{loadError}
		</p>
	{:else if tracks.length === 0}<div class="border border-dashed border-[#c9ccbf] bg-[#f7f5ef] p-6">
			<p class="text-sm font-semibold">Belum ada musik tersedia</p>
			<p class="mt-2 text-xs leading-relaxed text-[#64685e]">
				Undangan tetap dapat dibagikan tanpa musik. Pilihan musik akan muncul setelah tersedia.
			</p>
		</div>{/if}
	<div class="space-y-3">
		{#each tracks as track}
			{@const isSelected = music?.musicId === track.id || music?.url === track.cloudinary.secureUrl}
			<div
				class="creator-border creator-shadow-sm flex items-center justify-between gap-4 bg-[#fffdf7] p-4 transition-all {isSelected
					? 'bg-[#eff2dd]/50 ring-2 ring-[#727f3c]'
					: 'hover:bg-[#f7f5ef]'}"
			>
				<div class="flex items-center gap-3">
					<button
						type="button"
						onclick={() => togglePreview(track)}
						class="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#242820] text-white transition-opacity hover:opacity-80"
						title={playingTrackId === track.id ? 'Hentikan preview' : 'Putar preview'}
					>
						{#if playingTrackId === track.id}
							<Pause class="h-4 w-4 fill-white" />
						{:else}
							<Play class="ml-0.5 h-4 w-4 fill-white" />
						{/if}
					</button>

					<div>
						<p class="text-sm font-bold text-[#242820]">{track.name}</p>
						<span class="font-mono text-[10px] tracking-wider text-[#64685e] uppercase">
							Genre: {track.category}
						</span>
					</div>
				</div>

				<div>
					{#if isSelected}
						<span
							class="inline-flex items-center gap-1.5 bg-[#242820] px-3 py-1.5 font-mono text-xs font-bold text-white uppercase"
						>
							<CheckCircle2 class="h-3.5 w-3.5 text-emerald-400" />
							<span>Terpilih</span>
						</span>
					{:else}
						<button
							type="button"
							onclick={() => selectTrack(track)}
							class="creator-border creator-shadow-sm cursor-pointer bg-[#dce881] px-3.5 py-1.5 text-xs font-bold uppercase transition-colors hover:bg-[#cfdd6c]"
						>
							Pilih
						</button>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>
