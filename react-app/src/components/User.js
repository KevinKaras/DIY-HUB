import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { profilePostGrab } from "../store/userPosts";
import "./CSS/ProfilePage.css"
// WORK ON THIS TOMORROW AS WELL IF POSSIBLE


function Profile() {
  const dispatch = useDispatch()
  const { userId }  = useParams();

  const theUser = useSelector(state => state.session.user)
  const userPostsObject = useSelector(state => state.userPosts)
  
  const userPostsArray = Object.values(userPostsObject)
  console.log(userPostsArray)
  
  useEffect(async() => {
     dispatch(profilePostGrab(userId))
     
     
  }, []);

  

  return (
    <div>
      <div className="ProfileInfoDiv">
        <strong>User Id: </strong> {userId}
        
        <strong>Username: </strong> {theUser.username}
        
        <strong>Email:</strong> {theUser.email}
         

      </div>
      
      
      <div>
        <div className="ProfilePostContainerTitle">Your Posts:</div>
        {
          userPostsArray.map((post)=> {
            return (
              <div className="PostItemContainer">
                
                <a href={`/post/${post.id}`} className="PhotoItem">
                  <img src={`${post.url}`} className="PhotoItem"/>
                </a>
                <div className="NavLinkText">{post.name}</div>
              </div>
              
            )
          })
          
        }
      </div>
    </div>
        
  );
}
export default Profile;
