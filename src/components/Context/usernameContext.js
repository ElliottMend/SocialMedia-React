import React, { createContext } from "react";
import axios from "axios";
const getUserName = () => {
  axios({
    method: "get",
    url:
      "https://social-mediasite.herokuapp.com/checkJWT",
    withCredentials: true,
  }).then((res) => {
    return res.data;
  });
};
export const usernameContext = createContext(getUserName);
