import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory} from "react-router-dom";
import { grabPosts, deletePost } from "../store/posts"
import { getViewPost } from "../store/ViewPost";
import Comment from "./Comment.js"
import LikeButton from "./LikeButton"
import { addLike, grabLikes, removeLike, deleteAllLikes } from "../store/likes";
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
  const likes = useSelector(state => state.likes)
  const currentPost = useSelector(state => state.ViewPost)
  const sessionUser = useSelector(state => state.session.user)
  const comments = useSelector(state => state.CommentsOfPost)
  let [comment, setComment] = useState('')
  let [isLoading, setIsLoading] = useState(true)

  // LIKES INTERACTIONS ----------------------------------------------------------------------------------------
  // const getLikesForPost = async (e) => {                              // GET
  //   await dispatch(grabLikes(postId))
  // }

  let LikeRequirementObject = {
    "ViewerLikeState" : likes.filter((like) => like.userid == sessionUser?.id).length,
    "PostId" : postId, 
    "sessionUserId" : sessionUser?.id,
    "sessionUserUsername" : sessionUser?.username
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

  // function loadAllComments(){
  //   console.log("All comments", comments)
  // }

  // AUTHOR INTERACTION ---------------------------------------------------------------------------------------
  const onEditPost = async (e) => {                                        // UPDATE
    history.push(`/post/${postId}/edit`)
  }
  const onDelete = async (e) => {                                          // DELETE
    e.preventDefault()
    await dispatch(deleteAllLikes(postId))                            
    await dispatch(deleteAllComments(postId))                             
    await dispatch(deletePost(postId))
        
    history.push(`/`)
  }
  
  
  // WHEN PAGE RENDERS THIS IS CALLED --------------------------------------------------------------------------
  useEffect(() => {
    dispatch(grabPosts())
    dispatch(getViewPost(postId))
    dispatch(grabComments(postId))
    dispatch(grabLikes(postId))
    
  }, []);



  return (
    <>
    
    <div className="Post">
    <div className="Post-Banner">
        <div className="Post-Title-Container">
            <div className="Post-Title-Container-Text">{currentPost?.Post?.name}</div>
        </div>
    </div>
    <div className="Post-Container">
        <img 
        className="Post-Container-Photo"
        src={currentPost?.Post?.url}
        alt="Photo Not Found"></img> 
    </div>
    <div className="Author-Section">
      <div className="Author-Info-Center">
          <div className="Author-Picture-Container">
            <img className="Author-Picture" src={currentPost?.Author?.url}/>
          </div>
          <div className="Author-Post-Info">
            <div className="Info-Center-Row">
              <div className="Author-Identifier">
                <span>By</span> <span className="Author-Name">{currentPost?.Author?.username[0].toUpperCase() + currentPost?.Author?.username.slice(1)}</span>
              </div>
              <div className="Likes-Numeric">
                {likes.length} Likes
              </div>
            </div>
            <div className="Info-Center-Row">
              <button className="Comment-Button">
                Comment
              </button>
              {sessionUser && <LikeButton LikeRequirements={LikeRequirementObject} />}
            </div>
            <div className="Info-Center-Row">
              {currentPost?.Post?.userid && sessionUser && currentPost?.Post?.userid === sessionUser.id &&
                <>
                  <form>
                    <button className='postEditBtn' onClick={e => onEditPost(e)}> Edit Post</button>
                  </form>
                  <form>
                    <button className='postDeleteBtn' onClick={e => onDelete(e)}> Delete Post</button>
                  </form>
                </>
              }
            </div>
          </div>
          <div className="See-More-Container">
              <div className="See-More-Button">
                <div className="See-More-Button-Text">EXPLORE SIMILAR CONTENT</div>
              </div>
          </div>
      </div>
    </div>
    <div className="Instructions-Section">
      <div className="Instructions-Banner-Container">
        <div className="Instructions-Header">
            Instructions:
        </div>
      </div>
      <div className="Instruction-Container">
        <p className="Instructions-TextBody">
            {currentPost?.Post?.instructions}
        </p>
      </div>
    </div>
        <div className="Comment-Section">
          <div className="Comment-Banner">
            <div className="Comment-Numeric">
                {comments?.length} Comments:
            </div>
          </div>
          <div className="Comments">
            {comments && 
              comments.map(comment => <Comment commentCombo={comment} />)
            }
          </div>
        </div>
        {sessionUser && 
        <div className="Comment-Creation-Area">
          <div className="Comment-Creator-Container">
            <div className="Commenter-Profile-Section">
              <img className="Commentor-Profile-Picture" src={sessionUser?.url}></img>
            </div>
            <form className="Comment-Form" onSubmit={onCreateComm}>
              <div className="Comment-Form-Upper">
                <textarea
                className="Comment-Input"
                type="text"
                name="comment"
                placeholder="Add a comment"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                >
                </textarea>
              </div>
              <div className="Comment-Form-Lower">
              <button type="submit" className="Submit-Comment-Button">
                Post Comment
              </button>
              </div>
            </form>
          </div>
        </div>
        }
        </div>
    </>
    )
  }


export default Post;