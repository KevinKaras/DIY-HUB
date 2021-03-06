import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { useParams, NavLink } from "react-router-dom";
import { grabPosts } from "../store/posts"
import add_post_logo from './CSS/photos/add_post_logo.png'
import HammerPic from './CSS/photos/HammerPic.jpeg'
import Pug from './CSS/photos/Pug.jpg'
import gasmask from './CSS/photos/gasmask.jpg'
import Cups from './CSS/photos/Cups.jpg'
import "./CSS/NewHomePage.css"

function Home() {

  const dispatch = useDispatch()
  const posts = useSelector(state => state.posts)
  const [postComponents, setPostComponents] = useState('')
  const [bannerPhoto, setBannerPhoto] = useState(HammerPic)
  
    

  useEffect(() => {
    dispatch(grabPosts("Misc"))
    dispatch(grabPosts("Home"))
    dispatch(grabPosts("Outdoors"))
    dispatch(grabPosts("Indoors"))
    dispatch(grabPosts("Knick-Knacks"))
    dispatch(grabPosts("Children"))
  }, []);

  const trailingAddPostComponent = ( 
    <div className="PostItemContainer">
      <a href={`/create`} className="">
        <img src={add_post_logo} className="AddPhotoItem"/>
      </a>
      <div className="NavLinkHolder">
          <h3 className="NavLinkTitleText">Add a post</h3>
      </div>
    </div>)

  useEffect(() => {
      setPostComponents(Object.values(posts).map((post)=>{
            return (
              <div className="PostItemContainer">
                <a href={`/post/${post.id}`} className="PhotoItemHolder">
                  <img src={`${post.url}`} className="PhotoItem"/>
                </a>
                <div className="NavLinkHolder">
                <h3 className="NavLinkTitleText">{post.name}</h3>
                </div>
              </div>
            )
        }))
      }, [posts])

  return (
    <div>
      <div className="Banner-Container">
          <div className="Banner-Information-Container">
            <div className="Info-Card-Positioner">
                <div className="Information-Card">
                    <div className="InfoCard-Title">
                    YOURS FOR THE MAKING
                    </div>
                    <div className="Info-Card-Description">
                    Instructables is a community for people who like to make things. Come explore, share, and make your next project with us!
                    </div>
                </div>
                <div className="Dot-Scroll-Wheel">
                  <span className="Scroll-Dots" onClick={(e) => setBannerPhoto(HammerPic)}></span>
                  <span className="Scroll-Dots" onClick={(e) => setBannerPhoto(Pug)}></span>
                  <span className="Scroll-Dots" onClick={(e) => setBannerPhoto(gasmask)}></span>
                  <span className="Scroll-Dots" onClick={(e) => setBannerPhoto(Cups)}></span>
              </div>
            </div>
              
          </div>
        <img className="Banner-Actual-Photo" src={bannerPhoto}></img>  
      </div>
      <div className="Home-Content-Container">
        <div className="Home-Content-Text-Wrap">
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
      </div>
      <hr className="Horizontal-Rule"></hr>
      <div className="Explore-Beginning">
          <div className="Explore-Title">
          EXPLORE PROJECTS
          </div>
      </div>
      <div className="Explore-Area">
          <div className="Explore-Topic">All Projects</div>
          <div className="PostsHolderContainer">
           {[postComponents, trailingAddPostComponent]}
          </div>
      </div>
  </div>
        
        
  )
}
export default Home;