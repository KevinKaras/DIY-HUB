import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory, Redirect} from "react-router-dom";
import { grabPosts } from "../store/posts"
import { grabPhoto } from '../store/photos'
import { createPost } from '../store/posts'
import "./CSS/CreatePostPage.css"

function CreatePost() {
    const dispatch = useDispatch()
    // const dispatch = useDispatch()
    // const params = useParams()
    // const postId = Number(params.id)
    // const posts = useSelector(state => state.posts)
    // const photo = useSelector(state => state.photos)
    const history = useHistory()
    const [name, setName] = useState('')
    const [instructions, setInstructions] = useState('')
    const [url, setPhotoUrl] = useState('')
    const user = useSelector(state => state.session.user)    // GRAB USER ID FROM SESSION USER, NOT DONE YET **********
    const [imageLoading, setImageLoading] = useState(false);
    

    const onCreate = async (event) => {
        event.preventDefault()
        const createdPost = await dispatch(createPost(user.id, name, instructions, url))
        console.log(`\n\n\n`, createdPost)
        history.push(`/post/${createdPost.id}`)
    }
    
    useEffect(() => {
        dispatch(grabPosts())
        
        
    }, [dispatch]);
    

  
	

  return (
    <>
        <h1 className="PostTitle">Create a Post</h1>
        <div className="PostCreationDiv">
            <form onSubmit={onCreate} className="formDiv">
                <div className="BoxIdentifierText">Title:</div>
                <input
                className="TitleInputBox"
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
                ></input>
                <div className="BoxIdentifierText" >Instructions:</div>
                <input
                className="InstructionInputBox"
                type="text"
                name="instructions"
                onChange={(e) => setInstructions(e.target.value)}
                ></input>
                <div className="BoxIdentifierText" >Image:</div>
                <input
                className="ImageInputBox"
                type="text"
                name="url"
                onChange={(e) => setPhotoUrl(e.target.value)}
                ></input>
                <button className='postAddBtn' type='submit'>Submit Post</button>

            </form>
        </div>
        
    </>

  )
}
export default CreatePost;