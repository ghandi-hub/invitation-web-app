import type { InvitationTheme } from '$lib/types/invitation';
export * from '$lib/types/invitation';

export interface ThemeConfig {
	id: InvitationTheme;
	name: string;
	description: string;
	fontFamilyDisplay: string;
	fontFamilyBody: string;
	aesthetic: string;
	supportsParallax: boolean;
	primaryColor: string;
	bgColor: string;
}
