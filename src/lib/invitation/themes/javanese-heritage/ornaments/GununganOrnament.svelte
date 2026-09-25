<script lang="ts">
	type AnimationType = 'pulse' | 'sway' | 'none';

	let {
		size = 96,
		animate = 'pulse',
		className = '',
		colour = 'gold',
		rotate = 0
	}: {
		size?: number;
		animate?: AnimationType;
		className?: string;
		colour?: string;
		rotate?: number | string;
	} = $props();

	let imageSrc = $derived(
		colour === 'gold' ? '/ornaments/javanese/gunungan.png' : '/ornaments/javanese/gunungan-blue.png'
	);

	const rotationAngle = $derived(
		typeof rotate === 'number'
			? `${rotate}deg`
			: typeof rotate === 'string' && rotate.trim().length > 0
				? rotate.includes('deg') || rotate.includes('rad') || rotate.includes('turn')
					? rotate
					: `${rotate}deg`
				: '0deg'
	);

	const animationClass = $derived.by(() => {
		if (animate === 'sway') return 'animate-gunungan-sway';
		if (animate === 'pulse') return 'animate-gunungan-pulse';
		return '';
	});
</script>

<div
	class="inline-flex items-center justify-center select-none {className}"
	style:transform={rotate ? `rotate(${rotationAngle})` : undefined}
	aria-hidden="true"
>
	<img
		src={imageSrc}
		alt="Gunungan"
		style:width="{size}px"
		class="drop-shadow-lg {animationClass}"
		loading="lazy"
	/>
</div>

<style>
	@keyframes gunungan-pulse {
		0%,
		100% {
			transform: scale(1) translateY(0);
		}
		50% {
			transform: scale(1.05) translateY(-4px);
		}
	}

	@keyframes gunungan-sway {
		0%,
		100% {
			transform: rotate(0deg) translateX(0);
		}
		25% {
			transform: rotate(-3deg) translateX(-4px);
		}
		75% {
			transform: rotate(3deg) translateX(4px);
		}
	}

	.animate-gunungan-pulse {
		animation: gunungan-pulse 3.6s ease-in-out infinite;
	}

	.animate-gunungan-sway {
		animation: gunungan-sway 4s ease-in-out infinite;
		transform-origin: bottom center;
	}
</style>
