import type { CorsOptions } from 'cors';
import dotEnvConfig from './dotenvConfig';

dotEnvConfig();
const PRODUCTION_URL1 = 'https://admin.kmutt-3k-2024.com';
const PRODUCTION_URL2 = 'https://kmutt-3k-2024.com';
const corsOptions: CorsOptions = {
	origin: (origin, callback) => {
		const allowedOrigin =
			origin === PRODUCTION_URL1 || origin === PRODUCTION_URL2;

		const isExcludedUrl =
			origin === 'http://localhost:4000' ||
			origin === 'http://localhost:3000';

		if (allowedOrigin || isExcludedUrl) {
			callback(null, true);
		} else {
			callback(new Error(`Not allowed by CORS at ${origin}`));
		}
	},
	credentials: true,
};

export default function corsConfig() {
	return corsOptions;
}
