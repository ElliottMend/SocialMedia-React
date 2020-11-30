import React from "react";
import { Link } from "react-router-dom";
export default function RegisterDisplay(props) {
  return (
    <div className="md:m-20 rounded-lg">
      <form className="text-xl text-navy font-bold" onSubmit={props.onSubmit}>
        <div className="rounded-lg bg-seafoam">
          <div className="py-6 items-center flex flex-col">
            <label className="" htmlFor="username">
              Username:
            </label>
            <input
              className="bg-gray-300 active:border-2 border-red-500 w-64 rounded-lg "
              id="username"
              onChange={props.onChange}
            />
          </div>
          <div className="py-6 items-center flex flex-col">
            <label htmlFor="password">Password:</label>
            <input
              className="bg-gray-300 active:border-2 border-red-500 w-64 rounded-lg "
              id="password"
              onChange={props.onChange}
            />
          </div>
          <div className="py-6 items-center flex flex-col">
            <label htmlFor="password2">Confirm Password:</label>
            <input
              className="bg-gray-300 active:border-2 border-red-500 w-64 rounded-lg "
              id="password2"
              onChange={props.onChange}
            />
          </div>
          <div className="py-6 items-center flex flex-col">
            <label htmlFor="email">Email:</label>
            <input
              className="bg-gray-300 active:border-2 border-red-500 w-64 rounded-lg "
              id="email"
              onChange={props.onChange}
            ></input>
          </div>
          <button className="bg-salmon text-semibold text-xl rounded-full my-10 py-6 px-10">
            Submit
          </button>
          <Link to="/login">
            <p className="font-bold text-2xl">Already have an account? Log in!</p>
          </Link>
          <div className="flex py-10 justify-center">
            {props.data.errors && (
              <h6 className="bg-red-200 w-2/3 py-6 text-red-700">
                {props.data.errors}
              </h6>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
