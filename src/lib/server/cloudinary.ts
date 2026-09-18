import { v2 as cloudinary } from 'cloudinary';
import { env } from '$env/dynamic/private';
import fs from 'node:fs/promises';
import path from 'node:path';

const isConfigured = Boolean(
	env.CLOUDINARY_CLOUD_NAME && env.CLOUDINARY_API_KEY && env.CLOUDINARY_API_SECRET
);

if (isConfigured) {
	cloudinary.config({
		cloud_name: env.CLOUDINARY_CLOUD_NAME,
		api_key: env.CLOUDINARY_API_KEY,
		api_secret: env.CLOUDINARY_API_SECRET,
		secure: true
	});
}

export interface UploadResult {
	publicId: string;
	secureUrl: string;
	resourceType: string;
	width?: number;
	height?: number;
	bytes: number;
}

export async function uploadMediaBuffer(
	buffer: Buffer,
	options: {
		folder?: string;
		resourceType?: 'image' | 'video' | 'raw' | 'auto';
		filename?: string;
		mimeType?: string;
	} = {}
): Promise<UploadResult> {
	if (isConfigured) {
		return new Promise((resolve, reject) => {
			const stream = cloudinary.uploader.upload_stream(
				{
					folder: options.folder || 'invitation',
					resource_type: options.resourceType || 'auto'
				},
				(error, result) => {
					if (error || !result) {
						return reject(error || new Error('Cloudinary upload returned empty result'));
					}
					resolve({
						publicId: result.public_id,
						secureUrl: result.secure_url,
						resourceType: result.resource_type,
						width: result.width,
						height: result.height,
						bytes: result.bytes
					});
				}
			);
			stream.end(buffer);
		});
	}

	// Fallback when Cloudinary is not yet configured: store locally in static/uploads
	const uploadsDir = path.resolve('static', 'uploads');
	await fs.mkdir(uploadsDir, { recursive: true });

	const ext = options.filename ? path.extname(options.filename) : '.jpg';
	const safeId = `local_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
	const filename = `${safeId}${ext}`;
	const filePath = path.join(uploadsDir, filename);

	await fs.writeFile(filePath, buffer);

	return {
		publicId: `uploads/${safeId}`,
		secureUrl: `/uploads/${filename}`,
		resourceType: options.resourceType === 'raw' ? 'raw' : 'image',
		width: 1200,
		height: 800,
		bytes: buffer.length
	};
}

export async function deleteMediaByPublicId(
	publicId: string,
	resourceType = 'image'
): Promise<void> {
	if (publicId.startsWith('uploads/local_')) {
		const uploadsDir = path.resolve('static', 'uploads');
		const target = publicId.slice('uploads/'.length);
		if (!/^local_[a-zA-Z0-9_]+$/.test(target)) throw new Error('INVALID_LOCAL_MEDIA');
		let files: string[];
		try {
			files = await fs.readdir(uploadsDir);
		} catch (err) {
			if ((err as NodeJS.ErrnoException).code === 'ENOENT') return;
			throw err;
		}
		for (const file of files) {
			if (path.parse(file).name === target) await fs.unlink(path.join(uploadsDir, file));
		}
		return;
	}
	if (!isConfigured) throw new Error('CLOUDINARY_NOT_CONFIGURED');
	const result = await cloudinary.uploader.destroy(publicId, {
		resource_type: resourceType === 'audio' ? 'video' : resourceType,
		invalidate: true
	});
	if (result.result !== 'ok' && result.result !== 'not found')
		throw new Error('CLOUDINARY_DELETE_FAILED');
}

export function getOptimizedImageUrl(
	url: string,
	options: { width?: number; height?: number; quality?: string | number } = {}
): string {
	if (!url) return '';
	if (!url.includes('cloudinary.com')) {
		return url;
	}

	const parts = url.split('/upload/');
	if (parts.length !== 2) return url;

	const transformations: string[] = ['f_auto', 'q_auto'];
	if (options.width) transformations.push(`w_${options.width}`);
	if (options.height) transformations.push(`h_${options.height}`, 'c_limit');
	if (options.quality) transformations.push(`q_${options.quality}`);

	return `${parts[0]}/upload/${transformations.join(',')}/${parts[1]}`;
}
