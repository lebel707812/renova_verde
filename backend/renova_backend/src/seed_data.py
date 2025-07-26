from src.models.article import db, Article, Category, Tag, Author, Admin
from werkzeug.security import generate_password_hash
import json

def seed_database():
    """Popula o banco de dados com dados iniciais"""
    
    # Criar admin
    admin_exists = Admin.query.filter_by(email='admin@renovaverde.com').first()
    if not admin_exists:
        admin = Admin(
            email='admin@renovaverde.com',
            password_hash=generate_password_hash('637664asdf'),
            name='Administrador'
        )
        db.session.add(admin)
    
    # Criar categorias
    categories_data = [
        {
            'name': 'Jardinagem Urbana',
            'slug': 'jardinagem-urbana',
            'description': 'Dicas e técnicas para jardins em espaços urbanos',
            'color': '#22c55e'
        },
        {
            'name': 'Energia Renovável',
            'slug': 'energia-renovavel',
            'description': 'Soluções sustentáveis de energia para casa',
            'color': '#3b82f6'
        },
        {
            'name': 'Reformas Ecológicas',
            'slug': 'reformas-ecologicas',
            'description': 'Reformas sustentáveis e materiais ecológicos',
            'color': '#f59e0b'
        }
    ]
    
    for cat_data in categories_data:
        category_exists = Category.query.filter_by(slug=cat_data['slug']).first()
        if not category_exists:
            category = Category(**cat_data)
            db.session.add(category)
    
    # Criar tags
    tags_data = [
        {'name': 'Sustentabilidade', 'slug': 'sustentabilidade'},
        {'name': 'DIY', 'slug': 'diy'},
        {'name': 'Economia', 'slug': 'economia'},
        {'name': 'Plantas', 'slug': 'plantas'},
        {'name': 'Solar', 'slug': 'solar'},
        {'name': 'Reciclagem', 'slug': 'reciclagem'},
        {'name': 'Compostagem', 'slug': 'compostagem'},
        {'name': 'Horta', 'slug': 'horta'}
    ]
    
    for tag_data in tags_data:
        tag_exists = Tag.query.filter_by(slug=tag_data['slug']).first()
        if not tag_exists:
            tag = Tag(**tag_data)
            db.session.add(tag)
    
    # Criar autores
    authors_data = [
        {
            'name': 'Maria Silva',
            'email': 'maria@renovaverde.com',
            'bio': 'Especialista em jardinagem urbana e sustentabilidade doméstica.',
            'avatar': '/images/author-maria.jpg',
            'social_links': json.dumps({
                'instagram': 'https://instagram.com/maria_verde',
                'linkedin': 'https://linkedin.com/in/maria-silva'
            })
        },
        {
            'name': 'João Santos',
            'email': 'joao@renovaverde.com',
            'bio': 'Engenheiro especializado em energia renovável e eficiência energética.',
            'avatar': '/images/author-joao.jpg',
            'social_links': json.dumps({
                'linkedin': 'https://linkedin.com/in/joao-santos',
                'twitter': 'https://twitter.com/joao_energia'
            })
        }
    ]
    
    for author_data in authors_data:
        author_exists = Author.query.filter_by(email=author_data['email']).first()
        if not author_exists:
            author = Author(**author_data)
            db.session.add(author)
    
    # Commit das categorias, tags e autores
    db.session.commit()
    
    # Criar artigos de exemplo
    articles_data = [
        {
            'title': 'Como Criar um Jardim Vertical em Casa',
            'slug': 'como-criar-jardim-vertical-casa',
            'content': '''# Como Criar um Jardim Vertical em Casa

Os jardins verticais são uma excelente solução para quem vive em espaços pequenos mas não quer abrir mão do verde em casa. Além de purificar o ar, eles trazem vida e cor para qualquer ambiente.

## Materiais Necessários

- Estrutura de madeira ou metal
- Vasos ou recipientes
- Terra vegetal
- Plantas adequadas
- Sistema de irrigação

## Passo a Passo

### 1. Escolha do Local
Selecione uma parede que receba luz natural por pelo menos 4 horas diárias.

### 2. Montagem da Estrutura
Fixe a estrutura na parede de forma segura, considerando o peso dos vasos com terra e água.

### 3. Seleção das Plantas
Escolha plantas que se adaptem bem ao ambiente vertical, como:
- Samambaias
- Jibóias
- Suculentas
- Temperos

### 4. Sistema de Irrigação
Instale um sistema de gotejamento para facilitar a rega.

## Cuidados Importantes

- Regue regularmente, mas sem encharcar
- Faça podas quando necessário
- Fertilize mensalmente
- Observe sinais de pragas ou doenças

Com essas dicas, você terá um lindo jardim vertical que transformará sua casa!''',
            'excerpt': 'Aprenda a criar um jardim vertical em casa com materiais simples e transforme seu espaço em um ambiente mais verde e sustentável.',
            'featured_image': '/images/article-1.jpg',
            'status': 'published',
            'category_slug': 'jardinagem-urbana',
            'author_email': 'maria@renovaverde.com',
            'tags': ['sustentabilidade', 'diy', 'plantas']
        },
        {
            'title': 'Energia Solar Residencial: Guia Completo',
            'slug': 'energia-solar-residencial-guia-completo',
            'content': '''# Energia Solar Residencial: Guia Completo

A energia solar é uma das formas mais eficientes e sustentáveis de gerar eletricidade em casa. Com a redução dos custos dos painéis solares, nunca foi tão acessível investir nesta tecnologia.

## Como Funciona

O sistema fotovoltaico converte a luz solar em energia elétrica através de células fotovoltaicas. Esta energia pode ser usada imediatamente ou armazenada em baterias.

## Componentes do Sistema

### Painéis Solares
- Monocristalinos: Maior eficiência
- Policristalinos: Melhor custo-benefício
- Filme fino: Mais flexíveis

### Inversor
Converte a corrente contínua em corrente alternada.

### Sistema de Monitoramento
Acompanha a produção e consumo de energia.

## Vantagens

- Redução na conta de luz
- Energia limpa e renovável
- Valorização do imóvel
- Baixa manutenção

## Investimento e Retorno

O investimento inicial varia entre R$ 15.000 a R$ 50.000, com retorno em 4 a 7 anos.

## Instalação

Recomenda-se contratar empresa especializada para:
- Análise do local
- Dimensionamento do sistema
- Instalação profissional
- Homologação junto à concessionária

A energia solar é o futuro da energia residencial!''',
            'excerpt': 'Descubra como a energia solar pode reduzir sua conta de luz e contribuir para um futuro mais sustentável.',
            'featured_image': '/images/article-2.jpg',
            'status': 'published',
            'category_slug': 'energia-renovavel',
            'author_email': 'joao@renovaverde.com',
            'tags': ['solar', 'economia', 'sustentabilidade']
        },
        {
            'title': 'Materiais Sustentáveis para Reforma',
            'slug': 'materiais-sustentaveis-reforma',
            'content': '''# Materiais Sustentáveis para Reforma

Reformar a casa é uma oportunidade única de torná-la mais sustentável. A escolha dos materiais certos pode fazer toda a diferença para o meio ambiente e para sua saúde.

## Materiais Recomendados

### Pisos Sustentáveis
- **Bambu**: Renovável e resistente
- **Cortiça**: Isolante térmico natural
- **Madeira certificada**: FSC ou similar

### Tintas Ecológicas
- Baixo VOC (compostos orgânicos voláteis)
- Base d'água
- Pigmentos naturais

### Isolamento Térmico
- **Lã de pet**: Feita de garrafas recicladas
- **Fibra de coco**: Natural e eficiente
- **Celulose**: Papel reciclado

## Benefícios dos Materiais Sustentáveis

### Para o Meio Ambiente
- Menor pegada de carbono
- Redução de resíduos
- Preservação de recursos naturais

### Para a Saúde
- Melhor qualidade do ar interno
- Menos produtos químicos tóxicos
- Ambiente mais saudável

### Para o Bolso
- Maior durabilidade
- Economia de energia
- Valorização do imóvel

## Onde Encontrar

- Lojas especializadas em construção sustentável
- Cooperativas de reciclagem
- Fornecedores certificados

## Dicas de Compra

1. Verifique certificações ambientais
2. Pesquise a origem dos materiais
3. Compare durabilidade e custo-benefício
4. Considere o ciclo de vida completo

Investir em materiais sustentáveis é investir no futuro!''',
            'excerpt': 'Conheça os melhores materiais sustentáveis para sua reforma e torne sua casa mais ecológica e saudável.',
            'featured_image': '/images/article-3.png',
            'status': 'published',
            'category_slug': 'reformas-ecologicas',
            'author_email': 'maria@renovaverde.com',
            'tags': ['sustentabilidade', 'reciclagem', 'economia']
        }
    ]
    
    for article_data in articles_data:
        article_exists = Article.query.filter_by(slug=article_data['slug']).first()
        if not article_exists:
            # Buscar categoria e autor
            category = Category.query.filter_by(slug=article_data['category_slug']).first()
            author = Author.query.filter_by(email=article_data['author_email']).first()
            
            if category and author:
                # Calcular tempo de leitura
                words = len(article_data['content'].split())
                reading_time = max(1, round(words / 200))
                
                article = Article(
                    title=article_data['title'],
                    slug=article_data['slug'],
                    content=article_data['content'],
                    excerpt=article_data['excerpt'],
                    featured_image=article_data['featured_image'],
                    status=article_data['status'],
                    category_id=category.id,
                    author_id=author.id,
                    reading_time=reading_time
                )
                
                db.session.add(article)
                db.session.flush()  # Para obter o ID do artigo
                
                # Adicionar tags
                for tag_slug in article_data['tags']:
                    tag = Tag.query.filter_by(slug=tag_slug).first()
                    if tag:
                        article.tags.append(tag)
    
    db.session.commit()
    print("Banco de dados populado com sucesso!")

if __name__ == '__main__':
    from src.main import app
    with app.app_context():
        seed_database()

