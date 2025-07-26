from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash, generate_password_hash
import jwt
import datetime
from src.models.article import db, Admin

auth_bp = Blueprint('auth', __name__)

SECRET_KEY = 'asdf#FGSgvasgf$5$WGT'

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return jsonify({'error': 'Email e senha são obrigatórios'}), 400
        
        admin = Admin.query.filter_by(email=email).first()
        
        if not admin or not check_password_hash(admin.password_hash, password):
            return jsonify({'error': 'Credenciais inválidas'}), 401
        
        # Gerar token JWT
        token = jwt.encode({
            'admin_id': admin.id,
            'email': admin.email,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, SECRET_KEY, algorithm='HS256')
        
        return jsonify({
            'token': token,
            'admin': admin.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/verify', methods=['GET'])
def verify_token():
    try:
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'error': 'Token não fornecido'}), 401
        
        if token.startswith('Bearer '):
            token = token[7:]
        
        decoded = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        admin_id = decoded['admin_id']
        
        admin = Admin.query.get(admin_id)
        if not admin:
            return jsonify({'error': 'Admin não encontrado'}), 404
        
        return jsonify({
            'valid': True,
            'admin': admin.to_dict()
        }), 200
        
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Token expirado'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Token inválido'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def require_auth(f):
    """Decorator para proteger rotas que precisam de autenticação"""
    def decorated_function(*args, **kwargs):
        try:
            token = request.headers.get('Authorization')
            if not token:
                return jsonify({'error': 'Token não fornecido'}), 401
            
            if token.startswith('Bearer '):
                token = token[7:]
            
            decoded = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            admin_id = decoded['admin_id']
            
            admin = Admin.query.get(admin_id)
            if not admin:
                return jsonify({'error': 'Admin não encontrado'}), 404
            
            # Adicionar admin ao contexto da requisição
            request.current_admin = admin
            
            return f(*args, **kwargs)
            
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token expirado'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Token inválido'}), 401
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    decorated_function.__name__ = f.__name__
    return decorated_function

