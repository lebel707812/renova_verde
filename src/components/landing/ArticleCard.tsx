import Image from 'next/image';
import Link from 'next/link';

interface ArticleCardProps {
  title: string;
  image: string;
  category: string;
  slug: string;
  excerpt?: string;
  priority?: boolean;
}

export default function ArticleCard({ 
  title, 
  image, 
  category, 
  slug, 
  excerpt,
  priority = false
}: ArticleCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="block">
      <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group cursor-pointer">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={image}
            alt={`Imagem do artigo: ${title}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
            quality={80}
            loading={priority ? 'eager' : 'lazy'}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>
        
        <div className="p-6">
          <div className="mb-3">
            <span className="inline-block bg-primary-100 text-primary-900 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {category}
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-700 transition-colors duration-200">
            {title}
          </h3>
          
          {excerpt && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {excerpt}
            </p>
          )}
          
          <div className="inline-flex items-center text-primary font-semibold group-hover:text-primary-700 transition-colors duration-200">
            Ler artigo
            <svg 
              className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}

