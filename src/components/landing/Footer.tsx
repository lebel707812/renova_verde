import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Renova Verde Hub</h3>
            <p className="text-primary-200 mb-4 max-w-md">
              Transformando lares em espaços mais sustentáveis através de 
              conteúdo prático e inspirador sobre jardinagem, reformas ecológicas 
              e energia renovável.
            </p>
            <div className="flex space-x-4">
              {/* Social Links - TODO: Integrar com redes sociais reais */}
              <a href="#" className="text-primary-200 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-primary-200 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297L3.182 17.635l1.944-1.944c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323L3.182 7.101l1.944-1.944c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297l1.944 1.944-1.944 1.944c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323l1.944 1.944-1.944 1.944c-.875.807-2.026 1.297-3.323 1.297z"/>
                </svg>
              </a>
              <a href="#" className="text-primary-200 hover:text-white transition-colors">
                <span className="sr-only">YouTube</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-primary-200 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/sobre" className="text-primary-200 hover:text-white transition-colors">Sobre</Link></li>
              <li><Link href="/contato" className="text-primary-200 hover:text-white transition-colors">Contato</Link></li>
              <li><Link href="/#newsletter" className="text-primary-200 hover:text-white transition-colors">Newsletter</Link></li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categorias</h4>
            <ul className="space-y-2">
              <li><Link href="/categoria/jardinagem" className="text-primary-200 hover:text-white transition-colors">Jardinagem</Link></li>
              <li><Link href="/categoria/energia-solar" className="text-primary-200 hover:text-white transition-colors">Energia Solar</Link></li>
              <li><Link href="/categoria/reformas" className="text-primary-200 hover:text-white transition-colors">Reformas Ecológicas</Link></li>
              <li><Link href="/categoria/sustentabilidade" className="text-primary-200 hover:text-white transition-colors">Sustentabilidade</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-primary-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-200 text-sm">
            © 2024 Renova Verde Hub. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacidade" className="text-primary-200 hover:text-white text-sm transition-colors">
              Política de Privacidade
            </Link>
            <Link href="/termos" className="text-primary-200 hover:text-white text-sm transition-colors">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

