/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            // "utsama-art-market.s3.us-east-1.amazonaws.com",
            "art-market-bucket.tor1.digitaloceanspaces.com",
        ],
    },
};

export default nextConfig;
