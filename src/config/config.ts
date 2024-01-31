export const config = {
  neynar: {
    apiKey: process.env.NEYNAR_API_KEY,
  },
  contractAddress: process.env.NEXT_PUBLIC_SMART_CONTRACT,
  warpcast: {
    castHas: process.env.NEXT_PUBLIC_WARPCAST_CAST_HASH,
  },
  hostUrl: process.env.NEXT_PUBLIC_VERCEL_URL,
  thirdweb: {
    chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
    engine: {
      url: process.env.THIRDWEB_ENGINE_URL,
      wallet: process.env.THIRDWEB_ENGINE_WALLET,
      accessToken: process.env.THIRDWEB_ACCESS_TOKEN,
    },
  },
};
