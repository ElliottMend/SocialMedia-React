import React, { useState, useEffect, useContext } from "react";
import Post from "./Post";
import axios from "axios";
import Modal from "react-modal";
import { usernameContext } from "../Context/usernameContext";
export default function PostContainer(props) {
  const [state, setState] = useState({
    author: props.data.author,
    body: props.data.body,
    date: props.data.date,
    likes: props.data.likes,
    _id: props.data._id,
    show: props.data.show,
    commentText: "",
    img: "",
  });

  const [modal, setModal] = useState(false);
  const [user] = useState(useContext(usernameContext));
  const [img, setImg] = useState({ img: "" });
  const [comm, setComm] = useState();
  const openModal = () => {
    setModal(true);
  };

  const afterModalOpen = () => {};
  const closeModal = () => {
    setModal(false);
  };
  useEffect(() => {
    let isCancelled = false;
    Modal.setAppElement("body");
    const fetchData = async () => {
      if (!isCancelled) {
        await checkUser();
        await displayComments();
        await checkLikes();
      }
    };
    fetchData();
    return () => {
      isCancelled = true;
    };
  }, [state.likes, state.show]);

  const deleteComment = async (index) => {
    let arr = [...comm, setComm];
    arr.splice(index, 1);
    await setComm(arr);
    await axios({
      method: "put",
      url: "https://social-mediasite.herokuapp.com/removeComment",
      data: { id: comm[index]._id },
      withCredentials: true,
    });
  };
  const checkUser = async () => {
    const res = await axios({
      method: "get",
      url: "https://social-mediasite.herokuapp.com/getUser",
      data: { user: props.data.author },
      withCredentials: true,
    });
    setImg({ img: res.data.photo });
  };
  const commentChange = (e) => {
    setState({
      ...state,
      commentText: e.target.value,
    });
  };

  const checkLikes = async () => {
    const res = await axios({
      method: "get",
      url: "https://social-mediasite.herokuapp.com/checklike",
      withCredentials: true,
    });
    if (res.data.includes(props.data._id)) {
      setState({ ...state, liked: true });
    } else {
      setState({ ...state, liked: false });
    }
  };

  const createComment = async (e) => {
    e.preventDefault();
    const res = await axios({
      method: "post",
      url: "https://social-mediasite.herokuapp.com/createComment",
      data: {
        id: props.data._id,
        text: state.commentText,
        likes: 0,
      },
      withCredentials: true,
    });
    setTimeout(async () => {
      await setComm([
        {
          author: user,
          likes: 0,
          show: true,
          text: state.commentText,
          id: props.data._id,
          date: Date.now(),
          _id: res.data._id,
        },
        ...comm,
      ]);
    }, 150);
  };
  const displayComments = async () => {
    const postArr = [];
    if (props.data.show === true) {
      postArr.push(props.data);
    } else {
      return;
    }
    const res = await axios({
      method: "post",
      url: "https://social-mediasite.herokuapp.com/getComments",
      data: { id: props.data._id, posts: postArr },
      withCredentials: true,
    });
    let arr = [];
    res.data.map((e) => {
      if (e.show === true) {
        return arr.unshift(e);
      } else {
        return;
      }
    });
    let a = arr.map((i) => {
      return i;
    });
    setComm(a);
  };
  const deletePost = async () => {
    setTimeout(() => {
      setState({ ...state, show: false });
    }, 100);
    await axios({
      method: "put",
      url: "https://social-mediasite.herokuapp.com/removePost",
      data: { id: props.data._id },
      withCredentials: true,
    });
  };
  const Like = async (e) => {
    const check = e.target.checked;
    await setState({ ...state, liked: e.target.checked });
    if (!check) {
      axios({
        method: "put",
        url: "https://social-mediasite.herokuapp.com/unlike",
        data: { id: props.data._id },
        withCredentials: true,
      });
      setState((prevState) => ({
        ...prevState,
        likes: prevState.likes - 1,
      }));
    } else {
      axios({
        method: "put",
        url: "https://social-mediasite.herokuapp.com/like",
        data: { id: props.data._id },
        withCredentials: true,
      });
      setState((prevState) => ({
        ...prevState,
        likes: prevState.likes + 1,
      }));
    }
  };
  return (
    <div>
      {state.show && (
        <Post
          modal={modal}
          afterModalOpen={afterModalOpen}
          username={user}
          openModal={openModal}
          closeModal={closeModal}
          deletePost={deletePost}
          img={img.img}
          deleteComment={deleteComment}
          comments={comm}
          commentChange={commentChange}
          createComment={createComment}
          data={state}
          more={props.more}
          onChange={Like}
        />
      )}
    </div>
  );
}
