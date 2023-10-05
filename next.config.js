/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

// next.config.js
const path = require('path');

module.exports = {
    // Rest of your Next.js configuration...

    webpack: (config) => {
        config.resolve.alias['@lib'] = path.resolve(__dirname, 'src/lib');
        return config;
    },
};

