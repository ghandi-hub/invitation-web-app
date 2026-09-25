<script lang="ts">
	let {
		size = 220,
		text = 'THE WEDDING OF',
		className = ''
	}: {
		size?: number;
		text?: string;
		className?: string;
	} = $props();
</script>

<div
	class={`pointer-events-none my-3 flex justify-center select-none ${className}`}
	aria-hidden="true"
>
	<div class="relative" style={`max-width:${size}px`}>
		<img
			src="/ornaments/javanese/ribbon.png"
			alt=""
			class="w-full opacity-90 drop-shadow-sm"
			loading="lazy"
		/>

		<div class="absolute inset-0 flex items-center justify-center">
			<span
				class="font-abril translate-y-9 text-[10px] font-bold tracking-[0.25em] text-[#6b4f2a] uppercase md:text-xs"
			>
				{text}
			</span>
		</div>
	</div>
</div>
