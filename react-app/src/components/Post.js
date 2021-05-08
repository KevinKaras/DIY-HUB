import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams,} from "react-router-dom";
import { grabPosts } from "../store/posts"
import { grabPhoto } from '../store/photos'

function Post() {

    const dispatch = useDispatch()
    const params = useParams()
    const postId = Number(params.id)
    const posts = useSelector(state => state.posts)
    const photo = useSelector(state => state.photos)

    
    
		

		
    
    
    

    

    

  useEffect(() => {
    dispatch(grabPosts())
    dispatch(grabPhoto(postId))
  }, []);
    

  let pagePost = posts[postId-1]
	

  return posts && (
    <>
        <h1>POST PAGE</h1>
        <div>{pagePost?.instructions}</div>
        <div>{photo?.imageURL}</div>
    </>

  )
}
export default Post;