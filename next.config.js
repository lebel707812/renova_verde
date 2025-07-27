const path = require('path');

module.exports = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-quill': path.resolve(__dirname, 'src/mocks/react-quill.ts')
    };
    
    // Adicione esta configuração para resolver problemas de chunks
    config.optimization.splitChunks = {
      chunks: 'all',
      maxSize: 244 * 1024, // 244KB
    };
    
    return config;
  },
  
  // Desative temporariamente a verificação de tipos
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};