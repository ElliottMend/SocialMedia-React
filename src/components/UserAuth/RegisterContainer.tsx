import React, { useState } from "react";
import axios from "axios";
import Register from "./Register";
import { Redirect } from "react-router-dom";
export interface IState {
  username: string;
  password: string;
  password2: string;
  email: string;
  redirect: boolean;
  errors: string;
}
export default function RegisterContainer() {
  const [state, setState] = useState<IState>({
    username: "",
    password: "",
    password2: "",
    email: "",
    redirect: false,
    errors: "",
  });
  const Submit = async (e: React.SyntheticEvent) => {
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
        url: "http://localhost:5000/register",
        data: {
          username: state.username,
          password: state.password,
          email: state.email,
        },
      }).then(() => {
        setState({ ...state, redirect: true });
      });
    }
  };
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
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
