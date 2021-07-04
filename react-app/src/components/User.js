import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { profilePostGrab } from "../store/userPosts";

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
    <ul>
      <li>
        <strong>User Id</strong> {userId}
      </li>
      <li>
        <strong>Username</strong> {theUser.username}
      </li>
      <li>
        <strong>Email</strong> {theUser.email}
      </li>
      <div>
        {
          userPostsArray.map((post)=> {
            return (
              <>
                <li>
                  {post.name}
                </li>
                <li>
                  {post.instructions}
                </li>
                <li>
                  {post.url}
                </li>
              </>
              
            )
          })
          
        }
      </div>
    </ul>
  );
}
export default Profile;
