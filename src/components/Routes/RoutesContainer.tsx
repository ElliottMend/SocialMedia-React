import { useEffect, useState } from "react";
import Routes from "./Routes";
import axios from "axios";
import { usernameContext } from "../Context/usernameContext";
export const RoutesContainer = () => {
  const [user, setUser] = useState<string>("");
  const [state, setState] = useState(true);
  useEffect(() => {
    let isCancelled = false;
    loggedIn()
      .then((res) => {
        if (!isCancelled) setState(true);
      })
      .catch((err) => {
        if (!isCancelled) setState(false);
      });
    getUserName().then((res) => {
      if (!isCancelled) setUser(res.data);
    });
    return () => {
      isCancelled = true;
    };
  }, []);

  const getUserName = () => {
    return axios.get<string>("http://localhost:5000/checkJWT", {
      withCredentials: true,
    });
  };
  const loggedIn = () => {
    return axios.get<boolean>("http://localhost:5000/verify", {
      withCredentials: true,
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
        <Routes logout={logout} state={state} />
      </usernameContext.Provider>
    </div>
  );
};
