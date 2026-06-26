import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  allowedDevOrigins: ['*.trycloudflare.com'],
  turbopack: {
    root: import.meta.dirname,
  },
};

export default withMDX(config);
