import React, { useEffect, useState } from "react";
import axios from "axios";
import Homepage from "./Homepage";

export const HomepageContainer = () => {
  const [state, setState] = useState({
    radiusName: "",
    radius: 0.8,
    posts: [],
    sorting: "recent",
    follow: [],
  });
  const [more] = useState(true);
  useEffect(() => {
    let isCancelled = false;
    const fetchData = () => {
      if (!isCancelled) {
        seePosts(state.radius);
      }
    };
    fetchData();
    return () => {
      isCancelled = true;
    };
  }, []);
  const seePosts = async (radius) => {
    setState({ ...state, posts: [] });
    const follows = await axios({
      method: "get",
      url: "https://social-mediasite.herokuapp.com/follows",
      withCredentials: true,
    });
    const locationPosts = await axios({
      method: "post",
      url: "https://social-mediasite.herokuapp.com/locationPosts",
      data: {
        radius: radius,
      },
      withCredentials: true,
    });
    let mySet = [...locationPosts.data];
    setState({ ...state, posts: [...mySet], follow: [...follows.data] });
  };

  const changeRadius = (e) => {
    switch (e.target.value) {
      case "Global":
        seePosts(1000);
        return;
      default:
        seePosts(0.8);
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
      />
    </div>
  );
};
