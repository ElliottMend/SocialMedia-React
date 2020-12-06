import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import UserPage from "./UserPage";

export const UserPageContainer = () => {
  const [user, setUser] = useState({ img: "", bio: "" });
  const [follows, setFollows] = useState({
    followers: 0,
    following: 0,
    followerUsers: [],
    followingUsers: [],
  });
  const [modalIsOpen, setIsOpen] = React.useState({
    isOpen: false,
    modal: null,
  });

  const [state, setState] = useState({
    postItems: [],
    user: window.location.pathname.split("/")[2],
  });

  const getUser = () => {
    axios({
      method: "post",
      url:
        "https://cors-anywhere.herokuapp.com/https://social-mediasite.herokuapp.com/getUser",
      data: { user: state.user },
      withCredentials: true,
    }).then((res) => {
      setUser({
        ...user,
        location: res.data.location,
        img: res.data.photo,
        bio: res.data.bio,
      });
    });
  };
  const checkFollow = () => {
    axios({
      method: "post",
      url:
        "https://cors-anywhere.herokuapp.com/https://social-mediasite.herokuapp.com/checkFollow",
      data: {
        user: state.user,
      },
      withCredentials: true,
    }).then((res) => {
      console.log(res.data);
      setFollows({
        follow: !res.data.followerUsers.includes(
          localStorage.getItem("username")
        )
          ? false
          : true,
        followers: res.data.followers,
        following: res.data.following,
        followerUsers: res.data.followerUsers,
        followingUsers: res.data.followingUsers,
      });
    });
  };
  const getPosts = () => {
    axios({
      method: "post",
      url: `https://cors-anywhere.herokuapp.com/https://social-mediasite.herokuapp.com/users/:id`,
      data: { username: state.user },
      withCredentials: true,
    })
      .then((res) => {
        setState({
          ...state,
          postItems: [...res.data],
        });
      })
      .catch((err) => {
        if (err.response) {
          setState({
            ...state,
            error: err.response.data.message,
          });
        }
      });
  };

  const openModal = (e) => {
    setIsOpen({ isOpen: true, modal: e.target.id });
  };
  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  const changeFollow = async (e) => {
    const check = e.target.checked;
    await setFollows({
      ...follows,
      follow: check,
      followers: check ? follows.followers + 1 : follows.followers - 1,
    });
    if (!check) {
      axios({
        method: "put",
        url:
          "https://cors-anywhere.herokuapp.com/https://social-mediasite.herokuapp.com/removeFollow",
        data: {
          author: state.user,
        },
      });
    } else {
      axios({
        method: "put",
        url:
          "https://cors-anywhere.herokuapp.com/https://social-mediasite.herokuapp.com/addFollow",
        data: {
          author: state.user,
        },
      });
    }
  };
  useEffect(() => {
    Modal.setAppElement("body");
    let isCancelled = false;
    const fetchData = () => {
      if (!isCancelled) {
        checkFollow();
        getUser();
        getPosts();
      }
    };
    fetchData();
    return () => {
      isCancelled = true;
    };
  }, [setFollows]);
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
        closeModal={closeModal}
        customStyles={customStyles}
        changeFollow={changeFollow}
        afterOpenModal={afterOpenModal}
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        follows={follows}
        user={user}
        state={state}
      />
    </div>
  );
};
