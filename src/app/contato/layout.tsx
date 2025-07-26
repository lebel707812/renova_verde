import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contato - Renova Verde Hub | Fale Conosco',
  description: 'Entre em contato com o Renova Verde Hub para dúvidas, sugestões, parcerias ou suporte. Estamos aqui para ajudar você a transformar seu lar de forma sustentável.',
  keywords: 'contato renova verde,fale conosco,suporte sustentabilidade,parceria ambiental,dúvidas jardinagem urbana',
  openGraph: {
    title: 'Contato - Renova Verde Hub | Fale Conosco',
    description: 'Entre em contato com o Renova Verde Hub para dúvidas, sugestões, parcerias ou suporte. Estamos aqui para ajudar você a transformar seu lar de forma sustentável.',
    type: 'website',
  },
};

export default function ContatoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

