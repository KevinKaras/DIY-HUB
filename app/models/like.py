from .db import db

class Like(db.Model):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key = True)
    userid = db.Column(db.Integer, db.ForeignKey('users.id'))
    postid = db.Column(db.Integer, db.ForeignKey('posts.id'))

    def to_dict(self):
        return {
            "id": self.id,
            "userid": self.userid,
            "postid": self.postid
        }