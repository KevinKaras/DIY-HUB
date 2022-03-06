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
    const user = useSelector(state => state.session.user)    
    const [imageLoading, setImageLoading] = useState(false);
    const [category, setCategory] = useState('Miscellaneous')
    
    
    

    const onCreate = async (event) => {
        event.preventDefault()
        const createdPost = await dispatch(createPost(user.id, name, instructions, url, category))
        history.push(`/post/${createdPost.id}`)
    }
    
    useEffect(() => {
        dispatch(grabPosts())
    }, [dispatch]);

    const updateImage = (e) => {
        const file = e.target.files[0];
        setPhotoUrl(file);
    }

    const onSelect = (e) => {
        setCategory(e.target.value)
    }

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
                  placeholder="Example: How to build a shelf"
                  onChange={(e) => setName(e.target.value)}
                  ></input>
                  <div className="BoxIdentifierText" >Instructions:</div>
                  <textarea
                  className="InstructionInputBox"
                  type="text"
                  name="instructions"
                  placeholder="Example: Step 1: Get a piece of wood..."
                  onChange={(e) => setInstructions(e.target.value)}
                  ></textarea>
                  <div className="BoxIdentifierText" >Image:</div>
                  <input
                  className="ImageInputBox"
                  type="file"
                  name="url"
                  placeholder="Add a link to a url for a display photo"
                  onChange={(e) => {
                      updateImage(e)
                      }}
                  ></input>
                  <label for="Categories" className="Category-Selection">Category Selection:</label>
                  <select className="Categories" onChange={(e)=> onSelect(e)}>
                      <option value="Miscellaneous">Miscellaneous</option>
                      <option value="Home Improvements">Home Improvements</option>
                      <option value="Outdoors">Outdoors</option>
                      <option value="Indoors">Indoors</option>
                      <option value="Knick-Knacks">Knick-Knacks</option>
                      <option value="Children Projects">Children Projects</option>
                  </select>
                  <button className='postAddBtn' type='submit'>Submit Post</button>
              </form>
          </div>
      </>
    )
}
export default CreatePost;