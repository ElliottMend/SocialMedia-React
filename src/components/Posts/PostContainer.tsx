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
  postData: IPost[];
}
export interface IState {
  commentText: string;
  liked: boolean | undefined;
  likes: number;
}
export default function PostContainer(props: IProps) {
  const [state, setState] = useState<IPost[]>(props.postData);
  const [modal, setModal] = useState(false);
  const changeModal = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setModal(modal ? false : true);
  };

  useEffect(() => {
    let isCancelled = false;
    Modal.setAppElement("body");
    setState(props.postData);
    return () => {
      isCancelled = true;
    };
  }, [props.postData]);

  const deletePost = async (index: number, post_id: number) => {
    await axios({
      method: "put",
      url: "http://localhost:5000/removePost",
      data: { id: post_id },
      withCredentials: true,
    });
    let arr = [...state];
    arr.splice(index, 1);
    setState(arr);
  };
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
    <div>
      {state.map((e, index) => (
        <div key={e.post_id}>
          <Post
            changeModal={changeModal}
            deletePost={() => deletePost(index, e.post_id)}
            post={e}
          />
          <button className="w-full" onClick={changeModal}>
            <p className="p-4 bg-lime">See More!</p>
          </button>
          <Modal
            isOpen={modal}
            onRequestClose={changeModal}
            style={customStyles}
          >
            <Post
              changeModal={changeModal}
              deletePost={() => deletePost(index, e.post_id)}
              post={e}
            />
          </Modal>
        </div>
      ))}
    </div>
  );
}
