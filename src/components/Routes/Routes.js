import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import history from "./History";
import Header from "../Views/Header";
const LoginContainer = lazy(() => import("../UserAuth/LoginContainer"));
const RegisterContainer = lazy(() => import("../UserAuth/RegisterContainer"));
const UserPageContainer = lazy(() => import("../User/UserPageContainer"));
const PostContainer = lazy(() => import("../Posts/PostContainer"));
const HomepageContainer = lazy(() => import("../Home/HomepageContainer"));
const UserEditContainer = lazy(() => import("../User/UserEditContainer"));
export default function Routes(props) {
  return (
    <Suspense fallback={<p>Loading</p>}>
      <Switch>
        {props.state ? (
          <React.Fragment>
            <Header logout={props.logout} />
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
            {props.state && <Redirect to="/" />}
          </React.Fragment>
        ) : (
          <React.Fragment>
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
              component={() => <LoginContainer login={props.login} data={props.data} />}
            />
            {!props.state && <Redirect to="/login" />}
          </React.Fragment>
        )}
      </Switch>
    </Suspense>
  );
}
