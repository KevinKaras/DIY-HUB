from flask import Blueprint, jsonify
from app.models import Photo    

photo_routes = Blueprint('photos', __name__)

@photo_routes.route('/<int:id>')
def photo(id):
    photo = Photo.query.filter_by(postid = id).one()
    return photo.to_dict()
