<script lang="ts">
	import ThemeHeader from '$lib/invitation/ThemeHeader.svelte';
	import type { Invitation, GuestbookItem } from '$lib/types/invitation';
	import Countdown from '$lib/invitation/components/Countdown.svelte';
	import RSVPSection from '$lib/invitation/components/RSVPSection.svelte';
	import GuestbookSection from '$lib/invitation/components/GuestbookSection.svelte';
	import GiftSection from '$lib/invitation/components/GiftSection.svelte';
	import { Calendar, Clock, MapPin, ExternalLink, Film } from '@lucide/svelte';

	let {
		invitation,
		initialGuestbook = []
	}: {
		invitation: Invitation;
		initialGuestbook?: GuestbookItem[];
	} = $props();

	const { content } = $derived(invitation);
</script>

<article
	class="font-sans-clean min-h-screen bg-[#0d0d11] leading-relaxed text-[#e8e6e3] selection:bg-[#d4af37] selection:text-black"
>
	<!-- Cinematic Full-Bleed Hero -->
	<ThemeHeader theme="cinematic" {content} />

	<!-- Opening Quote -->
	{#if content.opening?.quote}
		<section class="mx-auto max-w-3xl px-6 py-16 text-center sm:py-24">
			<div
				class="mx-auto mb-10 h-px w-16 bg-linear-to-r from-transparent via-[#d4af37] to-transparent"
			></div>
			<blockquote class="font-cinzel text-base leading-relaxed text-white/90 italic sm:text-xl">
				"{content.opening.quote}"
			</blockquote>
			{#if content.opening.quoteSource}
				<cite
					class="mt-6 block font-mono text-xs tracking-[0.25em] text-[#d4af37] uppercase not-italic"
				>
					— {content.opening.quoteSource}
				</cite>
			{/if}
			<div
				class="mx-auto mt-10 h-px w-16 bg-linear-to-r from-transparent via-[#d4af37] to-transparent"
			></div>
		</section>
	{/if}

	<!-- Couple Stars -->
	<section class="mx-auto max-w-5xl px-6 py-16 sm:py-24">
		<div class="mb-16 text-center">
			<span class="mb-2 block text-[11px] font-semibold tracking-[0.4em] text-[#d4af37] uppercase">
				Starring In This Chapter
			</span>
			<h2 class="font-cinzel text-3xl text-white sm:text-5xl">Mempelai</h2>
		</div>

		<div class="grid grid-cols-1 items-center gap-12 sm:gap-16 md:grid-cols-2">
			<!-- Groom -->
			<div class="group space-y-5 text-center">
				{#if content.couple.partner1.photoUrl}
					<div
						class="relative mx-auto h-72 w-52 overflow-hidden border border-[#d4af37]/30 bg-neutral-900 shadow-2xl shadow-black/80 sm:h-88 sm:w-64"
					>
						<img
							src={content.couple.partner1.photoUrl}
							alt={content.couple.partner1.name}
							class="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
							loading="lazy"
						/>
					</div>
				{/if}
				<div>
					<h3 class="font-cinzel text-2xl text-white sm:text-3xl">
						{content.couple.partner1.fullName || content.couple.partner1.name}
					</h3>
					{#if content.couple.partner1.childOf}
						<p class="mx-auto mt-2 max-w-xs text-xs text-white/60 sm:text-sm">
							{content.couple.partner1.childOf}
						</p>
					{/if}
				</div>
			</div>

			<!-- Bride -->
			<div class="group space-y-5 text-center">
				{#if content.couple.partner2.photoUrl}
					<div
						class="relative mx-auto h-72 w-52 overflow-hidden border border-[#d4af37]/30 bg-neutral-900 shadow-2xl shadow-black/80 sm:h-88 sm:w-64"
					>
						<img
							src={content.couple.partner2.photoUrl}
							alt={content.couple.partner2.name}
							class="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
							loading="lazy"
						/>
					</div>
				{/if}
				<div>
					<h3 class="font-cinzel text-2xl text-white sm:text-3xl">
						{content.couple.partner2.fullName || content.couple.partner2.name}
					</h3>
					{#if content.couple.partner2.childOf}
						<p class="mx-auto mt-2 max-w-xs text-xs text-white/60 sm:text-sm">
							{content.couple.partner2.childOf}
						</p>
					{/if}
				</div>
			</div>
		</div>
	</section>

	<!-- Synopsis / Story -->
	{#if content.story?.body}
		<section class="border-y border-[#d4af37]/20 bg-[#14141a] px-6 py-16 sm:py-24">
			<div class="mx-auto max-w-3xl space-y-6 text-center">
				<span class="block text-[11px] font-semibold tracking-[0.35em] text-[#d4af37] uppercase">
					The Synopsis
				</span>
				<h2 class="font-cinzel text-3xl text-white sm:text-4xl">
					{content.story.title || 'Our Journey'}
				</h2>
				<p
					class="text-sm leading-relaxed font-light whitespace-pre-wrap text-white/70 sm:text-base"
				>
					{content.story.body}
				</p>
			</div>
		</section>
	{/if}

	<!-- Events / Premiere -->
	{#if content.events && content.events.length > 0}
		<section class="mx-auto max-w-5xl px-6 py-16 sm:py-24">
			<div class="mb-16 text-center">
				<span
					class="mb-2 block text-[11px] font-semibold tracking-[0.4em] text-[#d4af37] uppercase"
				>
					Schedule of Premiere
				</span>
				<h2 class="font-cinzel text-3xl text-white sm:text-5xl">Rangkaian Acara</h2>
			</div>

			<div class="grid grid-cols-1 gap-8 sm:gap-12 md:grid-cols-2">
				{#each content.events as event}
					<div
						class="space-y-4 border border-[#d4af37]/30 bg-[#14141a] p-8 text-center shadow-xl sm:p-10"
					>
						<h3 class="font-cinzel text-2xl text-white">
							{event.title}
						</h3>
						<div class="mx-auto h-px w-12 bg-[#d4af37]"></div>

						<div class="space-y-2 text-xs text-white/80 sm:text-sm">
							<div class="flex items-center justify-center gap-2">
								<Calendar class="h-4 w-4 text-[#d4af37]" />
								<span>{event.date}</span>
							</div>
							<div class="flex items-center justify-center gap-2">
								<Clock class="h-4 w-4 text-[#d4af37]" />
								<span>{event.startTime} - {event.endTime} WIB</span>
							</div>
							<div class="flex items-start justify-center gap-2 pt-2">
								<MapPin class="mt-0.5 h-4 w-4 shrink-0 text-[#d4af37]" />
								<div>
									<p class="font-semibold text-white">{event.venue}</p>
									<p class="mt-0.5 text-[11px] text-white/60 sm:text-xs">{event.address}</p>
								</div>
							</div>
						</div>

						{#if event.mapsUrl}
							<div class="pt-4">
								<a
									href={event.mapsUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center gap-2 border border-[#d4af37] px-6 py-2.5 text-xs font-semibold tracking-widest text-[#d4af37] uppercase transition-all hover:bg-[#d4af37] hover:text-black"
								>
									<span>View Location</span>
									<ExternalLink class="h-3.5 w-3.5" />
								</a>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</section>
	{/if}

	<!-- Countdown -->
	{#if content.countdown?.targetDate}
		<section
			class="border-y border-white/10 bg-radial from-[#1e1e28] to-[#0d0d11] px-6 py-16 text-center"
		>
			<div class="mx-auto max-w-2xl space-y-6">
				<span class="block text-[11px] font-semibold tracking-[0.4em] text-[#d4af37] uppercase">
					Counting Down To The Premiere
				</span>
				<div class="text-white">
					<Countdown targetDate={content.countdown.targetDate} variant="cinematic" />
				</div>
			</div>
		</section>
	{/if}

	<!-- Gallery Scenes -->
	{#if content.gallery && content.gallery.length > 0}
		<section class="mx-auto max-w-6xl px-6 py-16 sm:py-24">
			<div class="mb-16 text-center">
				<span
					class="mb-2 block text-[11px] font-semibold tracking-[0.4em] text-[#d4af37] uppercase"
				>
					Scenes From The Journey
				</span>
				<h2 class="font-cinzel text-3xl text-white sm:text-5xl">Galeri Foto</h2>
			</div>

			<div class="grid grid-cols-2 gap-4 md:grid-cols-4">
				{#each content.gallery as item}
					<div
						class="group relative aspect-3/4 overflow-hidden border border-white/10 bg-neutral-900"
					>
						<img
							src={item.url}
							alt={item.caption || 'Scene photo'}
							class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
							loading="lazy"
						/>
						{#if item.caption}
							<div
								class="absolute inset-0 flex items-end bg-linear-to-t from-black via-black/40 to-transparent p-4 font-mono text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
							>
								<p>{item.caption}</p>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</section>
	{/if}

	<!-- Interactive Section (Dark theme styled) -->
	<section class="border-t border-white/10 bg-[#121217] px-6 py-16 sm:py-24">
		<div class="mx-auto max-w-3xl space-y-16">
			{#if content.rsvp?.enabled}
				<div>
					<div class="mb-10 text-center">
						<span
							class="mb-2 block text-[11px] font-semibold tracking-[0.4em] text-[#d4af37] uppercase"
						>
							RSVP
						</span>
						<h2 class="font-cinzel text-3xl text-white sm:text-4xl">Konfirmasi Kehadiran</h2>
					</div>
					<div
						class="[&_button[type=submit]]:bg-[#d4af37] [&_button[type=submit]]:text-black [&_input]:border-white/20 [&_input]:bg-white/5 [&_input]:text-white [&_select]:border-white/20 [&_select]:bg-[#1a1a22] [&_select]:text-white [&_textarea]:border-white/20 [&_textarea]:bg-white/5 [&_textarea]:text-white"
					>
						<RSVPSection invitationId={invitation.id} settings={content.rsvp} theme="cinematic" />
					</div>
				</div>
			{/if}

			{#if content.gift?.enabled}
				<div class="border-t border-white/10 pt-8">
					<div class="mb-10 text-center">
						<span
							class="mb-2 block text-[11px] font-semibold tracking-[0.4em] text-[#d4af37] uppercase"
						>
							Wedding Gift
						</span>
						<h2 class="font-cinzel text-3xl text-white sm:text-4xl">Kirim Hadiah</h2>
					</div>
					<div
						class="[&_button]:border-[#d4af37] [&_button]:text-[#d4af37] [&_div]:border-white/10 [&_div]:bg-white/5 [&_div]:text-white"
					>
						<GiftSection gift={content.gift} theme="cinematic" />
					</div>
				</div>
			{/if}

			{#if content.guestbook?.enabled}
				<div class="border-t border-white/10 pt-8">
					<div class="mb-10 text-center">
						<span
							class="mb-2 block text-[11px] font-semibold tracking-[0.4em] text-[#d4af37] uppercase"
						>
							Wishes
						</span>
						<h2 class="font-cinzel text-3xl text-white sm:text-4xl">Doa & Ucapan</h2>
					</div>
					<div
						class="[&_.guestbook-entry]:bg-white/5 [&_.guestbook-entry]:text-white [&_button[type=submit]]:bg-[#d4af37] [&_button[type=submit]]:text-black [&_form]:border-white/10 [&_form]:bg-white/5 [&_form]:text-white [&_input]:bg-white/10 [&_input]:text-white [&_textarea]:bg-white/10 [&_textarea]:text-white"
					>
						<GuestbookSection
							invitationId={invitation.id}
							settings={content.guestbook}
							initialEntries={initialGuestbook}
							theme="cinematic"
						/>
					</div>
				</div>
			{/if}
		</div>
	</section>

	<footer class="border-t border-white/10 px-6 py-12 text-center text-xs text-white/50">
		<p class="font-cinzel mb-2 text-lg text-white">
			{content.couple.partner1.name} & {content.couple.partner2.name}
		</p>
		<p>Thank you for celebrating with us</p>
	</footer>
</article>
