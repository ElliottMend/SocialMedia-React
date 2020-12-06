import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";
import Header from "./components/Views/Header";
import LoginContainer from "./components/UserAuth/LoginContainer";
import RegisterContainer from "./components/UserAuth/RegisterContainer";
import { HomepageContainer } from "./components/Home/HomepageContainer";
import { UserPageContainer } from "./components/User/UserPageContainer";
import PostContainer from "./components/Posts/PostContainer";
import { UserEditContainer } from "./components/User/UserEditContainer";

export default function Routes(props) {
  return (
    <Router>
      <Switch>
        <React.Fragment>
          <Header />
          <Route
            path="/posts/:id"
            component={() => <PostContainer key={window.location.pathname} />}
          />
          <Route path="/" exact component={() => <HomepageContainer />} />
          <Route
            exact
            path="/user/:id/edit"
            component={() => <UserEditContainer />}
          />
          <Route
            exact
            path="/user/:id"
            component={() => (
              <UserPageContainer key={window.location.pathname} />
            )}
          />
          {/* <Route
              path="/*"
              render={() => {
                return <Redirect to="/" />;
              }}
            /> */}
          <Route
            path="/register"
            exact
            component={() => <RegisterContainer />}
          />
          <Route
            path="/login"
            exact
            component={() => <LoginContainer data={props.data} />}
          />
        </React.Fragment>
      </Switch>
    </Router>
  );
}
