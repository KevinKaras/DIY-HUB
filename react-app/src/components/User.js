import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { profilePostGrab } from "../store/posts";

// WORK ON THIS TOMORROW AS WELL IF POSSIBLE


function Profile() {
  const dispatch = useDispatch()
  const { userId }  = useParams();

  const theUser = useSelector(state => state.session.user)
  const usersPosts = dispatch(profilePostGrab(userId))
  
  useEffect(async() => {
     
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
    </ul>
  );
}
export default Profile;
