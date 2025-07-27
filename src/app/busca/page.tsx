import { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Calendar, Clock, User, Tag as TagIcon, Filter } from 'lucide-react';

import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import SearchResults from '@/components/landing/SearchResults';

// Skeleton loading component
function SearchResultsSkeleton() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/6 mb-8"></div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="aspect-video bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
                  <div className="h-6 bg-gray-200 rounded w-full mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                  <div className="flex justify-between mb-4">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export const metadata: Metadata = {
  title: 'Busca - Renova Verde Hub | Encontre Artigos sobre Sustentabilidade',
  description: 'Busque por artigos, dicas e guias sobre sustentabilidade, jardinagem urbana, energia solar e reformas ecológicas.',
  robots: 'noindex, follow', // Não indexar páginas de busca
};

export default function SearchPage() {
  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-gray-50">
        {/* Search Header */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
                <Search className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Buscar Artigos
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Encontre conteúdo sobre sustentabilidade, jardinagem e energia renovável
              </p>
              
              {/* Search Form */}
              <form className="max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    name="q"
                    placeholder="Digite sua busca..."
                    className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    autoFocus
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary-700 text-white px-6 py-2 rounded-md font-semibold transition-colors"
                  >
                    Buscar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Search Results */}
        <Suspense fallback={<SearchResultsSkeleton />}>
          <SearchResults />
        </Suspense>

        {/* Popular Searches */}
        <section className="bg-white border-t border-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Buscas Populares
            </h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                'jardim vertical',
                'energia solar',
                'plantas para apartamento',
                'compostagem',
                'sustentabilidade',
                'reforma ecológica',
                'horta urbana',
                'painéis solares'
              ].map((term) => (
                <Link
                  key={term}
                  href={`/busca?q=${encodeURIComponent(term)}`}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-primary hover:text-white transition-colors"
                >
                  <Search className="w-4 h-4 mr-2" />
                  {term}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Search Tips */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Dicas de Busca
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    🔍 Como buscar melhor
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Use palavras-chave específicas</li>
                    <li>• Combine termos relacionados</li>
                    <li>• Experimente sinônimos</li>
                    <li>• Use aspas para frases exatas</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    📚 Temas disponíveis
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Jardinagem urbana</li>
                    <li>• Energia solar residencial</li>
                    <li>• Reformas sustentáveis</li>
                    <li>• Plantas e cultivo</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    
      <Footer />
    </>
  );
}

