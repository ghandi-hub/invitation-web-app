<script lang="ts">
	let {
		variant = 'gunungan',
		color = '#c59b27',
		className = ''
	}: {
		variant?: 'gunungan' | 'padma' | 'keraton' | 'minimal';
		color?: string;
		className?: string;
	} = $props();
</script>

<div
	class="flex items-center justify-center py-6 select-none pointer-events-none {className}"
	style:color={color}
	aria-hidden="true"
>
	{#if variant === 'gunungan'}
		<!-- Traditional Divider with Center Gunungan Crown -->
		<svg
			viewBox="0 0 280 40"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class="w-56 sm:w-80 max-w-full h-9"
		>
			<!-- Left Wing Hairline -->
			<line x1="20" y1="20" x2="115" y2="20" stroke="currentColor" stroke-width="1" />
			<line x1="30" y1="23" x2="110" y2="23" stroke="currentColor" stroke-width="0.5" stroke-dasharray="3 3" opacity="0.6" />
			<circle cx="20" cy="20" r="2" fill="currentColor" />

			<!-- Left Floral Tendril (Lung-lungan) -->
			<path
				d="M80 20 C85 14 98 12 102 18 C96 22 88 22 80 20 Z"
				fill="currentColor"
				fill-opacity="0.3"
				stroke="currentColor"
				stroke-width="0.75"
			/>
			<circle cx="106" cy="20" r="1.5" fill="currentColor" />
			<circle cx="114" cy="20" r="2.5" fill="currentColor" />

			<!-- Center Gunungan Silhouette Finial -->
			<g transform="translate(125, 4)">
				<path
					d="M15 3 C18 10 24 18 27 24 C28 27 28 30 26 32 C23 34 18 34 15 34 C12 34 7 34 4 32 C2 30 2 27 3 24 C6 18 12 10 15 3 Z"
					fill="currentColor"
					fill-opacity="0.25"
					stroke="currentColor"
					stroke-width="1.2"
					stroke-linejoin="round"
				/>
				<circle cx="15" cy="3" r="1.5" fill="currentColor" />
				<line x1="15" y1="10" x2="15" y2="34" stroke="currentColor" stroke-width="1" stroke-linecap="round" />
				<circle cx="15" cy="18" r="1.5" fill="currentColor" />
			</g>

			<!-- Right Floral Tendril -->
			<circle cx="166" cy="20" r="2.5" fill="currentColor" />
			<circle cx="174" cy="20" r="1.5" fill="currentColor" />
			<path
				d="M200 20 C195 14 182 12 178 18 C184 22 192 22 200 20 Z"
				fill="currentColor"
				fill-opacity="0.3"
				stroke="currentColor"
				stroke-width="0.75"
			/>

			<!-- Right Wing Hairline -->
			<line x1="165" y1="20" x2="260" y2="20" stroke="currentColor" stroke-width="1" />
			<line x1="170" y1="23" x2="250" y2="23" stroke="currentColor" stroke-width="0.5" stroke-dasharray="3 3" opacity="0.6" />
			<circle cx="260" cy="20" r="2" fill="currentColor" />
		</svg>
	{:else if variant === 'padma'}
		<!-- Sacred Javanese Padma (Lotus) Bloom Divider -->
		<svg
			viewBox="0 0 260 32"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class="w-52 sm:w-72 max-w-full h-8"
		>
			<line x1="15" y1="16" x2="110" y2="16" stroke="currentColor" stroke-width="1" />
			<circle cx="15" cy="16" r="2" fill="currentColor" />

			<!-- Center Lotus (Padma) Motif -->
			<g transform="translate(114, 4)">
				<!-- Center Petal -->
				<path
					d="M16 4 C13 11 11 17 16 24 C21 17 19 11 16 4 Z"
					fill="currentColor"
					fill-opacity="0.4"
					stroke="currentColor"
					stroke-width="1"
				/>
				<!-- Left Petal -->
				<path
					d="M16 16 C10 13 4 16 6 22 C11 24 14 21 16 16 Z"
					fill="currentColor"
					fill-opacity="0.25"
					stroke="currentColor"
					stroke-width="1"
				/>
				<!-- Right Petal -->
				<path
					d="M16 16 C22 13 28 16 26 22 C21 24 18 21 16 16 Z"
					fill="currentColor"
					fill-opacity="0.25"
					stroke="currentColor"
					stroke-width="1"
				/>
				<circle cx="16" cy="4" r="1.5" fill="currentColor" />
				<circle cx="16" cy="24" r="2" fill="currentColor" />
			</g>

			<line x1="150" y1="16" x2="245" y2="16" stroke="currentColor" stroke-width="1" />
			<circle cx="245" cy="16" r="2" fill="currentColor" />
		</svg>
	{:else if variant === 'keraton'}
		<!-- Royal Keraton Gold Bar with Diamond Rhombus Rhythm -->
		<svg
			viewBox="0 0 240 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class="w-48 sm:w-64 max-w-full h-6"
		>
			<line x1="20" y1="12" x2="90" y2="12" stroke="currentColor" stroke-width="0.8" />
			<circle cx="95" cy="12" r="1.5" fill="currentColor" />
			<!-- Left Diamond -->
			<path d="M103 12L108 8L113 12L108 16Z" stroke="currentColor" stroke-width="1" fill="none" />
			<!-- Center Emblazoned Diamond with Dot -->
			<path d="M116 12L120 6L124 12L120 18Z" fill="currentColor" />
			<circle cx="120" cy="12" r="1.5" fill="#faf5eb" />
			<!-- Right Diamond -->
			<path d="M127 12L132 8L137 12L132 16Z" stroke="currentColor" stroke-width="1" fill="none" />
			<circle cx="145" cy="12" r="1.5" fill="currentColor" />
			<line x1="150" y1="12" x2="220" y2="12" stroke="currentColor" stroke-width="0.8" />
		</svg>
	{:else}
		<!-- Minimalist Javanese Hairline with Golden Bead -->
		<div class="flex items-center justify-center gap-3 w-40 sm:w-56">
			<div class="h-px flex-1 bg-current opacity-30"></div>
			<div class="flex items-center gap-1.5 opacity-80">
				<span class="text-[7px]">◆</span>
				<span class="text-[10px]">❖</span>
				<span class="text-[7px]">◆</span>
			</div>
			<div class="h-px flex-1 bg-current opacity-30"></div>
		</div>
	{/if}
</div>
