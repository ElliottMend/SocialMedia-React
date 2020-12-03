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
        {localStorage.getItem("username") !== props.data.username && (
          <label className="mx-10" htmlFor={props.data.username}>
            {state.checked ? (
              <p
                id="following"
                onClick={handleClick}
                className={
                  props.color
                    ? "bg-salmon self-center py-6 px-12 rounded-full "
                    : "bg-seafoam self-center py-6 px-12 rounded-full "
                }
              >
                Following
              </p>
            ) : (
              <p
                id="follow"
                onClick={handleClick}
                className="bg-blue-300 py-6 px-12 rounded-full"
              >
                Follow
              </p>
            )}
          </label>
        )}
      </div>
    </div>
  );
}
