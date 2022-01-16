from .db import db
from sqlalchemy.orm import relationship

class Like(db.Model):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key = True)
    userid = db.Column(db.Integer, db.ForeignKey('users.id'))
    username = db.Column(db.String, db.ForeignKey('users.username'))
    postid = db.Column(db.Integer, db.ForeignKey('posts.id'))
    

    def to_dict(self):
        return {
            "id": self.id,
            "userid": self.userid,
            "username": self.username,
            "postid": self.postid
        }