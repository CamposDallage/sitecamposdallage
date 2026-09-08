module.exports = {
  images: { remotePatterns: [{ protocol: 'https', hostname: '**.cloudinary.com' }], formats: ['image/avif', 'image/webp'] },
  experimental: { serverActions: { bodySizeLimit: '10mb' } }
};