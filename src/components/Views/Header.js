import React from "react";
import { Link, useHistory } from "react-router-dom";

export default function Header(props) {
  const history = useHistory();
  const DeleteToken = async () => {
    history.push("/login");
  };
  return (
    <div className="text-navy">
      <div className="container mx-auto">
        <div className="w-full px-8 rounded-lg text-3xl bg-seafoam">
          <div className="flex md:mx-32 justify-between flex-row">
            <Link to="/">
              <p className="">Home</p>
            </Link>
            <Link to={`/user/${localStorage.getItem("username")}`}>
              <p className="">Account</p>
            </Link>
            <p className="" onClick={DeleteToken}>
              Logout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
