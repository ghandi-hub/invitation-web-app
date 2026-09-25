<script lang="ts">
	import type { Component } from 'svelte';
	import DefaultCover from '$lib/invitation/themes/common/components/DefaultCover.svelte';
	import JavaneseCover from '$lib/invitation/themes/javanese-heritage/components/JavaneseCover.svelte';

	let {
		partner1,
		partner2,
		coverUrl,
		headline = 'Undangan Pernikahan',
		dateText = '',
		recipientName = '',
		theme = 'editorial',
		onOpen
	}: {
		partner1: string;
		partner2: string;
		coverUrl?: string | null;
		headline?: string;
		dateText?: string;
		recipientName?: string;
		theme?: string;
		onOpen: () => void;
	} = $props();

	const covers: Record<string, Component<any>> = {
		'javanese-heritage': JavaneseCover,
		'default': DefaultCover
	};

	const SelectedCover = $derived(covers[theme] || covers.default);
</script>

<SelectedCover
	{partner1}
	{partner2}
	{coverUrl}
	{headline}
	{dateText}
	{recipientName}
	{onOpen}
/>
