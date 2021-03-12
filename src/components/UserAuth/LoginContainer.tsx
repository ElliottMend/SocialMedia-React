import React, { useState } from "react";
import Login from "./Login";
import axios from "axios";
import { Redirect } from "react-router-dom";
export interface IState {
  email: string;
  password: string;
  error: string;
  redirectHome: boolean;
  redirectEdit: boolean;
}
export default function LoginContainer() {
  const [state, setState] = useState<IState>({
    email: "",
    password: "",
    error: "",
    redirectHome: false,
    redirectEdit: false,
  });

  const guestLogin = async () => {
    const username = Math.random().toString(36).substring(2, 15);
    const email =
      Math.random().toString(36).substring(2, 15) +
      "@" +
      Math.random().toString(36).substring(2, 15) +
      ".com";
    const password =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    await axios({
      method: "post",
      url: "http://localhost:5000/login",
      data: {
        username: username,
        password: password,
        email: email,
      },
      withCredentials: true,
    });
    await axios({
      method: "post",
      url: "http://localhost:5000/login",
      data: { email: email, password: password },
      withCredentials: true,
    });
    setState({ ...state, redirectEdit: true });
  };

  return (
    <div>
      <Login data={state} guestLogin={guestLogin} />
      {state.redirectHome && <Redirect to={"/"} />}
    </div>
  );
}
