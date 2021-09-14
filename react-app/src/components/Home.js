import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { useParams, NavLink } from "react-router-dom";
import { grabPosts } from "../store/posts"
import diy_photo from "./CSS/photos/diy_photo.jpg"
import add_post_logo from './CSS/photos/add_post_logo.png'
import "./CSS/NewHomePage.css"

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

          // <img src={diy_photo} alt="" className="bannerPhoto"/>
          // <div className="PostsAreaHolder">
          // All DIY-Projects:
          // </div>
          // <h2 className="PostsHolderContainer">{[postComponents, trailingAddPostComponent]}</h2>



  return (

    <div>
      <div className="Banner-Container">
          <div className="Banner-Photo-Div">
          
          </div>
          <div className="Banner-Information-Container">
              <div className="Information-Card">
                  <div className="InfoCard-Title">
                  YOURS FOR THE MAKING
                  </div>
                  <div className="Info-Card-Description">
                  Instructables is a community for people who like to make things. Come explore, share, and make your next project with us!
                  </div>
              </div>
              <div className="Dot-Scroll-Wheel">
                  <li className="Scroll-Dots"></li>
                  <li className="Scroll-Dots"></li>
                  <li className="Scroll-Dots"></li>
                  <li className="Scroll-Dots"></li>
                  <li className="Scroll-Dots"></li>
              </div>
          </div>
      </div>
      <div className="Home-Content-Container">
          <div className="Content-Container">
              <div className="Container-Topic">
              STEP-BY-STEP
              </div>
              <div className="Container-Paragraph">
              We make it easy to learn how to make anything, one step at a time. 
              From the stovetop to the workshop, you are sure to be inspired by the 
              awesome projects that are shared everyday.
              </div>
          </div>
          <div className="Content-Container">
              <div className="Container-Topic">
              MADE BY YOU
              </div>
              <div className="Container-Paragraph">
              Instructables are created by you. No matter who you are, we all have secret skills to share. 
              Come join our community of curious makers, innovators, teachers, 
              and life long learners who love to share what they make.
              </div>
          </div>
          <div className="Content-Container">
              <div className="Container-Topic">
              A HAPPY PLACE
              </div>
              <div className="Container-Paragraph">
              Making things makes people happy. 
              We can't prove it, but we know it to be true. 
              Find your happy place, and join one of the friendliest online communities anywhere.
              </div>
          </div>
      </div>
      <div className="Explore-Beginning">
          <div className="Explore-Title">
          EXPLORE PROJECTS
          </div>
      </div>
      <div className="Explore-Area">
          <div className="Explore-Topic">
          </div>
          <div classname="PostsHolderContainer">
           <h2 className="PostsHolderContainer">{[postComponents, trailingAddPostComponent]}</h2>
          </div>
      </div>
  </div>
        
        
  )
}
export default Home;