from flask import Blueprint, jsonify, request
from ..forms.post_form import PostForm
from ..forms.comment_form import CommentForm
from app.models import Post, Photo, db, Comment, User
from .auth_routes import validation_errors_to_error_messages


posts_routes = Blueprint('posts', __name__)

@posts_routes.route('/')
def posts():
    posts = Post.query.all()
    return {"posts": [post.to_dict() for post in posts]}

@posts_routes.route('/profile/<int:userId>')
def profilePosts(userId):
    
    ProfilePosts = Post.query.filter(Post.userid == userId).all()
    
    return {"posts": [post.to_dict() for post in ProfilePosts]}
    

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
            instructions = form.data["instructions"],
            url = form.data["url"]
        )
        db.session.add(post)
        db.session.commit()
        return post.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@posts_routes.route('/<int:postId>/comments')
def comment(postId):
    comments = Comment.query.filter_by(postid = postId).options(joinedload(comment.userid)).all()
    print(comments)
    return {"comments": [comment.to_dict() for comment in comments]}

@posts_routes.route('/<int:postid>/comments/create', methods=["POST"])
def createComment(postid):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            userid = form.data["userid"],
            postid = form.data["postid"],
            commentText = form.data["commentText"]
        )
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

@posts_routes.route("/<int:postId>/comments/<int:commentId>/delete", methods=['DELETE'])
def deleteComment(postId, commentId):
    comment = Comment.query.get(commentId)
    db.session.delete(comment)
    db.session.commit()
    return {"message" : "If you see this, IT WORKED!"}

@posts_routes.route("/<int:postId>/comments/delete", methods=['DELETE'])
def deleteAllComments(postId):
    comments = Comment.query.filter_by(postid = postId).all()
    
    for comment in comments:
        db.session.delete(comment)
    db.session.commit()
    return {"message" : "If you see this, YOU DELETED ALL THE COMMENTS"}




@posts_routes.route('/<int:postId>/delete', methods=['DELETE'])
def delete(postId):
    post = Post.query.get(postId)
    db.session.delete(post)
    db.session.commit()
    return {"If you see this": "the post got deleted"}

@posts_routes.route('/<int:postId>/edit', methods=['POST'])
def update(postId):
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        oldPost = Post.query.get(postId)
        userid = form.data["userId"],
        name = form.data["name"],
        instructions = form.data["instructions"],
        url = form.data["url"]
        

        oldPost.userid = userid
        oldPost.name = name
        oldPost.instructions = instructions
        oldPost.url = url
        db.session.commit()

        return oldPost.to_dict()
    return {"error": "form never validated"}

    




    
