import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { useParams, NavLink } from "react-router-dom";
import { grabPosts } from "../store/posts"
import "./CSS/HomePage.css"

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
    

  useEffect(() => {
      setPostComponents(Object.values(posts).map((post)=>{
            return (
              <div className="PostItemContainer">
                <div className="PostItem" key={post.id}>
                    <NavLink className="NavLinkText" to={`/post/${post.id}`}>{post.name}</NavLink>
                </div>
              </div>
            )
        }))
  }, [posts])


  return (

    <div className="">
        
        <h1 className="Title">DIY HUB</h1>
        
        <h2 className="PostHolder">{postComponents}</h2>
    </div>

  )
}
export default Home;