import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { useParams } from "react-router-dom";

function Home() {
    const dispatch = useDispatch()
    const [posts, setPosts] = useState({})
    const [postComponents, setPostComponents] = useState('')
  

  useEffect(() => {
    async function fetchPosts(){
        const response = await fetch('/api/posts');
        const responseData = await response.json();
        // console.log(responseData.posts)
        // await setPosts(responseData)
        await setPosts(responseData.posts)
        console.log(posts)
        return
    }
    fetchPosts()
  }, []);


  return (

    <div>
        <h1>THE HOME PAGE</h1>
        <h2>{posts}</h2>
    </div>

  )
}
export default Home;