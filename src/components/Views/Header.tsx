import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { usernameContext } from "../Context/usernameContext";
interface IProps {
  logout: () => void;
}
export default function Header(props: IProps) {
  const [redirect, setRedirect] = useState(false);
  const DeleteToken = async () => {
    await axios({
      method: "get",
      url: `http://localhost:5000/logout`,
      withCredentials: true,
    }).then(async () => {
      await props.logout();
      setRedirect(true);
    });
  };
  return (
    <div className="text-navy">
      <div className="mx-auto">
        <div className="w-full px-8 rounded-lg text-3xl bg-seafoam">
          <div className="flex md:mx-32 justify-between flex-row">
            <Link to="/">
              <p className="">Home</p>
            </Link>
            <Link to={`/user/${useContext(usernameContext)}`}>
              <p className="">Account</p>
            </Link>
            <p className="cursor-pointer" onClick={DeleteToken}>
              Logout
            </p>
            {redirect && <Redirect to="/login" />}
          </div>
        </div>
      </div>
    </div>
  );
}
