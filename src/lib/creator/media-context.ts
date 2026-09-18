export const MEDIA_EDITOR = Symbol('media-editor');

export interface MediaEditorContext {
	invitationId: string;
	queueRemoval: (id?: string | null) => void;
	setUploading: (active: boolean) => void;
}
