import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory} from "react-router-dom";
import { grabPosts, deletePost } from "../store/posts"
import { grabPhoto } from '../store/photos'
import { grabComments, addComment, deleteComment } from '../store/comment'
import './CSS/PostPage.css'

function Post() {

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

    

    
    console.log(comments)
    console.log(sessionUser)
    

  
   

    
    
		

		const onDelete = async (e) => {
      e.preventDefault()
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
    

    

    

  useEffect(() => {
    dispatch(grabPosts())
    // dispatch(grabPhoto(postId))
    dispatch(grabComments(postId))             
    
  }, []);


  // useEffect(() => {
    
  // }, [onDelete])
    

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
          <form>
            <button className='postDeleteBtn' onClick={e => onDelete(e)}> Delete Post</button>
          </form>
          }
        <div className="CommentSection">
          <div className="CommentsDiv">
            Comment Section:
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
                <input
                className="CommentInput"
                type="text"
                name="comment"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                >
                </input>
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