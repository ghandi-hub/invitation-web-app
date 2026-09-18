<script lang="ts">
	import type { CoupleContent } from '$lib/types/invitation';
	import ImageUploader from '$lib/creator/ImageUploader.svelte';

	let { couple = $bindable() }: { couple: CoupleContent } = $props();
</script>

<div class="space-y-8">
	<!-- Partner 1 (Groom) -->
	<div class="creator-border creator-shadow-sm space-y-4 bg-[#fffdf7] p-5">
		<span
			class="creator-border inline-block bg-[#dce881] px-2.5 py-1 text-xs font-black tracking-wider uppercase"
		>
			Mempelai Pertama (Pria / Wanita)
		</span>

		<div>
			<label for="p1-name" class="mb-1 block text-xs font-bold tracking-wider uppercase">
				Nama Panggilan <span class="text-red-500">*</span>
			</label>
			<input
				id="p1-name"
				type="text"
				bind:value={couple.partner1.name}
				placeholder="Nama panggilan"
				class="creator-border w-full bg-[#f7f5ef] px-3.5 py-2.5 text-sm font-medium focus:outline-hidden"
			/>
		</div>

		<div>
			<label for="p1-fullname" class="mb-1 block text-xs font-bold tracking-wider uppercase">
				Nama Lengkap Beserta Gelar
			</label>
			<input
				id="p1-fullname"
				type="text"
				bind:value={couple.partner1.fullName}
				placeholder="Nama lengkap mempelai pertama"
				class="creator-border w-full bg-[#f7f5ef] px-3.5 py-2.5 text-sm font-medium focus:outline-hidden"
			/>
		</div>

		<div>
			<label for="p1-child" class="mb-1 block text-xs font-bold tracking-wider uppercase">
				Keterangan Orang Tua / Keluarga
			</label>
			<input
				id="p1-child"
				type="text"
				bind:value={couple.partner1.childOf}
				placeholder="Putra pertama dari Bpk. Ahmad & Ibu Siti"
				class="creator-border w-full bg-[#f7f5ef] px-3.5 py-2.5 text-sm font-medium focus:outline-hidden"
			/>
		</div>

		<ImageUploader
			currentMediaId={couple.partner1.photoMediaId}
			currentUrl={couple.partner1.photoUrl}
			label="Foto Mempelai Pertama"
			aspectRatio="aspect-3/4"
			onUploadSuccess={(url, id) => {
				couple.partner1.photoUrl = url;
				couple.partner1.photoMediaId = id || null;
			}}
			onRemove={() => {
				couple.partner1.photoUrl = null;
				couple.partner1.photoMediaId = null;
			}}
		/>
	</div>

	<!-- Partner 2 (Bride) -->
	<div class="creator-border creator-shadow-sm space-y-4 bg-[#fffdf7] p-5">
		<span
			class="inline-block bg-[#242820] px-2.5 py-1 text-xs font-bold tracking-wider text-white uppercase"
		>
			Mempelai Kedua (Pria / Wanita)
		</span>

		<div>
			<label for="p2-name" class="mb-1 block text-xs font-bold tracking-wider uppercase">
				Nama Panggilan <span class="text-red-500">*</span>
			</label>
			<input
				id="p2-name"
				type="text"
				bind:value={couple.partner2.name}
				placeholder="Nama panggilan"
				class="creator-border w-full bg-[#f7f5ef] px-3.5 py-2.5 text-sm font-medium focus:outline-hidden"
			/>
		</div>

		<div>
			<label for="p2-fullname" class="mb-1 block text-xs font-bold tracking-wider uppercase">
				Nama Lengkap Beserta Gelar
			</label>
			<input
				id="p2-fullname"
				type="text"
				bind:value={couple.partner2.fullName}
				placeholder="Nama lengkap mempelai kedua"
				class="creator-border w-full bg-[#f7f5ef] px-3.5 py-2.5 text-sm font-medium focus:outline-hidden"
			/>
		</div>

		<div>
			<label for="p2-child" class="mb-1 block text-xs font-bold tracking-wider uppercase">
				Keterangan Orang Tua / Keluarga
			</label>
			<input
				id="p2-child"
				type="text"
				bind:value={couple.partner2.childOf}
				placeholder="Putri bungsu dari Bpk. Bambang & Ibu Nur"
				class="creator-border w-full bg-[#f7f5ef] px-3.5 py-2.5 text-sm font-medium focus:outline-hidden"
			/>
		</div>

		<ImageUploader
			currentMediaId={couple.partner2.photoMediaId}
			currentUrl={couple.partner2.photoUrl}
			label="Foto Mempelai Kedua"
			aspectRatio="aspect-3/4"
			onUploadSuccess={(url, id) => {
				couple.partner2.photoUrl = url;
				couple.partner2.photoMediaId = id || null;
			}}
			onRemove={() => {
				couple.partner2.photoUrl = null;
				couple.partner2.photoMediaId = null;
			}}
		/>
	</div>
</div>
