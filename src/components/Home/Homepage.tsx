import React from "react";
import PostContainer from "../Posts/PostContainer";
import { FollowsContainer } from "./FollowsContainer";
import { IPost } from "./HomepageContainer";
import { SortPost } from "./SortPost";
import { CreatePost } from "./CreatePost";
interface IProps {
  setState: React.Dispatch<React.SetStateAction<number>>;
  setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
  posts: IPost[];
}
export default function Homepage(props: IProps) {
  return (
    <div className="text-navy">
      <div className="container mx-auto">
        <section className="shadow-xl my-2 border-black">
          <CreatePost posts={props.posts} setPosts={props.setPosts} />
          <SortPost
            posts={props.posts}
            setPosts={props.setPosts}
            setState={props.setState}
          />
        </section>
        <div className="w-full">
          <PostContainer postData={props.posts} />
        </div>
        <div className="mt-1 inset-x-0 top-0 left-0 rounded-lg md:sticky mx-2">
          <p className="text-2xl font-semibold">Who to Follow</p>
          <FollowsContainer />
        </div>
      </div>
    </div>
  );
}
