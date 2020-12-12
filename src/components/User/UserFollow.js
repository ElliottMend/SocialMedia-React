import React, { useState, useEffect } from "react";

export default function UserFollow(props) {
  const [state, setState] = useState({ checked: true });
  useEffect(() => {}, [setState]);
  const handleClick = (e) => {
    props.onChange(e);
  };
  return (
    <div className={props.color ? "bg-seafoam" : "bg-salmon"}>
      <div className="flex items-center text-navy justify-between flex-row">
        <img src={props.data.photo} alt="user Profile" />
        <div className="flex flex-col">
          <p className="text-xl mx-10 font-semibold">{props.data.username}</p>
          <p>{props.data.bio}</p>
        </div>
        <input
          onClick={props.onChange}
          onChange={() =>
            setState((prevState) => ({ checked: !prevState.checked }))
          }
          defaultChecked={state.checked}
          id={props.data.username}
          name="user"
          className="hidden"
          type="checkbox"
        ></input>
        <label
          className="flex items-center justify-center"
          htmlFor={props.data.username}
        >
          {state.checked ? (
            <p
              id="following"
              onClick={handleClick}
              className="bg-salmon w-40 h-20 flex items-center justify-center rounded-full "
            >
              Following
            </p>
          ) : (
            <p
              id="follow"
              onClick={handleClick}
              className="bg-blue-300 h-20 flex items-center justify-center w-40 rounded-full"
            >
              Follow
            </p>
          )}
        </label>
      </div>
    </div>
  );
}
