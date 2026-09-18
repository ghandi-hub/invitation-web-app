<script lang="ts">
	import { onMount } from 'svelte';
	import { Copy, MessageCircle, ContactRound } from '@lucide/svelte';
	let {
		slug,
		coupleName,
		coupleFullName
	}: { slug: string; coupleName: string; coupleFullName?: string } = $props();
	let recipient = $state('');
	let phone = $state('');
	let origin = $state('');
	let local = $state(false);
	let feedback = $state('');
	type PhoneContact = { name?: string[]; tel?: string[] };
	type ContactPicker = {
		getProperties: () => Promise<string[]>;
		select: (properties: string[], options: { multiple: boolean }) => Promise<PhoneContact[]>;
	};
	let contactPicker: ContactPicker | undefined;
	let contactProperties: string[] = [];
	let contactsSupported = $state(false);
	let pickingContact = $state(false);
	let contactFeedback = $state('');
	let contactNumbers = $state<string[]>([]);

	async function pickContact() {
		if (!contactPicker || !contactsSupported || pickingContact) return;
		pickingContact = true;
		contactFeedback = '';
		try {
			const contacts = await contactPicker.select(contactProperties, { multiple: false });
			const contact = contacts[0];
			if (!contact) return;
			const numbers = [
				...new Set((contact.tel || []).map((value) => value.trim()).filter(Boolean))
			];
			if (!numbers.length) {
				contactFeedback =
					'Kontak yang dipilih tidak memiliki nomor telepon. Pilih kontak lain atau isi nomor secara manual.';
				return;
			}
			const name = contact.name?.find((value) => value.trim())?.trim();
			if (name) recipient = name.slice(0, 100);
			contactNumbers = numbers;
			phone = numbers.length === 1 ? numbers[0] : '';
			contactFeedback =
				numbers.length > 1
					? 'Kontak memiliki beberapa nomor. Pilih nomor WhatsApp yang ingin digunakan.'
					: 'Kontak terisi. Periksa nama penerima dan nomor sebelum mengirim.';
		} catch (error) {
			if (!(error instanceof Error && error.name === 'AbortError')) {
				contactFeedback =
					'Kontak belum dapat dibuka. Coba lagi, isi nomor secara manual, atau pilih penerima langsung di WhatsApp.';
			}
		} finally {
			pickingContact = false;
		}
	}

	onMount(() => {
		origin = window.location.origin;
		const picker = (navigator as Navigator & { contacts?: ContactPicker }).contacts;
		if (
			window.isSecureContext &&
			window.top === window.self &&
			typeof picker?.select === 'function' &&
			typeof picker.getProperties === 'function'
		) {
			void picker
				.getProperties()
				.then((properties) => {
					if (!properties.includes('tel')) return;
					contactProperties = properties.includes('name') ? ['name', 'tel'] : ['tel'];
					contactPicker = picker;
					contactsSupported = true;
				})
				.catch(() => {
					contactsSupported = false;
				});
		}

		local = ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname);
	});
	const guestName = $derived(recipient.trim().slice(0, 100));
	const guestUrl = $derived(
		`${origin}/invitation/${encodeURIComponent(slug)}${guestName ? '?' + new URLSearchParams({ to: guestName }).toString() : ''}`
	);
	const number = $derived(phone.replace(/[\s()+.-]/g, '').replace(/^0/, '62'));
	const invalidPhone = $derived(Boolean(phone.trim()) && !/^[1-9]\d{7,14}$/.test(number));
	const message = $derived(
		`Yth. ${guestName || 'Bapak/Ibu/Saudara/i'}

Assalamualaikum Warahmatullahi Wabarakatuh

Dengan memohon Rahmat dan Ridho Allah SWT, dan tanpa mengurangi rasa hormat melalui pesan ini kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:

${coupleFullName || coupleName}

Berikut link undangan kami, untuk info lengkap dari acara bisa kunjungi:
${guestUrl}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu.

Mohon maaf perihal undangan hanya dibagikan melalui pesan ini.

Terima kasih banyak atas perhatiannya.
Wassalamualaikum Warahmatullahi Wabarakatuh

Hormat kami,
${coupleName}`
	);
	const whatsappUrl = $derived(`https://wa.me/${number}?text=${encodeURIComponent(message)}`);
	async function copyLink() {
		try {
			await navigator.clipboard.writeText(guestUrl);
			feedback = 'Tautan penerima berhasil disalin.';
		} catch {
			feedback = 'Belum bisa menyalin otomatis. Pilih dan salin tautan di bawah.';
		}
	}
</script>

<section class="wa-share">
	<h3>Kirim via WhatsApp</h3>
	<p>Buat tautan dengan nama penerima. Pesan disiapkan di WhatsApp untuk Anda periksa dan kirim.</p>
	{#if local}<p class="local-note">
			Tautan masih memakai localhost. Agar penerima dapat membukanya, aplikasi perlu dipasang di
			domain publik terlebih dahulu.
		</p>{/if}
	<div class="share-field">
		<label for="guest-name">Nama penerima</label><input
			id="guest-name"
			bind:value={recipient}
			maxlength="100"
			placeholder="Nama tamu atau keluarga"
		/>
	</div>
	<div class="share-field">
		{#if contactsSupported}
			<button
				type="button"
				class="studio-button contact-picker"
				disabled={pickingContact}
				onclick={pickContact}
				><ContactRound size={17} />
				{pickingContact ? 'Membuka kontak?' : 'Pilih dari kontak HP'}</button
			>
			<p>Hanya nama dan nomor kontak yang Anda pilih akan diisi ke formulir.</p>
		{:else}
			<p>
				Browser ini belum mendukung pemilihan kontak HP. Isi nomor atau kosongkan untuk memilih
				penerima di WhatsApp.
			</p>
		{/if}
		{#if contactFeedback}<p role="status">{contactFeedback}</p>{/if}
		{#if contactNumbers.length > 1}
			<label for="contact-number">Pilih nomor kontak</label>
			<select id="contact-number" bind:value={phone}
				><option value="">Pilih nomor WhatsApp</option>{#each contactNumbers as number}<option
						value={number}>{number}</option
					>{/each}</select
			>
		{/if}
		<label for="guest-phone">Nomor WhatsApp <span>(opsional)</span></label><input
			id="guest-phone"
			type="tel"
			inputmode="tel"
			bind:value={phone}
			placeholder="08… atau +62…"
			aria-invalid={invalidPhone}
			aria-describedby="phone-help"
			oninput={() => {
				contactNumbers = [];
				contactFeedback = '';
			}}
		/>
		<p id="phone-help">Kosongkan untuk memilih kontak langsung di WhatsApp.</p>
		{#if invalidPhone}<p class="phone-error" role="alert">
				Gunakan nomor yang valid dengan kode negara, atau nomor Indonesia diawali 08.
			</p>{/if}
	</div>
	<div class="share-field">
		<label for="guest-url">Tautan penerima</label><input
			id="guest-url"
			value={guestUrl}
			readonly
			onclick={(event) => event.currentTarget.select()}
		/>
	</div>
	<details>
		<summary>Lihat pesan undangan</summary>
		<p class="message-preview">{message}</p>
	</details>
	<div class="share-actions">
		<button type="button" class="studio-button" onclick={copyLink}
			><Copy size={15} /> Salin tautan</button
		>{#if !invalidPhone}<a
				class="studio-button studio-primary"
				href={whatsappUrl}
				target="_blank"
				rel="noopener noreferrer"><MessageCircle size={16} /> Buka WhatsApp</a
			>{:else}<button type="button" class="studio-button studio-primary"
				><MessageCircle size={16} /> Buka WhatsApp</button
			>{/if}
	</div>
	<!-- <div class="share-actions">
		<button type="button" class="studio-button" disabled={!origin} onclick={copyLink}
			><Copy size={15} /> Salin tautan</button
		>{#if !invalidPhone && origin && !local}<a
				class="studio-button studio-primary"
				href={whatsappUrl}
				target="_blank"
				rel="noopener noreferrer"><MessageCircle size={16} /> Buka WhatsApp</a
			>{:else}<button type="button" class="studio-button studio-primary" disabled
				><MessageCircle size={16} /> Buka WhatsApp</button
			>{/if}
	</div> -->
	{#if feedback}<p role="status">{feedback}</p>{/if}
</section>

<style>
	.wa-share {
		border: 1px solid #c9ccbf;
		background: #fffdf7;
		padding: 22px;
		display: grid;
		gap: 17px;
		min-width: 0;
	}
	h3 {
		font-size: 18px;
		font-weight: 700;
	}
	p {
		font-size: 12px;
		line-height: 1.8;
		color: #64685e;
	}
	.share-field {
		display: grid;
		gap: 7px;
		min-width: 0;
	}
	label {
		font-size: 12px;
		font-weight: 600;
	}
	label span {
		font-weight: 400;
		color: #73776b;
	}
	input,
	select {
		width: 100%;
		min-width: 0;
		padding: 12px;
		border: 1px solid #c9ccbf;
		background: #f7f5ef;
		font-size: 14px;
	}
	input[readonly] {
		font-size: 12px;
	}
	summary {
		font-size: 12px;
		cursor: pointer;
		padding: 8px 0;
	}
	.message-preview {
		white-space: pre-wrap;
		overflow-wrap: anywhere;
		background: #f7f5ef;
		padding: 15px;
		margin-top: 10px;
	}
	.share-actions {
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
	}
	.share-actions > * {
		flex: 1;
	}
	.local-note {
		padding: 12px;
		background: #eff2dd;
		border-left: 2px solid #929d55;
	}
	.contact-picker {
		justify-self: start;
	}
	.phone-error {
		color: #a22f22;
	}
	@media (max-width: 480px) {
		.wa-share {
			padding: 16px;
		}
		input,
		select {
			font-size: 16px;
		}
		.share-actions {
			flex-direction: column;
		}
	}
</style>
