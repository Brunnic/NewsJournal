import React, { useEffect } from 'react';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route} from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import Alert from "./components/layout/Alert";
import Navbar from "./components/layout/Navbar";
import Posts from "./components/posts/Posts.component";
import Add from "./components/posts/Add.component";
import Post from "./components/posts/Post.component";
import Update from "./components/posts/Update.component";
import LoginForm from "./components/auth/LoginForm.component";
import RegisterForm from "./components/auth/RegisterForm.component";
import Dashboard from "./components/user/Dashboard.component";

import store from "./store";

import { getUser } from "./actions/auth";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


function App() {
  useEffect(() => {
    store.dispatch(getUser());
  }, []);

  return (
    <Provider store={store}>
        <Router>
          <Navbar />
          <Alert />
          <Route path="/" exact={true} component={Posts} />
          <PrivateRoute path="/addPost" exact={true} component={Add} dispatch={store.dispatch} />
          <PrivateRoute path="/post/:id" exact={true} component={Post} dispatch={store.dispatch} />
          <PrivateRoute path="/edit/:id" exact={true} component={Update} dispatch={store.dispatch} />
          <PrivateRoute path="/user" exact={true} component={Dashboard} dispatch={store.dispatch} />
          <Route path="/login" exact={true} component={LoginForm} />
          <Route path="/register" exact={true} component={RegisterForm} />
        </Router>
    </Provider>
  );
}

export default App;
