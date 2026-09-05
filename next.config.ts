import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // two root layouts (en, sr): the 404 has to be a whole document of its own
    globalNotFound: true,
  },
};

export default nextConfig;
