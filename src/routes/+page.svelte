<script lang="ts">
	import ThemeHeaderPreview from '$lib/invitation/ThemeHeaderPreview.svelte';
	import { ArrowUpRight, ArrowRight, Plus, LogOut } from '@lucide/svelte';
	import { THEME_LIST } from '$lib/invitation/theme-registry';
	let { data } = $props();
	const statusLabels: Record<string, string> = {
		draft: 'Draft',
		published: 'Online',
		unpublished: 'Tidak dipublikasikan'
	};
</script>

<svelte:head>
	<title>WedVow — Ruang untuk cerita kalian</title>
	<meta
		name="description"
		content="Buat undangan pernikahan personal. Susun cerita, pilih tema, dan bagikan hari bahagia kalian."
	/>
</svelte:head>

<div class="home">
	<header class="topbar wrap">
		<a href="/" class="brand" aria-label="WedVow beranda">wedvow<span>®</span></a>
		<nav aria-label="Navigasi utama">
			<a href="#themes" class="theme-link">Koleksi tema</a>
			{#if data.user}
				<a href="#invitations">Undangan saya</a>
				<form action="/logout" method="POST">
					<button class="logout" aria-label="Keluar"><LogOut size={18} /></button>
				</form>
			{:else if data.isGoogleAuth}
				<a href="/auth/google" class="nav-login">Masuk <ArrowUpRight size={16} /></a>
			{/if}
		</nav>
	</header>

	<main>
		<section class="hero wrap">
			<div class="hero-copy">
				<p class="eyebrow">UNTUK HARI YANG PALING BERARTI</p>
				<h1>Cerita kalian.<br />Undangan <em>kalian.</em></h1>
				<p class="intro">
					Satu ruang untuk kisah, momen, dan orang-orang terdekat. Buat undangan pernikahan yang
					terasa seperti kalian.
				</p>
				{#if data.user}
					<a class="primary" href="/create">Lanjutkan undangan <ArrowRight size={19} /></a>
				{:else if data.isGoogleAuth}
					<a class="primary" href="/auth/google">Mulai dengan Google <ArrowRight size={19} /></a>
				{:else}
					<div class="login-notice" role="status">
						<strong>Pembuatan undangan segera tersedia</strong>
						<p>
							Login Google belum tersedia saat ini. Sambil menunggu, jelajahi pilihan tema di bawah.
						</p>
					</div>
					<a class="text-link" href="#themes">Jelajahi tema <ArrowRight size={18} /></a>
				{/if}
				<p class="hero-note">Tulis ceritanya. Atur tampilannya. Bagikan kebahagiaannya.</p>
			</div>
			<div class="type-poster" aria-label="Tipografi Together, untuk setiap awal yang baru">
				<div class="poster-top"><span>THE WEDDING EDITION</span><span>W / V</span></div>
				<div class="poster-title">To<span>gether.</span></div>
				<div class="poster-bottom">
					<span>Untuk setiap<br />awal yang baru.</span><span class="poster-mark">&</span>
				</div>
			</div>
		</section>

		{#if data.user}
			<section class="workspace wrap" id="invitations">
				<div class="section-heading">
					<div>
						<p class="eyebrow">RUANG KERJA</p>
						<h2>Undangan saya</h2>
					</div>
					<span>{data.invitations.length} undangan</span>
				</div>
				{#each data.invitations as invitation}
					<a class="invitation-row" href="/create/{invitation.id}">
						<div class="invitation-initial">
							{invitation.content.couple.partner1.name?.slice(0, 1) || 'W'}
						</div>
						<div class="invitation-info">
							<h3>
								{[invitation.content.couple.partner1.name, invitation.content.couple.partner2.name]
									.filter(Boolean)
									.join(' & ') || 'Undangan tanpa judul'}
							</h3>
							<p>{invitation.theme} · /{invitation.slug}</p>
						</div>
						<span class:online={invitation.status === 'published'} class="status"
							>{statusLabels[invitation.status] || invitation.status}</span
						><ArrowUpRight size={22} />
					</a>
				{:else}
					<div class="empty-workspace">
						<h3>Hari istimewa kalian dimulai di sini.</h3>
						<p>
							Belum ada undangan. Mulai dengan nama mempelai, lalu susun detail acara sesuai
							keinginan.
						</p>
						<a href="/create" class="primary">Buat undangan <Plus size={18} /></a>
					</div>
				{/each}
			</section>
		{/if}

		<section class="process">
			<div class="wrap process-grid">
				{#each [['01', 'Mulai dari cerita kalian', 'Isi nama mempelai, kisah pertemuan, dan detail hari bahagia.'], ['02', 'Temukan suasananya', 'Pilih tema dan tambahkan foto. Lihat hasilnya sambil mengedit.'], ['03', 'Undang orang terdekat', 'Publikasikan undangan dan bagikan tautannya kepada para tamu.']] as step}
					<div>
						<span class="step-number">{step[0]}</span>
						<h3>{step[1]}</h3>
						<p>{step[2]}</p>
					</div>
				{/each}
			</div>
		</section>

		<section class="themes wrap" id="themes">
			<div class="section-heading">
				<div>
					<p class="eyebrow">PILIH SUASANA KALIAN</p>
					<h2>Beda cerita,<br /><em>beda karakter.</em></h2>
				</div>
				<p>Delapan pilihan tema.<br />Satu cerita yang hanya milik kalian.</p>
			</div>
			<div class="theme-grid">
				{#each THEME_LIST as theme, i}
					<article class="theme-tile">
						<ThemeHeaderPreview theme={theme.id} />
						<div class="theme-caption">
							<h3>{theme.name}</h3>
							<span>0{i + 1}</span>
						</div>
					</article>
				{/each}
			</div>
		</section>
	</main>
	<footer class="wrap">
		<a href="/" class="brand">wedvow<span>®</span></a>
		<p>Dibuat untuk merayakan kebersamaan.</p>
		<span>© {new Date().getFullYear()} WedVow</span>
	</footer>
</div>

<style>
	.home {
		background: #f7f5ef;
		color: #242820;
	}
	.wrap {
		max-width: 1240px;
		margin: auto;
		padding-left: 32px;
		padding-right: 32px;
	}
	.topbar {
		min-height: 92px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #242820;
		gap: 20px;
	}
	.brand {
		font-family: 'Syne', sans-serif;
		font-size: 32px;
		font-weight: 800;
		letter-spacing: -2px;
		text-decoration: none;
	}
	.brand span {
		font-size: 13px;
		vertical-align: top;
		margin-left: 3px;
	}
	nav {
		display: flex;
		align-items: center;
		gap: 28px;
		font-size: 13px;
		font-weight: 600;
	}
	.nav-login,
	.logout {
		display: flex;
		align-items: center;
		gap: 10px;
		border: 1px solid;
		padding: 11px 16px;
	}
	.logout {
		cursor: pointer;
	}
	.hero {
		display: grid;
		grid-template-columns: 1.25fr 1fr;
		gap: 70px;
		align-items: center;
		padding-top: 80px;
		padding-bottom: 88px;
	}
	.eyebrow {
		font-size: 10px;
		letter-spacing: 2px;
		font-weight: 700;
		margin-bottom: 24px;
	}
	h1 {
		font-family: 'Syne', sans-serif;
		font-size: clamp(44px, 5.4vw, 72px);
		letter-spacing: -3px;
		line-height: 1.08;
		font-weight: 700;
	}
	h1 em,
	h2 em {
		font-family: 'Playfair Display', Georgia, serif;
		font-weight: 400;
	}
	.intro {
		max-width: 420px;
		margin: 26px 0;
		font-size: 15px;
		line-height: 1.85;
		color: #64685e;
	}
	.primary {
		display: inline-flex;
		align-items: center;
		justify-content: space-between;
		gap: 26px;
		background: #dce881;
		border: 1px solid #242820;
		padding: 16px 23px;
		font-size: 13px;
		font-weight: 700;
		box-shadow: 3px 3px #242820;
	}
	.primary:hover {
		background: #cfdd6c;
	}
	.hero-note {
		font-size: 11px;
		margin-top: 24px;
		color: #73776b;
	}
	.login-notice {
		max-width: 415px;
		border-left: 2px solid #929d55;
		padding: 4px 0 4px 16px;
		font-size: 12px;
		line-height: 1.7;
	}
	.login-notice p {
		color: #64685e;
		margin-top: 5px;
	}
	.text-link {
		display: inline-flex;
		gap: 14px;
		align-items: center;
		margin-top: 20px;
		font-size: 13px;
		font-weight: 700;
	}
	.type-poster {
		background: #dce881;
		border: 1px solid #242820;
		padding: 28px;
		min-height: 460px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.poster-top,
	.poster-bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.poster-top {
		font-size: 9px;
		letter-spacing: 2px;
		border-bottom: 1px solid #242820;
		padding-bottom: 17px;
	}
	.poster-title {
		font-family: 'Playfair Display', Georgia, serif;
		font-size: clamp(64px, 8vw, 104px);
		line-height: 0.95;
		letter-spacing: -6px;
		padding: 30px 0;
	}
	.poster-title span {
		display: block;
		font-style: italic;
	}
	.poster-bottom {
		font-size: 12px;
		line-height: 1.6;
	}
	.poster-mark {
		font-family: Georgia, serif;
		font-size: 66px;
	}
	.workspace {
		padding-bottom: 70px;
		scroll-margin-top: 24px;
	}
	.section-heading {
		display: flex;
		justify-content: space-between;
		align-items: end;
		gap: 24px;
		margin-bottom: 36px;
	}
	.section-heading h2 {
		font-family: 'Syne', sans-serif;
		font-size: clamp(30px, 4vw, 46px);
		line-height: 1.15;
		letter-spacing: -1.5px;
	}
	.section-heading .eyebrow {
		margin-bottom: 15px;
	}
	.section-heading > p,
	.section-heading > span {
		font-size: 12px;
		color: #64685e;
		line-height: 1.8;
	}
	.invitation-row {
		display: flex;
		align-items: center;
		gap: 20px;
		padding: 22px 0;
		border-top: 1px solid #c9ccbf;
	}
	.invitation-row:hover {
		background: #efeee5;
	}
	.invitation-initial {
		width: 56px;
		height: 64px;
		background: #e7e9dd;
		display: grid;
		place-items: center;
		font-family: Georgia, serif;
		font-size: 30px;
	}
	.invitation-info {
		flex: 1;
		min-width: 0;
	}
	.invitation-info h3 {
		font-weight: 600;
	}
	.invitation-info p {
		font-size: 11px;
		color: #64685e;
		margin-top: 6px;
		overflow-wrap: anywhere;
	}
	.status {
		font-size: 10px;
		border: 1px solid #bcc1b2;
		padding: 5px 9px;
	}
	.online {
		background: #dce881;
	}
	.empty-workspace {
		border: 1px dashed #b7beaa;
		padding: 32px;
	}
	.empty-workspace h3 {
		font-size: 20px;
	}
	.empty-workspace p {
		font-size: 13px;
		color: #64685e;
		margin: 12px 0 24px;
	}
	.process {
		border-top: 1px solid #c9ccbf;
		border-bottom: 1px solid #c9ccbf;
	}
	.process-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 55px;
		padding-top: 40px;
		padding-bottom: 42px;
	}
	.step-number {
		font: 11px monospace;
		color: #707961;
	}
	.process h3 {
		font-size: 15px;
		font-weight: 700;
		margin: 14px 0 10px;
	}
	.process p {
		font-size: 12px;
		line-height: 1.85;
		color: #64685e;
	}
	.themes {
		padding-top: 80px;
		padding-bottom: 80px;
	}
	.theme-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 30px 22px;
	}
	.theme-caption {
		display: flex;
		justify-content: space-between;
		margin-top: 12px;
		font-size: 11px;
	}
	.theme-caption h3 {
		font-weight: 600;
	}
	.theme-caption > span {
		opacity: 0.5;
	}
	footer {
		border-top: 1px solid #242820;
		min-height: 110px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
	}
	footer p,
	footer > span {
		font-size: 11px;
		color: #64685e;
	}
	@media (max-width: 800px) {
		.hero {
			gap: 32px;
			padding-top: 50px;
			padding-bottom: 50px;
		}
		.type-poster {
			min-height: 360px;
			padding: 20px;
		}
		.theme-grid {
			grid-template-columns: repeat(2, 1fr);
		}
		.process-grid {
			gap: 24px;
		}
		.wrap {
			padding-left: 22px;
			padding-right: 22px;
		}
		h1 {
			letter-spacing: -2px;
		}
	}
	@media (max-width: 580px) {
		.topbar {
			min-height: 76px;
		}
		nav {
			gap: 14px;
			font-size: 11px;
		}
		.theme-link {
			display: none;
		}
		.hero {
			grid-template-columns: 1fr;
		}
		.hero-copy {
			padding-top: 10px;
		}
		.type-poster {
			min-height: 380px;
		}
		.poster-title {
			font-size: 90px;
		}
		.process-grid {
			grid-template-columns: 1fr;
			gap: 28px;
		}
		.process-grid > div {
			border-bottom: 1px solid #d8dacc;
			padding-bottom: 24px;
		}
		.process-grid > div:last-child {
			border: 0;
			padding: 0;
		}
		.section-heading {
			align-items: start;
			flex-direction: column;
		}
		.themes {
			padding-top: 50px;
		}
		.theme-grid {
			gap: 24px 14px;
		}
		footer {
			align-items: start;
			flex-direction: column;
			padding-top: 28px;
			padding-bottom: 28px;
			gap: 14px;
		}
		.invitation-row {
			gap: 12px;
		}
		.status {
			max-width: 90px;
		}
	}
</style>
