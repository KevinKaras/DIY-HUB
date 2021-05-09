import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams} from "react-router-dom";
import { grabPosts } from "../store/posts"
import { grabPhoto } from '../store/photos'
import { createPost } from '../store/posts'

function CreatePost() {
    const dispatch = useDispatch()
    // const dispatch = useDispatch()
    // const params = useParams()
    // const postId = Number(params.id)
    // const posts = useSelector(state => state.posts)
    // const photo = useSelector(state => state.photos)

    const [name, setName] = useState('')
    const [instructions, setInstructions] = useState('')
    const user = useSelector(state => state.session.user)    // GRAB USER ID FROM SESSION USER, NOT DONE YET **********

    console.log(user)

    
    
		
    
		
    
    const onCreate = async (e) => {
        await dispatch(createPost(user.id, name, instructions))
    }
    

    

    

    // useEffect(() => {
    //     // dispatch(grabPosts())
    //     // dispatch(grabPhoto(postId))
        
    // }, []);
    

  
	

  return (
    <>
        <h1>Create a Post</h1>
        <div>
            <form onSubmit={onCreate}>
                <input
                className="inputBox"
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
                ></input>
                <button className='postAddBtn' type='submit'>Submit Post</button>
            </form>
        </div>
        
    </>

  )
}
export default CreatePost;