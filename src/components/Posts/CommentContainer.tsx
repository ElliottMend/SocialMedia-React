import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../App";
import { CreateComment } from "./CreateComment";
import { Comment } from "./Comment";
import { IPost } from "./PostContainer";
export interface IComment {
  body: string;
  date: string;
  likes: number;
  comment_id: number;
  user_id: number;
  post_id: number;
}
interface IProps {
  data: IPost;
}
export const CommentContainer = (props: IProps) => {
  const [comments, setComments] = useState<IComment[]>([]);
  useEffect(() => {
    let isCancelled = false;
    displayComments();
    return () => {
      isCancelled = true;
    };
  }, []);
  const deleteComment = async (index: number) => {
    let arr = [...comments];
    arr.splice(index, 1);
    setComments(arr);
    await axiosInstance({
      method: "put",
      url: "/removeComment",
      data: { id: comments[index].post_id },
    });
  };

  const displayComments = async () => {
    const res = await axiosInstance.get<IComment[]>(
      `/getComments/${props.data.post_id}`,
      {}
    );
    setComments(res.data);
  };
  return (
    <div>
      <CreateComment
        comments={comments}
        data={props.data}
        setComments={setComments}
      />
      <div>
        {comments.length > 3 &&
          comments
            .slice(0, 3)
            .map((e, index) => (
              <Comment
                username={e.user_id}
                deleteComment={() => deleteComment(index)}
                key={e.comment_id}
                data={e}
              />
            ))}
      </div>
    </div>
  );
};
