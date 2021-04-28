import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from "./Loading";
import Header from "../Views/Header";
import { MessageRoomListContainer } from "../Messages/MessageRoomListContainer";
import { MessageRoomContainer } from "../Messages/MessageRoomContainer";
const LoginContainer = lazy(() => import("../UserAuth/LoginContainer"));
const RegisterContainer = lazy(() => import("../UserAuth/RegisterContainer"));
const UserPageContainer = lazy(
  () => import("../UserProfile/UserPageContainer")
);
const PostContainer = lazy(() => import("../Posts/PostContainer"));
const HomepageContainer = lazy(() => import("../Home/HomepageContainer"));
const UserEditContainer = lazy(() => import("../UserEdit/UserEditContainer"));
interface IProps {
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
            <Route
              path="/messages/:room_id"
              component={() => <MessageRoomContainer />}
            />
            <Route
              path="/messages"
              component={() => <MessageRoomListContainer />}
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
          <Route path="/login" exact component={() => <LoginContainer />} />
          <Route render={() => <Redirect to="/login" />} />
        </Switch>
      )}
    </Suspense>
  );
}
