import React, { useState } from "react";
import { axiosInstance } from "../../App";
import { IState } from "./LoginContainer";
export const LoginForm = () => {
  const [state, setState] = useState<IState>({
    email: "",
    password: "",
    error: "",
    redirectHome: false,
    redirectEdit: false,
  });
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };
  const submitLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setState({
      ...state,
      redirectHome: false,
      redirectEdit: false,
    });
    try {
      await axiosInstance({
        method: "post",
        url: "/login",
        data: state,
      });
      setState({ ...state, redirectHome: true });
    } catch (err) {}
  };
  return (
    <div>
      <form onSubmit={submitLogin}>
        <div className="flex py-6 items-center justify-center mb-10 flex-col">
          <label htmlFor="email">Email:</label>
          <input
            className="bg-gray-100 p-3 focus:border-blue-300 focus:outline-none focus:ring border-black h-10 shadow-inner border w-64 rounded-lg "
            value={state.email}
            onChange={handleChange}
            id="email"
          />
        </div>
        <div className="flex items-center mb-10 flex-col">
          <label htmlFor="password">Password:</label>
          <input
            className="bg-gray-100 p-3 focus:border-blue-300 focus:outline-none focus:ring border-black h-10 shadow-inner border w-64 rounded-lg "
            type="password"
            onChange={handleChange}
            value={state.password}
            id="password"
          />
        </div>
        <div className="flex justify-center">
          <button className="text-xl bg-salmon h-16 w-40 rounded-lg">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
