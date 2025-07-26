// Dados mock para desenvolvimento - serão substituídos pela API do Strapi

import { Article, Author, Category, Tag } from '@/types';

export const mockAuthors: Author[] = [
  {
    id: '1',
    name: 'Ana Silva',
    bio: 'Especialista em jardinagem urbana e sustentabilidade. Mais de 10 anos de experiência em projetos ecológicos.',
    avatar: '/images/authors/ana-silva.jpg',
    social: {
      twitter: '@anasilva_eco',
      linkedin: 'ana-silva-sustentabilidade',
      website: 'https://anasilva.eco'
    }
  },
  {
    id: '2',
    name: 'Carlos Mendes',
    bio: 'Engenheiro especializado em energia solar e eficiência energética residencial.',
    avatar: '/images/authors/carlos-mendes.jpg',
    social: {
      linkedin: 'carlos-mendes-energia',
      website: 'https://carlosmendes.solar'
    }
  }
];

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Jardinagem',
    slug: 'jardinagem',
    description: 'Dicas e técnicas para criar jardins sustentáveis em casa',
    color: '#22c55e',
    icon: '🌱'
  },
  {
    id: '2',
    name: 'Energia Solar',
    slug: 'energia-solar',
    description: 'Tudo sobre energia solar residencial e sustentabilidade energética',
    color: '#f59e0b',
    icon: '☀️'
  },
  {
    id: '3',
    name: 'Design Sustentável',
    slug: 'design-sustentavel',
    description: 'Projetos e ideias para um design mais ecológico',
    color: '#06b6d4',
    icon: '🏡'
  }
];

export const mockTags: Tag[] = [
  { id: '1', name: 'Jardim Vertical', slug: 'jardim-vertical' },
  { id: '2', name: 'Plantas', slug: 'plantas' },
  { id: '3', name: 'Sustentabilidade', slug: 'sustentabilidade' },
  { id: '4', name: 'Energia Renovável', slug: 'energia-renovavel' },
  { id: '5', name: 'DIY', slug: 'diy' },
  { id: '6', name: 'Economia', slug: 'economia' },
  { id: '7', name: 'Meio Ambiente', slug: 'meio-ambiente' }
];

export const mockArticles: Article[] = [
  {
    id: '1',
    title: '13 Plantas Ideais para Jardim Vertical: Guia Completo',
    slug: 'plantas-jardim-vertical-guia-completo',
    excerpt: 'Descubra as melhores espécies de plantas para criar um jardim vertical exuberante e sustentável em sua casa ou apartamento.',
    content: `
# 13 Plantas Ideais para Jardim Vertical: Guia Completo

Os jardins verticais se tornaram uma solução popular para quem deseja trazer mais verde para casa, especialmente em espaços pequenos. Neste guia completo, você descobrirá as 13 melhores plantas para criar seu jardim vertical.

## Por que Criar um Jardim Vertical?

Os jardins verticais oferecem inúmeros benefícios:

- **Economia de espaço**: Ideal para apartamentos e casas pequenas
- **Purificação do ar**: As plantas filtram toxinas do ambiente
- **Isolamento térmico**: Ajudam a regular a temperatura
- **Bem-estar**: Reduzem o estresse e melhoram o humor
- **Sustentabilidade**: Contribuem para um ambiente mais ecológico

## As 13 Melhores Plantas

### 1. Samambaia (Nephrolepis exaltata)
A samambaia é uma das plantas mais populares para jardins verticais. Ela se adapta bem à sombra e umidade, criando um visual exuberante.

**Cuidados:**
- Rega frequente (solo sempre úmido)
- Luz indireta
- Umidade alta

### 2. Jiboia (Epipremnum aureum)
Planta trepadeira de fácil cultivo, ideal para iniciantes. Suas folhas variegadas trazem beleza e elegância.

**Cuidados:**
- Rega moderada
- Luz indireta a meia-sombra
- Poda regular para controlar crescimento

### 3. Hera Inglesa (Hedera helix)
Excelente para criar um efeito cascata no jardim vertical. É resistente e se adapta a diferentes condições.

**Cuidados:**
- Rega regular
- Luz indireta
- Poda para manter formato

### 4. Peperômia (Peperomia spp.)
Planta compacta com folhas decorativas, perfeita para jardins verticais pequenos.

**Cuidados:**
- Rega moderada
- Luz indireta brilhante
- Solo bem drenado

### 5. Filodendro (Philodendron spp.)
Família de plantas tropicais com folhas grandes e vistosas, ideais para criar pontos focais.

**Cuidados:**
- Rega quando solo estiver seco
- Luz indireta
- Umidade moderada

### 6. Suculentas (Echeveria, Sedum)
Para jardins verticais em locais com mais luz, as suculentas são ideais pela baixa manutenção.

**Cuidados:**
- Rega esparsa
- Luz direta ou indireta brilhante
- Solo bem drenado

### 7. Begônia (Begonia spp.)
Flores coloridas que trazem vida e cor ao jardim vertical.

**Cuidados:**
- Rega regular
- Luz indireta brilhante
- Solo rico em matéria orgânica

### 8. Aspargo-Pluma (Asparagus densiflorus)
Folhagem delicada que cria textura interessante no jardim vertical.

**Cuidados:**
- Rega regular
- Luz indireta
- Poda para manter formato

### 9. Tradescantia (Tradescantia zebrina)
Planta pendente com folhas listradas, ideal para efeito cascata.

**Cuidados:**
- Rega moderada
- Luz indireta
- Poda regular

### 10. Clorofito (Chlorophytum comosum)
Planta purificadora de ar, fácil de cuidar e com visual atrativo.

**Cuidados:**
- Rega moderada
- Luz indireta a pleno sol
- Solo bem drenado

### 11. Maranta (Maranta leuconeura)
Folhas com padrões únicos que se fecham à noite, criando movimento no jardim.

**Cuidados:**
- Rega regular
- Luz indireta
- Umidade alta

### 12. Violeta Africana (Saintpaulia)
Flores delicadas que florescem o ano todo em condições adequadas.

**Cuidados:**
- Rega por baixo
- Luz indireta brilhante
- Temperatura constante

### 13. Bromélia (Bromeliaceae)
Plantas tropicais com cores vibrantes, ideais para criar pontos de destaque.

**Cuidados:**
- Rega no centro da planta
- Luz indireta brilhante
- Umidade alta

## Dicas de Montagem

### Estrutura
- Use estruturas resistentes (madeira tratada, metal)
- Garanta boa drenagem
- Considere o peso total quando molhado

### Substrato
- Use substrato leve e nutritivo
- Adicione perlita para drenagem
- Considere substratos específicos para cada tipo de planta

### Irrigação
- Instale sistema de gotejamento
- Monitore a umidade regularmente
- Evite encharcamento

### Manutenção
- Poda regular
- Fertilização mensal
- Monitoramento de pragas

## Conclusão

Criar um jardim vertical com essas 13 plantas transformará seu espaço em um oásis verde. Lembre-se de considerar as condições de luz e umidade do local antes de escolher as espécies.

Com os cuidados adequados, seu jardim vertical será uma fonte constante de beleza e bem-estar, contribuindo para um lar mais sustentável e saudável.
    `,
    featuredImage: '/images/article-1.jpg',
    author: mockAuthors[0],
    category: mockCategories[0],
    tags: [mockTags[0], mockTags[1], mockTags[2], mockTags[4]],
    publishedAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    readingTime: 8,
    seo: {
      title: '13 Plantas Ideais para Jardim Vertical: Guia Completo 2024',
      description: 'Descubra as 13 melhores plantas para jardim vertical. Guia completo com dicas de cultivo, cuidados e montagem para criar seu oásis verde em casa.',
      keywords: ['jardim vertical', 'plantas', 'jardinagem urbana', 'sustentabilidade', 'decoração verde'],
      ogImage: '/images/og/jardim-vertical-plantas.jpg'
    },
    status: 'published',
    views: 1250,
    likes: 89
  },
  {
    id: '2',
    title: '7 Jardins Verticais Inspiradores para Sua Casa',
    slug: 'jardins-verticais-inspiradores',
    excerpt: 'Explore projetos incríveis de jardins verticais que transformaram espaços urbanos em oásis verdes e sustentáveis.',
    content: `
# 7 Jardins Verticais Inspiradores para Sua Casa

Neste artigo, apresentamos 7 projetos inspiradores de jardins verticais que podem transformar qualquer espaço em um ambiente mais verde e sustentável.

## 1. Jardim Vertical de Apartamento Pequeno

Este projeto mostra como transformar uma parede de apenas 2m² em um jardim exuberante...

[Conteúdo completo do artigo...]
    `,
    featuredImage: '/images/article-2.jpg',
    author: mockAuthors[0],
    category: mockCategories[2],
    tags: [mockTags[0], mockTags[2], mockTags[4]],
    publishedAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-10T14:30:00Z',
    readingTime: 6,
    seo: {
      title: '7 Jardins Verticais Inspiradores: Projetos Incríveis para Sua Casa',
      description: 'Veja 7 projetos inspiradores de jardins verticais que transformaram espaços urbanos. Ideias criativas para sua casa ou apartamento.',
      keywords: ['jardim vertical', 'design sustentável', 'decoração', 'projetos', 'inspiração'],
      ogImage: '/images/og/jardins-verticais-inspiradores.jpg'
    },
    status: 'published',
    views: 890,
    likes: 67
  },
  {
    id: '3',
    title: 'Energia Solar Residencial: Tudo que Você Precisa Saber',
    slug: 'energia-solar-residencial-guia',
    excerpt: 'Um guia completo sobre instalação de painéis solares, custos, benefícios e como reduzir sua conta de energia em até 95%.',
    content: `
# Energia Solar Residencial: Tudo que Você Precisa Saber

A energia solar residencial tem se tornado cada vez mais popular no Brasil. Neste guia completo, você aprenderá tudo sobre instalação, custos e benefícios.

## O que é Energia Solar Residencial?

A energia solar residencial é um sistema que converte a luz do sol em eletricidade...

[Conteúdo completo do artigo...]
    `,
    featuredImage: '/images/article-3.png',
    author: mockAuthors[1],
    category: mockCategories[1],
    tags: [mockTags[3], mockTags[2], mockTags[5]],
    publishedAt: '2024-01-05T09:15:00Z',
    updatedAt: '2024-01-05T09:15:00Z',
    readingTime: 12,
    seo: {
      title: 'Energia Solar Residencial: Guia Completo 2024 - Custos e Benefícios',
      description: 'Guia completo sobre energia solar residencial. Saiba como instalar, custos, benefícios e como reduzir sua conta de luz em até 95%.',
      keywords: ['energia solar', 'painéis solares', 'energia renovável', 'sustentabilidade', 'economia'],
      ogImage: '/images/og/energia-solar-residencial.jpg'
    },
    status: 'published',
    views: 2100,
    likes: 156
  }
];

// Função para simular busca de artigos
export const searchArticles = (query: string): Article[] => {
  if (!query) return mockArticles;
  
  return mockArticles.filter(article =>
    article.title.toLowerCase().includes(query.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
    article.content.toLowerCase().includes(query.toLowerCase()) ||
    article.tags.some(tag => tag.name.toLowerCase().includes(query.toLowerCase()))
  );
};

// Função para buscar artigo por slug
export const getArticleBySlug = (slug: string): Article | undefined => {
  return mockArticles.find(article => article.slug === slug);
};

// Função para buscar artigos por categoria
export const getArticlesByCategory = (categorySlug: string): Article[] => {
  return mockArticles.filter(article => article.category.slug === categorySlug);
};

// Função para buscar artigos relacionados
export const getRelatedArticles = (articleId: string, limit: number = 3): Article[] => {
  const currentArticle = mockArticles.find(article => article.id === articleId);
  if (!currentArticle) return [];
  
  return mockArticles
    .filter(article => 
      article.id !== articleId && 
      (article.category.id === currentArticle.category.id ||
       article.tags.some(tag => currentArticle.tags.some(currentTag => currentTag.id === tag.id)))
    )
    .slice(0, limit);
};

