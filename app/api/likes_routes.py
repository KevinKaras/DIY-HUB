from flask import Blueprint, jsonify, request
from app.models import Like, db

likes_routes = Blueprint('likes', __name__)

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
