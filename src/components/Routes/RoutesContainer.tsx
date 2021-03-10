import React, { useEffect, useState } from "react";
import Routes from "./Routes";
import axios from "axios";
import { usernameContext } from "../Context/usernameContext";
export const RoutesContainer = () => {
  const [user, setUser] = useState();
  const [state, setState] = useState(true);
  useEffect(() => {
    loggedIn();
    getUserName();
  }, []);

  const getUserName = () => {
    axios({
      method: "get",
      url: "http://localhost:5000/checkJWT",
      withCredentials: true,
    }).then((res) => {
      setUser(res.data);
    });
  };
  const loggedIn = () => {
    axios({
      method: "get",
      url: "http://localhost:5000/verify",
      withCredentials: true,
    })
      .then((res) => {
        setState(true);
      })
      .catch((err) => {
        setState(false);
      });
  };
  const login = () => {
    setState(true);
  };
  const logout = () => {
    setState(false);
  };
  return (
    <div>
      <usernameContext.Provider value={user}>
        <Routes login={login} logout={logout} state={state} />
      </usernameContext.Provider>
    </div>
  );
};
