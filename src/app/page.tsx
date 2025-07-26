import Header from '@/components/landing/Header';
import HeroSection from '@/components/landing/HeroSection';
import FeaturedArticles from '@/components/landing/FeaturedArticles';
import NewsletterSignup from '@/components/landing/NewsletterSignup';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <Header />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Featured Articles Section */}
      <FeaturedArticles />
      
      {/* Newsletter Section */}
      <section id="newsletter" className="py-16 lg:py-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-primary-100 text-primary-900 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <span className="w-2 h-2 bg-primary-600 rounded-full mr-2"></span>
                Fique por Dentro
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Newsletter Sustentável
              </h2>
              
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                Receba semanalmente as melhores dicas de sustentabilidade, 
                jardinagem urbana e energia renovável diretamente no seu email
              </p>
            </div>
            
            {/* Newsletter Component */}
            <div className="max-w-md mx-auto">
              <NewsletterSignup 
                variant="compact" 
                placeholder="Seu melhor email" 
              />
            </div>
            
            {/* Benefits */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div className="p-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Conteúdo Semanal</h3>
                <p className="text-sm text-gray-600">Dicas práticas toda semana</p>
              </div>
              
              <div className="p-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">100% Gratuito</h3>
                <p className="text-sm text-gray-600">Sem taxas ou compromissos</p>
              </div>
              
              <div className="p-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Dados Seguros</h3>
                <p className="text-sm text-gray-600">Privacidade garantida</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </main>
  );
}

