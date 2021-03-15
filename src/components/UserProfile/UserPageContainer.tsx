import React, { useState, useEffect, useContext } from "react";
import { axiosInstance } from "../../App";
import Modal from "react-modal";
import { UserPage } from "./UserPage";
import { usernameContext } from "../Context/usernameContext";
import { IPost } from "../Home/HomepageContainer";
export interface IProfile {
  user_id: number;
  photo: string;
  bio: string;
  followers: number;
  following: number;
  location: string;
  username: string;
}
export interface IData {
  Likes: IPost[];
  Posts: IPost[];
  [key: string]: IPost[];
}
export interface IState {
  profile: IProfile;
  data: IData;
}
interface IModal {
  isOpen: boolean;
  element: string | null;
}
export default function UserPageContainer() {
  const [state, setState] = useState<IData>({
    Posts: [],
    Likes: [],
  });
  const [profile, setProfile] = useState<IProfile>({
    user_id: 0,
    photo: "",
    bio: "",
    location: "",
    username: "",
    followers: 0,
    following: 0,
  });
  const [username] = useState(useContext(usernameContext));
  const [modal, setModal] = React.useState<IModal>({
    isOpen: false,
    element: null,
  });
  const userProfile = window.location.pathname.split("/")[2];
  const modalStatus = (e: React.MouseEvent<HTMLElement>) => {
    modal.isOpen
      ? setModal({ ...modal, isOpen: false })
      : setModal({ element: (e.target as Element).id, isOpen: true });
  };

  useEffect(() => {
    let isCancelled = false;
    Modal.setAppElement("body");
    getUserProfile().then((res) => {
      if (!isCancelled) {
        setProfile(res.data.profile);
        setState(res.data.data);
      }
    });
    return () => {
      isCancelled = true;
    };
  }, []);
  const getUserProfile = async () => {
    return axiosInstance.get<IState>(`/users/${userProfile}`, {});
  };
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
        profile={profile}
        modal={modal}
        modalStatus={modalStatus}
        state={state}
      />
    </div>
  );
}
