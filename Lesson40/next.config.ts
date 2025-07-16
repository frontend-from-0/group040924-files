import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://dlj3vxjomvzaysyt.public.blob.vercel-storage.com/**'),
    ],
  },
};

export default nextConfig;
