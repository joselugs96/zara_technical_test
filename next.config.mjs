const getHostname = () => {
  const baseUrl = process.env.PHONES_API_BASE_URL;

  if (!baseUrl) {
    return 'example.com';
  }

  try {
    return new URL(baseUrl).hostname;
  } catch {
    return 'example.com';
  }
};

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: getHostname() },
      { protocol: 'http', hostname: getHostname() },
    ],
  },
};

export default nextConfig;
