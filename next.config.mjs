/** @type {import('next').NextConfig} */

const getHostname = () => {
  const baseUrl = process.env.PHONES_API_BASE_URL;
  if (!baseUrl) {
    throw new Error('PHONES_API_BASE_URL is not defined in .env.local');
  }
  try {
    return new URL(baseUrl).hostname;
  } catch {
    throw new Error(`Invalid PHONES_API_BASE_URL: ${baseUrl}`);
  }
};

const hostname = getHostname();

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: hostname,
      },
      {
        protocol: 'https',
        hostname: hostname,
      },
    ],
  },
};

export default nextConfig;
