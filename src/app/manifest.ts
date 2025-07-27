import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Renova Verde Hub - Sustentabilidade Inteligente',
    short_name: 'Renova Verde',
    description: 'Transforme sua casa em um espaço mais sustentável com dicas práticas de jardinagem urbana, reformas ecológicas e energia renovável.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1a3f32',
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'pt-BR',
    categories: ['education', 'lifestyle', 'productivity'],
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    shortcuts: [
      {
        name: 'Blog',
        short_name: 'Blog',
        description: 'Leia nossos artigos sobre sustentabilidade',
        url: '/blog',
        icons: [{ src: '/favicon-32x32.png', sizes: '32x32' }],
      },
      {
        name: 'Buscar',
        short_name: 'Buscar',
        description: 'Busque por conteúdo específico',
        url: '/busca',
        icons: [{ src: '/favicon-32x32.png', sizes: '32x32' }],
      },
      {
        name: 'Contato',
        short_name: 'Contato',
        description: 'Entre em contato conosco',
        url: '/contato',
        icons: [{ src: '/favicon-32x32.png', sizes: '32x32' }],
      },
    ],
  };
}

