import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory} from "react-router-dom";
import { grabPosts, deletePost } from "../store/posts"
// import Comment from "./Comment.js"
import LikeButton from "./LikeButton"
import { addLike, grabLikes, removeLike } from "../store/likes";
import { grabPhoto } from '../store/photos'
import PlaceHolderPic from "../components/CSS/photos/RandomFillerProfile.jpg"
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
  const sessionUser = useSelector(state => state.session.user)
  const currentPost = useSelector(state => state.posts[postId]) 
  const comments = useSelector(state => state.CommentsOfPost)
  let [comment, setComment] = useState('')
  let [isLoading, setIsLoading] = useState(true)
  let pagePost = posts[postId]

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

  

  return (
    <>
    
    <div className="Post">
    <div className="Post-Banner">
        <div className="Post-Title-Container">
            <div className="Post-Title-Container-Text">{pagePost?.name}</div>
        </div>
    </div>
    <div className="Post-Container">
        <img 
        className="Post-Container-Photo"
        src={currentPost?.url}
        alt="Photo Not Found"></img> 
    </div>
    <div className="Author-Section">
      <div className="Author-Info-Center">
          <div className="Author-Picture-Container">
            <img className="Author-Picture" src={PlaceHolderPic}/>
          </div>
          <div className="Author-Post-Info">
            <div className="Info-Center-Row">
              <div className="Author-Identifier">
                <span>By</span> <span className="Author-Name">AUTHOR</span>
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
              {currentPost && sessionUser && currentPost.userid === sessionUser.id &&
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
            {pagePost?.instructions}
        </p>
      </div>
    </div>
        <div className="Comment-Section">
          <div className="Comment-Banner">
            <div className="Comment-Numeric">
                {}Comments:
            </div>
          </div>
        <div className="Comment-Container">
            <div className="Comment-Upper">
                <div className="Commenter-Icon">
                    <img></img>
                </div>
                <div className="Commenter-Name"></div>
                <div className="Comment-Date/Time"></div>
            </div>
            <div className="Comment-Lower">
                <div className="Comment-Text"></div>
            </div>
        </div>
        {sessionUser && 
        <div className="Comment-Creation-Area">
          <div className="Comment-Creator-Container">
            <div className="Commenter-Profile-Section">
              <img className="Commentor-Profile-Picture" src={PlaceHolderPic}></img>
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
    </div>
    </>
    )
  }


export default Post;