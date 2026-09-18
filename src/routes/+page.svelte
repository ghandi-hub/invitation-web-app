<script lang="ts">
	import { themeConfigs } from '$lib/themes/registry';
	import {
		Sparkles,
		Heart,
		Moon,
		PartyPopper,
		CheckCircle2,
		ArrowRight,
		Layers,
		Smartphone,
		Music,
		Gift,
		ShieldCheck
	} from 'lucide-svelte';

	const sampleInvitations = [
		{
			title: 'Tasyakuran Walimatul Khitan Faiz',
			category: 'Khitanan / Aqiqah',
			slug: 'khitanan-faiz-2026',
			theme: 'Islamic Emerald',
			color: 'from-emerald-900 to-teal-950',
			border: 'border-emerald-500/30',
			accent: 'text-amber-400',
			icon: Moon,
			previewText: 'Desain elegan khas Islami dengan ornamen kubah, lentera, doa khitan, dan nuansa zamrud-emas.'
		},
		{
			title: 'The Wedding of Romeo & Juliet',
			category: 'Pernikahan (Wedding)',
			slug: 'wedding-romeo-juliet',
			theme: 'Floral Blush',
			color: 'from-rose-950 to-stone-900',
			border: 'border-rose-400/30',
			accent: 'text-rose-300',
			icon: Heart,
			previewText: 'Nuansa romantis dusty rose, profil kedua mempelai, countdown waktu akad & resepsi, serta love story.'
		},
		{
			title: "Alex's 21st Cyber Birthday Bash",
			category: 'Ulang Tahun & Gathering',
			slug: 'cyber-party-alex',
			theme: 'Cyber Party',
			color: 'from-slate-950 to-purple-950',
			border: 'border-cyan-400/30',
			accent: 'text-cyan-400',
			icon: PartyPopper,
			previewText: 'Aesthetic modern neon & dark vibe dengan rundown pesta, countdown, dan musik upbeat.'
		}
	];
</script>

<svelte:head>
	<title>Multi-Event Invitation SaaS - Undangan Digital Modern & Elegan</title>
	<meta
		name="description"
		content="Platform undangan digital modern multi-event untuk pernikahan, khitanan, ulang tahun, dan aqiqah dengan animasi 60 FPS dan paralaks halus."
	/>
</svelte:head>

<div class="min-h-screen bg-stone-950 text-stone-100 selection:bg-amber-400 selection:text-stone-950">
	<!-- Top Navigation -->
	<header class="border-b border-white/10 backdrop-blur-md sticky top-0 z-40 bg-stone-950/80">
		<div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
			<div class="flex items-center gap-2">
				<div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-rose-500 flex items-center justify-center text-stone-950 font-black shadow-lg">
					<Sparkles class="w-5 h-5" />
				</div>
				<span class="text-lg font-bold tracking-tight text-white">
					Invite<span class="text-amber-400">Sphere</span>
				</span>
			</div>

			<div class="flex items-center gap-3">
				<a
					href="#demo-section"
					class="text-xs font-semibold px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition text-stone-200"
				>
					Lihat Demo Tema
				</a>
			</div>
		</div>
	</header>

	<!-- Hero Section -->
	<section class="relative pt-20 pb-24 px-4 overflow-hidden text-center">
		<div class="pointer-events-none absolute inset-0">
			<div class="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-amber-500/10 blur-[140px]"></div>
		</div>

		<div class="relative z-10 max-w-3xl mx-auto space-y-6">
			<div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-wider uppercase">
				<Sparkles class="w-3.5 h-3.5" />
				<span>Platform Undangan Digital Multi-Acara</span>
			</div>

			<h1 class="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
				Momen Istimewa, <br />
				<span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-300 to-emerald-300">
					Disampaikan Lebih Berkesan.
				</span>
			</h1>

			<p class="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed">
				Buat undangan web responsif untuk Pernikahan, Khitanan, Ulang Tahun, dan Aqiqah dengan animasi ornamen halus 60 FPS, paralaks GPU, buku tamu interaktif, dan amplop digital.
			</p>

			<div class="pt-4 flex flex-wrap items-center justify-center gap-4">
				<a
					href="#demo-section"
					class="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm text-stone-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-500/20 transition-all hover:scale-105"
				>
					<span>Jelajahi Contoh Undangan</span>
					<ArrowRight class="w-4 h-4" />
				</a>
			</div>
		</div>
	</section>

	<!-- Feature Highlights -->
	<section class="py-16 px-4 border-y border-white/5 bg-stone-900/30">
		<div class="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
			<div class="p-6 rounded-2xl bg-stone-900/60 border border-white/10 backdrop-blur-sm">
				<div class="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center mb-4">
					<Layers class="w-5 h-5" />
				</div>
				<h3 class="font-bold text-white text-base mb-1">Paralaks 60 FPS</h3>
				<p class="text-xs text-stone-400 leading-relaxed">
					Didukung custom action Svelte GPU compositor dengan perlindungan <span class="font-mono text-stone-300">translate3d</span> bebas lag di HP.
				</p>
			</div>

			<div class="p-6 rounded-2xl bg-stone-900/60 border border-white/10 backdrop-blur-sm">
				<div class="w-10 h-10 rounded-xl bg-rose-400/10 text-rose-400 flex items-center justify-center mb-4">
					<Smartphone class="w-5 h-5" />
				</div>
				<h3 class="font-bold text-white text-base mb-1">Optimasi Mobile WebView</h3>
				<p class="text-xs text-stone-400 leading-relaxed">
					Ukuran first viewport super ringan di bawah 450 KB, mulus dibuka dari link WhatsApp & Instagram.
				</p>
			</div>

			<div class="p-6 rounded-2xl bg-stone-900/60 border border-white/10 backdrop-blur-sm">
				<div class="w-10 h-10 rounded-xl bg-cyan-400/10 text-cyan-400 flex items-center justify-center mb-4">
					<Music class="w-5 h-5" />
				</div>
				<h3 class="font-bold text-white text-base mb-1">Gerbang Buka Undangan</h3>
				<p class="text-xs text-stone-400 leading-relaxed">
					Overlay amplop interaktif yang memutar musik latar secara resmi sesuai aturan keamanan browser seluler.
				</p>
			</div>

			<div class="p-6 rounded-2xl bg-stone-900/60 border border-white/10 backdrop-blur-sm">
				<div class="w-10 h-10 rounded-xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-4">
					<Gift class="w-5 h-5" />
				</div>
				<h3 class="font-bold text-white text-base mb-1">RSVP &amp; Amplop Digital</h3>
				<p class="text-xs text-stone-400 leading-relaxed">
					Konfirmasi kehadiran instan, buku tamu dengan optimistic update, serta copy-to-clipboard rekening bank.
				</p>
			</div>
		</div>
	</section>

	<!-- Live Demos Section -->
	<section id="demo-section" class="py-20 px-4 max-w-6xl mx-auto">
		<div class="text-center mb-14">
			<span class="text-xs font-semibold text-amber-400 uppercase tracking-widest">Katalog Live Demo</span>
			<h2 class="text-3xl sm:text-4xl font-serif font-bold text-white mt-1">Pilihan Tema Sesuai Kebutuhan Acara</h2>
			<p class="text-sm text-stone-400 max-w-md mx-auto mt-2">
				Klik salah satu contoh undangan di bawah ini untuk melihat pratinjau live dengan animasi penuh:
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			{#each sampleInvitations as demo}
				<div class="rounded-3xl bg-gradient-to-b {demo.color} border {demo.border} p-6 flex flex-col justify-between shadow-2xl backdrop-blur-md relative overflow-hidden group">
					<div>
						<div class="flex items-center justify-between mb-4">
							<span class="text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-stone-300">
								{demo.category}
							</span>
							<demo.icon class="w-5 h-5 {demo.accent}" />
						</div>

						<h3 class="text-xl font-bold text-white mb-1 group-hover:text-amber-300 transition">
							{demo.title}
						</h3>
						<p class="text-xs font-mono {demo.accent} mb-4">Tema: {demo.theme}</p>

						<p class="text-xs text-stone-300 leading-relaxed mb-6">
							{demo.previewText}
						</p>
					</div>

					<div class="space-y-2 pt-4 border-t border-white/10">
						<a
							href="/{demo.slug}?to=Budi+Santoso"
							class="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 transition shadow-lg shadow-amber-400/20 cursor-pointer"
						>
							<span>Buka Undangan (Atas Nama: Budi Santoso)</span>
							<ArrowRight class="w-3.5 h-3.5" />
						</a>

						<a
							href="/{demo.slug}"
							class="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-medium text-stone-400 hover:text-white hover:bg-white/5 transition"
						>
							<span>Buka Tanpa Nama Penerima (Umum)</span>
						</a>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- Footer -->
	<footer class="border-t border-white/10 py-10 px-4 text-center text-xs text-stone-500">
		<p>© 2026 InviteSphere SaaS Platform. Built with SvelteKit, Tailwind CSS, &amp; MongoDB.</p>
	</footer>
</div>
