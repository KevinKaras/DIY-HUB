import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory} from "react-router-dom";
import { grabPosts, deletePost } from "../store/posts"
import { addLike, grabLikes, removeLike } from "../store/like";
import { grabPhoto } from '../store/photos'
import { grabComments, addComment, deleteComment, deleteAllComments } from '../store/comment'
import './CSS/PostPage.css'



function Post() {
  const dispatch = useDispatch()
  const history = useHistory()
  const params = useParams()
  const postId = Number(params.id)
  const posts = useSelector(state => state.posts)
  const photo = useSelector(state => state.photos)
  // const like = useSelector(state => state.like)
  const sessionUser = useSelector(state => state.session.user)
  const currentPost = useSelector(state => state.posts[postId]) 
  const comments = useSelector(state => state.CommentsOfPost)
  let [comment, setComment] = useState('')
  let like = false
  


  // LIKES INTERACTIONS ----------------------------------------------------------------------------------------
  const getLikesForPost = async (e) => {                                // GET
    await dispatch(grabLikes(postId))
  }
  
  const onLikeClick = async (e) => {                                    // CREATE                               
    await dispatch(addLike(postId, sessionUser.id, sessionUser.username))
  }

  const onLikeUnclick = async (e) => {                                  // DELETE
    await dispatch(removeLike(postId, sessionUser.id))
  }

  function handleLikeStatus(e){
    like = !like
    e.preventDefault()
    if(like === true){
      onLikeClick()
    } else {
      console.log("removal firing")
      onLikeUnclick()
    }
  }
  

  // COMMENT INTERACTION ---------------------------------------------------------------------------------------
  const onCreateComm = async (e) => {                                    // CREATE
    e.preventDefault()
    await dispatch(addComment(sessionUser.id, postId, comment))
    setComment("")
  }
  const onDeleteComment = async (e, commentId, postId) => {               // DELETE
    e.preventDefault()
    await dispatch(deleteComment(postId, commentId))
  }

  // AUTHOR INTERACTION ---------------------------------------------------------------------------------------
  const onEditPost = async (e) => {                                        // UPDATE
    history.push(`/post/${postId}/edit`)
  }
  const onDelete = async (e) => {                                          // DELETE
    e.preventDefault()
    await dispatch(deleteAllComments(postId))
    await dispatch(deletePost(postId))
        
    history.push(`/`)
  }
  // WHEN PAGE RENDERS THIS IS CALLED --------------------------------------------------------------------------
  useEffect(() => {
  dispatch(grabPosts())
  dispatch(grabComments(postId))
  dispatch(grabLikes(postId))
  
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
          <div className="AuthorBoxContainer">
            <div className="AuthorPhoto"></div>
            <div className="AutherName"></div>
            <div className="AuthorExtension"></div>
            {sessionUser && 
              <div className="InteractionContainer">
              <button className="LikeButton" onClick={e => handleLikeStatus(e) }>
                <img 
                className="LikeButtonImage"
                src={'https://www.pinclipart.com/picdir/big/80-800346_blue-clip-art.png'}
                alt={"failed to load"}
                >
                </img>
                <div className="LikeButtonText">
                  Like
                </div>
                </button>
              </div>
            }
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
              comments.map(commentInfoObj => {
                console.log(commentInfoObj)
                return (
                  <div className="SingleComment" key={commentInfoObj.comment.id}>
                  <div className="CommenterName">{commentInfoObj.user.username}:</div>
                  <div className="SingleCommentText">
                    {commentInfoObj.comment.commentText} 
                  </div>
                  { sessionUser && commentInfoObj.user.id === sessionUser.id &&
                    ( <div>
                        <button onClick={(e) => onDeleteComment(e, commentInfoObj.comment.id, postId)} className="delBtn"> DELETE </button>
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
    </>

  )
}
export default Post;