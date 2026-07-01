import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  allowedDevOrigins: ['trycloudflare.com'],
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
};

export default withMDX(config);
