const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function main() {
  // Criar autores
  const author1 = await prisma.author.upsert({
    where: { email: 'maria@renovaverde.com' },
    update: {},
    create: {
      name: 'Maria Silva',
      email: 'maria@renovaverde.com',
      bio: 'Especialista em jardinagem urbana e sustentabilidade doméstica.',
      avatar: '/images/authors/maria.jpg',
      social_links: {
        instagram: '@maria_verde',
        linkedin: 'maria-silva-verde'
      }
    }
  });

  const author2 = await prisma.author.upsert({
    where: { email: 'joao@renovaverde.com' },
    update: {},
    create: {
      name: 'João Santos',
      email: 'joao@renovaverde.com',
      bio: 'Engenheiro especializado em energia renovável e eficiência energética.',
      avatar: '/images/authors/joao.jpg',
      social_links: {
        instagram: '@joao_energia',
        linkedin: 'joao-santos-energia'
      }
    }
  });

  // Criar categorias
  const category1 = await prisma.category.upsert({
    where: { slug: 'jardinagem-urbana' },
    update: {},
    create: {
      name: 'Jardinagem Urbana',
      slug: 'jardinagem-urbana',
      description: 'Dicas e técnicas para cultivar plantas em espaços urbanos',
      color: '#22c55e'
    }
  });

  const category2 = await prisma.category.upsert({
    where: { slug: 'energia-renovavel' },
    update: {},
    create: {
      name: 'Energia Renovável',
      slug: 'energia-renovavel',
      description: 'Soluções sustentáveis para geração de energia',
      color: '#3b82f6'
    }
  });

  const category3 = await prisma.category.upsert({
    where: { slug: 'sustentabilidade' },
    update: {},
    create: {
      name: 'Sustentabilidade',
      slug: 'sustentabilidade',
      description: 'Práticas sustentáveis para o dia a dia',
      color: '#10b981'
    }
  });

  // Criar tags
  const tag1 = await prisma.tag.upsert({
    where: { slug: 'plantas' },
    update: {},
    create: {
      name: 'Plantas',
      slug: 'plantas'
    }
  });

  const tag2 = await prisma.tag.upsert({
    where: { slug: 'energia-solar' },
    update: {},
    create: {
      name: 'Energia Solar',
      slug: 'energia-solar'
    }
  });

  const tag3 = await prisma.tag.upsert({
    where: { slug: 'compostagem' },
    update: {},
    create: {
      name: 'Compostagem',
      slug: 'compostagem'
    }
  });

  // Criar artigos de exemplo
  const article1 = await prisma.article.upsert({
    where: { slug: 'jardim-vertical-apartamento' },
    update: {},
    create: {
      title: 'Como Criar um Jardim Vertical no Seu Apartamento',
      slug: 'jardim-vertical-apartamento',
      content: `# Como Criar um Jardim Vertical no Seu Apartamento

Transformar um pequeno espaço urbano em um oásis verde é mais fácil do que você imagina. Os jardins verticais são uma solução perfeita para quem vive em apartamentos e quer trazer mais natureza para casa.

## Materiais Necessários

- Estrutura de madeira ou metal
- Vasos ou jardineiras
- Terra vegetal
- Plantas adequadas para ambientes internos
- Sistema de irrigação (opcional)

## Passo a Passo

1. **Escolha o local ideal**: Procure uma parede que receba luz natural, mas não sol direto o dia todo.

2. **Monte a estrutura**: Fixe a estrutura na parede de forma segura, considerando o peso dos vasos com terra e água.

3. **Selecione as plantas**: Opte por espécies que se adaptam bem a ambientes internos como samambaias, jiboias e suculentas.

4. **Plante e organize**: Distribua as plantas de forma harmoniosa, considerando o crescimento de cada espécie.

5. **Crie um sistema de irrigação**: Para facilitar a manutenção, considere instalar um sistema de gotejamento.

## Dicas Importantes

- Comece pequeno e vá expandindo gradualmente
- Monitore a umidade do solo regularmente
- Faça a poda quando necessário
- Use fertilizante orgânico mensalmente

Com dedicação e cuidado, seu jardim vertical se tornará um ponto focal incrível no seu apartamento!`,
      excerpt: 'Descubra como transformar seu apartamento com um jardim vertical sustentável e de baixo custo.',
      featured_image: '/images/jardim-vertical.jpg',
      status: 'published',
      views: 150,
      likes: 23,
      reading_time: 5,
      meta_title: 'Jardim Vertical para Apartamento - Guia Completo',
      meta_description: 'Aprenda a criar um jardim vertical no seu apartamento com este guia passo a passo. Dicas, materiais e plantas ideais.',
      published_at: new Date(),
      category_id: category1.id,
      author_id: author1.id
    }
  });

  // Conectar tags ao artigo
  await prisma.article.update({
    where: { id: article1.id },
    data: {
      tags: {
        connect: [{ id: tag1.id }, { id: tag3.id }]
      }
    }
  });

  console.log('Seed executado com sucesso!');
  console.log(`Criados: ${await prisma.author.count()} autores`);
  console.log(`Criadas: ${await prisma.category.count()} categorias`);
  console.log(`Criadas: ${await prisma.tag.count()} tags`);
  console.log(`Criados: ${await prisma.article.count()} artigos`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

