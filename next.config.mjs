import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  allowedDevOrigins: ['*.trycloudflare.com'],
  turbopack: {
    root: import.meta.dirname,
  },
  async headers() {
    return [
      {
        source: '/(.*)\\.pdf',
        headers: [{ key: 'Content-Disposition', value: 'attachment' }],
      },
    ];
  },
  // v4 has no content yet — fall back to v5 (latest) until it ships.
  async redirects() {
    return [
      {
        source: '/docs/v4',
        destination: '/docs/v5',
        permanent: false,
      },
      {
        source: '/docs/v4/:path*',
        destination: '/docs/v5',
        permanent: false,
      },
    ];
  },
};

export default withMDX(config);
