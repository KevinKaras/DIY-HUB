import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { profilePostGrab } from "../store/userPosts";
import "./CSS/ProfilePage.css"
// WORK ON THIS TOMORROW AS WELL IF POSSIBLE


function Profile() {
  const dispatch = useDispatch()
  const { userId }  = useParams();

  const theUser = useSelector(state => state.session.user)
  const userPosts = useSelector(state => state.userPosts)
  console.log(userPosts)
  
  
  useEffect(async() => {
     dispatch(profilePostGrab(userId))
     
     
  }, []);

  

  return (
    <div>
      <div className="ProfileInfoDiv">
        <div className="InfoText">User Id: </div> {userId}
        <div className="InfoText">Username: </div> {theUser.username}
        <div className="InfoText">Email:</div> {theUser.email}
      </div>
      <div>
        <div className="ProfilePostContainerTitle">Your Posts:</div>
        {
          userPosts.map((post)=> {
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
          })
          
        }
      </div>
    </div>
        
  );
}
export default Profile;
