import React, { useContext } from "react";
import { usernameContext } from "../Context/usernameContext";
import { Link } from "react-router-dom";
import { DateTime } from "../Reusable/DateTime";
export default function Comments(props) {
  const date = Date.now() / 1000 - props.data.date / 1000;
  return (
    <div className="border-b flex text-center text-navy text-lg flex-col justify-center py-3 bg-seafoam">
      <Link className="" to={`/user/${props.data.author}`}>
        <p className="text-center font-bold">{props.data.author}</p>
        <div className="break-words text-center my-3 px-10 md:px-20">
          <p>{props.data.text}</p>
        </div>
      </Link>

      <DateTime date={date} />
      {props.data.author === useContext(usernameContext) && (
        <button
          className="bg-salmon py-2 px-4 m-2 rounded-lg"
          onClick={props.deleteComment}
        >
          Delete Comment
        </button>
      )}
    </div>
  );
}
