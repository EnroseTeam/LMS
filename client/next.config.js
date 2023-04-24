/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "team-enrose-s3-bucket.s3.ap-northeast-1.amazonaws.com",
        pathname: "/images/**",
      },
    ],
  },
};

module.exports = nextConfig;
