<script lang="ts">
	import InvitationRenderer from '$lib/invitation/InvitationRenderer.svelte';
	import { ArrowLeft, ExternalLink } from '@lucide/svelte';
	import { onDestroy } from 'svelte';
	import { beforeNavigate } from '$app/navigation';

	let { data } = $props();

	function killAllAudio() {
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
		killAllAudio();
	});

	onDestroy(() => {
		killAllAudio();
	});
</script>

<svelte:head>
	<title>Preview Undangan — {data.invitation.content.couple.partner1.name} & {data.invitation.content.couple.partner2.name}</title>
</svelte:head>

<!-- Floating Top Header to return to editor -->
<div class="fixed top-4 left-4 z-50 flex items-center gap-2">
	<a
		href="/create/{data.invitation.id}"
		onclick={killAllAudio}
		class="px-4 py-2 bg-black/80 hover:bg-black text-white text-xs font-bold uppercase rounded-full shadow-xl backdrop-blur-md border border-white/20 flex items-center gap-1.5 transition-all"
	>
		<ArrowLeft class="w-3.5 h-3.5" />
		<span>Kembali ke Editor</span>
	</a>

	{#if data.invitation.status === 'published'}
		<a
			href="/invitation/{data.invitation.slug}"
			target="_blank"
			rel="noopener noreferrer"
			class="px-4 py-2 bg-white/90 hover:bg-white text-black text-xs font-bold uppercase rounded-full shadow-xl backdrop-blur-md border border-black/20 flex items-center gap-1.5 transition-all"
		>
			<span>Buka URL Publik</span>
			<ExternalLink class="w-3.5 h-3.5" />
		</a>
	{/if}
</div>

<InvitationRenderer
	invitation={data.invitation}
	initialGuestbook={data.guestbook}
	showCover={true}
	isEditor={false}
/>
