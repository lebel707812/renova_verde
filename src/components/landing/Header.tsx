'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X, Leaf } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // TODO: Integrar com sistema de busca
      console.log('Buscar por:', searchQuery);
      // Redirecionar para página de resultados
      window.location.href = `/busca?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-primary p-2 rounded-lg group-hover:bg-primary-700 transition-colors duration-200">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl lg:text-2xl font-bold text-gray-900">
                Renova Verde
              </span>
              <span className="text-sm text-primary-600 block leading-none">
                Hub
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              href="/blog" 
              className="text-gray-700 hover:text-primary font-medium transition-colors duration-200"
            >
              Blog
            </Link>
            <Link 
              href="/sobre" 
              className="text-gray-700 hover:text-primary font-medium transition-colors duration-200"
            >
              Sobre
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar artigos..."
                  className="w-64 lg:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50 focus:bg-white transition-colors duration-200"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary-700 text-white p-1.5 rounded-md transition-colors duration-200"
                >
                  <Search className="w-3 h-3" />
                </button>
              </div>
            </form>

            {/* Mobile Search Button */}
            <button
              onClick={() => {
                const searchInput = document.getElementById('mobile-search');
                if (searchInput) {
                  searchInput.focus();
                }
              }}
              className="md:hidden p-2 text-gray-700 hover:text-primary transition-colors duration-200"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Newsletter CTA */}
            <Link
              href="/#newsletter"
              className="hidden lg:inline-flex bg-primary hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200"
            >
              Newsletter
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 text-gray-700 hover:text-primary transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              id="mobile-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar artigos..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50 focus:bg-white transition-colors duration-200"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary-700 text-white p-1.5 rounded-md transition-colors duration-200"
            >
              <Search className="w-3 h-3" />
            </button>
          </form>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/blog" 
                className="text-gray-700 hover:text-primary font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="/sobre" 
                className="text-gray-700 hover:text-primary font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre
              </Link>
              <Link
                href="/#newsletter"
                className="inline-flex bg-primary hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 w-fit"
                onClick={() => setIsMenuOpen(false)}
              >
                Newsletter
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

