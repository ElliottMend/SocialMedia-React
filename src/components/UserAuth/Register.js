import React, { useState } from "react";
import axios from "axios";
import RegisterDisplay from "./RegisterDisplay";
import { Redirect } from "react-router-dom";

export default function Register(props) {
  const [state, setState] = useState({
    username: "",
    password: "",
    password2: "",
    email: "",
    redirect: false,
  });
  const Submit = async (e) => {
    e.preventDefault();
    setState({
      ...state,
      errors: "",
    });
    if (state.username.length < 5) {
      setState({
        ...state,
        errors: "The username must be at least 5 characters",
      });
    } else if (!state.email.includes("@") || !state.email.includes(".")) {
      setState({
        ...state,
        errors: "The email must contain '@' and '.' symbols",
      });
    } else if (state.password.length < 5) {
      setState({
        ...state,
        errors: "The password must be at least 5 characters",
      });
    } else if (state.password2 !== state.password) {
      setState({
        ...state,
        errors: "The passwords do not match",
      });
    } else {
      axios({
        method: "post",
        url:
          "https://cors-anywhere.herokuapp.com/https://social-mediasite.herokuapp.com/register",
        data: {
          username: state.username,
          password: state.password,
          password2: state.password2,
          email: state.email,
        },
      })
        .then(() => {
          console.log("redirect");
          setState({ redirect: true });
        })
        .catch((err) => {});
    }
  };
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };
  return (
    <div>
      {state.redirect && <Redirect to="/login" />}
      {!localStorage.getItem("accessToken") && (
        <RegisterDisplay
          onSubmit={Submit}
          onChange={handleChange}
          data={state}
        />
      )}
    </div>
  );
}
