from flask import Blueprint, jsonify
from app.models import Post

posts_routes = Blueprint('posts', __name__)

@posts_routes.route('/')
def posts():
    posts = Post.query.all()
    return {"posts": [post.to_dict() for post in posts]}
