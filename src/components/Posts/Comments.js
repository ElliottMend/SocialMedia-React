import React, { useContext } from "react";
import { usernameContext } from "../Context/usernameContext";
import { Link } from "react-router-dom";
export default function Comments(props) {
  const date = Date.now() / 1000 - props.data.date / 1000;
  return (
    <div className="border-b flex text-navy text-lg flex-col items-center justify-center py-3 bg-seafoam">
      <Link to={`/user/${props.data.author}`}>
        <p className="font-bold">{props.data.author}</p>
        <p>{props.data.text}</p>
      </Link>
      {date < 60 ? (
        <p>{Math.round(date)} seconds ago</p>
      ) : date < 3600 ? (
        <p>{Math.round(date / 60)} minutes ago</p>
      ) : date < 86400 ? (
        <p>{Math.round(date / 3600)} hours ago</p>
      ) : date < 604800 ? (
        <p>{Math.round(date / 86400)} days ago</p>
      ) : date < 2.628e6 ? (
        <p>{Math.round(date / 604800)} weeks ago</p>
      ) : date < 31535965.4396976 ? (
        <p>{Math.round(date / 2592000)} months ago</p>
      ) : (
        31535965.4396976 < date && <p>{Math.round(date / 31104000)}y ago</p>
      )}
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
