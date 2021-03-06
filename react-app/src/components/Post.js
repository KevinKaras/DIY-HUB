import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory} from "react-router-dom";
import { grabPosts, deletePost } from "../store/posts"
import { getViewPost } from "../store/ViewPost";
import Comment from "./Comment.js"
import LikeButton from "./LikeButton"
import CommentLogo from "./CSS/photos/CommentLogo.png"
import EditPostLogo from "./CSS/photos/EditPostLogo.png"
import DeletePostLogo from "./CSS/photos/DeleteButtonLogo.png"
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
              <div className="Info-Center-Row-Contents">
                <div className="Author-Identifier">
                  <span className="Author-Name-Precursor">By</span> <span className="Author-Name">{currentPost?.Author?.username[0].toUpperCase() + currentPost?.Author?.username.slice(1)}</span>
                </div>
              </div>
              <div className="Info-Center-Row-Contents">
                <div className="Likes-Info">
                  <div className="Like-Info-Text">Liked by </div>
                  <div className="Likes-Numeric">{likes.length} others</div>
                </div>
              </div>
            </div>
            <div className="Info-Center-Row">
              <div className="Info-Center-Row-Contents">
                <button className="Comment-Button" href="#Comment-Section-Start">
                  <a href="#Comment-Section-Start" className="Comment-Button">
                    <img className="Comment-Logo-Image" src={CommentLogo}/>
                    <div className="Comment-Button-Text">Comment</div>
                  </a>
                </button>
              </div>
              <div className="Info-Center-Row-Contents">
                {<LikeButton LikeRequirements={LikeRequirementObject} />}
              </div>
            </div>
            {currentPost?.Post?.userid && sessionUser && currentPost?.Post?.userid === sessionUser.id &&
            <div className="Info-Center-Row">
                <div className="Info-Center-Row-Contents">
                  <form>
                      <button className='Post-Edit-Button' onClick={e => onEditPost(e)}> 
                       <img className="Edit-Button-Image"src={EditPostLogo}></img>
                        <div className="Edit-Button-Text">Edit</div>
                      </button>
                    </form>
                </div>
                <div className="Info-Center-Row-Contents">
                  <form>
                    <button className='Post-Delete-Button' onClick={e => onDelete(e)}>
                      <img className="Delete-Button-Image" src={DeletePostLogo}></img>
                      <div className="Delete-Button-Text">Delete</div>
                    </button>
                  </form>
                </div>
              </div>
              }
            
          </div>
          <div className="See-More-Container">
              <div className="See-More-Button">
                <div className="See-More-Button-Text">EXPLORE</div>
                <div className="See-More-Button-Text">{currentPost?.Post?.category.toUpperCase()}</div> 
                <div className="See-More-Button-Text">CATEGORY</div>
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
        <div className="Comment-Section" id="Comment-Section-Start">
          <div className="Comment-Banner">
            <div className="Comment-Numeric">
                {comments?.length} Comments:
            </div>
          </div>
          <div className="Comments">
            {comments && 
              Object.entries(comments).map((CommentArray) => <Comment commentCombo={CommentArray[1]} />)
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