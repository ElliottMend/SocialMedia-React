import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../App";
import { CreateComment } from "./CreateComment";
import { Comment } from "./Comment";
import { IPost } from "./PostContainer";
export interface IComment extends IPost {
  comment_id: number;
}
interface IProps {
  data: IPost;
}
export const CommentContainer = (props: IProps) => {
  const [comments, setComments] = useState<IComment[]>([]);
  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) displayComments();
    return () => {
      isCancelled = true;
    };
  }, []);
  const deleteComment = async (index: number) => {
    let arr = [...comments];
    arr.splice(index, 1);
    setComments(arr);
    await axiosInstance.put("/removeComment", {
      commentId: comments[index].comment_id,
    });
  };

  const displayComments = async () => {
    const res = await axiosInstance.get<IComment[]>(
      `/getComments/${props.data.post_id}`
    );
    setComments(res.data);
  };
  return (
    <div>
      <div>
        <CreateComment
          comments={comments}
          data={props.data}
          setComments={setComments}
        />
      </div>
      <div>
        {comments.slice(0, 3).map((e, index) => (
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
