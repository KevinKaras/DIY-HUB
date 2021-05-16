import React from "react";
import {useDispatch} from 'react-redux'
import { logout } from "../../store/session";
import "../CSS/logoutbutton.css"

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = () => {
    dispatch(logout())
  };

  return <button onClick={onLogout} className="LogoutButton">Logout</button>;
};

export default LogoutButton;
