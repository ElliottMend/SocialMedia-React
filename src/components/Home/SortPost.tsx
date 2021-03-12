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
    <div>
      <div className="text-xl bg-lime ">
        <p className="text-2xl font-semibold">Sort Posts</p>
        <select className=" w-32 rounded-lg h-16 m-4" onChange={changeRadius}>
          <option className="" value="Local">
            Local
          </option>
          <option className="flex justify-center" value="Global">
            Global
          </option>
        </select>
        <select className="w-32 h-16 rounded-lg" onChange={postSort}>
          <option className="flex justify-center" value="recent">
            Recent
          </option>
          <option className="flex justify-center" value="liked">
            Liked
          </option>
        </select>
      </div>
    </div>
  );
};
