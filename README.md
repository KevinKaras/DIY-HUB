# Walk-Through of DIYHUB

On this app, users can come and share their "Do-It-Yourself" stories for their personal projects for other viewers and the community to interact with.

If you would like to check this App out the link is https://diyhub-kk.herokuapp.com/

# Here is what to expect while using the App.

## The Home Page to view already made projects from users
![ed6de4ac4dad6a8c4182ac67b57b34e0](https://user-images.githubusercontent.com/74946124/124809679-ff9a0500-df25-11eb-993d-8d290308691c.jpg)



## Clicking sign-up will allow you to access certain features of the App
<img width="971" alt="8ed0fbf7be93c601b1c16126a2b7e2a5" src="https://user-images.githubusercontent.com/74946124/124664941-bd16f080-de71-11eb-9f0b-a57e9762b13f.png">


## Clicking Login will bring you to the user login page
<img width="971" alt="f38be82508cc3d87138087f30a33790f" src="https://user-images.githubusercontent.com/74946124/124664787-8fca4280-de71-11eb-80f2-9a54f9eef9f0.png">


## Visiting a Post Page
![a4baa4c48eb9e0b7440754d614957b70](https://user-images.githubusercontent.com/74946124/124665558-7aa1e380-de72-11eb-9586-2eecbd716424.jpg)


## Making a post of your own
<img width="995" alt="24f7849a5d2e9afa07d8609b8bf9eedf" src="https://user-images.githubusercontent.com/74946124/124665858-dbc9b700-de72-11eb-9f12-96e179d5cc49.png">



# Technologies Used In DIYHUB 
## Front End
- JavaScript
- React
- Redux
- HTML
- CSS
- Hosted on Heroku
- Node.js

## Back End
- PostgreSQL
- SQLAlchemy
- Flask


# Functionalities
- Users can read interesting and helpful posts to create their own clone of the project
- Users can create posts and have other users interact with the posts by commenting
- Users can view all the posts that they've made on their personal profile
- Users can edit posts that they have already made in order to seemlessly update them 
- Users can leave comments or reviews of the projects they interact with
- User authentication is completed by hashing passwords using bcrypt js library (csurf protected as well)

# Challenges While Building
Working on the backend of the project, began right around the time where I almost completely forgot how to set up routes / gain infomation from the back end. This caused me a great panic, but also opened my eyes to what is possible when you have to almost completely relearn an area of information in a set amount of time. I couldn't be more greatful for this experiece, my ability of being able to read documentation and discover exactly what I'm searching for with ease came during this episode. 

# Some Front / Back End Code Snippets

```function Post() {

    const dispatch = useDispatch()
    const history = useHistory()
    const params = useParams()
    const postId = Number(params.id)
    const posts = useSelector(state => state.posts)
    const photo = useSelector(state => state.photos)
    const sessionUser = useSelector(state => state.session.user)

    const [comment, setComment] = useState('')


    const currentPost = useSelector(state => state.posts[postId]) 

    const comments = useSelector(state => state.CommentsOfPost)

  
    const onDelete = async (e) => {
      e.preventDefault()
      await dispatch(deleteAllComments(postId))
      await dispatch(deletePost(postId))
      
      history.push(`/`)
    }
    
    const onCreateComm = async (e) => {
      e.preventDefault()
      await dispatch(addComment(sessionUser.id, postId, comment))
      setComment("")
    }

    const onDeleteComment = async (e, commentId, postId) => {
      e.preventDefault()
      await dispatch(deleteComment(postId, commentId))
    }

    const onEditPost = async (e) => {
      history.push(`/post/${postId}/edit`)
    }
    
    useEffect(() => {
    dispatch(grabPosts())
    // dispatch(grabPhoto(postId))
    dispatch(grabComments(postId))             
    
  }, []);

  let pagePost = posts[postId]
	
  return posts && (
    <>
        <div className="PostContainer">
          <div className="TitlePost">{pagePost?.name}</div>
          <div className="Image">
            <img 
              className="FillImage"
              src={currentPost?.url}
              alt="Photo not found"
            />
          </div>
          <div className="InstructionsDiv">Instructions:</div>
          <div className="TextBody">{pagePost?.instructions}</div>
        </div>
        {currentPost && sessionUser && currentPost.userid === sessionUser.id &&
          <div className="PostButtonsForAdmin">
            <form>
              <button className='postEditBtn' onClick={e => onEditPost(e)}> Edit Post</button>
            </form>
            <form>
              <button className='postDeleteBtn' onClick={e => onDelete(e)}> Delete Post</button>
            </form>
          </div>
          
          }
        <div className="CommentSection">
          <div className="CommentsDiv">
            <div className="AddCommentsDiv">Comment Section:</div>
            {comments &&
              comments.map(comment => {
                return (
                  <div className="SingleComment" key={comment.id}>
                  <div className="SingleCommentText">
                    {comment.commentText}
                  </div>
                  { sessionUser && comment.userid === sessionUser.id &&
                    ( <div>
                        <button onClick={(e) => onDeleteComment(e, comment.id, postId)} className="delBtn"> DELETE </button>
                      </div> )
                  }
                  </div>
                  )
              })
            }
            
          </div>
          {sessionUser && 
            <div className="AddCommentForm">
              <div className="AddCommentTitle">Add a Comment:</div>
              <form className="CommentForm" onSubmit={onCreateComm}>
                <textarea
                className="CommentInput"
                type="text"
                name="comment"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                >
                </textarea>
                <button type="submit" className="SubmitCommBtn">
                  Post Comment
                </button>
              </form>
            </div>
            }
        </div>
    </> ```
    
    
   # Back End 
    
```from flask import Blueprint, jsonify, request
from ..forms.post_form import PostForm
from ..forms.comment_form import CommentForm
from app.models import Post, Photo, db, Comment
from .auth_routes import validation_errors_to_error_messages


posts_routes = Blueprint('posts', __name__)

@posts_routes.route('/')
def posts():
    posts = Post.query.all()
    return {"posts": [post.to_dict() for post in posts]}

@posts_routes.route('/profile/<int:userId>')
def profilePosts(userId):
    
    ProfilePosts = Post.query.filter(Post.userid == userId).all()
    
    return {"posts": [post.to_dict() for post in ProfilePosts]}
    

@posts_routes.route('/<int:id>')
def post(id):
    post = Post.query.filter_by(id = id).one()
    return post.to_dict()

@posts_routes.route('/create', methods=['POST'])
def create():
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Post(
            userid = form.data["userId"],
            name = form.data["name"],
            instructions = form.data["instructions"],
            url = form.data["url"]
        )
        db.session.add(post)
        db.session.commit()
        return post.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@posts_routes.route('/<int:postId>/comments')
def comment(postId):
    comments = Comment.query.filter_by(postid = postId).all()
    return {"comments": [comment.to_dict() for comment in comments]}

@posts_routes.route('/<int:postid>/comments/create', methods=["POST"])
def createComment(postid):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            userid = form.data["userid"],
            postid = form.data["postid"],
            commentText = form.data["commentText"]
        )
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

@posts_routes.route("/<int:postId>/comments/<int:commentId>/delete", methods=['DELETE'])
def deleteComment(postId, commentId):
    comment = Comment.query.get(commentId)
    db.session.delete(comment)
    db.session.commit()
    return {"message" : "If you see this, IT WORKED!"}

@posts_routes.route("/<int:postId>/comments/delete", methods=['DELETE'])
def deleteAllComments(postId):
    comments = Comment.query.filter_by(postid = postId).all()
    
    for comment in comments:
        db.session.delete(comment)
    db.session.commit()
    return {"message" : "If you see this, YOU DELETED ALL THE COMMENTS"}




@posts_routes.route('/<int:postId>/delete', methods=['DELETE'])
def delete(postId):
    post = Post.query.get(postId)
    db.session.delete(post)
    db.session.commit()
    return {"If you see this": "the post got deleted"}

@posts_routes.route('/<int:postId>/edit', methods=['POST'])
def update(postId):
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        oldPost = Post.query.get(postId)
        userid = form.data["userId"],
        name = form.data["name"],
        instructions = form.data["instructions"],
        url = form.data["url"]
        

        oldPost.userid = userid
        oldPost.name = name
        oldPost.instructions = instructions
        oldPost.url = url
        db.session.commit()

        return oldPost.to_dict()
    return {"error": "form never validated"}```




