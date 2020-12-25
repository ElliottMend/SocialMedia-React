import React, { useEffect } from "react";
import Comments from "./Comments";
import { Link } from "react-router-dom";
import PostContainer from "./PostContainer";
import Modal from "react-modal";
import { DateTime } from "../Reusable/DateTime";
export default function Post(props) {
  useEffect(() => {});
  const date = Date.now() / 1000 - props.data.date / 1000;
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      width: "90%",
      height: "90%",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      overflow: "auto",
    },
  };
  return (
    <div className="my-10">
      <div className="rounded-lg font-semibold text-navy bg-seafoam">
        {props.data && (
          <div>
            <div className="flex items-center mx-2 md:mx-10 justify-between flex-row">
              <div>
                <Link to={`/user/${props.data.author}`}>
                  <img
                    className="w-20 md:w-32 md:m-10 m-2 rounded-full"
                    alt="Profile"
                    src={props.img}
                  />
                </Link>
              </div>
              <div>
                <Link to={`/user/${props.data.author}`}>
                  <h6 className="text-2xl self-middle align-middle font-bold">
                    {props.data.author}
                  </h6>
                </Link>
              </div>
            </div>
            <div className="break-words text-center my-3 px-10 md:px-20">
              <p>{props.data.body}</p>
            </div>
            <div className="flex mt-10 justify-center flex-row">
              <DateTime date={date} />
              <p className="ml-10">{props.data.likes}</p>
              <label className="flex" htmlFor={props.data._id}>
                <svg
                  xmlns="https://www.w3.org/2000/svg"
                  fill={props.data.liked ? "salmon" : "none"}
                  viewBox="0 0 24 24"
                  stroke="salmon"
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
                className="hidden"
                defaultChecked={props.data.liked}
                type="checkbox"
                onClick={props.onChange}
              />
              <div>{props.data.location}</div>
            </div>
            {props.data.author === props.username && (
              <button
                className="bg-salmon py-4 px-8 m-2 rounded-lg"
                onClick={props.deletePost}
              >
                Delete Post
              </button>
            )}
            <form
              className="bg-cream flex flex-col justify-center"
              onSubmit={props.createComment}
            >
              <input
                maxLength="140"
                className="bg-gray-100 p-3 focus:border-blue-300 focus:outline-none focus:ring border-black h-10 shadow-inner border w-full rounded-lg "
                onChange={props.commentChange}
                placeholder="Comment"
              ></input>
              <button className="m-2 md:m-4 text-2xl">Submit</button>
            </form>
          </div>
        )}
      </div>
      <div>
        {props.comments &&
          props.comments
            .slice(0, 3)
            .map(
              (e, index) =>
                e.show && (
                  <Comments
                    postAuthor={props.data.author}
                    deleteComment={() => props.deleteComment(index)}
                    key={e._id}
                    data={e}
                  />
                )
            )}
      </div>
      {props.more && (
        <button className="w-full" onClick={props.openModal}>
          <p className="p-4 bg-lime">See More!</p>
        </button>
      )}
      <Modal
        isOpen={props.modal}
        onAfterOpen={props.afterModalOpen}
        onRequestClose={props.closeModal}
        style={customStyles}
        // className="w-full flex mx-auto md:w-6/12 bg-blue-300"
      >
        <PostContainer
          deleteComment={(index) => props.deleteComment(index)}
          onChange={props.onChange}
          createComment={props.createComment}
          commentChange={props.commentChange}
          img={props.img}
          comments={props.comments}
          data={props.data}
        />
      </Modal>
    </div>
  );
}
