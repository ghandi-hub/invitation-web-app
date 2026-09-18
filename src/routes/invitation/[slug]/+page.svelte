<script lang="ts">
	import InvitationRenderer from '$lib/invitation/InvitationRenderer.svelte';
	import { Edit3 } from '@lucide/svelte';

	let { data } = $props();

	let p1 = $derived(data.invitation.content.couple.partner1.name);
	let p2 = $derived(data.invitation.content.couple.partner2.name);
	let title = $derived(`Pernikahan ${p1} & ${p2} — Undangan Digital`);
	let description = $derived(
		data.invitation.content.hero?.subheadline ||
			`Kami mengundang Anda untuk merayakan hari bahagia pernikahan kami.`
	);
	let ogImage = $derived(
		data.invitation.content.hero?.coverUrl || data.invitation.content.couple.partner1.photoUrl || ''
	);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	{#if ogImage}
		<meta property="og:image" content={ogImage} />
	{/if}
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	{#if ogImage}
		<meta name="twitter:image" content={ogImage} />
	{/if}
</svelte:head>

{#if data.isOwner}
	<aside
		aria-label="Owner notification"
		class="sticky top-0 z-40 flex items-center justify-between border-b-2 border-black bg-[#facc15] px-4 py-2 font-mono text-xs font-bold text-black"
	>
		<span>Anda sedang melihat undangan milik Anda ({data.invitation.status.toUpperCase()})</span>
		<a
			href="/create/{data.invitation.id}"
			class="flex items-center gap-1 underline hover:text-neutral-700"
		>
			<Edit3 class="h-3.5 w-3.5" />
			<span>Kembali ke Editor</span>
		</a>
	</aside>
{/if}

<InvitationRenderer
	invitation={data.invitation}
	initialGuestbook={data.guestbook}
	recipientName={data.recipientName}
	showCover={true}
	isEditor={false}
/>
