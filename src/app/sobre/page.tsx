import Image from 'next/image';
import { Metadata } from 'next';
import { Leaf, Users, Target, Heart, Award, Lightbulb } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sobre o Renova Verde Hub | Nossa Missão Sustentável',
  description: 'Conheça a história, missão e valores do Renova Verde Hub. Democratizamos o acesso ao conhecimento sobre sustentabilidade doméstica no Brasil.',
  keywords: 'sobre renova verde, sustentabilidade, missão, valores, equipe, história',
  openGraph: {
    title: 'Sobre o Renova Verde Hub | Nossa Missão Sustentável',
    description: 'Conheça a história, missão e valores do Renova Verde Hub. Democratizamos o acesso ao conhecimento sobre sustentabilidade doméstica no Brasil.',
    type: 'website',
  },
};

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-800 to-green-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Sobre o Renova Verde Hub
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
              Transformando lares brasileiros em espaços mais sustentáveis, 
              um projeto de cada vez.
            </p>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Nossa Missão</h3>
              <p className="text-gray-600">
                Democratizar o acesso ao conhecimento sobre sustentabilidade, 
                fornecendo dicas práticas de jardinagem urbana, reformas ecológicas 
                e energia renovável para o público brasileiro.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Nossa Visão</h3>
              <p className="text-gray-600">
                Ser a principal referência em sustentabilidade doméstica no Brasil, 
                inspirando milhões de famílias a adotarem práticas eco-friendly 
                em seus lares.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Nossos Valores</h3>
              <p className="text-gray-600">
                Sustentabilidade, acessibilidade, praticidade e comunidade. 
                Acreditamos que pequenas ações sustentáveis hoje geram 
                grandes impactos amanhã.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Nossa História
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  O Renova Verde Hub nasceu da necessidade de tornar a sustentabilidade 
                  mais acessível e prática para as famílias brasileiras. Percebemos que 
                  muitas pessoas queriam adotar práticas mais ecológicas em suas casas, 
                  mas não sabiam por onde começar.
                </p>
                <p>
                  Em 2024, decidimos criar uma plataforma que reunisse conhecimento 
                  prático, dicas aplicáveis e uma comunidade engajada com o meio ambiente. 
                  Nosso foco está em soluções que realmente funcionam no contexto brasileiro.
                </p>
                <p>
                  Desde então, temos ajudado milhares de pessoas a transformarem seus 
                  lares em espaços mais sustentáveis, econômicos e saudáveis.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden">
                <Image
                  src="/images/hero-bg.jpg"
                  alt="Jardim vertical sustentável"
                  width={600}
                  height={400}
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nossos Pilares */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nossos Pilares de Atuação
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Focamos em quatro áreas principais para transformar sua casa 
              em um espaço mais sustentável e econômico.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Leaf className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Jardinagem Urbana
              </h3>
              <p className="text-gray-600">
                Jardins verticais, plantas para apartamentos e compostagem doméstica.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Energia Renovável
              </h3>
              <p className="text-gray-600">
                Energia solar residencial, eficiência energética e tecnologias sustentáveis.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Reformas Ecológicas
              </h3>
              <p className="text-gray-600">
                Materiais sustentáveis, isolamento térmico e captação de água da chuva.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">♻️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Sustentabilidade Geral
              </h3>
              <p className="text-gray-600">
                Redução de resíduos, consumo consciente e práticas eco-friendly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nossos Números */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Nosso Impacto
            </h2>
            <p className="text-xl text-green-100">
              Números que mostram o crescimento da nossa comunidade sustentável.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10k+</div>
              <div className="text-green-100">Visitantes mensais</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-green-100">Artigos publicados</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1k+</div>
              <div className="text-green-100">Inscritos na newsletter</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-green-100">Satisfação dos leitores</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Junte-se à Nossa Comunidade
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Faça parte de uma comunidade que acredita em um futuro mais sustentável. 
            Receba dicas exclusivas e seja o primeiro a saber sobre novos conteúdos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/blog"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Explore Nossos Artigos
            </a>
            <a
              href="/contato"
              className="border border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
            >
              Entre em Contato
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

