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
      errors: [],
    });
    axios({
      method: "post",
      url: "https://cors-anywhere.herokuapp.com/https://social-mediasite.herokuapp.com/register",
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
      .catch((err) => {
        console.log(err.response);
        if (err.response.data.message) {
          setState({
            ...state,
            errors: [err.response.data.message],
          });
        } else {
          if (err.response.data.errors.length > 1) {
            err.response.data.errors.map((e) =>
              setState({
                ...state,
                errors: [e.msg],
              })
            );
          } else {
            setState({
              ...state,
              errors: [err.response.data.errors[0].msg],
            });
          }
        }
      });
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
