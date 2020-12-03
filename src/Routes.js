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
  const [state, setState] = useState({ auth: false, redirect: false });
  const checkAuth = async () => {
    await props.refresh();
    if (localStorage.getItem("refreshToken")) {
      setState({ auth: true });
    } else {
      setState({ redirect: true });
    }
  };
  useEffect(() => {
    let isCancelled = false;
    const auth = async () => {
      if (!isCancelled) {
        await checkAuth();
      }
    };
    auth();
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <Router>
      <Switch>
        {state.auth ? (
          <React.Fragment>
            <Header auth={checkAuth} />
            <Route
              path="/posts/:id"
              component={() => <PostContainer key={window.location.pathname} />}
            />
            <Route
              path="/"
              exact
              component={() => <HomepageContainer refresh={props.refresh} />}
            />
            <Route
              exact
              path="/user/:id/edit"
              component={() => <UserEditContainer auth={checkAuth} />}
            />
            <Route
              exact
              path="/user/:id"
              component={() => (
                <UserPageContainer
                  refresh={props.refresh}
                  key={window.location.pathname}
                />
              )}
            />
            {/* <Route
              path="/*"
              render={() => {
                return <Redirect to="/" />;
              }}
            /> */}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Route
              path="/register"
              exact
              component={() => <RegisterContainer />}
            />
            <Route
              path="/login"
              exact
              component={() => (
                <LoginContainer data={props.data} auth={checkAuth} />
              )}
            />
            {state.redirect && <Redirect to="/login" />}
          </React.Fragment>
        )}
      </Switch>
    </Router>
  );
}
