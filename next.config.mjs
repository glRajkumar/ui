import { createMDX } from 'fumadocs-mdx/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: [
    'ts-morph',
    'typescript',
    'shiki',
  ],
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
