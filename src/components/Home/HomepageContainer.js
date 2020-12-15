import React, { useEffect, useState } from "react";
import axios from "axios";
import Homepage from "./Homepage";

export default function HomepageContainer() {
  const [state, setState] = useState({
    radiusName: "",
    radius: 0.8,
    sorting: "recent",
  });
  const [posts, setPosts] = useState();
  const [follows, setFollows] = useState();
  const [more] = useState(true);
  useEffect(() => {
    let isCancelled = false;
    getPosts().then((items) => {
      if (!isCancelled) {
        setPosts(items);
      }
    });
    getFollows().then((items) => {
      if (!isCancelled) {
        setFollows(items);
      }
    });
    return () => {
      isCancelled = true;
    };
  }, [state.radius]);
  const getPosts = async () => {
    const post = await axios({
      method: "post",
      url: "https://social-mediasite.herokuapp.com/locationPosts",
      data: {
        radius: state.radius,
      },
      withCredentials: true,
    });

    return post.data;
  };
  const getFollows = async () => {
    const follow = await axios({
      method: "get",
      url: "https://social-mediasite.herokuapp.com/follows",
      withCredentials: true,
    });
    return follow.data;
  };
  const changeRadius = (e) => {
    switch (e.target.value) {
      case "Global":
        setState({ ...state, radius: 1000 });
        return;
      default:
        setState({ ...state, radius: 0.8 });
        return;
    }
  };
  const newPost = async (e) => {
    e.preventDefault();
    const res = await axios({
      method: "post",
      url: "https://social-mediasite.herokuapp.com/newpost",
      data: {
        body: state.body,
      },
      withCredentials: true,
    });
    const data = res.data;
    setTimeout(() => {
      setState({ ...state, body: "", posts: [data, ...state.posts] });
    }, 150);
  };
  const sortPosts = (e) => {
    let arr = [];
    if (e === "recent") {
      arr = state.posts.sort((a, b) => (a.date > b.date ? 1 : -1));
    } else {
      arr = state.posts.sort((a, b) => (a.likes < b.likes ? 1 : -1));
    }
    setState({ ...state, posts: [...arr] });
  };
  const postSort = (e) => {
    switch (e.target.value) {
      case "liked":
        sortPosts("liked");
        return;
      default:
        sortPosts("recent");
        return;
    }
  };
  const handleChange = (e) => {
    setState({
      ...state,
      body: e.target.value,
    });
  };
  return (
    <div>
      <Homepage
        more={more}
        newPost={newPost}
        postSort={postSort}
        changeRadius={changeRadius}
        handleChange={handleChange}
        data={state}
        follows={follows}
        posts={posts}
      />
    </div>
  );
}
