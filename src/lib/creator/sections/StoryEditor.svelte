<script lang="ts">
	import type { StoryContent } from '$lib/types/invitation';

	let { story = $bindable() }: { story: StoryContent } = $props();
</script>

<div class="space-y-5">
	<div>
		<label for="story-title" class="mb-1 block text-xs font-bold tracking-wider uppercase">
			Judul Cerita
		</label>
		<input
			id="story-title"
			type="text"
			bind:value={story.title}
			placeholder="Kisah Cinta Kami"
			class="creator-border creator-shadow-sm w-full bg-[#fffdf7] px-3.5 py-2.5 text-sm font-medium focus:outline-hidden"
		/>
	</div>

	<div>
		<label for="story-body" class="mb-1 block text-xs font-bold tracking-wider uppercase">
			Isi Kisah Perjalanan Cinta
		</label>
		<textarea
			id="story-body"
			bind:value={story.body}
			rows={6}
			placeholder="Ceritakan bagaimana Anda pertama kali bertemu, bertumbuh bersama, hingga akhirnya memutuskan untuk menikah..."
			class="creator-border creator-shadow-sm w-full resize-none bg-[#fffdf7] px-3.5 py-2.5 text-sm font-medium focus:outline-hidden"
		></textarea>
	</div>
</div>
