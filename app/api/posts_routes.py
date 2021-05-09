from flask import Blueprint, jsonify, request
from app.models import Post, Photo

posts_routes = Blueprint('posts', __name__)

@posts_routes.route('/')
def posts():
    posts = Post.query.all()
    return {"posts": [post.to_dict() for post in posts]}

@posts_routes.route('/<int:id>')
def post(id):
    post = Post.query.filter_by(id = id).one()
    return post.to_dict()

@posts_routes.route('/create', methods=['POST'])
def create():
     
     return data
