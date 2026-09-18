export interface ParallaxOptions {
	speed?: number; // Kecepatan perpindahan posisi vertikal/horizontal (default: 0.1)
	axis?: 'y' | 'x';
	maxOffset?: number; // Batas translasi maksimum dalam piksel untuk mobile
	scale?: boolean | number; // Mengaktifkan zoom in / zoom out berbasis scroll (bisa boolean atau angka maxScale)
	minScale?: number; // Skala saat di tepi layar (default: 1.0)
	maxScale?: number; // Skala saat tepat di tengah layar ponsel (default: 1.08)
}

/**
 * Parallax Action — Murni Berbasis Scroll (Dioptimalkan untuk Mobile).
 * Sesuai prinsip AI Frontend Wedding Invitation:
 * - 100% dipicu oleh posisi scroll layar (bukan mouse / hover / gyro).
 * - Mendukung efek translasi kedalaman dan zoom in / zoom out (scale) otomatis saat melewati viewport.
 * - Menggunakan passive scroll listener + requestAnimationFrame untuk 60-120fps di HP.
 * - Menggunakan CSS translate3d dan scale (GPU composited, tanpa reflow/layout recalculation).
 * - Bebas feedback loop (deterministik terhadap posisi scroll aktual).
 * - Otomatis mendeteksi layar mobile untuk membatasi pergeseran agar tidak menutupi teks/overflow.
 * - Mematuhi prefers-reduced-motion untuk aksesibilitas.
 */
export function parallax(node: HTMLElement, options: ParallaxOptions = {}) {
	if (typeof window === 'undefined') return;

	// Periksa aksesibilitas reduced motion
	const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
	if (mediaQuery.matches) {
		node.style.transform = 'none';
		return;
	}

	let speed = options.speed ?? 0.1;
	let axis = options.axis ?? 'y';
	let maxOffset = options.maxOffset;
	let hasScale = Boolean(options.scale);
	let minScale = options.minScale ?? 1.0;
	let maxScale = typeof options.scale === 'number' ? options.scale : (options.maxScale ?? 1.08);

	let ticking = false;
	let currentOffset = 0;

	// Inisialisasi GPU acceleration
	node.style.willChange = 'transform';

	function updateTransform() {
		const viewportHeight = window.innerHeight || 800;
		const isMobile = window.innerWidth <= 640;

		// Ambil posisi elemen aktual tanpa terpengaruh oleh translate3d sebelumnya
		const rect = node.getBoundingClientRect();
		const untransformedTop = rect.top + (axis === 'y' ? -currentOffset : 0);
		const elementHeight = rect.height || 100;
		const elementCenter = untransformedTop + elementHeight / 2;
		const viewportCenter = viewportHeight / 2;

		// Hitung jarak dari pusat viewport
		const distanceFromCenter = elementCenter - viewportCenter;

		// Hanya kalkulasi bila elemen berada di sekitar viewport (-150px s/d +150px batas penyangga)
		if (rect.bottom > -150 && rect.top < viewportHeight + 150) {
			let transformStr = '';

			// 1. Hitung Translasi Parallax
			if (speed !== 0) {
				let targetOffset = distanceFromCenter * speed;
				const limit = maxOffset ?? (isMobile ? 32 : 75);
				targetOffset = Math.max(-limit, Math.min(limit, targetOffset));
				currentOffset = targetOffset;

				if (axis === 'x') {
					transformStr += `translate3d(${targetOffset.toFixed(1)}px, 0, 0) `;
				} else {
					transformStr += `translate3d(0, ${targetOffset.toFixed(1)}px, 0) `;
				}
			}

			// 2. Hitung Zoom In / Zoom Out (Scale) Berdasarkan Scroll
			if (hasScale) {
				const halfHeight = viewportHeight / 2 || 400;
				const normalizedDistance = Math.min(1, Math.abs(distanceFromCenter) / halfHeight);
				// Easing cosinus halus: 1 saat di tengah viewport (zoom in), 0 saat di tepi (zoom out)
				const factor = 0.5 * (1 + Math.cos(normalizedDistance * Math.PI));
				const currentScale = minScale + (maxScale - minScale) * factor;

				transformStr += `scale(${currentScale.toFixed(3)}) `;
			}

			node.style.transform = transformStr.trim();
		}

		ticking = false;
	}

	function onScroll() {
		if (!ticking) {
			window.requestAnimationFrame(updateTransform);
			ticking = true;
		}
	}

	// Trigger hanya murni pada event scroll (passive untuk performa touch mobile)
	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', onScroll, { passive: true });

	// Trigger posisi awal
	onScroll();

	return {
		update(newOptions: ParallaxOptions) {
			speed = newOptions.speed ?? 0.1;
			axis = newOptions.axis ?? 'y';
			maxOffset = newOptions.maxOffset;
			hasScale = Boolean(newOptions.scale);
			minScale = newOptions.minScale ?? 1.0;
			maxScale = typeof newOptions.scale === 'number' ? newOptions.scale : (newOptions.maxScale ?? 1.08);
			onScroll();
		},
		destroy() {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
			node.style.willChange = 'auto';
			node.style.transform = 'none';
		}
	};
}
