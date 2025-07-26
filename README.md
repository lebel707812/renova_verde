# Renova Verde Hub 🌱

Landing page moderna e responsiva para o Renova Verde Hub, desenvolvida com Next.js 14, TypeScript e Tailwind CSS.

## 🚀 Tecnologias

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Lucide React** - Ícones modernos
- **Responsive Design** - Mobile-first

## 🎨 Design

- **Cor Primária**: Dark Green (#1a3f32)
- **Abordagem**: Mobile-first
- **Componentes**: Modulares e reutilizáveis

## 📱 Seções

### Hero Section
- Título principal: "Sustentabilidade Inteligente para Seu Lar"
- Subtítulo com descrição do conteúdo
- CTA para explorar artigos e newsletter
- Imagem de fundo com jardim vertical
- Estatísticas em destaque

### Destaque de Artigos
- 3 cards de artigos em destaque
- Componente ArticleCard reutilizável
- Badges de categoria
- Links otimizados com next/link
- Seção de estatísticas

### Newsletter
- Componente NewsletterSignup com variant compact
- Formulário com validação
- Ícone de email integrado
- Benefícios da newsletter

### Footer
- Links organizados por categoria
- Redes sociais
- Informações legais

## 🔧 Estrutura do Projeto

```
src/
├── app/
│   ├── layout.tsx          # Layout principal com SEO
│   ├── page.tsx            # Página inicial
│   └── globals.css         # Estilos globais
└── components/
    └── landing/
        ├── HeroSection.tsx      # Seção hero
        ├── FeaturedArticles.tsx # Artigos em destaque
        ├── ArticleCard.tsx      # Card de artigo
        └── NewsletterSignup.tsx # Formulário newsletter
```

## 🚀 Como Executar

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Executar em desenvolvimento**:
   ```bash
   npm run dev
   ```

3. **Build para produção**:
   ```bash
   npm run build
   npm start
   ```

## 🔍 SEO e Performance

- **Meta tags** dinâmicas otimizadas
- **Schema.org** structured data
- **Open Graph** e Twitter Cards
- **Next.js Image** para otimização automática
- **Links otimizados** com next/link

## 🔗 Integrações Futuras

Os seguintes pontos estão marcados com comentários TODO para futuras integrações:

- **API de Artigos**: Integração com CMS ou API de blog
- **API de Newsletter**: Serviço de email marketing
- **Redes Sociais**: Links reais para perfis sociais
- **Analytics**: Google Analytics ou similar

## 📝 Componentes

### ArticleCard
Componente reutilizável para exibir artigos com:
- Imagem otimizada
- Badge de categoria
- Título e excerpt
- Link para leitura

### NewsletterSignup
Componente de newsletter com duas variantes:
- `default`: Versão completa
- `compact`: Versão compacta para landing page

## 🎯 Próximos Passos

1. Integrar com API de artigos
2. Implementar sistema de newsletter
3. Adicionar páginas internas (/blog, /sobre, etc.)
4. Configurar analytics
5. Otimizar para SEO avançado

## 📄 Licença

Este projeto foi desenvolvido para o Renova Verde Hub.

