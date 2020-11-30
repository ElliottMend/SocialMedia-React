import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "../Posts/Post";
import Follows from "./Follows";
export default function Homepage() {
  const [state, setState] = useState({
    radiusName: "",
    radius: 0.8,
    posts: [],
    sorting: "recent",
    follow: [],
  });
  useEffect(() => {
    let isCancelled = false;
    const fetchData = async () => {
      if (!isCancelled) {
        await seePosts(state.radius);
      }
    };
    fetchData();
    return () => {
      isCancelled = true;
    };
  }, [state.radius]);
  const seePosts = async (radius) => {
    setState({ ...state, posts: [] });
    const follows = await axios({
      method: "post",
      url:
        "https://cors-anywhere.herokuapp.com/https://social-mediasite.herokuapp.com/follows",
      data: { user: localStorage.getItem("username") },
    });
    const locationPosts = await axios({
      method: "post",
      url:
        "https://cors-anywhere.herokuapp.com/https://social-mediasite.herokuapp.com/locationPosts",
      data: { user: localStorage.getItem("username"), radius: radius },
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
      url:
        "https://cors-anywhere.herokuapp.com/https://social-mediasite.herokuapp.com/newpost",
      data: {
        username: localStorage.getItem("username"),
        body: state.body,
      },
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
    <div className="text-navy">
      <div className="container mx-auto">
        {localStorage.getItem("accessToken") && (
          <div className="">
            <form
              className="flex rounded-lg items-center bg-salmon mt-3 flex-col"
              onSubmit={newPost}
            >
              <label className="my-6 text-xl" htmlFor="body">
                Create Post
              </label>
              <input
                value={state.body}
                id="post"
                className="text-2xl w-2/3 rounded-lg mb-10"
                id="body"
                size="75"
                onChange={handleChange}
              ></input>
              <button className="bg-seafoam text-xl my-4 px-12 py-6">
                Submit
              </button>
            </form>
            <div className="rounded-b-lg text-xl bg-lime ">
              <p className="text-2xl font-semibold">Sort Posts</p>
              <select className="rounded-full p-3 m-4" onChange={changeRadius}>
                <option value="Local">Local</option>
                <option value="Global">Global</option>
              </select>
              <select className="rounded-full p-3 m-4" onChange={postSort}>
                <option value="recent">Recent</option>
                <option value="liked">Liked</option>
              </select>
            </div>
            <div className="rounded-lg flex flex-col md:flex-row-reverse items-start mt-3">
              <div className="w-full">
                {state.posts &&
                  state.posts.map((e) => <Post key={e._id} data={e} />)}
              </div>
              <div className="mt-1 inset-x-0  top-0 left-0 rounded-lg md:sticky ml-2 ">
                {state.follow.length > 0 && (
                  <p className="text-2xl font-semibold">Who to Follow</p>
                )}
                {state.follow &&
                  state.follow.map((e) => (
                    <Follows key={e.username} data={e} />
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
