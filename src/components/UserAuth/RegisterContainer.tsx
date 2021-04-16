import React, { useState } from "react";
import { axiosInstance } from "../../App";
import Register from "./Register";
import { Redirect } from "react-router-dom";
export interface IState {
  username: string;
  password: string;
  password2: string;
  email: string;
  redirect: boolean;
  error: string;
}
export default function RegisterContainer() {
  const [state, setState] = useState<IState>({
    username: "",
    password: "",
    password2: "",
    email: "",
    redirect: false,
    error: "",
  });
  const Submit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setState({
      ...state,
      error: "",
    });
    let error = "";
    const regex = /\d/g;
    if (state.username.length < 5) {
      error = "The username must be at least 5 characters";
    } else if (!state.email.includes("@") || !state.email.includes(".")) {
      error = "The email must contain '@' and '.' symbols";
    } else if (state.password.length < 5) {
      error = "The password must be at least 5 characters";
    } else if (!regex.test(state.password)) {
      error = "The password must contain a number";
    } else if (state.password2 !== state.password) {
      error = "The passwords do not match";
    }
    if (error !== "") {
      setState({ ...state, error });
    } else {
      axiosInstance
        .post("/register", {
          username: state.username,
          password: state.password,
          email: state.email,
        })
        .then(() => {
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
