import React from "react";
export default function Comments(props) {
  const date = Date.now() / 1000 - props.data.date / 1000;
  return (
    <div className="my-1 flex text-navy text-lg flex-col items-center justify-center py-3 bg-seafoam">
      <p className="font-bold">{props.data.author}</p>
      <p>{props.data.text}</p>
      {date < 60 ? (
        <p>{Math.round(date)}s ago</p>
      ) : date < 3600 ? (
        <p>{Math.round(date / 60)}m ago</p>
      ) : date < 86400 ? (
        <p>{Math.round(date / 3600)}h ago</p>
      ) : date < 604800 ? (
        <p>{Math.round(date / 86400)}d ago</p>
      ) : date < 2.628e6 ? (
        <p>{Math.round(date / 604800)}w ago</p>
      ) : date < 31535965.4396976 ? (
        <p>{Math.round(date / 2592000)}mnth ago</p>
      ) : (
        31535965.4396976 < date && <p>{Math.round(date / 31104000)}y ago</p>
      )}

      {(localStorage.getItem("username") === props.data.author ||
        localStorage.getItem("username") === props.postAuthor) && (
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
