import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Modal from "react-modal";
import UserPage from "./UserPage";
import { usernameContext } from "../Context/usernameContext";
export interface IState {
  user_profile: {
    user_id: number;
    photo: string;
    bio: string;
    followers: number;
    following: number;
    location: string;
    username: string;
  };
  likes: [];
  follows: [];
  post: [];
}
interface IModal {
  isOpen: boolean;
  element: string | null;
}
export default function UserPageContainer() {
  const [state, setState] = useState<IState>();
  const [username] = useState(useContext(usernameContext));
  const [modal, setModal] = React.useState<IModal>({
    isOpen: false,
    element: null,
  });
  const userProfile = window.location.pathname.split("/")[2];

  const modalStatus = (e: React.MouseEvent<HTMLElement>) => {
    modal.element
      ? setModal({ ...modal, isOpen: false })
      : setModal({ element: (e.target as Element).id, isOpen: true });
  };

  useEffect(() => {
    let isCancelled = false;
    Modal.setAppElement("body");
    axios({
      method: "get",
      url: `localhost:5000/users/${userProfile}`,
    }).then((res) => {
      setState(res.data);
    });
    return () => {
      isCancelled = true;
    };
  }, []);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#EDF2F7",
    },
  };
  return (
    <div>
      <UserPage
        username={username}
        customStyles={customStyles}
        modal={modal}
        modalStatus={modalStatus}
        state={state}
      />
    </div>
  );
}
