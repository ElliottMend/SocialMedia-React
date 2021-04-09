import React from "react";
import { Link } from "react-router-dom";
import { IState } from "./LoginContainer";
import { LoginForm } from "./LoginForm";
interface IProps {
  data: IState;
  guestLogin: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export default function Login(props: IProps) {
  return (
    <div>
      <div className="bg-white shadow-2xl flex justify-center flex-col rounded-lg text-navy text-xl font-semibold md:m-20">
        <LoginForm />
        <Link className="justify-center flex" to="/register">
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
