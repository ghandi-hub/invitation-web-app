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
	class="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden {className}"
	style:opacity
	style:mix-blend-mode={blendMode}
	aria-hidden="true"
>
	<!-- Fine SVG Grain / Linen Texture -->
	<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg">
		<filter id="stationery-grain">
			<feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
			<feColorMatrix type="saturate" values="0" />
		</filter>
		<rect width="100%" height="100%" filter="url(#stationery-grain)" />
	</svg>
</div>
