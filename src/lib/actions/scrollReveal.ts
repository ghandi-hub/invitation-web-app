export interface ScrollRevealOptions {
	delay?: number; // Delay dalam milidetik (misal: 100, 200 untuk efek berurutan / stagger)
	duration?: number; // Durasi animasi dalam milidetik (default: 800)
	distance?: number; // Jarak pergeseran translateY dalam piksel (default: 20)
	threshold?: number; // Ambang batas kemunculan elemen (default: 0.12)
	once?: boolean; // Hanya muncul sekali saat pertama kali terlihat (default: true)
	variant?: 'fade-up' | 'fade-in' | 'blur-in'; // Gaya animasi kemunculan
}

/**
 * Action Scroll Reveal untuk Animasi Teks & Elemen saat Scroll.
 * Sesuai prinsip AI Frontend Wedding Invitation:
 * - 100% dipicu oleh posisi scroll layar saat elemen memasuki viewport.
 * - Menggunakan IntersectionObserver native (ringan, 60fps, hemat baterai mobile).
 * - Transisi halus cubic-bezier tanpa lag dan layout reflow.
 * - Otomatis nonaktif jika prefers-reduced-motion aktif.
 */
export function scrollReveal(node: HTMLElement, options: ScrollRevealOptions = {}) {
	if (typeof window === 'undefined') return;

	// Periksa aksesibilitas reduced motion
	const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
	if (mediaQuery.matches) {
		return;
	}

	const delay = options.delay ?? 0;
	const duration = options.duration ?? 450;
	const distance = options.distance ?? 16;
	const threshold = options.threshold ?? 0.01;
	const once = options.once ?? true;
	const variant = options.variant ?? 'fade-up';

	// Siapkan kondisi awal animasi
	node.style.opacity = '0';
	node.style.willChange = 'opacity, transform';
	node.style.transition = `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`;

	if (variant === 'fade-up') {
		node.style.transform = `translate3d(0, ${distance}px, 0)`;
	} else if (variant === 'blur-in') {
		node.style.transform = `translate3d(0, ${distance / 2}px, 0)`;
		node.style.filter = 'blur(3px)';
		node.style.transition += `, filter ${duration}ms ease-out`;
	}

	let timer: any = null;

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const trigger = () => {
						node.style.opacity = '1';
						node.style.transform = 'translate3d(0, 0, 0)';
						if (variant === 'blur-in') {
							node.style.filter = 'blur(0px)';
						}

						// Bersihkan will-change setelah animasi selesai
						setTimeout(() => {
							node.style.willChange = 'auto';
						}, duration + 50);
					};

					if (delay > 0) {
						timer = setTimeout(trigger, delay);
					} else {
						trigger();
					}

					if (once) {
						observer.unobserve(node);
					}
				} else if (!once) {
					if (timer) clearTimeout(timer);
					node.style.opacity = '0';
					if (variant === 'fade-up') {
						node.style.transform = `translate3d(0, ${distance}px, 0)`;
					} else if (variant === 'blur-in') {
						node.style.transform = `translate3d(0, ${distance / 2}px, 0)`;
						node.style.filter = 'blur(3px)';
					}
				}
			});
		},
		{
			threshold,
			rootMargin: '140px 0px 80px 0px' // Memicu sebelum elemen mencapai layar agar sudah siap render saat scroll cepat
		}
	);

	observer.observe(node);

	return {
		update(newOptions: ScrollRevealOptions) {
			// Jika options diubah secara dinamis
		},
		destroy() {
			if (timer) clearTimeout(timer);
			observer.disconnect();
			node.style.willChange = 'auto';
		}
	};
}
