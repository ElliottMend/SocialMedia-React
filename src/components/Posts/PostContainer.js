import React from "react";
import CommentDisplay from "./CommentContainer";
import { Link } from "react-router-dom";
export default function PostContainer(props) {
  const date = Date.now() / 1000 - props.data.date / 1000;

  return (
    <div className="rounded-lg">
      <div className="flex items-center justify-between md:mx-32 flex-row">
        <Link to={`/user/${props.data.author}/`}>
          <img className="w-20 mr-20 rounded-full" alt="Profile" src={props.img} />{" "}
        </Link>
        <Link to={`/user/${props.data.author}/`}>
          <p className="ml-20 text-3xl">{props.data.author}</p>
        </Link>
      </div>
      <div className="flex flex-row justify-center text-center">
        <p>{props.data.body}</p>
      </div>

      <div className="flex justify-between flex-row">
        <div className="flex mx-20 flex-row">
          <p className="mx-6">Likes: {props.data.likes}</p>
          <form>
            <label className="flex" htmlFor={props.data._id}>
              <svg
                xmlns="https://cors-anywhere.herokuapp.com/https://www.w3.org/2000/svg"
                fill={props.data.liked ? "red" : "none"}
                viewBox="0 0 24 24"
                stroke="red"
                className="w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </label>
            <input
              id={props.data._id}
              defaultChecked={props.data.liked}
              type="checkbox"
              className="hidden"
              onClick={props.onChange}
            />
          </form>
        </div>
        <div className="mx-20">
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
        </div>
      </div>
      <form className="bg-blue-600" onSubmit={props.createComment}>
        <input
          className="text-2xl mx-10 w-2/3 rounded-lg mb-10"
          onChange={props.commentChange}
          placeholder="comment"
        ></input>
        <button className="m-10">Submit</button>
      </form>
      <div className="flex flex-col justify-center">
        {props.comments &&
          props.comments.map(
            (e, index) =>
              e.show && (
                <CommentDisplay
                  postAuthor={props.data.author}
                  deleteComment={() => props.deleteComment(index)}
                  key={e._id}
                  data={e}
                />
              )
          )}
      </div>
    </div>
  );
}
