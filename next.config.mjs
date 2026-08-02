/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disable ESLint during production build to avoid ESLint peer conflicts
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Retain strict type checking
    ignoreBuildErrors: false,
  }
};

export default nextConfig;
