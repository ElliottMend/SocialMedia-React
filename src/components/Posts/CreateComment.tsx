import React, { useState } from "react";
import { axiosInstance } from "../../App";
import { IComment } from "./CommentContainer";
import { IPost } from "./PostContainer";
interface IProps {
  comments: IComment[];
  setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
  data: IPost;
}
export const CreateComment = (props: IProps) => {
  const [state, setState] = useState<string>();
  const commentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  const createComment = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const res = await axiosInstance.post<IComment>("/createComment", {
      data: {
        id: props.data.post_id,
        text: state,
      },
    });
    setTimeout(async () => {
      props.setComments([res.data, ...props.comments]);
    }, 100);
  };
  return (
    <div>
      <form
        className="bg-cream flex flex-col justify-center"
        onSubmit={createComment}
      >
        <input
          maxLength={140}
          className="bg-gray-100 p-3 focus:border-blue-300 focus:outline-none focus:ring border-black h-10 shadow-inner border w-full rounded-lg "
          onChange={commentChange}
          placeholder="Comment"
        ></input>
        <button className="m-2 md:m-4 text-2xl">Submit</button>
      </form>
    </div>
  );
};
