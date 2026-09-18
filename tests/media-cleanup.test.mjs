import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { ObjectId } from 'mongodb';

function loadModule(file, dependencies) {
	const source = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
		compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
	}).outputText;
	const exports = {};
	vm.runInNewContext(source, {
		exports,
		require: (name) => {
			assert.ok(name in dependencies, name);
			return dependencies[name];
		},
		console
	});
	return exports;
}
const id = 'aaaaaaaaaaaaaaaaaaaaaaaa';
const owner = 'bbbbbbbbbbbbbbbbbbbbbbbb';
const invitationId = 'cccccccccccccccccccccccc';
function fixture(overrides = {}, referenced = false, failure = false) {
	const calls = [];
	const doc = {
		_id: new ObjectId(id),
		userId: new ObjectId(owner),
		invitationId,
		type: 'image',
		cloudinary: {
			publicId: 'owned/photo',
			secureUrl: 'https://example.test/photo',
			resourceType: 'image'
		},
		...overrides
	};
	const api = loadModule('src/lib/server/media.ts', {
		mongodb: { ObjectId },
		'$lib/server/db': {
			getMediaCollection: async () => ({
				findOne: async () => doc,
				deleteOne: async () => calls.push('metadata')
			}),
			getInvitationsCollection: async () => ({
				findOne: async (filter) => {
					calls.push('reference-check');
					assert.equal(filter.$or.length, 8);
					return referenced ? {} : null;
				}
			})
		},
		'$lib/server/cloudinary': {
			deleteMediaByPublicId: async (publicId, resourceType) => {
				calls.push('cloud');
				assert.equal(publicId, 'owned/photo');
				assert.equal(resourceType, 'image');
				if (failure) throw new Error('offline');
			}
		}
	});
	return { api, calls };
}
test('deletes owned unused photo from Cloudinary before metadata', async () => {
	const { api, calls } = fixture();
	await api.deleteUnusedImage(id, owner, invitationId);
	assert.deepEqual(calls, ['reference-check', 'cloud', 'metadata']);
});
test('legacy uploads without invitation association can be cleaned by their owner', async () => {
	const { api, calls } = fixture({ invitationId: null });
	await api.deleteUnusedImage(id, owner, invitationId);
	assert.ok(calls.includes('metadata'));
});
for (const [label, overrides] of [
	['another owner', { userId: new ObjectId() }],
	['another invitation', { invitationId: new ObjectId().toString() }],
	['audio', { type: 'audio' }]
]) {
	test('does not delete ' + label, async () => {
		const { api, calls } = fixture(overrides);
		await api.deleteUnusedImage(id, owner, invitationId);
		assert.deepEqual(calls, []);
	});
}
test('keeps photos still used by an invitation', async () => {
	const { api, calls } = fixture({}, true);
	await api.deleteUnusedImage(id, owner, invitationId);
	assert.deepEqual(calls, ['reference-check']);
});
test('Cloudinary failure retains metadata for retry', async () => {
	const { api, calls } = fixture({}, false, true);
	await assert.rejects(api.deleteUnusedImage(id, owner, invitationId), /offline/);
	assert.deepEqual(calls, ['reference-check', 'cloud']);
});
test('invalid media IDs never reach storage', async () => {
	const { api, calls } = fixture();
	await api.deleteUnusedImage('../invalid', owner, invitationId);
	assert.deepEqual(calls, []);
});
test('collects and deduplicates IDs from cover, couple, gallery', () => {
	const { api } = fixture();
	const ids = api.imageIds({
		couple: { partner1: { photoMediaId: id }, partner2: { photoMediaId: null } },
		hero: { coverMediaId: id },
		gallery: [{ mediaId: invitationId }, { mediaId: 'dummy' }]
	});
	assert.deepEqual(Array.from(ids), [id, invitationId]);
});
for (const result of ['ok', 'not found', 'error']) {
	test('Cloudinary destroy result ' + result, async () => {
		let options;
		const api = loadModule('src/lib/server/cloudinary.ts', {
			cloudinary: {
				v2: {
					config: () => {},
					uploader: {
						destroy: async (_id, opts) => {
							options = opts;
							return { result };
						}
					}
				}
			},
			'$env/dynamic/private': {
				env: {
					CLOUDINARY_CLOUD_NAME: 'test',
					CLOUDINARY_API_KEY: 'test',
					CLOUDINARY_API_SECRET: 'test'
				}
			},
			'node:fs/promises': { default: {} },
			'node:path': { default: {} }
		});
		if (result === 'error')
			await assert.rejects(api.deleteMediaByPublicId('owned/photo'), /CLOUDINARY_DELETE_FAILED/);
		else await api.deleteMediaByPublicId('owned/photo');
		assert.equal(options.invalidate, true);
		assert.equal(options.resource_type, 'image');
	});
}

test('save persists new content before cleanup and retries failed cleanup after reload', async () => {
	const { api: mediaApi } = fixture();
	const oldContent = {
		couple: { partner1: { photoMediaId: id }, partner2: {} },
		hero: {},
		gallery: []
	};
	const nextContent = {
		couple: { partner1: { photoMediaId: null }, partner2: {} },
		hero: {},
		gallery: []
	};
	const doc = {
		_id: new ObjectId(invitationId),
		userId: new ObjectId(owner),
		slug: 'test',
		status: 'draft',
		theme: 'editorial',
		content: oldContent
	};
	let fail = true;
	let cleanups = 0;
	const collection = {
		findOne: async () => doc,
		updateOne: async (_filter, update) => {
			if (update.$set) Object.assign(doc, update.$set);
			if (update.$pull)
				doc.pendingMediaDeletionIds = doc.pendingMediaDeletionIds.filter(
					(id) => id !== update.$pull.pendingMediaDeletionIds
				);
		}
	};
	const api = loadModule('src/lib/server/invitations.ts', {
		mongodb: { ObjectId },
		'$lib/server/db': { getInvitationsCollection: async () => collection },
		'$lib/server/cloudinary': { deleteMediaByPublicId: async () => {} },
		'$lib/server/media': {
			imageIds: mediaApi.imageIds,
			deleteUnusedImage: async () => {
				assert.equal(doc.content.couple.partner1.photoMediaId, null);
				cleanups++;
				if (fail) throw new Error('network failure');
			}
		}
	});
	await assert.rejects(
		api.updateInvitation(invitationId, owner, { content: nextContent }),
		/MEDIA_CLEANUP_FAILED/
	);
	assert.deepEqual(Array.from(doc.pendingMediaDeletionIds), [id]);
	fail = false;
	await api.updateInvitation(invitationId, owner, { content: nextContent });
	assert.equal(doc.pendingMediaDeletionIds.length, 0);
	assert.equal(cleanups, 2);
});
