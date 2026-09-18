<script lang="ts">
	import type { InvitationContent, InvitationTheme } from '$lib/types/invitation';
	import { THEME_LIST } from '$lib/invitation/theme-registry';
	import ThemeHeaderPreview from '$lib/invitation/ThemeHeaderPreview.svelte';
	import { Check } from '@lucide/svelte';
	let { theme = $bindable(), content }: { theme: InvitationTheme; content?: InvitationContent } =
		$props();
</script>

<div class="space-y-5">
	<div>
		<h3 class="text-sm font-bold">Pilih tampilan undangan</h3>
		<p class="mt-2 text-xs leading-relaxed text-[#64685e]">
			Lihat header setiap tema dengan isi undangan kalian. Pilih tema untuk melihat tampilan
			lengkapnya di pratinjau.
		</p>
	</div>
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
		{#each THEME_LIST as item}
			<button
				type="button"
				aria-pressed={theme === item.id}
				onclick={() => (theme = item.id)}
				class="theme-option"
				class:selected={theme === item.id}
			>
				<ThemeHeaderPreview theme={item.id} {content} />
				<span class="caption"
					><span>{item.name}</span>{#if theme === item.id}<Check
							size={16}
							aria-label="Terpilih"
						/>{/if}</span
				>
			</button>
		{/each}
	</div>
</div>

<style>
	.theme-option {
		display: block;
		min-width: 0;
		border: 2px solid #c9ccbf;
		background: #fffdf7;
		text-align: left;
		cursor: pointer;
	}
	.theme-option:hover {
		border-color: #7c8663;
	}
	.selected {
		border-color: #242820;
		box-shadow: 3px 3px #242820;
	}
	.caption {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
		padding: 14px 12px;
		font-size: 11px;
		font-weight: 700;
	}
	.selected .caption {
		background: #dce881;
	}
</style>
