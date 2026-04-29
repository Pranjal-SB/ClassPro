import type { NextConfig } from "next";
import { withSerwist } from "@serwist/turbopack";

const nextConfig: NextConfig = {
	poweredByHeader: false,
	compress: true,
	images: {
		formats: ['image/webp', 'image/avif'],
		minimumCacheTTL: 7200,
	},
	output: 'standalone',
	outputFileTracingRoot: __dirname,
	turbopack: {
		root: __dirname,
	},
	experimental: {
		nextScriptWorkers: true,
		viewTransition: true,
		staticGenerationMaxConcurrency: 8,
	},
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=3600, stale-while-revalidate=86400',
					},
				],
			},
			{
				source: '/api/(.*)',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=300, stale-while-revalidate=600',
					},
				],
			},
		];
	},
};

export default withSerwist(nextConfig);
