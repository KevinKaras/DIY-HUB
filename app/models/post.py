from .db import db 

class Post(db.Model):
    __tablename__ ='posts'

    id = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.Integer, db.ForeignKey('users.id'))
    name = db.Column(db.String(100), nullable=False, unique=True)
    instructions = db.Column(db.String(5000), nullable=False)
    url = db.Column(db.String(1000), nullable=False)
    category = db.Column(db.String(20), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "userid": self.userid,
            "name": self.name,
            "instructions": self.instructions,
            "url": self.url,
            "category": self.category
        }

    