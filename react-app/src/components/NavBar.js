import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { logout } from '../store/session';
import "./CSS/NavBar.css"

const NavBar = () => {
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  const onLogout = () => {
    dispatch(logout())
  };

  return (
    <nav className="NavContainer">
      <div className="Left-Nav-Container">
        <a href="/" className="HomeLogo">
          <img src="https://i.gyazo.com/fa9f31bf8ba545bf037f27f78b82905b.png" alt="" className="HomeLogoPhoto"/>
        </a>
        <div className="Title-Container">
          <div className="Title">DIY HUB</div>
        </div>
      </div>
      
      
      <div className="Right-Nav-Container">
        <div className="NavButtonDiv">
          <NavLink className="NavButton"to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </div>
        {!user &&
          <>
            <div className="NavButtonDiv">
              <NavLink className="NavButton" to="/login" exact={true} activeClassName="active">
                Login
              </NavLink>
            </div>
            <div className="NavButtonDiv">
              <NavLink className="NavButton" to="/sign-up" exact={true} activeClassName="active">
                Sign Up
              </NavLink>
            </div>
          </>}
          <div className="NavButtonDiv">
            <NavLink className="NavButton" to={`/profile/${user?.id}`} exact={true} activeClassName="active">
              Profile
            </NavLink>
          </div>
          {user && 
            <div className="NavButtonDiv">
              <NavLink className="NavButton" to="/create" exact={true} activeClassName="active">
                Create Post
              </NavLink>
            </div>
          }
          {user && <div className="NavButtonDiv">
            <button onClick={onLogout} className="NavButton">Logout</button>
          </div>}
        </div>
    </nav>
  );
}

export default NavBar;