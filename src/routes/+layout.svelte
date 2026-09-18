<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.ico';
	import icon16 from '$lib/assets/favicon-16x16.png';
	import icon32 from '$lib/assets/favicon-32x32.png';
	import appleTouchIcon from '$lib/assets/apple-touch-icon.png';
	import android192 from '$lib/assets/android-chrome-192x192.png';
	import android512 from '$lib/assets/android-chrome-512x512.png';
	import PageLoader from '$lib/components/PageLoader.svelte';
	import { onNavigate } from '$app/navigation';

	let { children } = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<link rel="icon" type="image/x-icon" href={favicon} sizes="any" />
	<link rel="icon" type="image/png" sizes="16x16" href={icon16} />
	<link rel="icon" type="image/png" sizes="32x32" href={icon32} />
	<link rel="icon" type="image/png" sizes="192x192" href={android192} />
	<link rel="icon" type="image/png" sizes="512x512" href={android512} />
	<link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
</svelte:head>

<PageLoader />

{@render children()}
