/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // For Google profile images
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // For Cloudinary images
        pathname: "**",
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
