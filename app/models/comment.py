from .db import db

class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key = True)
    userid = db.Column(db.Integer, db.ForeignKey('users.id'))
    postid = db.Column(db.Integer, db.ForeignKey('posts.id'))
    commentText = db.Column(db.String(500), nullable = False)
    

    def to_dict(self):
        print(self)
        return {
            "id": self.id,
            "userid": self.userid,
            "postid": self.postid,
            "commentText": self.commentText
        }