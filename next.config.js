const path = require('path');

module.exports = {
  // Configuração de rewrites/proxy
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*', // Flask backend
      },
    ];
  },

  // Configuração do Webpack
  webpack: (config) => {
    // Mock para react-quill
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-quill': path.resolve(__dirname, 'src/mocks/react-quill.ts')
    };

    return config;
  },

  // Outras configurações opcionais
  reactStrictMode: true,
  productionBrowserSourceMaps: true, // Para debug em produção
};