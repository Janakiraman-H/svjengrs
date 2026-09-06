const nextConfig = {
  // Existing images are local assets. Serve them directly on Workers without
  // requiring a separately billed Cloudflare Images binding.
  images: {unoptimized: true},
  poweredByHeader: false,
  async redirects() {
    return [{source: '/:path*', has: [{type: 'host', value: 'www.svjengrs.com'}], destination: 'https://svjengrs.com/:path*', permanent: true}];
  },
  async headers() {
    return [{source: '/:path*', headers: [
      {key: 'X-Content-Type-Options', value: 'nosniff'},
      {key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin'},
      {key: 'X-Frame-Options', value: 'SAMEORIGIN'},
      {key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()'},
    ]}];
  },
};
export default nextConfig;
