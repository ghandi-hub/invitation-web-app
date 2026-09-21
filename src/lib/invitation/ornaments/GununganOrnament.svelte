<script lang="ts">
	let {
		variant = 'full',
		color = '#c59b27',
		size = 120,
		className = ''
	}: {
		variant?: 'full' | 'silhouette' | 'arch-cap' | 'divider';
		color?: string;
		size?: number;
		className?: string;
	} = $props();
</script>

<div
	class="inline-flex items-center justify-center select-none pointer-events-none {className}"
	style:color={color}
	aria-hidden="true"
>
	{#if variant === 'full'}
		<!-- Intricate Javanese Wayang Gunungan / Kayon Vector Art -->
		<svg
			viewBox="0 0 160 220"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			style:width="{size}px"
			style:height="{(size * 220) / 160}px"
			class="max-w-full drop-shadow-xs"
		>
			<defs>
				<linearGradient id="gunungan-glow-{size}" x1="80" y1="10" x2="80" y2="210" gradientUnits="userSpaceOnUse">
					<stop offset="0%" stop-color="currentColor" stop-opacity="0.35" />
					<stop offset="50%" stop-color="currentColor" stop-opacity="0.15" />
					<stop offset="100%" stop-color="currentColor" stop-opacity="0.05" />
				</linearGradient>
			</defs>

			<!-- Outer Pointed Arch Contour (Gunungan Silhouette) -->
			<path
				d="M80 12 C92 35 118 68 136 100 C146 118 152 142 150 168 C148 190 134 204 116 208 C98 212 62 212 44 208 C26 204 12 190 10 168 C8 142 14 118 24 100 C42 68 68 35 80 12 Z"
				fill="url(#gunungan-glow-{size})"
				stroke="currentColor"
				stroke-width="1.75"
				stroke-linejoin="round"
			/>

			<!-- Inner Contour Hairline -->
			<path
				d="M80 22 C90 42 112 72 128 102 C138 120 142 140 140 164 C138 184 126 198 112 201 C96 204 64 204 48 201 C34 198 22 184 20 164 C18 140 22 120 32 102 C48 72 70 42 80 22 Z"
				stroke="currentColor"
				stroke-width="0.75"
				stroke-dasharray="3 2"
				opacity="0.7"
			/>

			<!-- Finial Crown / Puncak Mustika -->
			<circle cx="80" cy="12" r="3" fill="currentColor" />
			<path d="M80 4 L80 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
			<circle cx="80" cy="4" r="1.5" fill="currentColor" />

			<!-- Sacred Tree of Life (Kalpataru) Trunk & Roots -->
			<line x1="80" y1="90" x2="80" y2="204" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
			<path d="M80 170 C72 178 64 190 60 204" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" />
			<path d="M80 170 C88 178 96 190 100 204" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" />

			<!-- Lower Gapura / Sacred Gate Portal of Keraton -->
			<path
				d="M62 206 V156 C62 146 70 138 80 138 C90 138 98 146 98 156 V206"
				stroke="currentColor"
				stroke-width="1.25"
				fill="currentColor"
				fill-opacity="0.1"
			/>
			<line x1="80" y1="138" x2="80" y2="206" stroke="currentColor" stroke-width="0.75" stroke-dasharray="2 2" />
			<path d="M70 156 H90" stroke="currentColor" stroke-width="0.75" />

			<!-- Stylized Branches & Foliage (Lung-Lungan) -->
			<!-- Tier 1 (Mid-high branches) -->
			<path
				d="M80 75 C68 65 52 70 46 82 C42 90 48 100 58 98 C66 96 74 88 80 75 Z"
				fill="currentColor"
				fill-opacity="0.2"
				stroke="currentColor"
				stroke-width="1"
			/>
			<path
				d="M80 75 C92 65 108 70 114 82 C118 90 112 100 102 98 C94 96 86 88 80 75 Z"
				fill="currentColor"
				fill-opacity="0.2"
				stroke="currentColor"
				stroke-width="1"
			/>

			<!-- Tier 2 (Upper foliage swirls) -->
			<path
				d="M80 48 C72 40 62 45 60 54 C58 62 68 66 74 62 C78 58 79 52 80 48 Z"
				fill="currentColor"
				fill-opacity="0.25"
				stroke="currentColor"
				stroke-width="0.8"
			/>
			<path
				d="M80 48 C88 40 98 45 100 54 C102 62 92 66 86 62 C82 58 81 52 80 48 Z"
				fill="currentColor"
				fill-opacity="0.25"
				stroke="currentColor"
				stroke-width="0.8"
			/>

			<!-- Tier 3 (Flanking Lung-lungan curls) -->
			<path
				d="M80 110 C62 105 44 116 38 132 C34 144 44 154 54 148 C64 142 72 126 80 110 Z"
				fill="currentColor"
				fill-opacity="0.15"
				stroke="currentColor"
				stroke-width="1"
			/>
			<path
				d="M80 110 C98 105 116 116 122 132 C126 144 116 154 106 148 C96 142 88 126 80 110 Z"
				fill="currentColor"
				fill-opacity="0.15"
				stroke="currentColor"
				stroke-width="1"
			/>

			<!-- Traditional Motif Details (Semen & Cecek Dots) -->
			<circle cx="80" cy="98" r="2.5" fill="currentColor" />
			<circle cx="80" cy="120" r="2" fill="currentColor" />
			<circle cx="58" cy="85" r="1.5" fill="currentColor" />
			<circle cx="102" cy="85" r="1.5" fill="currentColor" />
			<circle cx="48" cy="134" r="1.5" fill="currentColor" />
			<circle cx="112" cy="134" r="1.5" fill="currentColor" />
			<circle cx="80" cy="38" r="2" fill="currentColor" />

			<!-- Bottom Base Pedestal (Praba) -->
			<path d="M40 212 H120" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
			<path d="M52 216 H108" stroke="currentColor" stroke-width="1" stroke-linecap="round" />
		</svg>
	{:else if variant === 'silhouette'}
		<!-- Large Atmospheric Silhouette for Section Backdrops -->
		<svg
			viewBox="0 0 160 220"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			style:width="{size}px"
			style:height="{(size * 220) / 160}px"
			class="max-w-full"
		>
			<path
				d="M80 12 C92 35 118 68 136 100 C146 118 152 142 150 168 C148 190 134 204 116 208 C98 212 62 212 44 208 C26 204 12 190 10 168 C8 142 14 118 24 100 C42 68 68 35 80 12 Z"
				fill="currentColor"
				fill-opacity="0.07"
				stroke="currentColor"
				stroke-width="0.75"
				stroke-opacity="0.3"
			/>
			<line x1="80" y1="20" x2="80" y2="208" stroke="currentColor" stroke-width="0.5" stroke-opacity="0.2" stroke-dasharray="4 3" />
		</svg>
	{:else if variant === 'arch-cap'}
		<!-- Gunungan Crest Cap for Arch Frames -->
		<svg
			viewBox="0 0 120 60"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			style:width="{size}px"
			style:height="{(size * 60) / 120}px"
			class="max-w-full"
		>
			<path
				d="M60 4 C67 18 82 34 96 46 C104 52 112 56 120 58 H0 C8 56 16 52 24 46 C38 34 53 18 60 4 Z"
				fill="currentColor"
				fill-opacity="0.12"
				stroke="currentColor"
				stroke-width="1.2"
			/>
			<circle cx="60" cy="4" r="2.5" fill="currentColor" />
			<path d="M60 4 V48" stroke="currentColor" stroke-width="0.75" stroke-dasharray="2 2" />
			<circle cx="60" cy="24" r="2" fill="currentColor" />
			<circle cx="60" cy="40" r="1.5" fill="currentColor" />
			<!-- Flanking crest curls -->
			<path d="M48 38 C42 32 34 35 32 42" stroke="currentColor" stroke-width="0.8" stroke-linecap="round" />
			<path d="M72 38 C78 32 86 35 88 42" stroke="currentColor" stroke-width="0.8" stroke-linecap="round" />
		</svg>
	{:else}
		<!-- Small Gunungan Motif as Section Badge / Divider Finial -->
		<svg
			viewBox="0 0 40 50"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			style:width="{size}px"
			style:height="{(size * 50) / 40}px"
			class="max-w-full"
		>
			<path
				d="M20 3 C23 9 30 18 35 26 C37 31 38 37 37 42 C36 46 32 48 28 49 H12 C8 48 4 46 3 42 C2 37 3 31 5 26 C10 18 17 9 20 3 Z"
				fill="currentColor"
				fill-opacity="0.2"
				stroke="currentColor"
				stroke-width="1.2"
			/>
			<circle cx="20" cy="3" r="1.5" fill="currentColor" />
			<line x1="20" y1="12" x2="20" y2="48" stroke="currentColor" stroke-width="1" />
			<circle cx="20" cy="24" r="1.5" fill="currentColor" />
		</svg>
	{/if}
</div>
