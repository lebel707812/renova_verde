const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Criar autores
  const author = await prisma.author.upsert({
    where: { id: 'admin-author' },
    update: {},
    create: {
      id: 'admin-author',
      name: 'Equipe Renova Verde',
      bio: 'Especialistas em sustentabilidade e vida ecológica',
      avatar: '/images/author-avatar.jpg',
      twitter: '@renovaverde',
      linkedin: 'renovaverde',
      website: 'https://renovaverde.com'
    }
  });

  console.log('✅ Autor criado:', author.name);

  // Criar categorias
  const categories = [
    {
      id: 'jardinagem-urbana',
      name: 'Jardinagem Urbana',
      slug: 'jardinagem-urbana',
      description: 'Dicas para cultivar plantas em espaços urbanos',
      color: '#22c55e',
      icon: '🌱'
    },
    {
      id: 'energia-renovavel',
      name: 'Energia Renovável',
      slug: 'energia-renovavel',
      description: 'Soluções sustentáveis de energia',
      color: '#3b82f6',
      icon: '⚡'
    },
    {
      id: 'reformas-ecologicas',
      name: 'Reformas Ecológicas',
      slug: 'reformas-ecologicas',
      description: 'Reformas sustentáveis para sua casa',
      color: '#f59e0b',
      icon: '🏠'
    },
    {
      id: 'sustentabilidade-geral',
      name: 'Sustentabilidade Geral',
      slug: 'sustentabilidade-geral',
      description: 'Práticas gerais de sustentabilidade',
      color: '#10b981',
      icon: '♻️'
    }
  ];

  for (const categoryData of categories) {
    const category = await prisma.category.upsert({
      where: { id: categoryData.id },
      update: {},
      create: categoryData
    });
    console.log('✅ Categoria criada:', category.name);
  }

  // Criar tags
  const tags = [
    { id: 'plantas', name: 'Plantas', slug: 'plantas' },
    { id: 'energia-solar', name: 'Energia Solar', slug: 'energia-solar' },
    { id: 'compostagem', name: 'Compostagem', slug: 'compostagem' },
    { id: 'reciclagem', name: 'Reciclagem', slug: 'reciclagem' },
    { id: 'diy', name: 'DIY', slug: 'diy' },
    { id: 'economia', name: 'Economia', slug: 'economia' }
  ];

  for (const tagData of tags) {
    const tag = await prisma.tag.upsert({
      where: { id: tagData.id },
      update: {},
      create: tagData
    });
    console.log('✅ Tag criada:', tag.name);
  }

  console.log('🎉 Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

