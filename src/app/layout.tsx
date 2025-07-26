import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Renova Verde Hub - Sustentabilidade Inteligente para Seu Lar",
    template: "%s | Renova Verde Hub"
  },
  description: "Dicas práticas de jardinagem, reformas ecológicas e energia renovável para transformar sua casa em um espaço mais sustentável e econômico.",
  keywords: ["sustentabilidade", "jardinagem", "energia solar", "reformas ecológicas", "casa sustentável", "jardim vertical"],
  authors: [{ name: "Renova Verde Hub" }],
  creator: "Renova Verde Hub",
  publisher: "Renova Verde Hub",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://renovaverdehub.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Renova Verde Hub - Sustentabilidade Inteligente para Seu Lar",
    description: "Dicas práticas de jardinagem, reformas ecológicas e energia renovável para transformar sua casa em um espaço mais sustentável e econômico.",
    url: 'https://renovaverdehub.com',
    siteName: 'Renova Verde Hub',
    images: [
      {
        url: '/images/hero-bg.jpg',
        width: 1200,
        height: 630,
        alt: 'Renova Verde Hub - Sustentabilidade para seu lar',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Renova Verde Hub - Sustentabilidade Inteligente para Seu Lar",
    description: "Dicas práticas de jardinagem, reformas ecológicas e energia renovável para transformar sua casa em um espaço mais sustentável e econômico.",
    images: ['/images/hero-bg.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#1a3f32" />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Renova Verde Hub",
              "description": "Dicas práticas de jardinagem, reformas ecológicas e energia renovável para transformar sua casa em um espaço mais sustentável e econômico.",
              "url": "https://renovaverdehub.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://renovaverdehub.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Renova Verde Hub",
                "url": "https://renovaverdehub.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://renovaverdehub.com/images/logo.png"
                }
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}

