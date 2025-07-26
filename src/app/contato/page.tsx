'use client';

import Layout from '@/components/layout/Layout';
import dynamic from 'next/dynamic';
import { Mail, MessageCircle, Clock, CheckCircle } from 'lucide-react';

const ContactForm = dynamic(
  () => import("./ContactForm").then((mod) => mod.default),
  { ssr: false }
);

export default function ContatoPage() {
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-800 to-green-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Fale Conosco
              </h1>
              <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
                Tire suas dúvidas, envie sugestões ou inicie uma parceria. 
                Estamos aqui para ajudar você a transformar seu lar de forma sustentável.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContactForm />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Perguntas Frequentes
            </h2>
            <div className="space-y-6">
              {/* FAQ Item 1 */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                  <MessageCircle className="w-5 h-5 mr-3 text-green-600" />
                  Como posso contribuir com o Renova Verde Hub?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Você pode contribuir compartilhando nossos artigos, 
                  sugerindo temas, ou entrando em contato para possíveis parcerias. 
                  Agradecemos todo o apoio à nossa missão!
                </p>
              </div>

              {/* FAQ Item 2 */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                  <Clock className="w-5 h-5 mr-3 text-green-600" />
                  Qual o tempo de resposta para contatos?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Nosso objetivo é responder a todas as mensagens em até 24 horas 
                  úteis. Agradecemos sua paciência e compreensão.
                </p>
              </div>

              {/* FAQ Item 3 */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-green-600" />
                  Posso enviar sugestões de artigos ou temas?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Sim! Adoramos receber sugestões de nossos leitores. Utilize o formulário 
                  acima para nos enviar suas ideias. Sua contribuição é muito valiosa!
                </p>
              </div>

              {/* FAQ Item 4 */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-600" />
                  Vocês oferecem consultoria ou serviços?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  No momento, focamos em educação e conteúdo. Mas indicamos produtos e 
                  fornecedores confiáveis em nossos artigos.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}