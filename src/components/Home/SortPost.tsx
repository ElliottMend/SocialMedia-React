import React from "react";
import { IPost } from "./HomepageContainer";
interface IProps {
  setState: React.Dispatch<React.SetStateAction<number>>;
  setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
  posts: IPost[];
}
export const SortPost = (props: IProps) => {
  const changeRadius = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case "Global":
        return props.setState(1000);
      default:
        return props.setState(1);
    }
  };

  const postSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let arr = props.posts.sort((a, b) =>
      e.target.value === "liked"
        ? a.likes < b.likes
          ? 1
          : -1
        : a.date < b.date
        ? 1
        : -1
    );
    props.setPosts([...arr]);
  };
  return (
    <div className="text-xl  bg-lime ">
      <p className="text-2xl flex justify-center font-semibold">Sort Posts</p>
      <div className="flex p-4 justify-center">
        <select
          className=" w-32 flex mr-1 justify-center rounded-lg h-16"
          onChange={changeRadius}
        >
          <option value="Local">Local</option>
          <option value="Global">Global</option>
        </select>
        <select
          className=" w-32 flex ml-1 justify-center rounded-lg h-16"
          onChange={postSort}
        >
          <option value="recent">Recent</option>
          <option value="liked">Liked</option>
        </select>
      </div>
    </div>
  );
};
