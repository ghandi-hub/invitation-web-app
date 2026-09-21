interface RateLimitConfig {
	windowMs: number;
	maxRequests: number;
}

interface RateLimitResult {
	allowed: boolean;
	remaining: number;
	resetInSeconds: number;
}

interface RateLimitRecord {
	timestamps: number[];
}

const stores = new Map<string, Map<string, RateLimitRecord>>();

const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup(store: Map<string, RateLimitRecord>, windowMs: number, now: number) {
	for (const [key, record] of store.entries()) {
		record.timestamps = record.timestamps.filter((ts) => now - ts < windowMs);
		if (record.timestamps.length === 0) {
			store.delete(key);
		}
	}
}

export function checkRateLimit(
	scope: string,
	key: string,
	config: RateLimitConfig
): RateLimitResult {
	const now = Date.now();
	let store = stores.get(scope);
	if (!store) {
		store = new Map<string, RateLimitRecord>();
		stores.set(scope, store);
	}

	if (now - lastCleanup > CLEANUP_INTERVAL_MS) {
		lastCleanup = now;
		for (const [, st] of stores.entries()) {
			cleanup(st, config.windowMs, now);
		}
	}

	let record = store.get(key);
	if (!record) {
		record = { timestamps: [] };
		store.set(key, record);
	}

	record.timestamps = record.timestamps.filter((ts) => now - ts < config.windowMs);

	if (record.timestamps.length >= config.maxRequests) {
		const oldest = record.timestamps[0];
		const resetInSeconds = Math.max(1, Math.ceil((oldest + config.windowMs - now) / 1000));
		return {
			allowed: false,
			remaining: 0,
			resetInSeconds
		};
	}

	record.timestamps.push(now);

	return {
		allowed: true,
		remaining: config.maxRequests - record.timestamps.length,
		resetInSeconds: Math.ceil(config.windowMs / 1000)
	};
}
