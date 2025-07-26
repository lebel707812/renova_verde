import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-primary-50 to-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center bg-primary-100 text-primary-900 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-primary-200">
            <span className="w-2 h-2 bg-primary-600 rounded-full mr-2 animate-pulse"></span>
            Sustentabilidade em Ação
          </div>
          
          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="block">Sustentabilidade</span>
            <span className="block text-primary">Inteligente</span>
            <span className="block">para Seu Lar</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Dicas práticas de jardinagem, reformas ecológicas e energia renovável 
            para transformar sua casa em um espaço mais sustentável e econômico
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/blog"
              className="group bg-primary hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center"
            >
              Explore Nossos Artigos
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            
            <Link
              href="#newsletter"
              className="group bg-white hover:bg-gray-50 text-primary px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 border-2 border-primary hover:border-primary-700 flex items-center"
            >
              Receber Newsletter
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

