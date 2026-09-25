<script lang="ts">
	let {
		opacity = 0.035,
		blendMode = 'multiply',
		className = ''
	}: {
		opacity?: number;
		blendMode?: 'multiply' | 'overlay' | 'screen';
		className?: string;
	} = $props();
</script>

<div
	class="pointer-events-none fixed inset-0 z-0 select-none overflow-hidden {className}"
	style:opacity
	style:mix-blend-mode={blendMode}
	aria-hidden="true"
>
	<!-- Fine SVG Grain / Linen Texture with Tiled Pattern (GPU-friendly, zero lag on mobile) -->
	<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg">
		<defs>
			<filter id="stationery-grain" x="0" y="0" width="100%" height="100%">
				<feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" />
				<feColorMatrix type="saturate" values="0" />
			</filter>
			<pattern id="grain-pattern" width="160" height="160" patternUnits="userSpaceOnUse">
				<rect width="160" height="160" filter="url(#stationery-grain)" />
			</pattern>
		</defs>
		<rect width="100%" height="100%" fill="url(#grain-pattern)" />
	</svg>
</div>
