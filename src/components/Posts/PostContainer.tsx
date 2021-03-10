import React, { useState, useEffect } from "react";
import Post from "./Post";
import axios from "axios";
import Modal from "react-modal";
export interface IProfile {
  user_id: number;
  photo: string;
  bio: string;
  followers: number;
  location: string;
  username: string;
}
export interface IComment {
  body: string;
  date: string;
  likes: number;
  comment_id: number;
  user_id: number;
  post_id: number;
}
export interface IPost {
  body: string;
  date: string;
  post_id: number;
  likes: number;
}
interface IProps {
  state: IProfile | undefined;
  more: boolean;
  data: IPost;
}
export interface IState {
  commentText: string;
  liked: boolean | undefined;
  likes: number;
}
export default function PostContainer(props: IProps) {
  const [modal, setModal] = useState(false);
  const [state, setState] = useState<IState>({
    commentText: "",
    liked: undefined,
    likes: props.data.likes,
  });
  const [comments, setComments] = useState<IComment[]>([]);
  const changeModal = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setModal(modal ? false : true);
  };

  useEffect(() => {
    let isCancelled = false;
    Modal.setAppElement("body");
    displayComments().then((items: IComment[]) => {
      if (!isCancelled) {
        setComments(items);
      }
    });
    return () => {
      isCancelled = true;
    };
  }, []);

  const deleteComment = async (index: number) => {
    let arr = [...comments];
    arr.splice(index, 1);
    setComments(arr);
    await axios({
      method: "put",
      url: "http://localhost:5000/removeComment",
      data: { id: comments[index].post_id },
      withCredentials: true,
    });
  };

  const commentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      commentText: e.target.value,
    });
  };

  const createComment = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const res = await axios.post<IComment>(
      "http://localhost:5000/createComment",
      {
        data: {
          id: props.data.post_id,
          text: state.commentText,
        },
        withCredentials: true,
      }
    );
    setTimeout(async () => {
      setComments([res.data, ...comments]);
    }, 100);
  };
  const displayComments = async () => {
    const res = await axios.get<IComment[]>(
      `http://localhost:5000/getComments/${props.data.post_id}`,
      {
        withCredentials: true,
      }
    );
    return res.data;
  };
  const deletePost = async () => {
    await axios({
      method: "put",
      url: "http://localhost:5000/removePost",
      data: { id: props.data.post_id },
      withCredentials: true,
    });
  };
  const Like = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const check = e.target.checked;
    setState({ ...state, liked: e.target.checked });
    await axios({
      method: "put",
      url: `http://localhost:5000/${check ? "like" : "unlike"}`,
      data: { id: props.data.post_id },
      withCredentials: true,
    });
    setState((prevState) => ({
      ...prevState,
      likes: check ? prevState.likes + 1 : prevState.likes - 1,
    }));
  };
  return (
    <div>
      <Post
        modal={modal}
        user={props.state}
        changeModal={changeModal}
        deletePost={deletePost}
        deleteComment={deleteComment}
        comments={comments}
        commentChange={commentChange}
        createComment={createComment}
        data={state}
        post={props.data}
        more={props.more}
        onChange={Like}
      />
    </div>
  );
}
