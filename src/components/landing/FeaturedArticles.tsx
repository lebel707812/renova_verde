import ArticleCard from './ArticleCard';

// TODO: Integrar com API de artigos
const featuredArticles = [
  {
    id: 1,
    title: "13 Plantas Ideais para Jardim Vertical: Guia Completo",
    image: "/images/article-1.jpg",
    category: "Jardinagem",
    slug: "plantas-jardim-vertical-guia-completo",
    excerpt: "Descubra as melhores espécies de plantas para criar um jardim vertical exuberante e sustentável em sua casa ou apartamento."
  },
  {
    id: 2,
    title: "7 Jardins Verticais Inspiradores para Sua Casa",
    image: "/images/article-2.jpg",
    category: "Design Sustentável",
    slug: "jardins-verticais-inspiradores",
    excerpt: "Explore projetos incríveis de jardins verticais que transformaram espaços urbanos em oásis verdes e sustentáveis."
  },
  {
    id: 3,
    title: "Energia Solar Residencial: Tudo que Você Precisa Saber",
    image: "/images/article-3.png",
    category: "Energia Solar",
    slug: "energia-solar-residencial-guia",
    excerpt: "Um guia completo sobre instalação de painéis solares, custos, benefícios e como reduzir sua conta de energia em até 95%."
  }
];

export default function FeaturedArticles() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center bg-primary-100 text-primary-900 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <span className="w-2 h-2 bg-primary-600 rounded-full mr-2"></span>
            Artigos em Destaque
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Conteúdo que Transforma
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Explore nossos artigos mais populares sobre sustentabilidade, 
            jardinagem urbana e energia renovável
          </p>
        </div>
        
        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredArticles.map((article) => (
            <ArticleCard
              key={article.id}
              title={article.title}
              image={article.image}
              category={article.category}
              slug={article.slug}
              excerpt={article.excerpt}
            />
          ))}
        </div>
        
        {/* View All Button */}
        <div className="text-center">
          <a
            href="/blog"
            className="group inline-flex items-center bg-primary hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Ver Todos os Artigos
            <svg 
              className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </a>
        </div>
        
        {/* Stats Section */}
        <div className="mt-16 pt-16 border-t border-gray-200">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-gray-600 text-sm lg:text-base">Artigos Publicados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-primary mb-2">50k+</div>
              <div className="text-gray-600 text-sm lg:text-base">Leitores Mensais</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-primary mb-2">1M+</div>
              <div className="text-gray-600 text-sm lg:text-base">Visualizações</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-gray-600 text-sm lg:text-base">Satisfação</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

