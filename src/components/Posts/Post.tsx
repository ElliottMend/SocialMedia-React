import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { CommentContainer } from "./CommentContainer";
import PostContainer from "./PostContainer";
import Modal from "react-modal";
import { DateTime } from "../Reusable/DateTime";
import { IPost } from "./PostContainer";
import { Likes } from "./Likes";
interface IProps {
  modal: boolean;
  changeModal: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  deletePost: () => void;
  post: IPost;
  more: boolean;
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
        <div>
          <div className="flex items-center mx-2 md:mx-10 justify-between flex-row">
            <div>
              <Link to={`/user/${props.post.username}`}>
                <img
                  className="w-20 md:w-32 md:m-10 m-2 rounded-full"
                  alt="Profile"
                  src={props.post?.photo}
                />
              </Link>
            </div>
            <div>
              <Link to={`/user/${props.post?.username}`}>
                <h6 className="text-2xl self-middle align-middle font-bold">
                  {props.post?.username}
                </h6>
              </Link>
            </div>
          </div>
          <div className="break-words text-center my-3 px-10 md:px-20">
            <p>{props.post.body}</p>
          </div>
          <div className="flex mt-10 justify-center flex-row">
            <DateTime date={date} />
            <Likes data={props.post} />
            <div>{props.post?.location}</div>
          </div>
          <button
            className="bg-salmon py-4 px-8 m-2 rounded-lg"
            onClick={props.deletePost}
          >
            Delete Post
          </button>
        </div>
        <CommentContainer data={props.post} />
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
        <PostContainer more={props.more} postData={props.post} />
      </Modal>
    </div>
  );
}
