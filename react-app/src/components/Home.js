import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { useParams, NavLink } from "react-router-dom";
import { grabPosts } from "../store/posts"

function Home() {

    const dispatch = useDispatch()
    const posts = useSelector(state => state.posts)
    const [postComponents, setPostComponents] = useState('')
    

  useEffect(() => {
    async function fetchPosts(){
        // const response = await fetch('/api/posts');
        // const responseData = await response.json();
        // console.log(responseData.posts)
        // await setPosts(responseData)
        dispatch(grabPosts())
        // await setPosts(responseData.posts)
        // console.log(responseData.posts)
    
    return
    }
    fetchPosts()
  }, []);
    

  useEffect(() => {
      setPostComponents(Object.values(posts).map((post)=>{
            return (
                <li className="PostItem" key={post.id}>
                    <NavLink to={`/post/${post.id}`}>{post.name}</NavLink>
                </li>
            )
        }))
  }, [posts])


  return (

    <div>
        <h1>DIY HUB</h1>
        <h2>{postComponents}</h2>
    </div>

  )
}
export default Home;