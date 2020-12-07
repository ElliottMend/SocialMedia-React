import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "../Views/Header";
import LoginContainer from "../UserAuth/LoginContainer";
import RegisterContainer from "../UserAuth/RegisterContainer";
import { HomepageContainer } from "../Home/HomepageContainer";
import { UserPageContainer } from "../User/UserPageContainer";
import PostContainer from "../Posts/PostContainer";
import { UserEditContainer } from "../User/UserEditContainer";

export default function Routes(props) {
  return (
    <Router>
      <Switch>
        {props.state ? (
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
              component={() => <LoginContainer data={props.data} />}
            />
            {!props.state && <Redirect to="/login" />}
          </React.Fragment>
        )}
      </Switch>
    </Router>
  );
}
