<script lang="ts">
	import './creator.css';
	import logoColour from '$lib/assets/logo-colour.png';
	import { untrack, setContext, tick, onDestroy } from 'svelte';
	import { beforeNavigate } from '$app/navigation';
	import { MEDIA_EDITOR, type MediaEditorContext } from './media-context';
	import type { Invitation, InvitationTheme } from '$lib/types/invitation';
	import InvitationRenderer from '$lib/invitation/InvitationRenderer.svelte';
	import OpeningEditor from '$lib/creator/sections/OpeningEditor.svelte';
	import CoupleEditor from '$lib/creator/sections/CoupleEditor.svelte';
	import HeroEditor from '$lib/creator/sections/HeroEditor.svelte';
	import StoryEditor from '$lib/creator/sections/StoryEditor.svelte';
	import EventsEditor from '$lib/creator/sections/EventsEditor.svelte';
	import CountdownEditor from '$lib/creator/sections/CountdownEditor.svelte';
	import GalleryEditor from '$lib/creator/sections/GalleryEditor.svelte';
	import RSVPEditor from '$lib/creator/sections/RSVPEditor.svelte';
	import GuestbookEditor from '$lib/creator/sections/GuestbookEditor.svelte';
	import GiftEditor from '$lib/creator/sections/GiftEditor.svelte';
	import MusicEditor from '$lib/creator/sections/MusicEditor.svelte';
	import ThemeEditor from '$lib/creator/sections/ThemeEditor.svelte';
	import WhatsAppShare from './WhatsAppShare.svelte';
	import PublishEditor from '$lib/creator/sections/PublishEditor.svelte';
	import {
		Save,
		Eye,
		X,
		Check,
		Loader2,
		Smartphone,
		Tablet,
		Monitor,
		ExternalLink,
		ArrowLeft,
		PanelLeft,
		ChevronLeft,
		ChevronRight
	} from '@lucide/svelte';

	let { initialInvitation }: { initialInvitation: Invitation } = $props();

	// Local reactive state - immediately feeds preview without database trips!
	let invitation = $state<Invitation>(structuredClone(untrack(() => initialInvitation)));

	function fullCoupleName(value: Invitation): string {
		return [value.content.couple.partner1, value.content.couple.partner2]
			.map((partner) => partner.fullName?.trim() || partner.name.trim())
			.filter(Boolean)
			.join(' & ');
	}
	let savedCoupleFullName = $state(untrack(() => fullCoupleName(initialInvitation)));
	let savedSlug = $state(untrack(() => initialInvitation.slug));
	let savedCoupleName = $state(
		untrack(() =>
			[
				initialInvitation.content.couple.partner1.name,
				initialInvitation.content.couple.partner2.name
			]
				.filter(Boolean)
				.join(' & ')
		)
	);
	let pendingMediaRemovals = $state<string[]>([]);
	let activeUploads = $state(0);
	setContext<MediaEditorContext>(MEDIA_EDITOR, {
		invitationId: untrack(() => initialInvitation.id),
		queueRemoval(id) {
			if (id && /^[a-f0-9]{24}$/i.test(id) && !pendingMediaRemovals.includes(id))
				pendingMediaRemovals.push(id);
		},
		setUploading(active) {
			activeUploads += active ? 1 : -1;
		}
	});

	let editorPane: HTMLElement | undefined = $state();
	type SectionKey =
		| 'opening'
		| 'couple'
		| 'hero'
		| 'story'
		| 'events'
		| 'countdown'
		| 'gallery'
		| 'rsvp'
		| 'guestbook'
		| 'gift'
		| 'music'
		| 'theme'
		| 'publish';

	let activeSection = $state<SectionKey>('couple');

	const SECTIONS: { key: SectionKey; label: string }[] = [
		{ key: 'couple', label: '1. Mempelai' },
		{ key: 'hero', label: '2. Hero & Cover' },
		{ key: 'opening', label: '3. Pembuka & Quote' },
		{ key: 'story', label: '4. Cerita Cinta' },
		{ key: 'events', label: '5. Rangkaian Acara' },
		{ key: 'countdown', label: '6. Countdown' },
		{ key: 'gallery', label: '7. Galeri Foto' },
		{ key: 'rsvp', label: '8. Form RSVP' },
		{ key: 'guestbook', label: '9. Buku Tamu' },
		{ key: 'gift', label: '10. Hadiah Digital' },
		{ key: 'music', label: '11. Musik Latar' },
		{ key: 'theme', label: '12. Pilih Tema' },
		{ key: 'publish', label: '13. Publikasi & URL' }
	];

	let currentSectionIndex = $derived(SECTIONS.findIndex((s) => s.key === activeSection));

	async function selectSection(key: SectionKey) {
		activeSection = key;
		await tick();
		editorPane?.scrollTo({ top: 0 });
	}
	function goToSection(index: number) {
		if (index >= 0 && index < SECTIONS.length) void selectSection(SECTIONS[index].key);
	}
	const sectionDescriptions: Record<SectionKey, string> = {
		couple: 'Perkenalkan dua nama di balik hari bahagia ini.',
		hero: 'Pilih foto dan kata pembuka yang menyambut tamu kalian.',
		opening: 'Sampaikan salam dan kutipan yang berarti untuk kalian.',
		story: 'Ceritakan perjalanan kecil menuju hari yang besar.',
		events: 'Lengkapi waktu dan tempat agar tamu mudah merencanakan kehadiran.',
		countdown: 'Tentukan waktu untuk menghitung hari menuju perayaan.',
		gallery: 'Kumpulkan momen yang ingin kalian bagikan.',
		rsvp: 'Atur bagaimana tamu mengonfirmasi kehadiran.',
		guestbook: 'Sediakan ruang untuk doa dan ucapan dari orang terdekat.',
		gift: 'Tambahkan informasi hadiah jika ingin menampilkannya.',
		music: 'Pilih musik untuk menemani tamu membuka undangan.',
		theme: 'Temukan tampilan yang paling sesuai dengan cerita kalian.',
		publish: 'Periksa tautan, lalu bagikan undangan kalian.'
	};
	const invitationTitle = $derived(
		[invitation.content.couple.partner1.name, invitation.content.couple.partner2.name]
			.filter(Boolean)
			.join(' & ') || 'Undangan baru'
	);
	// Viewport size simulator for desktop preview
	type ViewportMode = 'mobile' | 'tablet' | 'desktop';
	let viewport = $state<ViewportMode>('mobile');

	// Mobile fullscreen preview toggle
	let showMobilePreview = $state(false);
	let invitationRenderer: any = $state();

	function stopPreviewAudio() {
		if (invitationRenderer?.stopAudio) {
			invitationRenderer.stopAudio();
		}
		if (typeof document !== 'undefined') {
			document.querySelectorAll<HTMLAudioElement>('audio').forEach((a) => {
				try {
					a.pause();
					a.currentTime = 0;
				} catch {}
			});
		}
	}

	async function openMobilePreview() {
		showMobilePreview = true;
		await tick();
		invitationRenderer?.playAudio?.();
	}

	function closeMobilePreview() {
		showMobilePreview = false;
		stopPreviewAudio();
	}

	let prevMobilePreview = false;
	$effect(() => {
		if (prevMobilePreview && !showMobilePreview) {
			stopPreviewAudio();
		}
		prevMobilePreview = showMobilePreview;
	});

	beforeNavigate(() => {
		stopPreviewAudio();
	});

	onDestroy(() => {
		stopPreviewAudio();
	});

	// Save status
	let saving = $state(false);
	let saveSuccess = $state(false);
	let saveError = $state('');

	async function saveChanges(): Promise<void> {
		if (saving) throw new Error('Penyimpanan masih berlangsung.');
		if (activeUploads) throw new Error('Tunggu sampai upload foto selesai.');
		const removals = [...pendingMediaRemovals];
		saving = true;
		saveSuccess = false;
		saveError = '';

		try {
			const res = await fetch(`/api/invitations/${invitation.id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					slug: invitation.slug,
					theme: invitation.theme,
					content: invitation.content,
					removedMediaIds: removals,
					music: invitation.music,
					status: invitation.status
				})
			});

			if (!res.ok) {
				const err = await res.json().catch(() => ({}));
				throw new Error(err.message || 'Gagal menyimpan undangan');
			}

			const data = await res.json();
			if (data.invitation) {
				invitation = data.invitation;
				savedSlug = data.invitation.slug;
				savedCoupleFullName = fullCoupleName(data.invitation);
				savedCoupleName = [
					data.invitation.content.couple.partner1.name,
					data.invitation.content.couple.partner2.name
				]
					.filter(Boolean)
					.join(' & ');
			}
			pendingMediaRemovals = pendingMediaRemovals.filter((id) => !removals.includes(id));
			saveSuccess = true;
			setTimeout(() => (saveSuccess = false), 3000);
		} catch (err: any) {
			saveError = err.message || 'Terjadi kesalahan saat menyimpan';
			throw err;
		} finally {
			saving = false;
		}
	}

	async function handlePublishToggle(): Promise<void> {
		try {
			const res = await fetch(`/api/invitations/${invitation.id}/publish`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					status: invitation.status === 'published' ? 'unpublished' : 'published'
				})
			});

			if (!res.ok) {
				const err = await res.json().catch(() => ({}));
				throw new Error(err.message || 'Gagal mengubah status publikasi');
			}

			const data = await res.json();
			if (data.invitation) {
				invitation = data.invitation;
				savedSlug = data.invitation.slug;
				savedCoupleFullName = fullCoupleName(data.invitation);
				savedCoupleName = [
					data.invitation.content.couple.partner1.name,
					data.invitation.content.couple.partner2.name
				]
					.filter(Boolean)
					.join(' & ');
			}
		} catch (err: any) {
			saveError = err.message || 'Gagal mengubah status publikasi';
			throw err;
		}
	}
</script>

<svelte:window
	onkeydown={(event) => {
		if (event.key === 'Escape') closeMobilePreview();
	}}
/>

{#snippet saveButton()}
	<button
		type="button"
		class="studio-button studio-primary"
		disabled={saving || activeUploads > 0}
		onclick={() => {
			void saveChanges().catch(() => {});
		}}
	>
		{#if saving}<Loader2 size={16} class="animate-spin" />{:else if saveSuccess}<Check
				size={16}
			/>{:else}<Save size={16} />{/if}
		<span>{saving ? 'Menyimpan?' : saveSuccess ? 'Tersimpan' : 'Simpan perubahan'}</span>
	</button>
{/snippet}

<div class="creator-studio">
	<header class="studio-topbar">
		<div class="studio-identity">
			<a href="/" class="studio-back" aria-label="Kembali ke beranda"><ArrowLeft size={18} /></a>
			<div class="studio-title">
				<span class="studio-wordmark"
					><img src={logoColour} alt="Invita" width="472" height="588" /><span>/ studio</span></span
				>
				<h1 title={invitationTitle}>{invitationTitle}</h1>
			</div>
		</div>
		<div class="studio-top-actions">
			<span class="studio-status" class:online={invitation.status === 'published'}
				>{invitation.status === 'published'
					? 'Online'
					: invitation.status === 'unpublished'
						? 'Tidak dipublikasikan'
						: 'Draft'}</span
			>
			<div class="desktop-save">{@render saveButton()}</div>
		</div>
	</header>
	<div class="studio-workspace">
		<aside class="studio-sidebar" aria-label="Bagian undangan">
			<p class="studio-eyebrow">SUSUN UNDANGAN</p>
			<nav>
				{#each SECTIONS as section, index}
					{#if index === 0 || index === 6 || index === 11}<p class="nav-group">
							{index === 0
								? 'Cerita & acara'
								: index === 6
									? 'Foto & interaksi'
									: 'Tampilan & publikasi'}
						</p>{/if}
					<button
						type="button"
						class:active={activeSection === section.key}
						aria-current={activeSection === section.key ? 'step' : undefined}
						onclick={() => selectSection(section.key)}
						><span class="nav-number">{String(index + 1).padStart(2, '0')}</span><span
							>{section.label.replace(/^\d+\. /, '')}</span
						></button
					>
				{/each}
			</nav>
			<p class="sidebar-note">Dibuat sedikit demi sedikit.<br />Jangan lupa simpan perubahan.</p>
		</aside>
		<main class="studio-editor" bind:this={editorPane}>
			<div class="mobile-section-picker">
				<label for="studio-section"
					><PanelLeft size={15} /> Bagian undangan
					<span>{currentSectionIndex + 1} / {SECTIONS.length}</span></label
				><select
					id="studio-section"
					value={activeSection}
					onchange={(event) => selectSection(event.currentTarget.value as SectionKey)}
					>{#each SECTIONS as section}<option value={section.key}>{section.label}</option
						>{/each}</select
				>
			</div>
			<div class="studio-editor-content">
				<header class="editor-heading">
					<p class="studio-eyebrow">
						BAGIAN {String(currentSectionIndex + 1).padStart(2, '0')}
						<span>/ {SECTIONS.length}</span>
					</p>
					<h2>{SECTIONS[currentSectionIndex].label.replace(/^\d+\. /, '')}</h2>
					<p>{sectionDescriptions[activeSection]}</p>
				</header>
				{#if pendingMediaRemovals.length > 0}<p class="studio-notice" role="status">
						Foto yang diganti atau dihapus akan dibersihkan setelah Anda menyimpan perubahan.
					</p>{/if}
				{#if saveError}<p class="studio-error" role="alert">{saveError}</p>{/if}
				<fieldset
					disabled={saving}
					class="editor-fields"
					aria-label={SECTIONS[currentSectionIndex].label}
				>
					{#if activeSection === 'couple'}
						<CoupleEditor bind:couple={invitation.content.couple} />
					{:else if activeSection === 'hero'}
						<HeroEditor bind:hero={invitation.content.hero} />
					{:else if activeSection === 'opening'}
						<OpeningEditor bind:opening={invitation.content.opening} />
					{:else if activeSection === 'story'}
						<StoryEditor bind:story={invitation.content.story} />
					{:else if activeSection === 'events'}
						<EventsEditor bind:events={invitation.content.events} />
					{:else if activeSection === 'countdown'}
						<CountdownEditor bind:countdown={invitation.content.countdown} />
					{:else if activeSection === 'gallery'}
						<GalleryEditor bind:gallery={invitation.content.gallery} />
					{:else if activeSection === 'rsvp'}
						<RSVPEditor bind:rsvp={invitation.content.rsvp} />
					{:else if activeSection === 'guestbook'}
						<GuestbookEditor bind:guestbook={invitation.content.guestbook} />
					{:else if activeSection === 'gift'}
						<GiftEditor bind:gift={invitation.content.gift} />
					{:else if activeSection === 'music'}
						<MusicEditor bind:music={invitation.music} />
					{:else if activeSection === 'theme'}
						<ThemeEditor content={invitation.content} bind:theme={invitation.theme} />
					{:else if activeSection === 'publish'}
						<PublishEditor
							invitationId={invitation.id}
							bind:slug={invitation.slug}
							bind:status={invitation.status}
							onSave={saveChanges}
							onPublishToggle={handlePublishToggle}
						/>
						{#if invitation.status === 'published'}<div class="mt-6">
								<WhatsAppShare
									slug={savedSlug}
									coupleName={savedCoupleName}
									coupleFullName={savedCoupleFullName}
								/>
							</div>{/if}
					{/if}
				</fieldset>
				<div class="studio-step-nav">
					<button
						type="button"
						class="studio-button"
						disabled={currentSectionIndex === 0}
						onclick={() => goToSection(currentSectionIndex - 1)}
						><ChevronLeft size={16} /> Sebelumnya</button
					><span>{currentSectionIndex + 1} / {SECTIONS.length}</span
					>{#if currentSectionIndex < SECTIONS.length - 1}<button
							type="button"
							class="studio-button studio-next"
							onclick={() => goToSection(currentSectionIndex + 1)}
							>Selanjutnya <ChevronRight size={16} /></button
						>{:else}<button
							type="button"
							class="studio-button studio-next"
							onclick={openMobilePreview}><Eye size={16} /> Pratinjau</button
						>{/if}
				</div>
			</div>
		</main>
		<aside
			class="studio-preview"
			class:preview-open={showMobilePreview}
			aria-label="Pratinjau undangan"
		>
			<div class="preview-toolbar">
				<div>
					<span class="studio-eyebrow">PRATINJAU</span>
					<p>{invitation.theme.replaceAll('-', ' ')}</p>
				</div>
				<div class="preview-sizes" aria-label="Ukuran pratinjau">
					{#each [{ id: 'mobile', icon: Smartphone, label: 'Ponsel' }, { id: 'tablet', icon: Tablet, label: 'Tablet' }, { id: 'desktop', icon: Monitor, label: 'Desktop' }] as mode}<button
							type="button"
							aria-label={mode.label}
							aria-pressed={viewport === mode.id}
							class:active={viewport === mode.id}
							onclick={() => (viewport = mode.id as ViewportMode)}><mode.icon size={17} /></button
						>{/each}
				</div>
				<button
					type="button"
					class="preview-close studio-button"
					onclick={closeMobilePreview}><X size={18} /> Kembali edit</button
				>
			</div>
			<div class="preview-canvas">
				<div
					class="preview-frame"
					class:phone={viewport === 'mobile'}
					class:tablet={viewport === 'tablet'}
				>
					<InvitationRenderer
						bind:this={invitationRenderer}
						{invitation}
						isEditor={true}
						showCover={false}
						allowAudio={showMobilePreview}
					/>
				</div>
			</div>
			<p class="preview-footnote">Pratinjau langsung ? Perubahan tersimpan setelah klik Simpan</p>
		</aside>
	</div>
	<footer class="studio-mobile-actions">
		<button type="button" class="studio-button" onclick={openMobilePreview}
			><Eye size={17} /> Pratinjau</button
		>{@render saveButton()}
	</footer>
</div>
