import React, { useState } from "react";
import Login from "./Login";
import axios from "axios";
import { Redirect } from "react-router-dom";
export default function LoginContainer(props) {
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
    console.log('gues')
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
    const reg = await axios({
      method: "post",
      url: "https://cors-anywhere.herokuapp.com/https://social-mediasite.herokuapp.com/register",
      data: {
        username: username,
        password: password,
        password2: password2,
        email: email,
      },
    });
    const log = await axios({
      method: "post",
      url: "https://cors-anywhere.herokuapp.com/https://social-mediasite.herokuapp.com/login",
      data: { email: email, password: password },
    });
    setState({ ...state, redirectEdit: true });
    localStorage.setItem("refreshToken", log.data.refreshToken);
    localStorage.setItem("username", log.data.username);
    localStorage.setItem("accessToken", log.data.accessToken);
    await props.auth();
  };
  const UserAuth = async (e) => {
    e.preventDefault();
    setState({
      ...state,
      redirectHome: false,
      redirectEdit: false,
    });
    try {
      const res = await axios({
        method: "post",
        url: "https://cors-anywhere.herokuapp.com/https://social-mediasite.herokuapp.com/login",
        data: state,
      });
      const user = res.data.username;
      const access = res.data.accessToken;
      const refresh = res.data.refreshToken;
      const bio = res.data.bio;
      if (bio !== "") {
        setState({
          ...state,
          username: user,
          redirectHome: true,
        });
      } else {
        setState({
          ...state,
          username: user,
          redirectEdit: true,
        });
      }
      localStorage.setItem("refreshToken", refresh);
      localStorage.setItem("username", user);
      localStorage.setItem("accessToken", access);
      await props.auth();
    } catch (err) {
      console.log(err);
      const a = err.response.data.message;
      setState({
        ...state,
        error: a,
      });
    }
  };
  return (
    <div>
      {state.redirectHome && <Redirect exact to={"/"} />}
      {state.redirectEdit && <Redirect to={`/user/${state.username}/edit`} />}
      {!localStorage.getItem("accessToken") && (
        <Login
          data={state}
          onChange={handleChange}
          loginAuth={UserAuth}
          guestLogin={guestLogin}
        />
      )}
    </div>
  );
}
