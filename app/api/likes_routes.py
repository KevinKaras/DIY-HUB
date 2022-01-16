from flask import Blueprint, jsonify, request
from app.models import Like, db

likes_routes = Blueprint('likes', __name__)


@likes_routes.route('/get/<int:postid>')
def obtain(postid):
    likes = Like.query.filter_by(postid = postid).all()
    # print(likes)
    
    return {like.id: like.to_dict() for like in likes}

@likes_routes.route('/add', methods=['POST'])
def create():

    objRequest = request.json
    print(objRequest)
    like = Like(
        userid = objRequest['sessionUserId'],
        username = objRequest['sessionUsername'],
        postid = objRequest['postId']
    )
    
    db.session.add(like)
    db.session.commit()
    return like.to_dict()

@likes_routes.route('/remove/<int:postId>/<int:sessionUserId>', methods=['DELETE'])
def delete(postId, sessionUserId):
    
    like = Like.query.filter_by(postid=postId).filter_by(userid=sessionUserId).one()
    likeid = like.to_dict()
    db.session.delete(like)
    db.session.commit()
    return likeid
