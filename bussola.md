# Bússola do Projeto Renova Verde

Este documento serve como um guia para o desenvolvimento e manutenção do projeto Renova Verde.

## Contexto Inicial

O projeto Renova Verde visa criar uma plataforma para gerenciamento de artigos e dashboard administrativo. A solicitação atual envolveu a recriação do front-end para as seções de dashboard, criação de artigos e gerenciamento de artigos, baseando-se nos modelos de dados do backend Flask.

## Análise do Backend Realizada

Foi verificado que o backend é uma aplicação Flask em Python utilizando SQLAlchemy como ORM. Não foi encontrado um arquivo `schema.prisma`, confirmando que o Prisma ORM não está sendo utilizado. Os modelos de dados identificados incluem:

### Modelos Principais

**Article (Artigo)**
- Campos: id, title, slug, content, excerpt, featured_image, status, category_id, author_id, views, likes, reading_time, created_at, updated_at
- Relacionamentos: Category, Author, Tags (many-to-many)
- Status: draft ou published

**Category (Categoria)**
- Campos: id, name, slug, description, color, created_at
- Relacionamento: Articles (one-to-many)

**Author (Autor)**
- Campos: id, name, email, bio, avatar, social_links, created_at
- Relacionamento: Articles (one-to-many)

**Tag (Tag)**
- Campos: id, name, slug, created_at
- Relacionamento: Articles (many-to-many via article_tags)

**Admin (Administrador)**
- Campos: id, email, password_hash, name, created_at

**User (Usuário)**
- Campos: id, username, email

## Remoção do Front-end Existente

As pastas `src/app/admin/dashboard` e `src/app/admin/articles` foram removidas com sucesso, limpando o front-end antigo para o dashboard, criação e gerenciamento de artigos.

## Desenvolvimento do Novo Front-end

Foi desenvolvido um novo front-end completo baseado nos modelos de dados do backend Flask, incluindo:

### Dashboard Administrativo (`/admin/dashboard`)
- Estatísticas gerais (total de artigos, visualizações, curtidas)
- Lista de artigos recentes com ações de edição e exclusão
- Navegação para criação de novos artigos
- Interface responsiva com componentes UI modernos

### Gerenciamento de Artigos (`/admin/articles`)
- Lista completa de artigos com filtros por status, categoria e busca por texto
- Visualização de informações detalhadas (categoria, autor, tags, estatísticas)
- Ações de edição, exclusão e alteração de status
- Interface de gerenciamento em massa

### Criação de Artigos (`/admin/articles/new`)
- Formulário completo para criação de novos artigos
- Upload de imagem destacada
- Seleção de categoria e autor
- Sistema de tags com criação dinâmica
- Cálculo automático de tempo de leitura
- Geração automática de slug baseada no título
- Opções para salvar como rascunho ou publicar

### Edição de Artigos (`/admin/articles/[id]/edit`)
- Formulário de edição pré-preenchido com dados existentes
- Todas as funcionalidades da criação
- Preservação do estado atual do artigo
- Atualização de status e conteúdo

### Características Técnicas
- Desenvolvido em React/Next.js com TypeScript
- Utilização de componentes UI modernos (shadcn/ui)
- Interface responsiva e acessível
- Integração com APIs do backend Flask
- Tratamento de erros e estados de carregamento
- Validação de formulários
- Upload de arquivos para imagens

## Próximos Passos

- Commit das alterações no repositório
- Testes de integração com o backend
- Possíveis ajustes baseados em feedbacktigos.

