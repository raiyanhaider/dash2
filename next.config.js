/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  poweredByHeader: false,
  compress: true,
  output: 'standalone',
  reactStrictMode: true,
  crossOrigin: 'anonymous',
  httpAgentOptions: {
    keepAlive: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    minimumCacheTTL: 60,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    domains: ['images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.unsplash.com'
      }
    ]
  },
  experimental: {
    appDir: true,
    optimizeCss: true,
    serverActions: true,
    taint: true,
    optimizeServerReact: true,
    serverComponentsExternalPackages: ['sharp'],
    turbo: {
      loaders: {
        '.svg': ['@svgr/webpack'],
      },
    },
    webVitalsAttribution: ['CLS', 'LCP'],
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-select',
      '@radix-ui/react-scroll-area',
      'framer-motion',
      'date-fns',
      'recharts',
      'sonner'
    ]
  },
  webpack: (config, { dev, isServer }) => {
    // Disable webpack cache to resolve ENOENT errors
    config.cache = false;
    
    // Disable filesystem cache
    if (dev) {
      config.infrastructureLogging = {
        level: 'warn',
      };
      config.cache = {
        type: 'memory'
      };
    }
    
    // Enable module concatenation
    config.optimization.concatenateModules = true;
    
    // Optimize CSS
    if (!dev && !isServer) {
      config.optimization.splitChunks.cacheGroups.styles = {
        name: 'styles',
        test: /\.css$/,
        chunks: 'all',
        enforce: true
      };

      // Add bundle analyzer in production
      if (process.env.ANALYZE === 'true') {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: './analyze/client.html'
          })
        );
      }
    }
    
    // Add module scope hoisting
    if (!dev && !isServer) {
      config.optimization.moduleIds = 'deterministic';
      config.optimization.chunkIds = 'named';
      config.optimization.innerGraph = true;
      config.optimization.mangleExports = true;
      
      // Enable tree shaking
      config.optimization.usedExports = true;
      config.optimization.sideEffects = true;
      
      // Enable compression
      config.optimization.minimize = true;
    }
    
    return config;
  }
};

module.exports = nextConfig;