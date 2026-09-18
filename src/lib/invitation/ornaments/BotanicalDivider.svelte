<script lang="ts">
	let {
		variant = 'olive',
		color = 'currentColor',
		className = ''
	}: {
		variant?: 'olive' | 'flourish' | 'minimal' | 'traditional' | 'cinematic' | 'modern';
		color?: string;
		className?: string;
	} = $props();
</script>

<div
	class="flex items-center justify-center py-6 select-none pointer-events-none {className}"
	style:color={color}
	aria-hidden="true"
>
	{#if variant === 'olive'}
		<!-- Botanical olive sprig with center bloom -->
		<svg
			viewBox="0 0 240 32"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class="w-48 sm:w-64 max-w-full h-8"
		>
			<!-- Left stem -->
			<path d="M20 16H80C95 16 102 16 112 16" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
			<!-- Left leaves -->
			<path d="M50 16C50 10 60 7 66 12C62 16 56 16 50 16Z" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1" />
			<path d="M72 16C72 22 82 25 88 20C84 16 78 16 72 16Z" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1" />
			<path d="M92 16C94 10 104 9 108 14C104 16 98 16 92 16Z" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1" />

			<!-- Center bloom -->
			<circle cx="120" cy="16" r="3.5" fill="currentColor" />
			<circle cx="120" cy="16" r="7" stroke="currentColor" stroke-width="0.75" stroke-dasharray="2 2" />

			<!-- Right stem -->
			<path d="M128 16C138 16 145 16 160 16H220" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
			<!-- Right leaves -->
			<path d="M148 16C148 10 138 9 132 14C136 16 142 16 148 16Z" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1" />
			<path d="M168 16C168 22 158 25 152 20C156 16 162 16 168 16Z" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1" />
			<path d="M190 16C190 10 180 7 174 12C178 16 184 16 190 16Z" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="1" />
		</svg>
	{:else if variant === 'flourish'}
		<!-- Antique calligraphic flourish with delicate curves -->
		<svg
			viewBox="0 0 260 30"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class="w-52 sm:w-72 max-w-full h-7"
		>
			<path
				d="M10 15C45 15 55 7 75 7C95 7 105 23 120 23C124 23 128 20 130 15C132 20 136 23 140 23C155 23 165 7 185 7C205 7 215 15 250 15"
				stroke="currentColor"
				stroke-width="1.25"
				stroke-linecap="round"
			/>
			<circle cx="130" cy="15" r="2.5" fill="currentColor" />
			<circle cx="85" cy="7" r="1.5" fill="currentColor" />
			<circle cx="175" cy="7" r="1.5" fill="currentColor" />
			<circle cx="10" cy="15" r="2" fill="currentColor" />
			<circle cx="250" cy="15" r="2" fill="currentColor" />
		</svg>
	{:else if variant === 'cinematic'}
		<!-- Art-Deco Cinema Golden Bar with 4-Point Star -->
		<svg
			viewBox="0 0 240 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class="w-48 sm:w-64 max-w-full h-6"
		>
			<line x1="20" y1="12" x2="105" y2="12" stroke="currentColor" stroke-width="0.75" />
			<circle cx="107" cy="12" r="1.5" fill="currentColor" />
			<!-- 4-point star -->
			<path d="M120 4L122 10L128 12L122 14L120 20L118 14L112 12L118 10Z" fill="currentColor" />
			<circle cx="133" cy="12" r="1.5" fill="currentColor" />
			<line x1="135" y1="12" x2="220" y2="12" stroke="currentColor" stroke-width="0.75" />
		</svg>
	{:else if variant === 'traditional'}
		<!-- Heritage / Indonesian rhythm pattern divider -->
		<svg
			viewBox="0 0 220 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class="w-44 sm:w-56 max-w-full h-6"
		>
			<line x1="15" y1="12" x2="80" y2="12" stroke="currentColor" stroke-width="1" />
			<!-- Central diamond rhythm inspired by kawung / batik -->
			<path d="M95 12L102 6L109 12L102 18Z" stroke="currentColor" stroke-width="1" fill="none" />
			<circle cx="102" cy="12" r="2" fill="currentColor" />
			<path d="M110 12L117 6L124 12L117 18Z" stroke="currentColor" stroke-width="1.25" fill="currentColor" fill-opacity="0.2" />
			<circle cx="117" cy="12" r="2.5" fill="currentColor" />
			<path d="M125 12L132 6L139 12L132 18Z" stroke="currentColor" stroke-width="1" fill="none" />
			<circle cx="132" cy="12" r="2" fill="currentColor" />
			<line x1="140" y1="12" x2="205" y2="12" stroke="currentColor" stroke-width="1" />
		</svg>
	{:else if variant === 'modern'}
		<!-- Modern editorial offset bar -->
		<div class="flex items-center gap-2">
			<div class="h-px w-10 sm:w-16 bg-current opacity-40"></div>
			<div class="h-1.5 w-1.5 rotate-45 border border-current"></div>
			<div class="h-px w-4 bg-current"></div>
			<div class="h-1.5 w-1.5 rotate-45 bg-current"></div>
			<div class="h-px w-4 bg-current"></div>
			<div class="h-1.5 w-1.5 rotate-45 border border-current"></div>
			<div class="h-px w-10 sm:w-16 bg-current opacity-40"></div>
		</div>
	{:else}
		<!-- Minimal hairline with center diamond dot -->
		<div class="flex items-center gap-3 w-40 sm:w-56">
			<div class="h-px flex-1 bg-current opacity-25"></div>
			<span class="text-[9px] tracking-widest opacity-60">◆</span>
			<div class="h-px flex-1 bg-current opacity-25"></div>
		</div>
	{/if}
</div>
