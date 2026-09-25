<script lang="ts">
	let {
		type = 'both',
		size = 110,
		rotateLeft = 10,
		rotateRight = 10,
		className = ''
	}: {
		type?: 'laki' | 'perempuan' | 'both';
		size?: number;
		rotateLeft?: number;
		rotateRight?: number;
		className?: string;
	} = $props();
</script>

{#if type === 'laki'}
	<div
		class="pointer-events-none inline-block select-none {className}"
		aria-hidden="true"
		style={`--wayang-rotate: ${rotateLeft}deg`}
	>
		<img
			src="/ornaments/javanese/wayang-laki.png"
			alt="Wayang Kakung"
			style:width="{size}px"
			class="animate-wayang-left drop-shadow-2xl"
			loading="lazy"
		/>
	</div>
{:else if type === 'perempuan'}
	<div
		class="pointer-events-none inline-block select-none {className}"
		aria-hidden="true"
		style={`--wayang-rotate: ${rotateRight}deg`}
	>
		<img
			src="/ornaments/javanese/wayang-perepmuan.png"
			alt="Wayang Putri"
			style:width="{size}px"
			class="animate-wayang-right drop-shadow-2xl"
			loading="lazy"
		/>
	</div>
{:else}
	<div
		class="pointer-events-none flex w-full items-center justify-between select-none {className}"
		aria-hidden="true"
	>
		<div style={`--wayang-rotate: ${rotateLeft}deg`}>
			<img
				src="/ornaments/javanese/wayang-laki.png"
				alt="Wayang Kakung"
				style:width="{size}px"
				class="animate-wayang-left drop-shadow-2xl"
				loading="lazy"
			/>
		</div>

		<div style={`--wayang-rotate: ${rotateRight}deg`}>
			<img
				src="/ornaments/javanese/wayang-perepmuan.png"
				alt="Wayang Putri"
				style:width="{size}px"
				class="animate-wayang-right drop-shadow-2xl"
				loading="lazy"
			/>
		</div>
	</div>
{/if}

<style>
	@keyframes wayang-swing-left {
		0%,
		100% {
			transform: rotate(calc(var(--wayang-rotate) * -1));
		}
		50% {
			transform: rotate(calc(var(--wayang-rotate) * -0.3));
		}
	}

	@keyframes wayang-swing-right {
		0%,
		100% {
			transform: rotate(var(--wayang-rotate));
		}
		50% {
			transform: rotate(calc(var(--wayang-rotate) * 0.3));
		}
	}

	.animate-wayang-left {
		transform-origin: top left;
		animation: wayang-swing-left 3.8s ease-in-out infinite alternate;
	}

	.animate-wayang-right {
		transform-origin: top right;
		animation: wayang-swing-right 3.8s ease-in-out infinite alternate;
	}
</style>
