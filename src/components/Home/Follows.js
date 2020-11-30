import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function Follows(props) {
  const [state, setState] = useState({ checked: true });
  const Follow = async (e) => {
    const check = e.target.checked;
    await setState({
      ...state,
      follow: check,
    });
    if (!check) {
      axios({
        method: "put",
        url: "https://cors-anywhere.herokuapp.com/https://social-mediasite.herokuapp.com/removeFollow",
        data: {
          user: localStorage.getItem("username"),
          author: props.data.username,
        },
      });
    } else {
      axios({
        method: "put",
        url: "https://cors-anywhere.herokuapp.com/https://social-mediasite.herokuapp.com/addFollow",
        data: {
          user: localStorage.getItem("username"),
          author: props.data.username,
        },
      });
    }
  };
  let checked = state.check;
  return (
    <div className="border-2 rounded-lg border-black">
      <div className="bg-white py-8">
        <div className="flex justify-between flex-row">
          <Link className="flex" to={`/user/${props.data.username}/`}>
            <img className="rounded-full m-5 w-3/12" src={props.data.photo} />
            <div className="flex  flex-col">
              <div>
                <p className="my-2 text-lg">{props.data.username}</p>
              </div>
              <p className="my-2">{props.data.bio}</p>
            </div>
          </Link>
          {localStorage.getItem("username") !== state.user && (
            <label className="my-auto" htmlFor={props.data.username}>
              {state.follow ? (
                <p className="bg-blue-300 mr-2 py-3 px-2 rounded-full">Following</p>
              ) : (
                <p className="bg-blue-300 mr-2 py-3 px-5 rounded-full">Follow</p>
              )}
            </label>
          )}
          <input
            onClick={Follow}
            onChange={() => (checked = !checked)}
            defaultChecked={state.follow}
            id={props.data.username}
            className="hidden"
            type="checkbox"
          ></input>
        </div>
      </div>
    </div>
  );
}
