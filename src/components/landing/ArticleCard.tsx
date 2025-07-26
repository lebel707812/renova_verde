import Image from 'next/image';
import Link from 'next/link';

interface ArticleCardProps {
  title: string;
  image: string;
  category: string;
  slug: string;
  excerpt?: string;
}

export default function ArticleCard({ 
  title, 
  image, 
  category, 
  slug, 
  excerpt 
}: ArticleCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <div className="p-6">
        <div className="mb-3">
          <span className="inline-block bg-primary-100 text-primary-900 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {category}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {title}
        </h3>
        
        {excerpt && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {excerpt}
          </p>
        )}
        
        <Link 
          href={`/blog/${slug}`}
          className="inline-flex items-center text-primary font-semibold hover:text-primary-700 transition-colors duration-200"
        >
          Ler artigo
          <svg 
            className="w-4 h-4 ml-1" 
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
        </Link>
      </div>
    </article>
  );
}

