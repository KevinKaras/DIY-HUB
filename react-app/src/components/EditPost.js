import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory, Redirect} from "react-router-dom";
import { grabPosts } from "../store/posts"
import { grabPhoto } from '../store/photos'
import { createPost } from '../store/posts'
import "./CSS/CreatePostPage.css"

function EditPost() {
    const dispatch = useDispatch()
    // const dispatch = useDispatch()
    const params = useParams()
    const postId = Number(params.id)
    // const posts = useSelector(state => state.posts)
    // const photo = useSelector(state => state.photos)
    
    
    const history = useHistory()
    const oldPostData = useSelector(state => state.posts[postId])
    
    
    const oldName = oldPostData?.name
    const oldInstructions = oldPostData?.instructions
    const oldImage = oldPostData?.url
    
    const [name, setName] = useState(`${oldName}`)
    
    const [instructions, setInstructions] = useState(`${oldInstructions}`)
    const [url, setPhotoUrl] = useState(`${oldImage}`)
    const user = useSelector(state => state.session.user)    
    const [imageLoading, setImageLoading] = useState(false);
    
    

    const onEditComplete = async (event) => {
        event.preventDefault()
        const createdPost = await dispatch(createPost(user.id, name, instructions, url))
        
        history.push(`/post/${createdPost.id}`)
    }
    
    useEffect(() => {
        dispatch(grabPosts())
        
        
    }, [dispatch]);
    
    
   
    

  
	

  return (
    <>
        <h1 className="PostTitle">Edit Your Post</h1>
        <div className="PostCreationDiv">
            <form onSubmit={onEditComplete} className="formDiv">
                <div className="BoxIdentifierText">Title:</div>
                <input
                className="TitleInputBox"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                
                ></input>
                <div className="BoxIdentifierText" >Instructions:</div>
                <input
                className="InstructionInputBox"
                type="text"
                name="instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                ></input>
                <div className="BoxIdentifierText" >Image:</div>
                <input
                className="ImageInputBox"
                type="text"
                name="url"
                value={url}
                onChange={(e) => setPhotoUrl(e.target.value)}
                ></input>
                <button className='postAddBtn' type='submit'>Submit Post</button>

            </form>
        </div>
        
    </>

  )
}
export default EditPost;