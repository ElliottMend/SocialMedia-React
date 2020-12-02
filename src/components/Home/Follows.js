import React from "react";
import { Link } from "react-router-dom";

export default function Follows(props) {
  let checked = props.data.check;
  return (
    <div className="border-2 rounded-lg border-black">
      <div className="bg-white py-8">
        <div className="flex justify-between flex-row">
          <Link className="flex" to={`/user/${props.data.username}/`}>
            <img
              className="rounded-full m-5 w-3/12"
              src={props.data.photo}
              alt="userProfile"
            />
            <div className="flex  flex-col">
              <div>
                <p className="my-2 text-lg">{props.data.username}</p>
              </div>
              <p className="my-2">{props.data.bio}</p>
            </div>
          </Link>
          {localStorage.getItem("username") !== props.data.user && (
            <label className="my-auto" htmlFor={props.data.username}>
              {props.data.follow ? (
                <p className="bg-blue-300 mr-2 py-3 px-2 rounded-full">
                  Following
                </p>
              ) : (
                <p className="bg-blue-300 mr-2 py-3 px-5 rounded-full">
                  Follow
                </p>
              )}
            </label>
          )}
          <input
            onClick={props.Follow}
            onChange={() => (checked = !checked)}
            defaultChecked={props.data.follow}
            id={props.data.username}
            className="hidden"
            type="checkbox"
          ></input>
        </div>
      </div>
    </div>
  );
}
