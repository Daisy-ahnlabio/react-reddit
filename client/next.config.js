/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "www.gravatar.com",
      "localhost",
      "ec2-3-36-74-245.ap-northeast-2.compute.amazonaws.com"
    ]
  }
}

module.exports = nextConfig