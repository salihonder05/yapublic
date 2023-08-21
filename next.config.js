/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: 'http://api-v3.fastrest.com.tr:4002/graphql/',
        // PROJECT_API_URL: 'https://yapublic.vercel.app/api/ ',
        PROJECT_API_URL: 'http://localhost:3000/api/',
    },
    images: {
        domains: ['admin.fastrest.com.tr', 'dummyimage.com', 'cdn.fastrest.com.tr'],
    },
};

module.exports = nextConfig

