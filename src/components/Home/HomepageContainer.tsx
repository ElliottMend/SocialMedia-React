import React, { useEffect, useState } from "react";
import axios from "axios";
import Homepage from "./Homepage";
export interface IPost {
  body: string;
  date: string;
  post_id: number;
  user_id: number;
  likes: number;
  location: string;
  photo: string;
  bio: string;
  username: string;
}
export interface IState {
  radius: number;
  body: string;
}
export default function HomepageContainer() {
  const [state, setState] = useState<number>(1);
  const [posts, setPosts] = useState<IPost[]>([]);
  useEffect(() => {
    let isCancelled = false;
    getPosts().then((res) => {
      if (!isCancelled) setPosts(res.data);
    });
    return () => {
      isCancelled = true;
    };
  }, [state]);
  const getPosts = async () => {
    return axios.get<IPost[]>(`http://localhost:5000/getposts/${state}`, {
      withCredentials: true,
    });
  };

  return (
    <div>
      <Homepage posts={posts} setState={setState} setPosts={setPosts} />
    </div>
  );
}
