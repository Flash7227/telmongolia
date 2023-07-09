/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASEURL: process.env.BASEURL,
    API2: process.env.API2,
  },
  images: { domains: ['api2.telecommongolia.mn'], },
    async rewrites() {
        return [
          {
            source: '/api/2/:path*',
            destination: process.env.API2 + "/:path*"
          },
          {
              source: "/api/1/:path*",
              destination: process.env.API + "/:path*"
          }
        ]
      }
    
}

module.exports = nextConfig
