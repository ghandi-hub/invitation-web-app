<script lang="ts">
	let {
		position = 'top-left',
		color = '#c59b27',
		size = 80,
		className = ''
	}: {
		position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
		color?: string;
		size?: number;
		className?: string;
	} = $props();

	const transform = $derived.by(() => {
		switch (position) {
			case 'top-right':
				return 'scaleX(-1)';
			case 'bottom-left':
				return 'scaleY(-1)';
			case 'bottom-right':
				return 'scale(-1, -1)';
			default:
				return 'none';
		}
	});
</script>

<div
	class="inline-block pointer-events-none select-none transition-transform duration-300 {className}"
	style:transform={transform}
	style:width="{size}px"
	style:height="{size}px"
	style:color={color}
	aria-hidden="true"
>
	<!-- Traditional Javanese Lung-Lungan / Gebyok Jepara Carving Motif -->
	<svg
		viewBox="0 0 100 100"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		class="w-full h-full drop-shadow-xs"
	>
		<!-- Corner Framing L-Bands -->
		<path d="M6 94V6H94" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
		<path d="M12 88V12H88" stroke="currentColor" stroke-width="0.75" stroke-dasharray="2 2" opacity="0.6" />

		<!-- Corner Jewel / Mustika -->
		<circle cx="6" cy="6" r="3.5" fill="currentColor" />
		<circle cx="6" cy="6" r="6" stroke="currentColor" stroke-width="0.75" stroke-dasharray="2 2" />

		<!-- Main Diagonal Vine (Sulur Utama) -->
		<path
			d="M6 6 C15 35 35 55 80 80"
			stroke="currentColor"
			stroke-width="1.25"
			stroke-linecap="round"
		/>

		<!-- Traditional Javanese Spiral Foliage Curls (Lung-lungan) -->
		<!-- Upper Curl -->
		<path
			d="M18 12 C18 28 34 38 46 28 C54 20 48 10 38 12 C28 14 28 26 36 28"
			stroke="currentColor"
			stroke-width="1"
			fill="currentColor"
			fill-opacity="0.15"
			stroke-linecap="round"
		/>
		<circle cx="36" cy="22" r="1.5" fill="currentColor" />

		<!-- Lower Branch Curl -->
		<path
			d="M12 18 C28 18 38 34 28 46 C20 54 10 48 12 38 C14 28 26 28 28 36"
			stroke="currentColor"
			stroke-width="1"
			fill="currentColor"
			fill-opacity="0.15"
			stroke-linecap="round"
		/>
		<circle cx="22" cy="36" r="1.5" fill="currentColor" />

		<!-- Center Lotus Bud / Kuncup Padma Motif -->
		<path
			d="M42 42 C40 30 52 24 60 32 C66 38 58 48 48 48 C44 48 42 45 42 42 Z"
			fill="currentColor"
			fill-opacity="0.25"
			stroke="currentColor"
			stroke-width="1"
		/>
		<circle cx="52" cy="34" r="2" fill="currentColor" />

		<!-- Secondary Leaf Accents along edges -->
		<path
			d="M55 6 C62 10 68 18 64 24 C60 20 55 12 55 6 Z"
			fill="currentColor"
			fill-opacity="0.3"
			stroke="currentColor"
			stroke-width="0.8"
		/>
		<path
			d="M6 55 C10 62 18 68 24 64 C20 60 12 55 6 55 Z"
			fill="currentColor"
			fill-opacity="0.3"
			stroke="currentColor"
			stroke-width="0.8"
		/>

		<!-- Fine Filigree Finials -->
		<circle cx="94" cy="6" r="2" fill="currentColor" />
		<circle cx="6" cy="94" r="2" fill="currentColor" />
		<circle cx="80" cy="80" r="2.5" fill="currentColor" />
		<circle cx="72" cy="72" r="1.5" fill="currentColor" />
	</svg>
</div>
