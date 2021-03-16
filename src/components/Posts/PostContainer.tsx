import React, { useState, useEffect } from "react";
import Post from "./Post";
import { axiosInstance } from "../../App";
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
interface IModal {
  isOpen: boolean;
  element: string | null;
}
export default function PostContainer(props: IProps) {
  const [state, setState] = useState<IPost[]>(props.postData);
  const [modal, setModal] = useState<IModal>({ isOpen: false, element: null });
  const changeModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    modal.isOpen
      ? setModal({ ...modal, isOpen: false })
      : setModal({ element: (e.target as Element).id, isOpen: true });
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
    await axiosInstance({
      method: "put",
      url: "/removePost",
      data: { id: post_id },
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
        <div className="container mx-auto" key={e.post_id}>
          <div id={String(e.post_id)}>
            <Post deletePost={() => deletePost(index, e.post_id)} post={e} />
          </div>
          <button className="w-full" onClick={changeModal}>
            <p className="p-4 bg-lime">See More!</p>
          </button>
          <Modal
            id={String(modal.element)}
            isOpen={modal.isOpen}
            onRequestClose={changeModal}
            style={customStyles}
          >
            <Post deletePost={() => deletePost(index, e.post_id)} post={e} />
          </Modal>
        </div>
      ))}
    </div>
  );
}
