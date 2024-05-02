/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "scontent.cdninstagram.com",
        port: "",
      },
    ],
  },
  optimizeFonts: true,
};

export default nextConfig;
