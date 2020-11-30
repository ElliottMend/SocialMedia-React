import React from "react";
import { Link, useHistory } from "react-router-dom";

export default function Header(props) {
  const history = useHistory();
  const DeleteToken = async () => {
    localStorage.clear();
    await props.auth();
    history.push("/login");
  };
  return (
    <div className="bg-gray-200 text-navy">
      <div className="container mx-auto">
        <div className="w-full rounded-lg text-3xl bg-seafoam">
          {localStorage.getItem("accessToken") && (
            <div className="flex md:mx-32 justify-between flex-row">
              <Link to="/">
                <p className="">Home</p>
              </Link>
              <Link to={`/user/${localStorage.getItem("username")}`}>
                <p className="">My Account</p>
              </Link>
              <p className="" onClick={DeleteToken}>
                Logout
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
