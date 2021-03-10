import React, { ChangeEvent, useEffect } from "react";
import Comments from "./Comments";
import { Link } from "react-router-dom";
import PostContainer, { IProfile } from "./PostContainer";
import Modal from "react-modal";
import { DateTime } from "../Reusable/DateTime";
import { IComment, IState, IPost } from "./PostContainer";
interface IProps {
  modal: boolean;
  changeModal: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  deleteComment: (index: number) => void;
  deletePost: () => void;
  comments: IComment[];
  user: IProfile | undefined;
  commentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  createComment: (e: React.SyntheticEvent) => void;
  data: IState;
  post: IPost;
  more: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
export default function Post(props: IProps) {
  useEffect(() => {});
  const date = Date.now() / 1000 - Number(props.post.date) / 1000;
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
                <Link to={`/user/${props.user?.username}`}>
                  <img
                    className="w-20 md:w-32 md:m-10 m-2 rounded-full"
                    alt="Profile"
                    src={props.user?.photo}
                  />
                </Link>
              </div>
              <div>
                <Link to={`/user/${props.user?.username}`}>
                  <h6 className="text-2xl self-middle align-middle font-bold">
                    {props.user?.username}
                  </h6>
                </Link>
              </div>
            </div>
            <div className="break-words text-center my-3 px-10 md:px-20">
              <p>{props.post.body}</p>
            </div>
            <div className="flex mt-10 justify-center flex-row">
              <DateTime date={date} />
              <p className="ml-10">{props.data.likes}</p>
              <label className="flex" htmlFor={String(props.post.post_id)}>
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
                id={String(props.post.post_id)}
                className="hidden"
                defaultChecked={props.data.liked}
                type="checkbox"
                onChange={props.onChange}
              />
              <div>{props.user?.location}</div>
            </div>
            <button
              className="bg-salmon py-4 px-8 m-2 rounded-lg"
              onClick={props.deletePost}
            >
              Delete Post
            </button>
            <form
              className="bg-cream flex flex-col justify-center"
              onSubmit={props.createComment}
            >
              <input
                maxLength={140}
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
            .map((e, index) => (
              <Comments
                username={props.user?.username}
                deleteComment={() => props.deleteComment(index)}
                key={e.comment_id}
                data={e}
              />
            ))}
      </div>
      {props.more && (
        <button className="w-full" onClick={props.changeModal}>
          <p className="p-4 bg-lime">See More!</p>
        </button>
      )}
      <Modal
        isOpen={props.modal}
        onRequestClose={props.changeModal}
        style={customStyles}
      >
        <PostContainer more={props.more} state={props.user} data={props.post} />
      </Modal>
    </div>
  );
}
