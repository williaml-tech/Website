import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/appointment',
        destination: 'https://www.fresha.com/book-now/klinik-ka-aesthetic-clinic-fivxhb80/all-offer?share=true&pId=2723491',
        permanent: false, // 临时重定向设为 false (307)，永久重定向设为 true (308)
      },
      // 如果有其他需要跳转的路径，可以继续在数组中添加对象
    ]
  },
};

export default nextConfig;
