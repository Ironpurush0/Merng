import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

import { Container } from "semantic-ui-react";

import Home from "./pages/Home";
import SinglePost from "./pages/SinglePost";
import UserProfile from "./pages/UserProfile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { AuthProvider } from "./context/auth";

import AuthRoute from "./utils/AuthRoute";

import MenuBar from "./components/MenuBar";
import { AuthContext } from "./context/auth";

function App() {
  return (
    <AuthProvider>
      <Router>
        <MenuBar />
        <Container>
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/signup" component={Signup} />
          <Route exact path="/posts/:postId" component={SinglePost} />
          <Route exact path="/users" component={UserProfile} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
