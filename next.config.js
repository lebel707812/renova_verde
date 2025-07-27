const path = require('path');

module.exports = {
  // Configuração de rewrites (mantida igual)
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*',
      },
    ];
  },

  // Configuração do Webpack ajustada
  webpack: (config, { isServer }) => {
    // Garante que o cache está habilitado corretamente
    if (!isServer) {
      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename],
        },
      };
    }

    // Aliases (mantido igual)
    config.resolve.alias = {
      ...config.resolve.alias,
      'react': path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
      'react-quill': path.resolve(__dirname, 'src/mocks/react-quill.ts')
    };
    
    return config;
  },

  // Configurações básicas
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  
  // Configurações experimentais SEGURAS para v14
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-select'],
    // Removido serverExternalPackages pois pode causar conflitos
  },
  
  // Desative compressão durante o desenvolvimento
  compress: process.env.NODE_ENV === 'production',
};

const nextConfig = {
  experimental: {
    optimizePackageImports: ['react', 'react-dom']
  }
}

module.exports = nextConfig