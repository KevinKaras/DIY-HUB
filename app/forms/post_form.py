from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Post

class PostForm(FlaskForm):
    userid = IntegerField('userId', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired()])
    instructions = StringField('instructions', validators=[DataRequired()])
    category = StringField('category', validators=[DataRequired()])
    