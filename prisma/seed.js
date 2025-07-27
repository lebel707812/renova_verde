const { PrismaClient } = require("../src/generated/prisma");

const prisma = new PrismaClient();

async function main() {
  // Criar autores
  const author1 = await prisma.author.upsert({
    where: { email: "maria@renovaverde.com" },
    update: {},
    create: {
      name: "Maria Silva",
      email: "maria@renovaverde.com",
      bio: "Especialista em jardinagem urbana e sustentabilidade doméstica.",
      avatar: "/images/authors/maria.jpg",
      social_links: {
        instagram: "@maria_verde",
        linkedin: "maria-silva-verde",
      },
    },
  });

  const author2 = await prisma.author.upsert({
    where: { email: "joao@renovaverde.com" },
    update: {},
    create: {
      name: "João Santos",
      email: "joao@renovaverde.com",
      bio: "Engenheiro especializado em energia renovável e eficiência energética.",
      avatar: "/images/authors/joao.jpg",
      social_links: {
        instagram: "@joao_energia",
        linkedin: "joao-santos-energia",
      },
    },
  });

  // Criar categorias
  const category1 = await prisma.category.upsert({
    where: { slug: "jardinagem-urbana" },
    update: {},
    create: {
      name: "Jardinagem Urbana",
      slug: "jardinagem-urbana",
      description: "Dicas e técnicas para cultivar plantas em espaços urbanos",
      color: "#22c55e",
    },
  });

  const category2 = await prisma.category.upsert({
    where: { slug: "energia-renovavel" },
    update: {},
    create: {
      name: "Energia Renovável",
      slug: "energia-renovavel",
      description: "Soluções sustentáveis para geração de energia",
      color: "#3b82f6",
    },
  });

  const category3 = await prisma.category.upsert({
    where: { slug: "sustentabilidade" },
    update: {},
    create: {
      name: "Sustentabilidade",
      slug: "sustentabilidade",
      description: "Práticas sustentáveis para o dia a dia",
      color: "#10b981",
    },
  });

  // Criar tags
  const tag1 = await prisma.tag.upsert({
    where: { slug: "plantas" },
    update: {},
    create: {
      name: "Plantas",
      slug: "plantas",
    },
  });

  const tag2 = await prisma.tag.upsert({
    where: { slug: "energia-solar" },
    update: {},
    create: {
      name: "Energia Solar",
      slug: "energia-solar",
    },
  });

  const tag3 = await prisma.tag.upsert({
    where: { slug: "compostagem" },
    update: {},
    create: {
      name: "Compostagem",
      slug: "compostagem",
    },
  });

  const tag4 = await prisma.tag.upsert({
    where: { slug: "reformas" },
    update: {},
    create: {
      name: "Reformas",
      slug: "reformas",
    },
  });

  // Criar artigos de exemplo
  const article1 = await prisma.article.upsert({
    where: { slug: "jardim-vertical-apartamento" },
    update: {},
    create: {
      title: "Como Criar um Jardim Vertical no Seu Apartamento",
      slug: "jardim-vertical-apartamento",
      content: `# Como Criar um Jardim Vertical no Seu Apartamento\n\nTransformar um pequeno espaço urbano em um oásis verde é mais fácil do que você imagina. Os jardins verticais são uma solução perfeita para quem vive em apartamentos e quer trazer mais natureza para casa.\n\n## Materiais Necessários\n\n- Estrutura de madeira ou metal\n- Vasos ou jardineiras\n- Terra vegetal\n- Plantas adequadas para ambientes internos\n- Sistema de irrigação (opcional)\n\n## Passo a Passo\n\n1. **Escolha o local ideal**: Procure uma parede que receba luz natural, mas não sol direto o dia todo.\n\n2. **Monte a estrutura**: Fixe a estrutura na parede de forma segura, considerando o peso dos vasos com terra e água.\n\n3. **Selecione as plantas**: Opte por espécies que se adaptam bem a ambientes internos como samambaias, jiboias e suculentas.\n\n4. **Plante e organize**: Distribua as plantas de forma harmoniosa, considerando o crescimento de cada espécie.\n\n5. **Crie um sistema de irrigação**: Para facilitar a manutenção, considere instalar um sistema de gotejamento.\n\n## Dicas Importantes\n\n- Comece pequeno e vá expandindo gradualmente\n- Monitore a umidade do solo regularmente\n- Faça a poda quando necessário\n- Use fertilizante orgânico mensalmente\n\nCom dedicação e cuidado, seu jardim vertical se tornará um ponto focal incrível no seu apartamento!`,
      excerpt: "Descubra como transformar seu apartamento com um jardim vertical sustentável e de baixo custo.",
      featured_image: "/images/jardim-vertical.jpg",
      status: "published",
      views: 150,
      likes: 23,
      reading_time: 5,
      meta_title: "Jardim Vertical para Apartamento - Guia Completo",
      meta_description: "Aprenda a criar um jardim vertical no seu apartamento com este guia passo a passo. Dicas, materiais e plantas ideais.",
      published_at: new Date(),
      category_id: category1.id,
      author_id: author1.id,
    },
  });

  await prisma.article.update({
    where: { id: article1.id },
    data: {
      tags: {
        connect: [{ id: tag1.id }, { id: tag3.id }],
      },
    },
  });

  const article2 = await prisma.article.upsert({
    where: { slug: "energia-solar-residencial" },
    update: {},
    create: {
      title: "Energia Solar Residencial: Vale a Pena Investir?",
      slug: "energia-solar-residencial",
      content: `# Energia Solar Residencial: Vale a Pena Investir?\n\nA energia solar tem se tornado cada vez mais acessível e atrativa para residências brasileiras. Mas será que realmente vale a pena fazer esse investimento?\n\n## Vantagens da Energia Solar\n\n### Economia na Conta de Luz\nCom um sistema solar bem dimensionado, é possível reduzir a conta de energia em até 95%.\n\n### Sustentabilidade\nA energia solar é limpa e renovável, contribuindo para a redução da pegada de carbono.\n\n### Valorização do Imóvel\nCasas com sistema solar tendem a ter maior valor de mercado.\n\n## Custos e Retorno do Investimento\n\nO investimento inicial pode variar de R$ 15.000 a R$ 50.000, dependendo do tamanho do sistema. O retorno do investimento geralmente ocorre entre 4 a 7 anos.\n\n## Como Funciona\n\n1. **Painéis solares** captam a luz do sol\n2. **Inversor** converte a energia para uso doméstico\n3. **Medidor bidirecional** registra energia consumida e injetada na rede\n\n## Considerações Importantes\n\n- Avalie a incidência solar no seu telhado\n- Verifique as condições estruturais\n- Escolha uma empresa certificada\n- Considere o financiamento disponível\n\nA energia solar é um investimento que traz benefícios econômicos e ambientais a longo prazo!`,
      excerpt: "Análise completa sobre os custos, benefícios e retorno do investimento em energia solar residencial.",
      featured_image: "/images/energia-solar.jpg",
      status: "published",
      views: 89,
      likes: 15,
      reading_time: 7,
      meta_title: "Energia Solar Residencial - Análise de Investimento",
      meta_description: "Descubra se vale a pena investir em energia solar residencial. Custos, benefícios e retorno do investimento.",
      published_at: new Date(),
      category_id: category2.id,
      author_id: author2.id,
    },
  });

  await prisma.article.update({
    where: { id: article2.id },
    data: {
      tags: {
        connect: [{ id: tag2.id }],
      },
    },
  });

  const article3 = await prisma.article.upsert({
    where: { slug: "compostagem-domestica" },
    update: {},
    create: {
      title: "Compostagem Doméstica: Transforme Lixo em Adubo",
      slug: "compostagem-domestica",
      content: `# Compostagem Doméstica: Transforme Lixo em Adubo\n\nA compostagem é uma das práticas mais simples e eficazes para reduzir o lixo doméstico e produzir adubo natural para suas plantas.\n\n## O que é Compostagem?\n\nÉ o processo natural de decomposição de matéria orgânica por microorganismos, resultando em um composto rico em nutrientes.\n\n## Materiais para Compostagem\n\n### Materiais Verdes (Ricos em Nitrogênio)\n- Restos de frutas e vegetais\n- Borra de café\n- Cascas de ovos\n- Folhas verdes\n\n### Materiais Marrons (Ricos em Carbono)\n- Folhas secas\n- Papel picado\n- Serragem\n- Galhos pequenos\n\n## Como Fazer\n\n1. **Escolha o recipiente**: Pode ser uma composteira comprada ou feita em casa\n2. **Alterne camadas**: Intercale materiais verdes e marrons\n3. **Mantenha úmido**: A umidade deve ser como uma esponja torcida\n4. **Revolva regularmente**: Misture o material a cada 2 semanas\n5. **Aguarde**: O processo leva de 2 a 6 meses\n\n## Dicas Importantes\n\n- Evite carnes, laticínios e gorduras\n- Corte os materiais em pedaços pequenos\n- Mantenha a proporção 3:1 (marrom:verde)\n- Monitore o odor - não deve cheirar mal\n\n## Benefícios\n\n- Reduz até 30% do lixo doméstico\n- Produz adubo natural gratuito\n- Diminui a emissão de gases do efeito estufa\n- Melhora a qualidade do solo\n\nComece hoje mesmo e faça a diferença para o meio ambiente!`,
      excerpt: "Aprenda a fazer compostagem doméstica e transforme seus restos orgânicos em adubo natural.",
      featured_image: "/images/compostagem.jpg",
      status: "published",
      views: 67,
      likes: 12,
      reading_time: 6,
      meta_title: "Compostagem Doméstica - Guia Prático",
      meta_description: "Guia completo de compostagem doméstica. Aprenda a transformar lixo orgânico em adubo natural.",
      published_at: new Date(),
      category_id: category3.id,
      author_id: author1.id,
    },
  });

  await prisma.article.update({
    where: { id: article3.id },
    data: {
      tags: {
        connect: [{ id: tag3.id }, { id: tag1.id }],
      },
    },
  });

  const article4 = await prisma.article.upsert({
    where: { slug: "reformas-sustentaveis-para-sua-casa" },
    update: {},
    create: {
      title: "Reformas Sustentáveis para Sua Casa: Economia e Meio Ambiente",
      slug: "reformas-sustentaveis-para-sua-casa",
      content: `# Reformas Sustentáveis para Sua Casa: Economia e Meio Ambiente\n\nRealizar reformas em casa pode ser uma oportunidade excelente para torná-la mais sustentável, economizar recursos e contribuir para o meio ambiente.\n\n## Materiais Ecológicos\n\n- **Tintas à base de água**: Menos poluentes e sem cheiro forte.\n- **Madeira de demolição ou certificada**: Evita o desmatamento ilegal.\n- **Tijolos ecológicos**: Produzidos com menor impacto ambiental.\n- **Isolamento térmico natural**: Cortiça, lã de rocha ou celulose.\n\n## Dicas para uma Reforma Sustentável\n\n1. **Reaproveite e recicle**: Antes de comprar, veja o que pode ser restaurado ou reutilizado.\n2. **Otimize a iluminação natural**: Use cores claras e espelhos para refletir a luz.\n3. **Instale sistemas de captação de água da chuva**: Reduza o consumo de água potável.\n4. **Invista em eletrodomésticos eficientes**: Selo Procel A garante menor consumo de energia.\n5. **Planeje a ventilação cruzada**: Diminui a necessidade de ar condicionado.\n\n## Benefícios\n\n- **Economia a longo prazo**: Redução nas contas de água e luz.\n- **Conforto térmico**: Ambientes mais agradáveis naturalmente.\n- **Saúde**: Menos produtos químicos e melhor qualidade do ar.\n- **Valorização do imóvel**: Casas sustentáveis são mais procuradas.\n\nComece sua reforma pensando verde e colha os benefícios para você e para o planeta!`,
      excerpt: "Descubra como fazer reformas sustentáveis em sua casa, economizando dinheiro e protegendo o meio ambiente.",
      featured_image: "/images/reformas-sustentaveis.jpg",
      status: "published",
      views: 95,
      likes: 18,
      reading_time: 8,
      meta_title: "Reformas Sustentáveis - Guia Completo",
      meta_description: "Guia completo para reformas sustentáveis em casa. Materiais ecológicos, dicas e benefícios para o meio ambiente.",
      published_at: new Date(),
      category_id: category3.id,
      author_id: author2.id,
    },
  });

  await prisma.article.update({
    where: { id: article4.id },
    data: {
      tags: {
        connect: [{ id: tag4.id }, { id: tag3.id }],
      },
    },
  });

  console.log("Seed executado com sucesso!");
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


