import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/appointment',
        destination: 'https://www.fresha.com/book-now/klinik-ka-aesthetic-clinic-fivxhb80/all-offer?share=true&pId=2723491',
        permanent: false, // 暂时设为 false，确定没问题后再改为 true
      },
    ]
  },
};

export default nextConfig;
