import { useEffect, useState } from "react";
import Routes from "./Routes";
import { axiosInstance } from "../../App";
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
    return axiosInstance.get<string>("/checkJWT", {});
  };
  const loggedIn = () => {
    return axiosInstance.get<boolean>("/verify", {});
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
