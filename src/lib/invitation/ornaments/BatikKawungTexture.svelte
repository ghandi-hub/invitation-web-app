<script lang="ts">
	let {
		opacity = 0.04,
		color = '#4a2e18',
		className = ''
	}: {
		opacity?: number;
		color?: string;
		className?: string;
	} = $props();
</script>

<div
	class="absolute inset-0 pointer-events-none select-none overflow-hidden z-0 {className}"
	style:opacity={opacity}
	style:color={color}
	aria-hidden="true"
>
	<!-- SVG Seamless Repeating Pattern for Royal Batik Kawung -->
	<svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
		<defs>
			<pattern id="batik-kawung-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
				<!-- Four intersecting elliptic petals centered around intersection points -->
				<!-- Center petal group (30, 30) -->
				<ellipse cx="30" cy="20" rx="6" ry="10" fill="none" stroke="currentColor" stroke-width="0.8" />
				<ellipse cx="30" cy="40" rx="6" ry="10" fill="none" stroke="currentColor" stroke-width="0.8" />
				<ellipse cx="20" cy="30" rx="10" ry="6" fill="none" stroke="currentColor" stroke-width="0.8" />
				<ellipse cx="40" cy="30" rx="10" ry="6" fill="none" stroke="currentColor" stroke-width="0.8" />
				<circle cx="30" cy="30" r="2.5" fill="currentColor" fill-opacity="0.6" />

				<!-- Corner petal groups -->
				<!-- Top-Left (0, 0) -->
				<ellipse cx="0" cy="10" rx="6" ry="10" fill="none" stroke="currentColor" stroke-width="0.8" />
				<ellipse cx="10" cy="0" rx="10" ry="6" fill="none" stroke="currentColor" stroke-width="0.8" />
				<circle cx="0" cy="0" r="2.5" fill="currentColor" fill-opacity="0.6" />

				<!-- Top-Right (60, 0) -->
				<ellipse cx="60" cy="10" rx="6" ry="10" fill="none" stroke="currentColor" stroke-width="0.8" />
				<ellipse cx="50" cy="0" rx="10" ry="6" fill="none" stroke="currentColor" stroke-width="0.8" />
				<circle cx="60" cy="0" r="2.5" fill="currentColor" fill-opacity="0.6" />

				<!-- Bottom-Left (0, 60) -->
				<ellipse cx="0" cy="50" rx="6" ry="10" fill="none" stroke="currentColor" stroke-width="0.8" />
				<ellipse cx="10" cy="60" rx="10" ry="6" fill="none" stroke="currentColor" stroke-width="0.8" />
				<circle cx="0" cy="60" r="2.5" fill="currentColor" fill-opacity="0.6" />

				<!-- Bottom-Right (60, 60) -->
				<ellipse cx="60" cy="50" rx="6" ry="10" fill="none" stroke="currentColor" stroke-width="0.8" />
				<ellipse cx="50" cy="60" rx="10" ry="6" fill="none" stroke="currentColor" stroke-width="0.8" />
				<circle cx="60" cy="60" r="2.5" fill="currentColor" fill-opacity="0.6" />

				<!-- Subtle connecting cross ties / diamond centers -->
				<circle cx="15" cy="15" r="1" fill="currentColor" opacity="0.4" />
				<circle cx="45" cy="15" r="1" fill="currentColor" opacity="0.4" />
				<circle cx="15" cy="45" r="1" fill="currentColor" opacity="0.4" />
				<circle cx="45" cy="45" r="1" fill="currentColor" opacity="0.4" />
			</pattern>
		</defs>
		<rect width="100%" height="100%" fill="url(#batik-kawung-pattern)" />
	</svg>
</div>
