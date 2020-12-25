import React, { useState } from "react";
import axios from "axios";
import Register from "./Register";
import { Redirect } from "react-router-dom";

export default function RegisterContainer() {
  const [state, setState] = useState({
    username: "",
    password: "",
    password2: "",
    email: "",
    redirect: false,
    errors: "",
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
        withCredentials: true,
        url: "https://social-mediasite.herokuapp.com/register",
        data: {
          username: state.username,
          password: state.password,
          email: state.email,
        },
      })
        .then(() => {
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
      <Register onSubmit={Submit} onChange={handleChange} data={state} />
    </div>
  );
}
