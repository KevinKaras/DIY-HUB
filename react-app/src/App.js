import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from 'react-redux'
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import Home from "./components/Home"
import Post from "./components/Post"
import CreatePost from './components/CreatePost'
import EditPost from './components/EditPost'
import { authenticate } from "./store/session"


function App() {
  const dispatch = useDispatch();

  

  

  useEffect(() => {
    dispatch(authenticate())
  }, []);

  

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users" exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} >
          <User />
        </ProtectedRoute>
        <Route path="/" exact={true}>
          <Home />
        </Route>
        <Route path='/post/:id' exact={true}>
          <Post />
        </Route>
        <Route path='/create' exact={true}>
          <CreatePost />
        </Route>
        <Route path='/post/:id/edit' exact={true}>
          <EditPost />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
