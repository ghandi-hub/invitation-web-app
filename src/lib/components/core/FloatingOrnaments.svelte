<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		type?: 'floral' | 'islamic' | 'party';
	}

	let { type = 'floral' }: Props = $props();

	// Particle count and distribution
	const particles = Array.from({ length: 12 }, (_, i) => ({
		id: i,
		left: `${(i * 8.3 + 4) % 94}%`,
		top: `${(i * 13 + 5) % 90}%`,
		size: 16 + ((i * 7) % 24),
		duration: 10 + ((i * 3) % 12),
		delay: (i * 0.8) % 6,
		opacity: 0.25 + ((i * 5) % 45) / 100
	}));
</script>

<div class="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden="true">
	{#if type === 'islamic'}
		<!-- Islamic Mosque Domes, Crescents, and Stars -->
		<div class="absolute top-0 left-0 w-32 md:w-48 opacity-25 float-slow">
			<svg viewBox="0 0 100 100" class="w-full h-full fill-emerald-600/60 drop-shadow-md">
				<path d="M0,0 L100,0 C90,40 60,70 0,80 Z" />
				<circle cx="25" cy="25" r="4" class="fill-amber-400" />
				<circle cx="50" cy="15" r="3" class="fill-amber-400" />
			</svg>
		</div>
		<div class="absolute top-0 right-0 w-32 md:w-48 opacity-25 scale-x-[-1] float-slow">
			<svg viewBox="0 0 100 100" class="w-full h-full fill-emerald-600/60 drop-shadow-md">
				<path d="M0,0 L100,0 C90,40 60,70 0,80 Z" />
				<circle cx="25" cy="25" r="4" class="fill-amber-400" />
			</svg>
		</div>

		<!-- Lanterns / Fanous -->
		<div class="absolute top-4 left-6 md:left-16 w-8 md:w-12 h-24 swing origin-top opacity-60">
			<svg viewBox="0 0 40 100" class="w-full h-full text-amber-500 fill-current">
				<line x1="20" y1="0" x2="20" y2="25" stroke="currentColor" stroke-width="1.5" />
				<polygon points="20,25 32,45 8,45" />
				<rect x="10" y="45" width="20" height="25" rx="3" class="fill-amber-300/80" />
				<polygon points="10,70 30,70 20,85" />
				<circle cx="20" cy="88" r="2" />
			</svg>
		</div>
		<div class="absolute top-2 right-8 md:right-20 w-7 md:w-10 h-20 swing-alt origin-top opacity-50">
			<svg viewBox="0 0 40 100" class="w-full h-full text-amber-500 fill-current">
				<line x1="20" y1="0" x2="20" y2="20" stroke="currentColor" stroke-width="1.5" />
				<polygon points="20,20 30,38 10,38" />
				<rect x="12" y="38" width="16" height="20" rx="2" class="fill-amber-300/80" />
				<polygon points="12,58 28,58 20,70" />
			</svg>
		</div>

		<!-- Floating 8-point stars & crescents -->
		{#each particles as p (p.id)}
			<div
				class="absolute particle-float"
				style="
					left: {p.left};
					top: {p.top};
					width: {p.size}px;
					height: {p.size}px;
					animation-duration: {p.duration}s;
					animation-delay: -{p.delay}s;
					opacity: {p.opacity};
				"
			>
				{#if p.id % 3 === 0}
					<!-- Crescent Moon -->
					<svg viewBox="0 0 24 24" class="w-full h-full fill-amber-400 text-amber-400 drop-shadow">
						<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
					</svg>
				{:else if p.id % 3 === 1}
					<!-- 8-Point Rub el Hizb Islamic Star -->
					<svg viewBox="0 0 24 24" class="w-full h-full fill-emerald-500/70 drop-shadow">
						<polygon points="12,2 15,8 21,8 17,13 19,20 12,16 5,20 7,13 3,8 9,8" />
					</svg>
				{:else}
					<!-- Sparkle -->
					<svg viewBox="0 0 24 24" class="w-full h-full fill-amber-300 drop-shadow">
						<path d="M12 0L14 9L23 12L14 15L12 24L10 15L1 12L10 9Z" />
					</svg>
				{/if}
			</div>
		{/each}

	{:else if type === 'floral'}
		<!-- Elegant Floral Corner Accents -->
		<div class="absolute top-0 left-0 w-36 md:w-56 opacity-40 float-gentle">
			<svg viewBox="0 0 120 120" class="w-full h-full fill-rose-300/70 text-rose-400">
				<circle cx="20" cy="20" r="15" class="fill-rose-200/80" />
				<circle cx="35" cy="18" r="10" class="fill-rose-300/80" />
				<path d="M10,20 Q30,60 70,70 Q40,40 20,10 Z" class="fill-emerald-200/60" />
				<path d="M20,10 Q60,30 70,70" stroke="currentColor" stroke-width="1.5" fill="none" />
			</svg>
		</div>
		<div class="absolute bottom-0 right-0 w-36 md:w-56 opacity-35 scale-[-1] float-gentle">
			<svg viewBox="0 0 120 120" class="w-full h-full fill-rose-300/70 text-rose-400">
				<circle cx="20" cy="20" r="15" class="fill-rose-200/80" />
				<circle cx="35" cy="18" r="10" class="fill-rose-300/80" />
				<path d="M10,20 Q30,60 70,70 Q40,40 20,10 Z" class="fill-emerald-200/60" />
			</svg>
		</div>

		<!-- Drifting Rose Petals & Blossoms -->
		{#each particles as p (p.id)}
			<div
				class="absolute petal-drift"
				style="
					left: {p.left};
					top: {p.top};
					width: {p.size}px;
					height: {p.size * 1.3}px;
					animation-duration: {p.duration}s;
					animation-delay: -{p.delay}s;
					opacity: {p.opacity};
				"
			>
				{#if p.id % 2 === 0}
					<!-- Soft Petal -->
					<svg viewBox="0 0 30 40" class="w-full h-full fill-rose-300/85 drop-shadow-sm">
						<path d="M15,0 C25,12 30,28 15,40 C0,28 5,12 15,0 Z" />
					</svg>
				{:else}
					<!-- Golden Sparkle / Blossom -->
					<svg viewBox="0 0 24 24" class="w-full h-full fill-amber-300/80 drop-shadow-sm">
						<circle cx="12" cy="12" r="3" class="fill-amber-400" />
						<circle cx="12" cy="6" r="2.5" class="fill-rose-200" />
						<circle cx="12" cy="18" r="2.5" class="fill-rose-200" />
						<circle cx="6" cy="12" r="2.5" class="fill-rose-200" />
						<circle cx="18" cy="12" r="2.5" class="fill-rose-200" />
					</svg>
				{/if}
			</div>
		{/each}

	{:else}
		<!-- Party / Cyber Party Neon Particles & Confetti -->
		<div class="absolute -top-10 left-1/4 w-72 h-72 rounded-full bg-violet-600/20 blur-3xl pointer-events-none"></div>
		<div class="absolute top-1/3 -right-10 w-80 h-80 rounded-full bg-fuchsia-600/20 blur-3xl pointer-events-none"></div>
		<div class="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-cyan-600/20 blur-3xl pointer-events-none"></div>

		{#each particles as p (p.id)}
			<div
				class="absolute confetti-fall"
				style="
					left: {p.left};
					top: {p.top};
					width: {p.id % 3 === 0 ? p.size : p.size * 0.5}px;
					height: {p.size}px;
					animation-duration: {p.duration * 0.75}s;
					animation-delay: -{p.delay}s;
					opacity: {p.opacity};
				"
			>
				{#if p.id % 4 === 0}
					<div class="w-3 h-3 rotate-45 bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></div>
				{:else if p.id % 4 === 1}
					<div class="w-2 h-4 rounded-sm bg-fuchsia-400 shadow-[0_0_8px_#e879f9]"></div>
				{:else if p.id % 4 === 2}
					<div class="w-3 h-3 rounded-full bg-amber-300 shadow-[0_0_8px_#fde047]"></div>
				{:else}
					<svg viewBox="0 0 24 24" class="w-full h-full fill-violet-400 drop-shadow-[0_0_6px_#a78bfa]">
						<path d="M12 0L14 9L23 12L14 15L12 24L10 15L1 12L10 9Z" />
					</svg>
				{/if}
			</div>
		{/each}
	{/if}
</div>

<style>
	@media (prefers-reduced-motion: reduce) {
		.particle-float,
		.petal-drift,
		.confetti-fall,
		.swing,
		.swing-alt,
		.float-slow,
		.float-gentle {
			animation: none !important;
		}
	}

	.particle-float {
		will-change: transform, opacity;
		animation: floatKeyframe ease-in-out infinite alternate;
	}

	.petal-drift {
		will-change: transform, opacity;
		animation: driftKeyframe ease-in-out infinite;
	}

	.confetti-fall {
		will-change: transform, opacity;
		animation: confettiKeyframe linear infinite;
	}

	.swing {
		animation: swingKeyframe 4s ease-in-out infinite alternate;
	}

	.swing-alt {
		animation: swingKeyframe 3.4s ease-in-out infinite alternate-reverse;
	}

	.float-slow {
		animation: pulseSlow 8s ease-in-out infinite alternate;
	}

	.float-gentle {
		animation: pulseSlow 6s ease-in-out infinite alternate;
	}

	@keyframes floatKeyframe {
		0% {
			transform: translate3d(0, 0, 0) rotate(0deg) scale(0.9);
		}
		100% {
			transform: translate3d(15px, -35px, 0) rotate(20deg) scale(1.1);
		}
	}

	@keyframes driftKeyframe {
		0% {
			transform: translate3d(0, -20px, 0) rotate(0deg);
		}
		50% {
			transform: translate3d(20px, 20px, 0) rotate(45deg);
		}
		100% {
			transform: translate3d(-10px, 60px, 0) rotate(90deg);
		}
	}

	@keyframes confettiKeyframe {
		0% {
			transform: translate3d(0, -50px, 0) rotate(0deg);
		}
		100% {
			transform: translate3d(25px, 120vh, 0) rotate(720deg);
		}
	}

	@keyframes swingKeyframe {
		0% {
			transform: rotate(-6deg);
		}
		100% {
			transform: rotate(6deg);
		}
	}

	@keyframes pulseSlow {
		0% {
			transform: scale(1);
		}
		100% {
			transform: scale(1.05);
		}
	}
</style>
