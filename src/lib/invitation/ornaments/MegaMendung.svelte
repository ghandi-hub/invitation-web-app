<script lang="ts">
	let {
		variant = 'cluster',
		color = '#c59b27',
		secondaryColor = '#dfb743',
		tertiaryColor = '#7a4b27',
		size = 180,
		className = '',
		flip = false
	}: {
		variant?: 'cluster' | 'edge-left' | 'edge-right' | 'crest' | 'divider';
		color?: string;
		secondaryColor?: string;
		tertiaryColor?: string;
		size?: number;
		className?: string;
		flip?: boolean;
	} = $props();
</script>

<div
	class="inline-block pointer-events-none select-none {className}"
	style:transform={flip ? 'scaleX(-1)' : 'none'}
	aria-hidden="true"
>
	{#if variant === 'cluster'}
		<!-- Authentic Layered Cirebon-Javanese Mega Mendung Cloud Cluster -->
		<svg
			viewBox="0 0 220 110"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			style:width="{size}px"
			style:height="{(size * 110) / 220}px"
			class="max-w-full drop-shadow-xs"
		>
			<defs>
				<linearGradient id="mm-grad-outer-{size}" x1="20" y1="10" x2="200" y2="100" gradientUnits="userSpaceOnUse">
					<stop offset="0%" stop-color={color} stop-opacity="0.3" />
					<stop offset="100%" stop-color={tertiaryColor} stop-opacity="0.1" />
				</linearGradient>
				<linearGradient id="mm-grad-mid-{size}" x1="40" y1="20" x2="180" y2="90" gradientUnits="userSpaceOnUse">
					<stop offset="0%" stop-color={secondaryColor} stop-opacity="0.45" />
					<stop offset="100%" stop-color={color} stop-opacity="0.2" />
				</linearGradient>
			</defs>

			<!-- Layer 1: Outermost Cloud Contour (Tier 1 - Deep / Wide Silhouette) -->
			<path
				d="M15 65 C10 50 25 35 45 38 C52 24 72 18 88 26 C98 12 122 10 136 22 C152 14 174 20 182 36 C198 38 212 50 208 68 C204 84 186 94 165 92 C145 98 115 95 100 88 C82 96 55 94 38 84 C22 84 14 76 15 65 Z"
				fill="url(#mm-grad-outer-{size})"
				stroke={color}
				stroke-width="1.5"
				stroke-linejoin="round"
			/>

			<!-- Layer 2: Intermediate Tier (Tier 2 - Stepped Aerodynamic Lobes) -->
			<path
				d="M30 64 C26 54 36 44 50 46 C56 36 70 32 82 38 C90 28 110 26 122 34 C134 28 152 32 158 44 C172 46 182 54 180 66 C176 76 162 82 148 80 C132 84 110 82 98 76 C84 82 62 80 50 74 C38 74 32 68 30 64 Z"
				fill="url(#mm-grad-mid-{size})"
				stroke={secondaryColor}
				stroke-width="1.25"
				stroke-linejoin="round"
			/>

			<!-- Layer 3: Inner Core Tier (Tier 3 - Luminous Golden Heart) -->
			<path
				d="M48 62 C46 56 52 50 62 52 C66 45 76 42 84 46 C90 40 102 38 110 44 C118 40 130 42 134 50 C144 52 150 56 148 64 C146 70 136 74 126 72 C116 75 102 74 94 70 C84 74 68 72 60 68 C52 68 48 64 48 62 Z"
				fill={secondaryColor}
				fill-opacity="0.25"
				stroke={secondaryColor}
				stroke-width="1"
				stroke-linejoin="round"
			/>

			<!-- Signature Pointed Cloud Teardrop Tails (Lidah Mega Mendung) -->
			<!-- Left flowing trail -->
			<path
				d="M35 55 C18 56 6 62 2 68 C12 68 24 62 38 58"
				stroke={color}
				stroke-width="1.25"
				stroke-linecap="round"
			/>
			<!-- Right flowing trail -->
			<path
				d="M175 62 C192 63 208 68 218 74 C206 73 194 67 172 64"
				stroke={color}
				stroke-width="1.25"
				stroke-linecap="round"
			/>
			<!-- Center bottom tail wisp -->
			<path
				d="M100 88 C94 96 82 102 70 106 C80 102 92 98 102 90"
				stroke={color}
				stroke-width="1"
				stroke-linecap="round"
			/>

			<!-- Delicate Golden Stipples / Cecek dots inside clouds -->
			<circle cx="85" cy="54" r="1.5" fill={secondaryColor} />
			<circle cx="108" cy="52" r="1.5" fill={secondaryColor} />
			<circle cx="130" cy="58" r="1.5" fill={secondaryColor} />
			<circle cx="68" cy="62" r="1.2" fill={color} />
			<circle cx="145" cy="66" r="1.2" fill={color} />
		</svg>
	{:else if variant === 'edge-left'}
		<!-- Edge-Bleed Mega Mendung Cloud for Screen Borders & Card Edges -->
		<svg
			viewBox="0 0 160 90"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			style:width="{size}px"
			style:height="{(size * 90) / 160}px"
			class="max-w-full drop-shadow-xs"
		>
			<!-- Outermost wisp -->
			<path
				d="M0 15 C30 12 55 24 65 38 C80 26 108 30 118 46 C136 48 152 60 148 76 C144 86 130 90 115 88 L0 88 Z"
				fill={color}
				fill-opacity="0.12"
				stroke={color}
				stroke-width="1.2"
			/>
			<!-- Mid Tier -->
			<path
				d="M0 28 C22 26 42 34 50 46 C64 36 86 40 94 54 C108 56 122 64 118 78 L0 78 Z"
				fill={secondaryColor}
				fill-opacity="0.2"
				stroke={secondaryColor}
				stroke-width="1"
			/>
			<!-- Inner Tier -->
			<path
				d="M0 42 C16 40 30 46 36 54 C48 48 64 52 70 62 C80 64 92 70 88 80 L0 80 Z"
				fill={secondaryColor}
				fill-opacity="0.3"
				stroke={secondaryColor}
				stroke-width="0.8"
			/>
			<!-- Trailing point wisp -->
			<path d="M118 46 C132 42 148 44 158 50 C146 50 134 48 120 48" stroke={color} stroke-width="1" stroke-linecap="round" />
		</svg>
	{:else if variant === 'edge-right'}
		<!-- Mirrored Edge-Bleed Mega Mendung Cloud -->
		<svg
			viewBox="0 0 160 90"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			style:width="{size}px"
			style:height="{(size * 90) / 160}px"
			class="max-w-full drop-shadow-xs"
		>
			<g transform="translate(160, 0) scale(-1, 1)">
				<path
					d="M0 15 C30 12 55 24 65 38 C80 26 108 30 118 46 C136 48 152 60 148 76 C144 86 130 90 115 88 L0 88 Z"
					fill={color}
					fill-opacity="0.12"
					stroke={color}
					stroke-width="1.2"
				/>
				<path
					d="M0 28 C22 26 42 34 50 46 C64 36 86 40 94 54 C108 56 122 64 118 78 L0 78 Z"
					fill={secondaryColor}
					fill-opacity="0.2"
					stroke={secondaryColor}
					stroke-width="1"
				/>
				<path
					d="M0 42 C16 40 30 46 36 54 C48 48 64 52 70 62 C80 64 92 70 88 80 L0 80 Z"
					fill={secondaryColor}
					fill-opacity="0.3"
					stroke={secondaryColor}
					stroke-width="0.8"
				/>
				<path d="M118 46 C132 42 148 44 158 50 C146 50 134 48 120 48" stroke={color} stroke-width="1" stroke-linecap="round" />
			</g>
		</svg>
	{:else if variant === 'crest'}
		<!-- Symmetrical Center Crest Mega Mendung Motif -->
		<svg
			viewBox="0 0 200 60"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			style:width="{size}px"
			style:height="{(size * 60) / 200}px"
			class="max-w-full drop-shadow-xs"
		>
			<!-- Center Diamond Mustika -->
			<path d="M100 8L106 18L100 28L94 18Z" fill={secondaryColor} stroke={color} stroke-width="1" />
			<circle cx="100" cy="18" r="2" fill="#fffdfa" />

			<!-- Left Wing Clouds -->
			<path
				d="M92 18 C78 12 60 16 50 26 C38 24 24 32 12 44 C24 42 36 38 46 32 C56 26 74 24 88 22 Z"
				fill={color}
				fill-opacity="0.2"
				stroke={color}
				stroke-width="1"
			/>
			<path
				d="M84 22 C72 18 58 20 50 28 C42 28 32 34 22 42 C32 40 40 36 48 32 C56 28 70 26 80 24 Z"
				fill={secondaryColor}
				fill-opacity="0.3"
				stroke={secondaryColor}
				stroke-width="0.75"
			/>

			<!-- Right Wing Clouds -->
			<path
				d="M108 18 C122 12 140 16 150 26 C162 24 176 32 188 44 C176 42 164 38 154 32 C144 26 126 24 112 22 Z"
				fill={color}
				fill-opacity="0.2"
				stroke={color}
				stroke-width="1"
			/>
			<path
				d="M116 22 C128 18 142 20 150 28 C158 28 168 34 178 42 C168 40 160 36 152 32 C144 28 130 26 120 24 Z"
				fill={secondaryColor}
				fill-opacity="0.3"
				stroke={secondaryColor}
				stroke-width="0.75"
			/>

			<!-- Connecting Hairline -->
			<line x1="10" y1="46" x2="80" y2="46" stroke={color} stroke-width="0.75" opacity="0.6" />
			<line x1="120" y1="46" x2="190" y2="46" stroke={color} stroke-width="0.75" opacity="0.6" />
			<circle cx="10" cy="46" r="1.5" fill={color} />
			<circle cx="190" cy="46" r="1.5" fill={color} />
		</svg>
	{:else}
		<!-- Continuous Flowing Mega Mendung Section Transition Divider -->
		<svg
			viewBox="0 0 320 40"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			style:width="{size}px"
			style:height="{(size * 40) / 320}px"
			class="max-w-full"
		>
			<line x1="10" y1="20" x2="90" y2="20" stroke={color} stroke-width="1" />
			<circle cx="10" cy="20" r="2" fill={color} />

			<!-- Left Cloud Wave -->
			<path
				d="M95 20 C105 12 120 14 128 22 C134 16 146 16 152 22 C146 25 138 25 130 22 C122 22 110 24 100 22"
				fill={color}
				fill-opacity="0.25"
				stroke={color}
				stroke-width="1"
			/>

			<!-- Center Jewel / Lotus -->
			<circle cx="160" cy="20" r="3.5" fill={secondaryColor} stroke={color} stroke-width="1" />
			<circle cx="160" cy="20" r="6" stroke={color} stroke-width="0.5" stroke-dasharray="2 2" />

			<!-- Right Cloud Wave -->
			<path
				d="M225 20 C215 12 200 14 192 22 C186 16 174 16 168 22 C174 25 182 25 190 22 C198 22 210 24 220 22"
				fill={color}
				fill-opacity="0.25"
				stroke={color}
				stroke-width="1"
			/>

			<line x1="230" y1="20" x2="310" y2="20" stroke={color} stroke-width="1" />
			<circle cx="310" cy="20" r="2" fill={color} />
		</svg>
	{/if}
</div>
