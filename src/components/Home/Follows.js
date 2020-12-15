import React from "react";
import { Link } from "react-router-dom";
import { FollowButtonContainer } from "../Reusable/FollowButtonContainer";
export default function Follows(props) {
  let checked = props.data.check;
  return (
    <div className="border-2 rounded-lg border-black">
      <div className="bg-white m-3">
        <div className="flex justify-between items-center flex-row">
          <Link className="flex items-center justify-between" to={`/user/${props.data.username}/`}>
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
          <FollowButtonContainer user={props.data.username} />
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
