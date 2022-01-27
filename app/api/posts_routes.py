from flask import Blueprint, jsonify, request
from ..forms.post_form import PostForm
from ..forms.comment_form import CommentForm
from app.models import Post, Image, db, Comment, User
from .auth_routes import validation_errors_to_error_messages
from app.s3_helpers import (upload_file_to_s3, allowed_file, get_unique_filename)
import json


posts_routes = Blueprint('posts', __name__)

@posts_routes.route('/')
def posts():
    return {post.id: post.to_dict() for post in Post.query.all()}

@posts_routes.route('/profile/<int:userId>')
def profilePosts(userId):
    
    ProfilePosts = Post.query.filter(Post.userid == userId).all()
    
    return {"posts": [post.to_dict() for post in ProfilePosts]}
    

@posts_routes.route('/<int:id>')
def post(id):
    post = Post.query.filter_by(id = id).one()
    user = User.query.filter_by(id = post.userid).one()
    return { "Post" : post.to_dict(), "Author" : user.to_dict() }

@posts_routes.route('/create', methods=['POST'])
def create():
   
    url = ""
    if "image" in request.files:
        image = request.files['image']
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        url = upload["url"]

    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Post(
            userid = form.data["userid"],
            name = form.data["name"],
            instructions = form.data["instructions"],
            url = url
        )
        db.session.add(post)
        db.session.commit()
        return post.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@posts_routes.route('/<int:postId>/comments')
def comment(postId):
    comments_users = db.session.query(Comment, User).filter(Comment.postid == postId, Comment.userid == User.id).all()
    # comments = Comment.query.filter_by(postid = postId).all() 
    # print(comments)
    
    usefulComments_users = []
    for C, U in comments_users:
        commentObj = {
            "comment": C.to_dict(),
            "user": U.to_dict()
        }
        usefulComments_users.append(commentObj)

        
    return {"comments": usefulComments_users}

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
        user = User.query.filter(User.id == comment.userid).one()
        CommentInfo = {
            "comment": comment.to_dict(),
            "user": user.to_dict()
        }
        return CommentInfo
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

@posts_routes.route("/<int:postId>/comments/<int:commentId>/delete", methods=['DELETE'])
def deleteComment(postId, commentId):
    comment = Comment.query.get(commentId)
    db.session.delete(comment)
    db.session.commit()
    return {"message": "Comment Deleted"}

@posts_routes.route("/<int:postId>/comments/delete", methods=['DELETE'])
def deleteAllComments(postId):
    comments = Comment.query.filter_by(postid = postId).all()
    
    for comment in comments:
        db.session.delete(comment)
    db.session.commit()
    return {"message": "All comments removed"}




@posts_routes.route('/<int:postId>/delete', methods=['DELETE'])
def delete(postId):
    post = Post.query.get(postId)
    db.session.delete(post)
    db.session.commit()
    return {"Status": "The post was deleted"}

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

    




    
