import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import { axiosInstance } from "../../App";
export interface IState {
  redirect: boolean;
  error: string;
}
export default function LoginContainer() {
  const [state, setState] = useState<IState>({ redirect: false, error: "" });
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
    await axiosInstance.post("/login", {
      username: username,
      password: password,
      email: email,
    });
    await axiosInstance.post("/login", {
      method: "post",
      url: "http://localhost:5000/login",
      data: { email: email, password: password },
      withCredentials: true,
    });
    setState({ ...state, redirect: true });
  };
  return (
    <div>
      <div className="bg-white shadow-2xl flex justify-center flex-col rounded-lg text-navy text-xl font-semibold md:m-20">
        <LoginForm />
        <Link className="justify-center flex" to="/register">
          <p className="my-6 text-2xl font-bold">
            Don't have an account? Register now!
          </p>
        </Link>
        <button className="text-2xl" onClick={guestLogin}>
          Log in as Guest?
        </button>
        <div className="flex py-10 justify-center">
          {state.error && (
            <h6 className="bg-red-200 w-2/3 py-6 text-red-700">
              {state.error}
            </h6>
          )}
        </div>
      </div>
    </div>
  );
}
