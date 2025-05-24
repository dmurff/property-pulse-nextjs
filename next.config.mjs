/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledJsx: true,
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
