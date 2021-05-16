import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory} from "react-router-dom";
import { grabPosts, deletePost } from "../store/posts"
import { grabPhoto } from '../store/photos'
import { grabComments, addComment, deleteComment } from '../store/comment'


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
    dispatch(grabPhoto(postId))
    dispatch(grabComments(postId))             
    
  }, []);


  // useEffect(() => {
    
  // }, [onDelete])
    

  let pagePost = posts[postId]
	

  return posts && (
    <>
        <h1>POST PAGE</h1>
        <div>{pagePost?.name}</div>
        <div>{pagePost?.instructions}</div>
        <div>{photo?.imageURL}</div>
        {currentPost && sessionUser && currentPost.userid === sessionUser.id &&
          <form>
            <button className='postDeleteBtn' onClick={e => onDelete(e)}> Delete Post</button>
          </form>
          }

        <div className="commentsDiv">
          Comments:
          {comments &&
            comments.map(comment => {
              return (
                <div className="singleComment" key={comment.id}>
                <div>
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
        <div>
          <form className="commentForm" onSubmit={onCreateComm}>
            <input
            className="commentInput"
            type="text"
            name="comment"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            >
            </input>
            <button type="submit" className="submitCommBtn">
              Post Comment
            </button>
          </form>
        </div>
    </>

  )
}
export default Post;