<script lang="ts">
	import CreatorShell from '$lib/creator/CreatorShell.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Editor Undangan — {data.invitation.content.couple.partner1.name} & {data.invitation.content.couple.partner2.name}</title>
</svelte:head>

<CreatorShell initialInvitation={data.invitation} />
