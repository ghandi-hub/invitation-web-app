<script lang="ts">
	let {
		position = 'top-left',
		variant = 'botanical',
		color = 'currentColor',
		size = 64,
		className = ''
	}: {
		position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
		variant?: 'botanical' | 'romantic' | 'editorial' | 'minimal';
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
	aria-hidden="true"
>
	{#if variant === 'botanical'}
		<!-- Refined olive / eucalyptus leaf branch corner -->
		<svg
			viewBox="0 0 100 100"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class="w-full h-full"
			style:color={color}
		>
			<path
				d="M10 90C10 50 35 15 90 10"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
			/>
			<!-- Leaf pairs along curve -->
			<path
				d="M20 72C15 62 18 52 28 56C28 66 25 70 20 72Z"
				fill="currentColor"
				fill-opacity="0.25"
				stroke="currentColor"
				stroke-width="1.2"
			/>
			<path
				d="M32 60C38 52 48 54 44 64C36 68 33 64 32 60Z"
				fill="currentColor"
				fill-opacity="0.2"
				stroke="currentColor"
				stroke-width="1.2"
			/>
			<path
				d="M42 42C38 32 42 22 52 26C52 36 48 40 42 42Z"
				fill="currentColor"
				fill-opacity="0.25"
				stroke="currentColor"
				stroke-width="1.2"
			/>
			<path
				d="M58 32C64 24 74 26 70 36C62 40 59 36 58 32Z"
				fill="currentColor"
				fill-opacity="0.2"
				stroke="currentColor"
				stroke-width="1.2"
			/>
			<path
				d="M74 18C72 10 78 4 86 8C88 16 82 20 74 18Z"
				fill="currentColor"
				fill-opacity="0.3"
				stroke="currentColor"
				stroke-width="1.2"
			/>
			<!-- Delicate berry buds -->
			<circle cx="28" cy="48" r="2" fill="currentColor" />
			<circle cx="50" cy="20" r="2" fill="currentColor" />
			<circle cx="88" cy="10" r="2.5" fill="currentColor" />
		</svg>
	{:else if variant === 'romantic'}
		<!-- Calligraphic flourish corner -->
		<svg
			viewBox="0 0 100 100"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class="w-full h-full"
			style:color={color}
		>
			<path
				d="M8 92C8 40 40 8 92 8"
				stroke="currentColor"
				stroke-width="1.25"
				stroke-linecap="round"
			/>
			<path
				d="M18 92C18 48 48 18 92 18"
				stroke="currentColor"
				stroke-width="0.75"
				stroke-dasharray="2 2"
			/>
			<path
				d="M24 78C20 64 26 50 38 54C42 66 32 78 24 78Z"
				fill="currentColor"
				fill-opacity="0.2"
				stroke="currentColor"
				stroke-width="1"
			/>
			<path
				d="M48 44C52 32 66 36 62 48C54 54 46 50 48 44Z"
				fill="currentColor"
				fill-opacity="0.2"
				stroke="currentColor"
				stroke-width="1"
			/>
			<circle cx="8" cy="92" r="3" fill="currentColor" />
			<circle cx="92" cy="8" r="3" fill="currentColor" />
			<path
				d="M14 36C22 28 32 20 44 14"
				stroke="currentColor"
				stroke-width="0.75"
				stroke-linecap="round"
			/>
		</svg>
	{:else if variant === 'editorial'}
		<!-- Precision stationery double-line corner -->
		<svg
			viewBox="0 0 100 100"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class="w-full h-full"
			style:color={color}
		>
			<path d="M10 90V10H90" stroke="currentColor" stroke-width="1" />
			<path d="M16 84V16H84" stroke="currentColor" stroke-width="0.5" stroke-dasharray="3 3" />
			<rect x="7" y="7" width="6" height="6" fill="currentColor" />
			<circle cx="30" cy="16" r="1.5" fill="currentColor" />
			<circle cx="16" cy="30" r="1.5" fill="currentColor" />
		</svg>
	{:else}
		<!-- Minimalist hairline corner bracket -->
		<svg
			viewBox="0 0 100 100"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class="w-full h-full"
			style:color={color}
		>
			<path d="M12 70V12H70" stroke="currentColor" stroke-width="1" stroke-linecap="square" />
			<circle cx="12" cy="12" r="2" fill="currentColor" />
		</svg>
	{/if}
</div>
