import React, { useContext } from "react";
import { DateTime } from "../Reusable/DateTime";
import { Likes } from "./Likes";
import { CommentContainer } from "./CommentContainer";

import { IPost } from "./PostContainer";

import { PostLayout } from "./PostLayout";
import { usernameContext } from "../Context/usernameContext";
interface IProps {
  deletePost: () => void;
  post: IPost;
}
export default function Post(props: IProps) {
  return (
    <div className="mt-6 shadow-xl">
      <div className="rounded-lg font-semibold text-navy bg-seafoam">
        <PostLayout post={props.post} />
        <div className="flex mt-10 justify-center flex-row">
          <DateTime date={props.post.date} />
          <Likes data={props.post} />
        </div>
        <div className="flex justify-center">
          {props.post.username === useContext(usernameContext) && (
            <button
              className="bg-salmon py-4 px-8 m-2 rounded-lg"
              onClick={props.deletePost}
            >
              Delete Post
            </button>
          )}
        </div>
      </div>
      <CommentContainer data={props.post} />
    </div>
  );
}
