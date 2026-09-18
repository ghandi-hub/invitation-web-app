<script lang="ts">
	import type { PageData } from './$types';
	import EnvelopeCover from '$lib/components/core/EnvelopeCover.svelte';
	import FloatingOrnaments from '$lib/components/core/FloatingOrnaments.svelte';
	import AudioPlayer from '$lib/components/core/AudioPlayer.svelte';
	import { themeRegistry } from '$lib/themes/registry';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const event = $derived(data.event);
	const guest = $derived(data.guest);
	const greetings = $derived(data.greetings);

	let isInvitationOpened = $state(false);
	let audioPlayerRef = $state<{ playAudio: () => void; pauseAudio: () => void } | null>(null);

	const ThemeComponent = $derived(
		themeRegistry[event.themeId] || themeRegistry['default']
	);

	const ornamentType = $derived.by(() => {
		if (event.themeId === 'islamic-emerald' || event.eventType === 'khitanan' || event.eventType === 'aqiqah') {
			return 'islamic';
		}
		if (event.themeId === 'cyber-party' || event.eventType === 'birthday' || event.eventType === 'gathering') {
			return 'party';
		}
		return 'floral';
	});

	function handleOpenInvitation() {
		isInvitationOpened = true;
		if (audioPlayerRef) {
			audioPlayerRef.playAudio();
		}
	}
</script>

<svelte:head>
	<title>{event.metadata.title}</title>
	<meta name="description" content={event.metadata.description} />
	<meta property="og:title" content={event.metadata.title} />
	<meta property="og:description" content={event.metadata.description} />
	{#if event.metadata.ogImage}
		<meta property="og:image" content={event.metadata.ogImage} />
	{/if}
</svelte:head>

<!-- Persistent Audio Player ready for user gesture trigger -->
{#if event.features.musicUrl}
	<AudioPlayer
		bind:this={audioPlayerRef}
		musicUrl={event.features.musicUrl}
	/>
{/if}

{#if !isInvitationOpened}
	<EnvelopeCover
		event={event}
		recipientName={guest?.name}
		onopen={handleOpenInvitation}
	/>
{:else}
	<!-- Floating Ornaments Background -->
	<FloatingOrnaments type={ornamentType} />

	<!-- Dynamic Active Theme Component -->
	<ThemeComponent
		{event}
		{guest}
		{greetings}
	/>
{/if}
