import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "../Posts/Post";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import UserFollow from "./UserFollow";

export default function UserPage({ refresh }) {
  const [user, setUser] = useState({ img: "", bio: "" });
  const [follow, setFollow] = useState({});
  const [modalIsOpen, setIsOpen] = React.useState({
    isOpen: false,
    modal: null,
  });

  const [state, setState] = useState({
    postItems: [],
    user: window.location.pathname.split("/")[2],
  });

  useEffect(() => {
    Modal.setAppElement("body");
    checkFollow();
    getUser();
    getPosts();
  }, [setUser]);

  useEffect(() => {}, []);
  var subtitle;
  const openModal = (e) => {
    setIsOpen({ isOpen: true, modal: e.target.id });
  };
  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }
  const getUser = async () => {
    const res = await axios({
      method: "post",
      url: "https://cors-anywhere.herokuapp.com/https://social-mediasite.herokuapp.com/getUser",
      data: { user: state.user },
    });
    await setUser({
      ...user,
      location: res.data.location,
      img: res.data.photo,
      bio: res.data.bio,
    });
  };
  const checkFollow = async () => {
    const res = await axios({
      method: "post",
      url: "https://cors-anywhere.herokuapp.com/https://social-mediasite.herokuapp.com/checkFollow",
      data: { user: state.user },
    });
    if (!res.data.followerUsers.includes(localStorage.getItem("username"))) {
      await setFollow({
        ...follow,
        follow: false,
        followers: res.data.followers,
        following: res.data.following,
        followerUsers: res.data.followerUsers,
        followingUsers: res.data.followingUsers,
      });
    } else {
      await setFollow({
        ...follow,
        follow: true,
        followers: res.data.followers,
        following: res.data.following,
        followerUsers: res.data.followerUsers,
        followingUsers: res.data.followingUsers,
      });
    }
  };
  const Follow = async (e) => {
    const check = e.target.checked;
    await setFollow({
      ...follow,
      follow: check,
      followers: check ? follow.followers + 1 : follow.followers - 1,
    });
    if (!check) {
      axios({
        method: "put",
        url: "https://cors-anywhere.herokuapp.com/https://social-mediasite.herokuapp.com/removeFollow",
        data: {
          user: localStorage.getItem("username"),
          author: state.user,
        },
      });
    } else {
      axios({
        method: "put",
        url: "https://cors-anywhere.herokuapp.com/https://social-mediasite.herokuapp.com/addFollow",
        data: {
          user: localStorage.getItem("username"),
          author: state.user,
        },
      });
    }
  };

  const getPosts = async () => {
    axios({
      method: "post",
      url: `https://cors-anywhere.herokuapp.com/https://social-mediasite.herokuapp.com/users/:id`,
      data: { username: state.user },
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
  let checked = state.value;
  return (
    <div>
      {state.error ? (
        <h1>{state.error}</h1>
      ) : (
        <div className="bg-salmon font-semibold text-navy my-2 rounded-lg container md:mx-auto">
          <div className="flex md:mx-6 justify-between items-center flex-col md:flex-row">
            <img className="m-4 w-64" src={user.img} alt="Profile" />
            <div className="flex my-10  flex-col">
              <h1 className="text-3xl font-semibold">{state.user}</h1>
              <div className="flex flex-row">
                <p
                  id="0"
                  onClick={openModal}
                  className="md:mx-4 rounded-lg py-3 px-6 bg-gray-300"
                >
                  Followers: {follow.followers}
                </p>
                <Modal
                  isOpen={modalIsOpen.isOpen}
                  onAfterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  style={customStyles}
                >
                  <UserFollow
                    changeFollow={Follow}
                    follow={follow}
                    data={modalIsOpen}
                  />
                </Modal>
                <p
                  id="1"
                  onClick={openModal}
                  className="md:mx-4  rounded-lg py-3 px-6 bg-gray-300"
                >
                  Following: {follow.following}
                </p>
              </div>
              <p className="my-12">{user.bio}</p>
              <p>{user.location}</p>
            </div>
            {localStorage.getItem("username") === state.user && (
              <Link className="" to={`/user/${state.user}/edit`}>
                <button className="bg-seafoam h-20 w-40 rounded-full">
                  Edit
                </button>
              </Link>
            )}
            <input
              onClick={Follow}
              onChange={() => (checked = !checked)}
              defaultChecked={follow.follow}
              id={state.user}
              className="hidden"
              type="checkbox"
            ></input>

            {localStorage.getItem("username") !== state.user && (
              <label className="md:mx-20" htmlFor={state.user}>
                {follow.follow ? (
                  <p className="self-center bg-blue-300 h-20 w-40 rounded-full">
                    Following
                  </p>
                ) : (
                  <p className="bg-blue-300 h-20 w-40 rounded-full">Follow</p>
                )}
              </label>
            )}
          </div>
        </div>
      )}
      <div className="container mx-auto">
        {state.postItems.map((e) => (
          <Post key={e._id} data={e} />
        ))}
      </div>
    </div>
  );
}
