<script lang="ts">
	let {
		partner1 = 'S',
		partner2 = 'A',
		variant = 'wreath',
		color = 'currentColor',
		size = 110,
		className = ''
	}: {
		partner1?: string;
		partner2?: string;
		variant?: 'wreath' | 'oval' | 'editorial' | 'arch' | 'modern';
		color?: string;
		size?: number;
		className?: string;
	} = $props();

	const initial1 = $derived((partner1?.trim()?.[0] || 'A').toUpperCase());
	const initial2 = $derived((partner2?.trim()?.[0] || 'B').toUpperCase());
</script>

<div
	class="relative inline-flex items-center justify-center select-none {className}"
	style:width="{size}px"
	style:height="{size}px"
	style:color={color}
>
	{#if variant === 'wreath'}
		<!-- Botanical Wreath Frame -->
		<svg
			viewBox="0 0 120 120"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class="absolute inset-0 w-full h-full pointer-events-none"
		>
			<!-- Left Wreath Branch -->
			<path
				d="M60 110C35 110 16 88 16 60C16 35 34 16 56 12"
				stroke="currentColor"
				stroke-width="1.2"
				stroke-linecap="round"
			/>
			<path d="M22 80C14 74 15 64 24 66C25 74 24 78 22 80Z" fill="currentColor" fill-opacity="0.3" />
			<path d="M16 56C8 52 10 42 19 45C19 53 17 55 16 56Z" fill="currentColor" fill-opacity="0.3" />
			<path d="M24 36C18 30 22 22 30 26C29 33 26 35 24 36Z" fill="currentColor" fill-opacity="0.3" />
			<path d="M38 20C34 14 40 8 47 13C45 19 41 20 38 20Z" fill="currentColor" fill-opacity="0.3" />

			<!-- Right Wreath Branch -->
			<path
				d="M60 110C85 110 104 88 104 60C104 35 86 16 64 12"
				stroke="currentColor"
				stroke-width="1.2"
				stroke-linecap="round"
			/>
			<path d="M98 80C106 74 105 64 96 66C95 74 96 78 98 80Z" fill="currentColor" fill-opacity="0.3" />
			<path d="M104 56C112 52 110 42 101 45C101 53 103 55 104 56Z" fill="currentColor" fill-opacity="0.3" />
			<path d="M96 36C102 30 98 22 90 26C91 33 94 35 96 36Z" fill="currentColor" fill-opacity="0.3" />
			<path d="M82 20C86 14 80 8 73 13C75 19 79 20 82 20Z" fill="currentColor" fill-opacity="0.3" />

			<!-- Bottom Ribbon / Knot -->
			<circle cx="60" cy="110" r="2.5" fill="currentColor" />
			<path d="M56 112L52 117M64 112L68 117" stroke="currentColor" stroke-width="1" stroke-linecap="round" />
		</svg>
		<!-- Initials in center -->
		<div class="relative z-10 flex items-center justify-center gap-1 font-serif text-center">
			<span class="text-lg sm:text-xl font-medium tracking-tight">{initial1}</span>
			<span class="text-xs font-light italic opacity-60">&amp;</span>
			<span class="text-lg sm:text-xl font-medium tracking-tight">{initial2}</span>
		</div>
	{:else if variant === 'oval'}
		<!-- Classical Double Oval Frame -->
		<svg
			viewBox="0 0 100 120"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class="absolute inset-0 w-full h-full pointer-events-none"
		>
			<ellipse cx="50" cy="60" rx="46" ry="56" stroke="currentColor" stroke-width="1.2" />
			<ellipse cx="50" cy="60" rx="42" ry="52" stroke="currentColor" stroke-width="0.6" stroke-dasharray="2 2" />
			<!-- Top flourish crest -->
			<circle cx="50" cy="4" r="2" fill="currentColor" />
			<circle cx="50" cy="116" r="2" fill="currentColor" />
		</svg>
		<div class="relative z-10 flex items-center justify-center gap-1 font-serif text-center">
			<span class="text-xl font-medium">{initial1}</span>
			<span class="font-script text-lg text-current opacity-70">&amp;</span>
			<span class="text-xl font-medium">{initial2}</span>
		</div>
	{:else if variant === 'arch'}
		<!-- Graceful Architectural Arch -->
		<svg
			viewBox="0 0 100 130"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class="absolute inset-0 w-full h-full pointer-events-none"
		>
			<path
				d="M8 126V48C8 24.8 26.8 6 50 6C73.2 6 92 24.8 92 48V126H8Z"
				stroke="currentColor"
				stroke-width="1"
			/>
			<path
				d="M14 126V48C14 28.1 30.1 12 50 12C69.9 12 86 28.1 86 48V126"
				stroke="currentColor"
				stroke-width="0.5"
				stroke-dasharray="3 3"
			/>
			<circle cx="50" cy="6" r="2" fill="currentColor" />
		</svg>
		<div class="relative z-10 flex items-center justify-center gap-1 font-playfair text-center pt-3">
			<span class="text-xl font-normal">{initial1}</span>
			<span class="text-xs font-light italic opacity-60">&amp;</span>
			<span class="text-xl font-normal">{initial2}</span>
		</div>
	{:else if variant === 'editorial'}
		<!-- Editorial Seal / Geometric Stamp -->
		<div class="relative w-full h-full border border-current flex items-center justify-center p-2">
			<div class="w-full h-full border border-current/40 border-dashed flex items-center justify-center gap-1 font-playfair">
				<span class="text-lg tracking-tight font-normal">{initial1}</span>
				<span class="text-xs italic opacity-60">&amp;</span>
				<span class="text-lg tracking-tight font-normal">{initial2}</span>
			</div>
			<div class="absolute -top-1 -left-1 w-2 h-2 bg-current"></div>
			<div class="absolute -top-1 -right-1 w-2 h-2 bg-current"></div>
			<div class="absolute -bottom-1 -left-1 w-2 h-2 bg-current"></div>
			<div class="absolute -bottom-1 -right-1 w-2 h-2 bg-current"></div>
		</div>
	{:else}
		<!-- Modern Brutalist / Mono Block -->
		<div class="w-full h-full border-2 border-current bg-current/5 flex items-center justify-center gap-1 font-mono font-bold">
			<span class="text-lg">{initial1}</span>
			<span class="text-xs opacity-70">+</span>
			<span class="text-lg">{initial2}</span>
		</div>
	{/if}
</div>
