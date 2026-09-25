<script lang="ts">
	import type { InvitationContent } from '$lib/types/invitation';
	import GununganOrnament from '../ornaments/GununganOrnament.svelte';
	import WayangOrnaments from '../ornaments/WayangOrnaments.svelte';
	import RibbonDivider from '../ornaments/RibbonDivider.svelte';

	let {
		content,
		preview = false
	}: {
		content: Pick<InvitationContent, 'couple' | 'hero' | 'opening'>;
		preview?: boolean;
	} = $props();

	const couplePhoto = $derived(
		content.hero?.coverUrl || content.couple?.partner1?.photoUrl || null
	);
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Aladin&family=Alice&family=Elsie+Swash+Caps:wght@400;900&family=Lora:ital,wght@0,400..700;1,400..700&family=Philosopher:ital,wght@0,400;0,700;1,400;1,700&family=Quicksand:wght@300..700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<svelte:element
	this={preview ? 'div' : 'header'}
	class="javanese-header relative z-10 flex flex-col items-center justify-center overflow-hidden bg-[#00163D] bg-[radial-gradient(circle_at_50%_0%,#092D5E_0%,#00163D_55%,#000B1F_100%)] text-[#F3E7D7] select-none {preview ? 'h-full w-full min-h-full p-4' : 'min-h-[100dvh] pt-12 pb-16 sm:pt-16 sm:pb-24 px-4'}"
>
	{#if couplePhoto}
		<!-- Background Foto Pasangan Jernih & Terang -->
		<div class="pointer-events-none absolute inset-0 z-0 overflow-hidden">
			<img
				src={couplePhoto}
				alt="Foto Pasangan"
				class="h-full w-full object-cover object-center"
				loading="eager"
			/>
			<div
				class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#00163D] to-transparent"
			></div>
		</div>
	{/if}

	<!-- Central Header Crest: Gunungan & Ribbon -->
	<div class="relative z-20 mx-auto flex max-w-xl flex-col items-center px-2 text-center {preview ? 'mt-2' : 'mt-8'}">
		<GununganOrnament size={preview ? 60 : 100} animate="pulse" colour="gold" />

		<!-- Ribbon tepat di bawah Gunungan -->
		<div class={preview ? '-mt-16' : '-mt-26'}>
			<RibbonDivider size={preview ? 140 : 220} text={content.opening?.greeting || 'THE WEDDING OF'} />
		</div>

		<!-- Groom & Bride Names in Elsie Swash Caps -->
		<svelte:element
			this={preview ? 'h3' : 'h1'}
			class="font-elsie my-2 leading-tight font-normal tracking-wider text-[#F3E7D7] drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] {preview ? 'text-2xl sm:text-3xl' : 'text-4xl sm:text-6xl md:text-7xl'}"
		>
			{content.couple.partner1.name}
			<span class="mx-2 font-serif text-[#E5C378] {preview ? 'text-xl' : 'text-2xl sm:inline sm:text-4xl'}">&amp;</span>
			{content.couple.partner2.name}
		</svelte:element>

		<!-- Date Badge -->
		{#if content.hero?.dateBadge}
			<div class={preview ? 'mt-1.5' : 'mt-3'}>
				<span
					class="font-philosopher inline-block rounded-full border border-[#A39275]/60 bg-gradient-to-r from-[#F5EFE1] to-[#D8C5A4] px-5 py-1.5 text-xs tracking-[0.25em] text-[#092A57] uppercase shadow-xl backdrop-blur-md sm:text-sm"
				>
					{content.hero.dateBadge}
				</span>
			</div>
		{/if}
	</div>

	<!-- Flanking Wayang with Authentic Swinging Animations -->
	<div class="pointer-events-none absolute {preview ? '-bottom-2 -left-1' : '-bottom-4 -left-2 sm:bottom-0 sm:left-8 md:left-14'} z-10">
		<WayangOrnaments type="laki" size={preview ? 55 : 110} />
	</div>

	<div class="pointer-events-none absolute {preview ? '-bottom-2 -right-1' : '-right-2 -bottom-4 sm:bottom-0 sm:right-8 md:right-14'} z-10">
		<WayangOrnaments type="perempuan" size={preview ? 55 : 110} />
	</div>

	<!-- Lengkungan bawah pemisah section -->
	<div class="absolute bottom-0 left-0 z-10 w-full overflow-hidden leading-[0]">
		<svg
			class="relative block {preview ? 'h-[25px]' : 'h-[40px] sm:h-[50px]'} w-full"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 1000 100"
			preserveAspectRatio="none"
		>
			<path
				fill="#f5efe1"
				d="M500,97C126.7,96.3,0.8,19.8,0,0v100l1000,0V1C1000,19.4,873.3,97.8,500,97z"
			/>
		</svg>
	</div>
</svelte:element>

<style>
	.font-elsie {
		font-family: 'Elsie Swash Caps', serif;
	}
	.font-philosopher {
		font-family: 'Philosopher', serif;
	}
</style>
