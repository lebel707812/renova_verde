from flask import Blueprint, request, jsonify
from src.models.article import db, Article, Category, Tag, Author, article_tags
from src.routes.auth import require_auth
from sqlalchemy import or_, and_
import re
from datetime import datetime

articles_bp = Blueprint('articles', __name__)

def generate_slug(title):
    """Gera um slug a partir do título"""
    slug = re.sub(r'[^\w\s-]', '', title.lower())
    slug = re.sub(r'[-\s]+', '-', slug)
    return slug.strip('-')

def calculate_reading_time(content):
    """Calcula o tempo de leitura baseado no conteúdo"""
    words = len(content.split())
    reading_time = max(1, round(words / 200))  # 200 palavras por minuto
    return reading_time

@articles_bp.route('/articles', methods=['GET'])
def get_articles():
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        status = request.args.get('status')
        category_id = request.args.get('category_id', type=int)
        search = request.args.get('search')
        
        query = Article.query
        
        # Filtros
        if status:
            query = query.filter(Article.status == status)
        
        if category_id:
            query = query.filter(Article.category_id == category_id)
        
        if search:
            search_term = f"%{search}%"
            query = query.filter(
                or_(
                    Article.title.ilike(search_term),
                    Article.content.ilike(search_term),
                    Article.excerpt.ilike(search_term)
                )
            )
        
        # Ordenação
        query = query.order_by(Article.created_at.desc())
        
        # Paginação
        articles = query.paginate(
            page=page, 
            per_page=per_page, 
            error_out=False
        )
        
        return jsonify({
            'articles': [article.to_dict() for article in articles.items],
            'total': articles.total,
            'pages': articles.pages,
            'current_page': page,
            'per_page': per_page,
            'has_next': articles.has_next,
            'has_prev': articles.has_prev
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@articles_bp.route('/articles/<int:article_id>', methods=['GET'])
def get_article(article_id):
    try:
        article = Article.query.get_or_404(article_id)
        return jsonify(article.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@articles_bp.route('/articles/slug/<slug>', methods=['GET'])
def get_article_by_slug(slug):
    try:
        article = Article.query.filter_by(slug=slug).first_or_404()
        
        # Incrementar visualizações
        article.views += 1
        db.session.commit()
        
        return jsonify(article.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@articles_bp.route('/articles', methods=['POST'])
@require_auth
def create_article():
    try:
        data = request.get_json()
        
        title = data.get('title')
        content = data.get('content')
        category_id = data.get('category_id')
        
        if not title or not content or not category_id:
            return jsonify({'error': 'Título, conteúdo e categoria são obrigatórios'}), 400
        
        # Verificar se a categoria existe
        category = Category.query.get(category_id)
        if not category:
            return jsonify({'error': 'Categoria não encontrada'}), 404
        
        # Gerar slug único
        base_slug = generate_slug(title)
        slug = base_slug
        counter = 1
        while Article.query.filter_by(slug=slug).first():
            slug = f"{base_slug}-{counter}"
            counter += 1
        
        # Calcular tempo de leitura
        reading_time = calculate_reading_time(content)
        
        # Criar artigo
        article = Article(
            title=title,
            slug=slug,
            content=content,
            excerpt=data.get('excerpt', ''),
            featured_image=data.get('featured_image', ''),
            status=data.get('status', 'draft'),
            category_id=category_id,
            author_id=data.get('author_id', 1),  # Default para primeiro autor
            reading_time=reading_time
        )
        
        db.session.add(article)
        db.session.flush()  # Para obter o ID do artigo
        
        # Adicionar tags se fornecidas
        tag_ids = data.get('tag_ids', [])
        if tag_ids:
            tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()
            article.tags = tags
        
        db.session.commit()
        
        return jsonify(article.to_dict()), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@articles_bp.route('/articles/<int:article_id>', methods=['PUT'])
@require_auth
def update_article(article_id):
    try:
        article = Article.query.get_or_404(article_id)
        data = request.get_json()
        
        # Atualizar campos se fornecidos
        if 'title' in data:
            article.title = data['title']
            # Regenerar slug se título mudou
            if data['title'] != article.title:
                base_slug = generate_slug(data['title'])
                slug = base_slug
                counter = 1
                while Article.query.filter(and_(Article.slug == slug, Article.id != article_id)).first():
                    slug = f"{base_slug}-{counter}"
                    counter += 1
                article.slug = slug
        
        if 'content' in data:
            article.content = data['content']
            article.reading_time = calculate_reading_time(data['content'])
        
        if 'excerpt' in data:
            article.excerpt = data['excerpt']
        
        if 'featured_image' in data:
            article.featured_image = data['featured_image']
        
        if 'status' in data:
            article.status = data['status']
        
        if 'category_id' in data:
            category = Category.query.get(data['category_id'])
            if not category:
                return jsonify({'error': 'Categoria não encontrada'}), 404
            article.category_id = data['category_id']
        
        if 'author_id' in data:
            author = Author.query.get(data['author_id'])
            if not author:
                return jsonify({'error': 'Autor não encontrado'}), 404
            article.author_id = data['author_id']
        
        # Atualizar tags se fornecidas
        if 'tag_ids' in data:
            tags = Tag.query.filter(Tag.id.in_(data['tag_ids'])).all()
            article.tags = tags
        
        article.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify(article.to_dict()), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@articles_bp.route('/articles/<int:article_id>', methods=['DELETE'])
@require_auth
def delete_article(article_id):
    try:
        article = Article.query.get_or_404(article_id)
        db.session.delete(article)
        db.session.commit()
        
        return jsonify({'message': 'Artigo deletado com sucesso'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@articles_bp.route('/categories', methods=['GET'])
def get_categories():
    try:
        categories = Category.query.all()
        return jsonify([category.to_dict() for category in categories]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@articles_bp.route('/tags', methods=['GET'])
def get_tags():
    try:
        tags = Tag.query.all()
        return jsonify([tag.to_dict() for tag in tags]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@articles_bp.route('/authors', methods=['GET'])
def get_authors():
    try:
        authors = Author.query.all()
        return jsonify([author.to_dict() for author in authors]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

