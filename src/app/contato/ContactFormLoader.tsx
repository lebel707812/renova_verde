'use client';

import dynamic from 'next/dynamic';

// Carrega o formulário dinamicamente com SSR desativado
const ContactForm = dynamic(() => import('./ContactForm'), {
  ssr: false
});

export default function ContactFormLoader() {
  return <ContactForm />;
}