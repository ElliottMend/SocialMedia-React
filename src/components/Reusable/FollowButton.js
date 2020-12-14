import React from "react";

export const FollowButton = (props) => {
  return (
    <div>
      <input
        onClick={props.changeFollow}
        defaultChecked={props.follow}
        id={props.user}
        className="hidden"
        type="checkbox"
      ></input>
      <label className="" htmlFor={props.user}>
        {props.follow ? (
          <div>
            <p className="bg-salmon cursor-pointer w-40 h-20 flex items-center justify-center rounded-full ">
              Following
            </p>
          </div>
        ) : (
          <div>
            <p className="bg-blue-300 cursor-pointer w-40 h-20 flex items-center justify-center rounded-full ">
              Follow
            </p>
          </div>
        )}
      </label>
    </div>
  );
};
