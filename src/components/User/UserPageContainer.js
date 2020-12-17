import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Modal from "react-modal";
import UserPage from "./UserPage";
import { usernameContext } from "../Context/usernameContext";

export default function UserPageContainer() {
  const [user, setUser] = useState({ img: "", bio: "" });
  const [follows, setFollows] = useState({
    followers: 0,
    following: 0,
    followerUsers: [],
    followingUsers: [],
  });
  const [display, setDisplays] = useState(0);
  const [username] = useState(useContext(usernameContext));
  const [modalIsOpen, setIsOpen] = React.useState({
    isOpen: false,
    modal: null,
  });
  const [userLikes, setLikes] = useState([]);
  const [state, setState] = useState({
    postItems: [],
    user: window.location.pathname.split("/")[2],
  });

  const getUser = async () => {
    const user = await axios({
      method: "get",
      url: "https://social-mediasite.herokuapp.com/getUser",
      data: { user: state.user },
      withCredentials: true,
    });
    return user;
  };
  const checkFollow = async () => {
    const follows = await axios({
      method: "get",
      url: `https://social-mediasite.herokuapp.com/checkFollow/${state.user}`,
      data: {
        user: state.user,
      },
      withCredentials: true,
    });
    return follows;
  };
  const displays = async (e) => {
    setDisplays(Number(e.target.id));
  };
  const getPosts = async () => {
    const posts = await axios({
      method: "get",
      url: `https://social-mediasite.herokuapp.com/users/${state.user}`,
      withCredentials: true,
    });
    return posts;
  };

  const openModal = (e) => {
    setIsOpen({ isOpen: true, modal: e.target.id });
  };
  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    let isCancelled = false;
    Modal.setAppElement("body");
    checkFollow().then((res) => {
      if (!isCancelled) {
        setFollows({
          followers: res.data.followers,
          following: res.data.following,
          followerUsers: res.data.followerUsers,
          followingUsers: res.data.followingUsers,
        });
      }
    });
    getUser().then((res) => {
      if (!isCancelled) {
        setUser((prevState) => ({
          prevState,
          location: res.data.location,
          img: res.data.photo,
          bio: res.data.bio,
        }));
      }
    });
    getPosts()
      .then((res) => {
        if (!isCancelled) {
          setState((prevState) => ({
            ...prevState,
            postItems: [...res.data],
          }));
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          if (err.response) {
            setState((prevState) => ({
              ...prevState,
              error: err.response.data.message,
            }));
          }
        }
      });
    return () => {
      isCancelled = true;
    };
  }, []);
  const getUserLikes = async () => {
    const likes = await axios({
      method: "get",
      url: `https://social-mediasite.herokuapp.com/getUserLikes/${state.user}`,
      withCredentials: true,
    });
    setLikes(likes);
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
        userLikes={userLikes}
        display={display}
        clickDisplays={displays}
        username={username}
        closeModal={closeModal}
        customStyles={customStyles}
        afterOpenModal={afterOpenModal}
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        follows={follows}
        user={user}
        state={state}
      />
    </div>
  );
}
