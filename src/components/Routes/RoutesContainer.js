import React, { useEffect, useState } from "react";
import Routes from "./Routes";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { usernameContext } from "../Context/usernameContext";
export const RoutesContainer = () => {
  const history = useHistory();
  const [user, setUser] = useState();
  const [state, setState] = useState(true);
  useEffect(() => {
    loggedIn();
    getUserName();
  }, []);

  const getUserName = () => {
    axios({
      method: "get",
      url: "https://social-mediasite.herokuapp.com/checkJWT",
      withCredentials: true,
    }).then((res) => {
      setUser(res.data);
    });
  };
  const loggedIn = () => {
    axios({
      method: "get",
      url: "https://social-mediasite.herokuapp.com/verify",
      withCredentials: true,
    })
      .then((res) => {
        setState(true);
      })
      .catch((err) => {
        setState(false);
      });
  };
  return (
    <div>
      <usernameContext.Provider value={user}>
        <Routes state={state} />
      </usernameContext.Provider>
    </div>
  );
};
