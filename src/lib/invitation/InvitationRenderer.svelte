<script lang="ts">
	import type { Invitation, GuestbookItem } from '$lib/types/invitation';
	import { getThemeComponent } from '$lib/invitation/theme-registry';
	import MusicPlayer from '$lib/invitation/components/MusicPlayer.svelte';
	import CoverModal from '$lib/invitation/components/CoverModal.svelte';

	import { onMount, onDestroy } from 'svelte';
	import { beforeNavigate } from '$app/navigation';

	let {
		invitation,
		initialGuestbook = [],
		isEditor = false,
		recipientName = '',
		showCover = true,
		allowAudio = !isEditor
	}: {
		invitation: Invitation;
		initialGuestbook?: GuestbookItem[];
		isEditor?: boolean;
		showCover?: boolean;
		recipientName?: string;
		allowAudio?: boolean;
	} = $props();

	const ActiveTheme = $derived(getThemeComponent(invitation.theme));

	let audioStarted = $state(false);
	let musicPlayer: any = $state();

	export function playAudio() {
		if (!allowAudio) return;
		audioStarted = true;
		if (musicPlayer?.play) {
			musicPlayer.play();
		}
	}

	function handleOpenCover() {
		playAudio();
	}

	onMount(() => {
		if (!showCover && allowAudio) {
			audioStarted = true;
		}
	});

	export function stopAudio() {
		if (musicPlayer?.stop) {
			musicPlayer.stop();
		} else if (musicPlayer?.pause) {
			musicPlayer.pause();
		}
		if (typeof document !== 'undefined') {
			document.querySelectorAll('audio').forEach((a) => {
				try {
					a.pause();
					a.currentTime = 0;
				} catch {}
			});
		}
	}

	beforeNavigate(() => {
		stopAudio();
	});

	onDestroy(() => {
		stopAudio();
	});
</script>

<div class="invitation-root relative w-full overflow-x-hidden">
	{#if showCover && !isEditor}
		<CoverModal
			partner1={invitation.content.couple.partner1.name}
			partner2={invitation.content.couple.partner2.name}
			coverUrl={invitation.content.hero?.coverUrl}
			headline={invitation.content.opening?.greeting}
			dateText={invitation.content.hero?.dateBadge}
			onOpen={handleOpenCover}
			{recipientName}
			theme={invitation.theme}
		/>
	{/if}

	<!-- Music Player Component -->
	{#if invitation.music?.url && allowAudio}
		<MusicPlayer
			bind:this={musicPlayer}
			audioUrl={invitation.music.url}
			title={invitation.music.title || 'Musik Pernikahan'}
			autoPlay={true}
			autoPlayTrigger={audioStarted}
		/>
	{/if}

	{#if !invitation.content.couple.partner1.name && !invitation.content.couple.partner2.name && !invitation.content.hero.coverUrl && !invitation.content.story.body && !invitation.content.events.length}
		<section class="empty-invitation">
			<span class="empty-label">UNDANGAN PERNIKAHAN</span>
			<div class="empty-symbol" aria-hidden="true">&</div>
			<h2>Cerita kalian<br /><em>dimulai di sini.</em></h2>
			<p>
				{isEditor
					? 'Isi nama mempelai untuk mulai melihat undangan kalian. Tambahkan foto, cerita, dan detail acara sesuai keinginan.'
					: 'Detail undangan belum dilengkapi.'}
			</p>
			{#if isEditor}<span class="empty-hint">01 / Mulai dari bagian Mempelai</span>{/if}
		</section>
	{:else}
		<!-- Render theme dynamically from registry -->
		<ActiveTheme {invitation} {initialGuestbook} {isEditor} />
	{/if}
</div>

<style>
	.empty-invitation {
		min-height: 650px;
		padding: 70px 28px;
		background: #f7f5ef;
		color: #353c2c;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.empty-label {
		font-size: 9px;
		letter-spacing: 3px;
	}
	.empty-symbol {
		font:
			italic 110px Georgia,
			serif;
		color: #a6ad86;
		margin: 26px 0;
	}
	h2 {
		font:
			38px/1.15 'Playfair Display',
			Georgia,
			serif;
		letter-spacing: -1px;
	}
	p {
		max-width: 290px;
		font-size: 12px;
		line-height: 1.9;
		color: #737967;
		margin-top: 24px;
	}
	.empty-hint {
		font-size: 9px;
		text-transform: uppercase;
		letter-spacing: 1px;
		border-top: 1px solid #d5d9c9;
		margin-top: 40px;
		padding-top: 20px;
	}
</style>
