import React from "react";
import { Link } from "react-router-dom";
export default function LoginDisplay(props) {
  return (
    <div>
      <div className="bg-white shadow-2xl rounded-lg text-navy text-xl font-semibold md:m-20">
        <form onSubmit={props.loginAuth}>
          <div className="flex py-6 items-center mb-10 flex-col">
            <label htmlFor="email">Email:</label>
            <input
              className="bg-gray-100 p-3 focus:border-blue-300 focus:outline-none focus:ring border-black h-10 shadow-inner border w-64 rounded-lg "
              value={props.data.email}
              onChange={props.onChange}
              id="email"
            />
          </div>
          <div className="flex items-center mb-10 flex-col">
            <label htmlFor="password">Password:</label>
            <input
              className="bg-gray-100 p-3 focus:border-blue-300 focus:outline-none focus:ring border-black h-10 shadow-inner border w-64 rounded-lg "
              type="password"
              onChange={props.onChange}
              value={props.data.password}
              id="password"
            />
          </div>
          <button className="text-xl bg-salmon h-16 w-40 rounded-lg">
            Submit
          </button>
        </form>
        <Link to="/register">
          <p className="my-6 text-2xl font-bold">
            Don't have an account? Register now!
          </p>
        </Link>
        <button className="text-2xl" onClick={props.guestLogin}>
          Log in as Guest?
        </button>
        <div className="flex py-10 justify-center">
          {props.data.error && (
            <h6 className="bg-red-200 w-2/3 py-6 text-red-700">
              {props.data.error}
            </h6>
          )}
        </div>
      </div>
    </div>
  );
}
