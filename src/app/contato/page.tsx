'use client';

import dynamic from 'next/dynamic';
import Layout from '@/components/layout/Layout';

// Solução 1: Importação dinâmica direta (recomendada)
const ContactForm = dynamic(
  () => import('./ContactForm').then((mod) => mod.default),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    )
  }
);

export default function ContatoPage() {
  return (
    <Layout>
      <div className="bg-gray-50">
        {/* Seção Hero */}
        <section className="bg-gradient-to-br from-green-800 to-green-600 text-white py-20">
          {/* ... conteúdo hero ... */}
        </section>

        {/* Formulário */}
        <ContactForm />
      </div>
    </Layout>
  );
}