import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "health-e.in",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "zxkkfqxwop.ufs.sh",
        pathname: "/f/**",
      },
    ],
  },
};

export default nextConfig;
