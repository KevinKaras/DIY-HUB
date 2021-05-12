from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Comment

class CommentForm(FlaskForm):
    userid = IntegerField("userid", validators=[DataRequired()])
    postid = IntegerField("postid", validators=[DataRequired()])
    commentText = StringField("commentText", validators=[DataRequired()])