import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: "Renova Verde Hub - Sustentabilidade Inteligente para Seu Lar",
    template: "%s | Renova Verde Hub"
  },
  description: "Transforme sua casa em um espaço mais sustentável com nossas dicas práticas de jardinagem urbana, reformas ecológicas e energia renovável. Conteúdo especializado para o público brasileiro.",
  keywords: [
    "sustentabilidade doméstica",
    "jardinagem urbana",
    "energia solar residencial", 
    "reformas ecológicas",
    "casa sustentável",
    "jardim vertical",
    "compostagem doméstica",
    "economia de energia",
    "materiais sustentáveis",
    "captação água da chuva",
    "plantas apartamento",
    "energia renovável",
    "consumo consciente",
    "reciclagem doméstica",
    "sustentabilidade Brasil"
  ],
  authors: [{ name: "Renova Verde Hub", url: "https://renovaverdehub.com" }],
  creator: "Renova Verde Hub",
  publisher: "Renova Verde Hub",
  category: "Sustentabilidade",
  classification: "Educação Ambiental",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://renovaverdehub.com'),
  alternates: {
    canonical: '/',
    languages: {
      'pt-BR': '/',
    },
  },
  openGraph: {
    title: "Renova Verde Hub - Sustentabilidade Inteligente para Seu Lar",
    description: "Transforme sua casa em um espaço mais sustentável com nossas dicas práticas de jardinagem urbana, reformas ecológicas e energia renovável.",
    url: 'https://renovaverdehub.com',
    siteName: 'Renova Verde Hub',
    images: [
      {
        url: '/images/hero-bg.jpg',
        width: 1200,
        height: 630,
        alt: 'Jardim vertical sustentável - Renova Verde Hub',
        type: 'image/jpeg',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
    countryName: 'Brasil',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@renovaverdehub',
    creator: '@renovaverdehub',
    title: "Renova Verde Hub - Sustentabilidade Inteligente para Seu Lar",
    description: "Transforme sua casa em um espaço mais sustentável com nossas dicas práticas de jardinagem urbana, reformas ecológicas e energia renovável.",
    images: {
      url: '/images/hero-bg.jpg',
      alt: 'Jardim vertical sustentável - Renova Verde Hub',
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code-here',
    yandex: 'yandex-verification-code-here',
    yahoo: 'yahoo-verification-code-here',
  },
  other: {
    'msapplication-TileColor': '#1a3f32',
    'msapplication-config': '/browserconfig.xml',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#1a3f32" />
        <meta name="color-scheme" content="light" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://renovaverdehub.com/#website",
                  "name": "Renova Verde Hub",
                  "description": "Transforme sua casa em um espaço mais sustentável com nossas dicas práticas de jardinagem urbana, reformas ecológicas e energia renovável.",
                  "url": "https://renovaverdehub.com",
                  "inLanguage": "pt-BR",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": {
                      "@type": "EntryPoint",
                      "urlTemplate": "https://renovaverdehub.com/busca?q={search_term_string}"
                    },
                    "query-input": "required name=search_term_string"
                  },
                  "publisher": {
                    "@id": "https://renovaverdehub.com/#organization"
                  }
                },
                {
                  "@type": "Organization",
                  "@id": "https://renovaverdehub.com/#organization",
                  "name": "Renova Verde Hub",
                  "url": "https://renovaverdehub.com",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://renovaverdehub.com/images/logo.png",
                    "width": 512,
                    "height": 512
                  },
                  "description": "Plataforma brasileira especializada em sustentabilidade doméstica, oferecendo conteúdo prático sobre jardinagem urbana, energia renovável e reformas ecológicas.",
                  "foundingDate": "2024",
                  "areaServed": {
                    "@type": "Country",
                    "name": "Brasil"
                  },
                  "knowsAbout": [
                    "Sustentabilidade Doméstica",
                    "Jardinagem Urbana",
                    "Energia Solar Residencial",
                    "Reformas Ecológicas",
                    "Compostagem",
                    "Plantas para Apartamentos"
                  ],
                  "sameAs": [
                    "https://instagram.com/renovaverdehub",
                    "https://youtube.com/@renovaverdehub",
                    "https://linkedin.com/company/renovaverdehub"
                  ]
                }
              ]
            })
          }}
        />
        
        {/* Google Analytics - Replace with your tracking ID */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID', {
                page_title: document.title,
                page_location: window.location.href,
              });
            `,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <noscript>
          <div style={{ 
            padding: '20px', 
            backgroundColor: '#f3f4f6', 
            textAlign: 'center',
            fontSize: '14px',
            color: '#374151'
          }}>
            Para uma melhor experiência, habilite o JavaScript em seu navegador.
          </div>
        </noscript>
        {children}
      </body>
    </html>
  );
}

