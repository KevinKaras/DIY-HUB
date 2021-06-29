import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { useParams, NavLink } from "react-router-dom";
import { grabPosts } from "../store/posts"
import "./CSS/HomePage.css"
import diy_photo from "./CSS/photos/diy_photo.jpg"
import add_post_logo from './CSS/photos/add_post_logo.png'
function Home() {

    const dispatch = useDispatch()
    const posts = useSelector(state => state.posts)
    const [postComponents, setPostComponents] = useState('')
    

  useEffect(() => {
    async function fetchPosts(){
        
        dispatch(grabPosts())
        
    
    return
    }
    fetchPosts()
  }, []);
  const trailingAddPostComponent = 
    <div className="PostItemContainer">
            
      <a href={`/create`} className="AddPhotoItem">
        <img src={add_post_logo} className="AddPhotoItem"/>
      </a>
      <div className="NavLinkText">Add a post</div>
    </div>

  useEffect(() => {
      setPostComponents(Object.values(posts).map((post)=>{
            return (
              <div className="PostItemContainer">
                
                <a href={`/post/${post.id}`} className="PhotoItem">
                  <img src={`${post.url}`} className="PhotoItem"/>
                </a>
                <div className="NavLinkText">{post.name}</div>
              </div>
              
            )
        }))

        
          
        
  }, [posts])


  return (

    <div className="">
        
        {/* <h1 className="Title">DIY HUB</h1> */}
        <div className="PageHolder">
          <img src={diy_photo} alt="" className="bannerPhoto"/>
          <div className="PostsAreaHolder">
          All DIY-Projects:
          </div>
          <h2 className="PostsHolderContainer">{[postComponents, trailingAddPostComponent]}</h2>
        </div>
        

        
    </div>

  )
}
export default Home;