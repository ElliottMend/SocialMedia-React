import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from "./Loading";
import Header from "../Views/Header";
const LoginContainer = lazy(() => import("../UserAuth/LoginContainer"));
const RegisterContainer = lazy(() => import("../UserAuth/RegisterContainer"));
const UserPageContainer = lazy(() => import("../User/UserPageContainer"));
const PostContainer = lazy(() => import("../Posts/PostContainer"));
const HomepageContainer = lazy(() => import("../Home/HomepageContainer"));
const UserEditContainer = lazy(() => import("../User/UserEditContainer"));
interface IProps {
  login: () => void;
  logout: () => void;
  state: boolean;
}
export default function Routes(props: IProps) {
  return (
    <Suspense fallback={<Loading />}>
      {props.state ? (
        <React.Fragment>
          <Header logout={props.logout} />
          <Switch>
            {/* <Route
              path="/posts/:id"
              component={() => <PostContainer key={window.location.pathname} />}
            /> */}
            <Route path="/" exact component={() => <HomepageContainer />} />
            <Route
              path="/user/:id/edit"
              component={() => <UserEditContainer />}
            />
            <Route
              path="/user/:id"
              component={() => (
                <UserPageContainer key={window.location.pathname} />
              )}
            />
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        </React.Fragment>
      ) : (
        <Switch>
          <Route
            path="/register"
            exact
            component={() => <RegisterContainer />}
          />
          <Route
            path="/login"
            exact
            component={() => (
              <LoginContainer login={props.login} data={props.state} />
            )}
          />
          <Route render={() => <Redirect to="/login" />} />
        </Switch>
      )}
    </Suspense>
  );
}
