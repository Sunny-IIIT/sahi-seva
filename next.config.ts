const nextConfig = {
  // Vercel ko bol rahe hain ki ESLint errors ignore kare
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Vercel ko bol rahe hain ki TypeScript errors ignore kare
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;