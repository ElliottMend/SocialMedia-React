import React, { useState } from "react";
import Login from "./Login";
import axios from "axios";
import history from '../Routes/History'
export default function LoginContainer() {
  const [state, setState] = useState({
    email: "",
    password: "",
    error: "",
    redirectHome: false,
    redirectEdit: false,
  });
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };
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
    const password2 = password;
    await axios({
      method: "post",
      url: "https://social-mediasite.herokuapp.com/register",
      data: {
        username: username,
        password: password,
        password2: password2,
        email: email,
      },
      withCredentials: true,
    });
    await axios({
      method: "post",
      url: "https://social-mediasite.herokuapp.com/login",
      data: { email: email, password: password },
      withCredentials: true,
    });
    setState({ ...state, redirectEdit: true });
  };
  const UserAuth = async (e) => {
    e.preventDefault();
    setState({
      ...state,
      redirectHome: false,
      redirectEdit: false,
    });
    try {
      await axios({
        method: "post",
        url: "https://social-mediasite.herokuapp.com/login",
        data: state,
        withCredentials: true,
      });
      history.push(`/`);
    } catch (err) {
      console.log(err);
      // if (err.response.data.message) {
      //   const a = err.response.data.message;
      //   setState({
      //     ...state,
      //     error: a,
      //   });
      // }
    }
  };
  return (
    <div>
      <Login
        data={state}
        onChange={handleChange}
        loginAuth={UserAuth}
        guestLogin={guestLogin}
      />
    </div>
  );
}
