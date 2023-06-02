/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.PINATA_GATEWAY_HOSTNAME,
        port: "",
        pathname: process.env.PINATA_GATEWAY_FOLDER,
      },
    ],
  },
};

module.exports = nextConfig;
