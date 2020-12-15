import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { usernameContext } from "../Context/usernameContext";
export default function Header(props) {
  const history = useHistory();
  const DeleteToken = async () => {
    console.log("click");
    await axios({
      method: "get",
      url: `https://social-mediasite.herokuapp.com/logout`,
      withCredentials: true,
    });
    history.push("/login");
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
          </div>
        </div>
      </div>
    </div>
  );
}
