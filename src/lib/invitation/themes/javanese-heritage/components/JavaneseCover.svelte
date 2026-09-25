<script lang="ts">
	import { MailOpen } from '@lucide/svelte';
	import PaperTexture from '$lib/invitation/ornaments/PaperTexture.svelte';
	import GununganOrnament from '../ornaments/GununganOrnament.svelte';
	import WayangOrnaments from '../ornaments/WayangOrnaments.svelte';
	import RibbonDivider from '../ornaments/RibbonDivider.svelte';
	import { fade } from 'svelte/transition';

	let {
		partner1,
		partner2,
		coverUrl,
		headline = 'THE WEDDING OF',
		dateText = '',
		recipientName = '',
		onOpen
	}: {
		partner1: string;
		partner2: string;
		coverUrl?: string | null;
		headline?: string;
		dateText?: string;
		recipientName?: string;
		onOpen: () => void;
	} = $props();

	let isOpen = $state(true);

	function handleOpen() {
		isOpen = false;
		onOpen();
	}
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Aladin&family=Alice&family=Elsie+Swash+Caps:wght@400;900&family=Lora:ital,wght@0,400..700;1,400..700&family=Philosopher:ital,wght@0,400;0,700;1,400;1,700&family=Quicksand:wght@300..700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

{#if isOpen}
	<div
		transition:fade={{ duration: 750 }}
		class="fixed inset-0 z-50 flex flex-col items-center overflow-x-hidden overflow-y-auto bg-[#00163D] bg-[radial-gradient(circle_at_50%_0%,#092D5E_0%,#00163D_55%,#000B1F_100%)] px-4 py-6 text-center text-[#F3E7D7] select-none sm:px-6 sm:py-8"
	>
		<!-- Background Foto Pasangan Jernih & Terang (Jika Ada) -->
		{#if coverUrl}
			<div class="pointer-events-none absolute inset-0 z-0 overflow-hidden">
				<img
					src={coverUrl}
					alt="Foto Sampul"
					class="h-full w-full object-cover object-center"
					loading="eager"
				/>
				<div
					class="absolute inset-x-0 bottom-0 h-screen bg-gradient-to-t from-[#00163D] to-transparent"
				></div>
			</div>
		{/if}

		<!-- Background Delicate Paper Grain -->
		<PaperTexture opacity={0.035} blendMode="screen" />

		<!-- Unified Center Content Stack -->
		<div
			class="relative z-20 my-auto flex w-full max-w-lg flex-col items-center py-4 text-center sm:py-6"
		>
			<!-- Header Crest: Gunungan & Ribbon (Referencing HERO SECTION) -->
			<div class="flex flex-col items-center">
				<GununganOrnament size={95} animate="pulse" colour="gold" />

				<!-- Ribbon tepat di bawah Gunungan -->
				<div class="-mt-24 sm:-mt-26">
					<RibbonDivider size={220} />
				</div>
			</div>

			<!-- Couple Names in Elsie Swash Caps -->
			<div class="mt-2.5 flex flex-col items-center sm:mt-3">
				<h1
					class="font-elsie text-3xl leading-tight font-normal tracking-wider text-[#F3E7D7] drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] sm:text-5xl md:text-6xl"
				>
					{partner1}
					<span class="mx-2 font-serif text-xl text-[#E5C378] sm:inline sm:text-3xl">&amp;</span>
					{partner2}
				</h1>

				<!-- Royal Date Badge -->
				{#if dateText}
					<div class="mt-2 sm:mt-2.5">
						<span
							class="font-philosopher inline-block rounded-full border border-[#A39275]/60 bg-gradient-to-r from-[#F5EFE1] to-[#D8C5A4] px-5 py-1 text-xs tracking-[0.22em] text-[#092A57] uppercase shadow-lg backdrop-blur-md sm:text-sm"
						>
							{dateText}
						</span>
					</div>
				{/if}
			</div>

			<!-- Recipient Card -->
			<div class="mt-5 w-full max-w-[280px] sm:mt-6 sm:max-w-xs">
				<div
					class="rounded-2xl border border-[#A39275]/40 bg-[#072A5A]/85 p-3.5 text-center shadow-2xl backdrop-blur-md sm:p-4"
				>
					<p class="mb-1 font-sans text-[11px] tracking-wider text-[#FAF3E0]/80 sm:text-xs">
						Kepada Yth. Bapak/Ibu/Saudara/i
					</p>
					<p
						class="font-aladin my-1 text-2xl leading-tight font-normal break-words text-[#F3E7D7] sm:text-3xl"
					>
						{recipientName || 'Tamu Undangan'}
					</p>
					<p class="text-[9px] text-[#FAF3E0]/60 italic sm:text-[10px]">
						*Mohon maaf apabila ada kesalahan pada penulisan nama dan gelar
					</p>
				</div>
			</div>

			<!-- Buka Undangan Button -->
			<div class="mt-4 sm:mt-5">
				<button
					type="button"
					onclick={handleOpen}
					class="btn-javanese-open flex w-fit transform cursor-pointer items-center justify-center gap-2.5 rounded-full px-8 py-3 text-xs font-semibold tracking-[0.2em] uppercase shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 sm:px-10 sm:py-3.5 sm:text-sm"
				>
					<MailOpen class="h-4 w-4 text-[#092A57]" />
					<span>Buka Undangan</span>
				</button>
			</div>
		</div>

		<!-- Flanking Wayang with Authentic Swinging Animations (Di Bagian Bawah) -->
		<div
			class="pointer-events-none absolute -bottom-4 -left-2 z-10 sm:bottom-0 sm:left-6 md:left-10"
		>
			<WayangOrnaments type="laki" size={110} />
		</div>

		<div
			class="pointer-events-none absolute -right-2 -bottom-4 z-10 sm:right-6 sm:bottom-0 md:right-10"
		>
			<WayangOrnaments type="perempuan" size={110} />
		</div>
		<!-- Lengkungan bawah pemisah section -->
		<div
			class="pointer-events-none absolute bottom-0 left-0 z-10 w-full overflow-hidden leading-[0]"
		>
			<svg
				class="relative block h-[35px] w-full sm:h-[50px]"
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
	</div>
{/if}

<style>
	.font-elsie {
		font-family: 'Elsie Swash Caps', serif;
	}
	.font-aladin {
		font-family: 'Aladin', cursive, sans-serif;
	}
	.font-philosopher {
		font-family: 'Philosopher', serif;
	}

	.btn-javanese-open {
		font-family: 'Alice', serif;
		color: #092a57;
		background: radial-gradient(circle at center, #f5efe1 0%, #d8c5a4 100%);
		border: 2px solid #a39275;
		box-shadow:
			0 10px 25px -4px rgba(0, 0, 0, 0.6),
			0 0 15px rgba(216, 197, 164, 0.3);
	}

	.btn-javanese-open:hover {
		background: radial-gradient(circle at center, #ffffff 0%, #e2d1b3 100%);
		border-color: #c59b27;
		box-shadow:
			0 12px 30px -4px rgba(0, 0, 0, 0.7),
			0 0 20px rgba(229, 195, 120, 0.5);
	}
</style>
