import React, { useState, useEffect } from "react";
import Post from "./Post";
import axios from "axios";
import Modal from "react-modal";

export interface IPost {
  body: string;
  date: string;
  post_id: number;
  user_id: number;
  location: string;
  username: string;
  bio: string;
  photo: string;
  likes: number;
}
interface IProps {
  more: boolean;
  postData: IPost;
}
export interface IState {
  commentText: string;
  liked: boolean | undefined;
  likes: number;
}
export default function PostContainer(props: IProps) {
  const [modal, setModal] = useState(false);
  const changeModal = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setModal(modal ? false : true);
  };

  useEffect(() => {
    let isCancelled = false;
    Modal.setAppElement("body");
    return () => {
      isCancelled = true;
    };
  }, []);

  const deletePost = async () => {
    await axios({
      method: "put",
      url: "http://localhost:5000/removePost",
      data: { id: props.postData.post_id },
      withCredentials: true,
    });
  };
  return (
    <div>
      <Post
        modal={modal}
        changeModal={changeModal}
        deletePost={deletePost}
        post={props.postData}
        more={props.more}
      />
    </div>
  );
}
