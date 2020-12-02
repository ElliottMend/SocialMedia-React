import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";
import Header from "./components/Views/Header";
import Login from "./components/UserAuth/Login";
import Register from "./components/UserAuth/Register";
import { HomepageContainer } from "./components/Home/HomepageContainer";
import UserPage from "./components/User/UserPage";
import UserEdit from "./components/User/UserEdit";
import PostDisplay from "./components/Posts/PostDisplay";

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
              component={() => <PostDisplay key={window.location.pathname} />}
            />
            <Route
              path="/"
              exact
              component={() => <HomepageContainer refresh={props.refresh} />}
            />
            <Route
              exact
              path="/user/:id/edit"
              component={() => <UserEdit auth={checkAuth} />}
            />
            <Route
              exact
              path="/user/:id"
              component={() => (
                <UserPage
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
            <Route path="/register" exact component={() => <Register />} />
            <Route
              path="/login"
              exact
              component={() => <Login data={props.data} auth={checkAuth} />}
            />
            {state.redirect && <Redirect to="/login" />}
          </React.Fragment>
        )}
      </Switch>
    </Router>
  );
}
