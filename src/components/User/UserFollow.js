import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FollowButtonContainer } from "../Reusable/FollowButtonContainer";
export default function UserFollow(props) {
  const [state, setState] = useState({ checked: true });
  return (
    <div className={props.color ? "bg-seafoam" : "bg-salmon"}>
      <div className="flex items-center text-navy justify-between flex-row">
        <Link to={`/user/${props.data.username}`}>
          <div className="flex items-center text-navy justify-between flex-row">
            <img src={props.data.photo} alt="user Profile" />
            <div className="flex mx-10 justify-center items-center text-center flex-col">
              <p className="text-xl my-3 font-semibold">
                {props.data.username}
              </p>
              <p className="my-3">{props.data.bio}</p>
            </div>
          </div>
        </Link>
        <FollowButtonContainer user={props.data.username} />
      </div>
    </div>
  );
}
