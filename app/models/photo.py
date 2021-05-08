from .db import db

class Photo(db.Model):
    __tablename_ = 'photos'

    id = db.Column(db.Integer, primary_key = True)
    userid = db.Column(db.Integer, db.ForeignKey('users.id'))
    postid = db.Column(db.Integer, db.ForeignKey('posts.id'))
    imageURL = db.Column(db.String(300), nullable = False)

    def to_dict(self):
        return {
            "id": self.id,
            "userid": self.userid,
            "postid": self.postid,
            "imageURL": self.imageURL
        }

    