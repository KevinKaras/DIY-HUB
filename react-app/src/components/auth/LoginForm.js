import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { authenticate, login } from "../../store/session";

import "../CSS/LoginForm.css"

const LoginForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const sessionLoaded = useSelector(state => state.session.loaded)
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const onLogin =  async (e) => {
    
    e.preventDefault();
    const data = await dispatch(login(email, password))
    if(data.errors){
      setErrors(data.errors)
      console.log(data)
      
    }
      
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;                
  }

  return (
    <form onSubmit={onLogin} className="LoginFormContainer">
      <div>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
      <div className="LoginTitle">Login</div>
      <div className="EmailInput">
        <div className="InputTitle">Email:</div>
        <label htmlFor="email"></label>
        <input
          className="EmailInput"
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div className="PasswordInput">
        <div className="InputTitle">Password:</div>
        <label htmlFor="password"></label>
        <input
          className="PasswordInput"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
        />
        
      </div>
      <button type="submit" className="LoginButton">Login:</button>
    </form>
  );
};

export default LoginForm;
