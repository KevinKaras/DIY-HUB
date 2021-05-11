import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory} from "react-router-dom";
import { grabPosts, deletePost } from "../store/posts"
import { grabPhoto } from '../store/photos'

function Post() {

    const dispatch = useDispatch()
    const history = useHistory()
    const params = useParams()
    const postId = Number(params.id)
    const posts = useSelector(state => state.posts)
    const photo = useSelector(state => state.photos)
    const sessionUser = useSelector(state => state.session.user)


    const currentPost = useSelector(state => state.posts[postId]) 
    // console.log(currentPost)
    // console.log(currentPost)
    // console.log(sessionUser)


   

    
    
		

		const onDelete = async (e) => {
      e.preventDefault()
      await dispatch(deletePost(postId))
      history.push(`/`)
    }
    
    
    

    

    

  useEffect(() => {
    dispatch(grabPosts())
    dispatch(grabPhoto(postId))
    
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
    </>

  )
}
export default Post;