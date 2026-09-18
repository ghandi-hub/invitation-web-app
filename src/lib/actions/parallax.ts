export interface ParallaxOptions {
	speed?: number; // Negative values for reverse parallax, e.g. -0.2
	axis?: 'y' | 'x';
}

/**
 * Lightweight GPU-accelerated parallax Svelte action
 * Uses requestAnimationFrame and transform: translate3d for 60fps compositor performance.
 */
export function parallax(node: HTMLElement, options: ParallaxOptions = { speed: 0.15, axis: 'y' }) {
	if (typeof window === 'undefined') return;

	const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
	if (mediaQuery.matches) return;

	let speed = options.speed ?? 0.15;
	let axis = options.axis ?? 'y';
	let ticking = false;

	function updateTransform() {
		const scroll = window.scrollY;
		const offset = scroll * speed;

		if (axis === 'x') {
			node.style.transform = `translate3d(${offset.toFixed(2)}px, 0, 0)`;
		} else {
			node.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
		}
		ticking = false;
	}

	function onScroll() {
		if (!ticking) {
			window.requestAnimationFrame(updateTransform);
			ticking = true;
		}
	}

	node.style.willChange = 'transform';
	window.addEventListener('scroll', onScroll, { passive: true });

	// Initial trigger to position correctly
	onScroll();

	return {
		update(newOptions: ParallaxOptions) {
			speed = newOptions.speed ?? 0.15;
			axis = newOptions.axis ?? 'y';
			onScroll();
		},
		destroy() {
			window.removeEventListener('scroll', onScroll);
		}
	};
}
