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
            <p className="bg-blue-300 text-white cursor-pointer md:w-40 md:h-20 w-32 h-16 flex items-center justify-center rounded-full ">
              Following
            </p>
          </div>
        ) : (
          <div>
            <p className="border-blue-300 text-blue-300 border-2 cursor-pointer md:w-40 md:h-20 w-32 h-16 flex items-center justify-center rounded-full ">
              Follow
            </p>
          </div>
        )}
      </label>
    </div>
  );
};
