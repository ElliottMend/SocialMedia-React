import React, { useEffect, useState } from "react";
import Routes from "./Routes";
import axios from "axios";
import { usernameContext } from "../Context/usernameContext";
export const RoutesContainer = () => {
  const [state, setState] = useState(true);
  useEffect(() => {
    loggedIn();
  },[state]);
  const loggedIn = () => {
    axios({
      method: "get",
      url: "https://cors-anywhere.herokuapp.com/https://social-mediasite.herokuapp.com/verify",
    //   withCredentials: true,
    })
      .then((res) => {
          console.log(res.data)
        setState(true);
      })
      .catch((err) => {
          console.log(err.response)
        setState(false);
      });
  };
  return (
    <div>
      <usernameContext.Provider>
        <Routes state={state} />
      </usernameContext.Provider>
    </div>
  );
};
