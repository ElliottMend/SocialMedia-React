import React, { useState } from "react";
import { IPost } from "./HomepageContainer";
import { axiosInstance } from "../../App";
interface IProps {
  setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
}
export const CreatePost = (props: IProps) => {
  const [error, setError] = useState<string>("");
  const [state, setState] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length === 140) {
      setError("The maximum length of a post is 140 characters");
    }
    setError("");
    setState(e.target.value);
  };
  const newPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state.length > 140) {
      return setError("The maximum length of a post is 140 characters");
    } else if (state.length === 0) {
      return setError("The post cannot be empty");
    } else {
      const res = await axiosInstance.post<IPost>("/newpost", {
        text: state,
      });
      setState("");
      setError("");
      setTimeout(() => {
        props.setPosts((prevState) => [res.data, ...prevState]);
      }, 100);
    }
  };
  return (
    <div>
      <form
        className="flex rounded-lg items-center flex-col"
        onSubmit={newPost}
      >
        <label className="my-6 text-xl" htmlFor="body">
          Create Post
        </label>
        <textarea
          maxLength={140}
          className="h-20 md:h-40 bg-gray-100 text-center bg-gray-100 p-3 focus:border-blue-300 focus:outline-none focus:ring border-black shadow-inner border w-8/12 rounded-lg "
          id="body"
          value={state}
          onChange={handleChange}
        />
        {error && <p className="text-red-500">{error}</p>}
        <button className="bg-seafoam text-xl my-4 px-12 py-6">Submit</button>
      </form>
    </div>
  );
};
