import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { signUp } from '../../store/session';
import '../CSS/SignUp.css'

const SignUpForm = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.session.user)
  const sessionLoaded = useSelector(state => state.session.loaded)

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      dispatch(signUp(username, email, password))
      
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (sessionLoaded && user) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <div className="SignUpTitle">Register an Account</div>
      <form onSubmit={onSignUp} className="SUFormContainerDiv">
        <div className="UsernameDiv" className="InputContainer">
          <div className="InputTitle">User Name</div>
          <label></label>
          <input
            className="UsernameInput"
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div className="InputContainer">
          <div className="InputTitle">Email</div>
          <label></label>
          <input
            className="EmailInput"
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div className="InputContainer">
          <div className="InputTitle">Password</div> 
          <label></label>
          <input
            className="PasswordInput"
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div className="InputContainer">
          <div className="InputTitle">RepeatPassword</div>
          <label></label>
          <input
            className="PasswordInput"
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <button type="submit" className="SignUpSubmitBtn">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
