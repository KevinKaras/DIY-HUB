from flask import Blueprint, jsonify, request
from ..forms.post_form import PostForm
from app.models import Post, Photo, db
from .auth_routes import validation_errors_to_error_messages


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
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Post(
            userid = form.data["userId"],
            name = form.data["name"],
            instructions = form.data["instructions"]
        )
        db.session.add(post)
        db.session.commit()
        return post.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

@posts_routes.route('/<int:postId>/delete', methods=['DELETE'])
def delete(postId):
    post = Post.query.get(postId)
    db.session.delete(post)
    db.session.commit()
    return {"If you see this": "the post got deleted"}

    


    
