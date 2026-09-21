<script lang="ts">
	let {
		count = 7,
		className = ''
	}: {
		count?: number;
		className?: string;
	} = $props();

	// Pre-calculated deterministic organic positions for drifting jasmine petals/buds
	const allPetals = [
		{ top: '8%', left: '6%', size: 18, delay: 0, duration: 11, rot: 15, opacity: 0.75, type: 'flower' },
		{ top: '18%', right: '8%', size: 14, delay: 2.5, duration: 13, rot: -25, opacity: 0.65, type: 'bud' },
		{ top: '35%', left: '10%', size: 16, delay: 4, duration: 10, rot: 40, opacity: 0.7, type: 'flower' },
		{ top: '52%', right: '12%', size: 20, delay: 1.2, duration: 14, rot: -15, opacity: 0.8, type: 'flower' },
		{ top: '68%', left: '7%', size: 13, delay: 3.8, duration: 12, rot: 60, opacity: 0.6, type: 'bud' },
		{ top: '82%', right: '6%', size: 17, delay: 5.1, duration: 11, rot: -45, opacity: 0.75, type: 'flower' },
		{ top: '92%', left: '14%', size: 15, delay: 2, duration: 12.5, rot: 30, opacity: 0.7, type: 'bud' }
	];
	const petals = $derived(allPetals.slice(0, count));
</script>

<div class="pointer-events-none absolute inset-0 overflow-hidden z-20 {className}" aria-hidden="true">
	{#each petals as p, i}
		<div
			class="melati-item absolute"
			style:top={p.top}
			style:left={p.left}
			style:right={p.right}
			style:animation-delay="{p.delay}s"
			style:animation-duration="{p.duration}s"
			style:opacity={p.opacity}
		>
			{#if p.type === 'flower'}
				<!-- Delicately crafted Jasmine (Bunga Melati) SVG Bloom -->
				<svg
					viewBox="0 0 32 32"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					style:width="{p.size}px"
					style:height="{p.size}px"
					style:transform="rotate({p.rot}deg)"
					class="drop-shadow-xs"
				>
					<!-- 5 Ivory/Gold-tinted Star Petals -->
					<g transform="translate(16, 16)">
						{#each [0, 72, 144, 216, 288] as angle}
							<path
								d="M0 -3 C-3 -7 -4 -13 0 -15 C4 -13 3 -7 0 -3 Z"
								fill="#fffdfa"
								stroke="#c59b27"
								stroke-width="0.75"
								transform="rotate({angle})"
							/>
						{/each}
						<!-- Golden Stamen Core -->
						<circle cx="0" cy="0" r="2.5" fill="#dfb743" />
						<circle cx="0" cy="0" r="1.2" fill="#7a4b27" />
					</g>
				</svg>
			{:else}
				<!-- Jasmine Bud (Kuncup Melati Ronce) -->
				<svg
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					style:width="{p.size}px"
					style:height="{p.size}px"
					style:transform="rotate({p.rot}deg)"
				>
					<!-- Tiny Calyx (Kelopak Hijau Zaitun/Emas) -->
					<path d="M12 18 C10 18 8 20 8 22 H16 C16 20 14 18 12 18 Z" fill="#4a5d3f" stroke="#c59b27" stroke-width="0.5" />
					<!-- Bud Body -->
					<path
						d="M12 4 C8 10 9 17 12 18 C15 17 16 10 12 4 Z"
						fill="#fffefb"
						stroke="#c59b27"
						stroke-width="0.75"
					/>
					<line x1="12" y1="6" x2="12" y2="16" stroke="#e0c57a" stroke-width="0.5" />
				</svg>
			{/if}
		</div>
	{/each}
</div>

<style>
	@keyframes melatiDrift {
		0% {
			transform: translate3d(0, 0, 0) rotate(0deg);
		}
		33% {
			transform: translate3d(6px, -12px, 0) rotate(8deg);
		}
		66% {
			transform: translate3d(-5px, -24px, 0) rotate(-6deg);
		}
		100% {
			transform: translate3d(0, 0, 0) rotate(0deg);
		}
	}

	.melati-item {
		animation-name: melatiDrift;
		animation-timing-function: ease-in-out;
		animation-iteration-count: infinite;
		will-change: transform;
	}

	@media (prefers-reduced-motion: reduce) {
		.melati-item {
			animation: none !important;
		}
	}
</style>
