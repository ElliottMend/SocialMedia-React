import React, { useState, useEffect } from "react";
import axios from "axios";
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
    displayComments();
  });
  const deleteComment = async (index: number) => {
    let arr = [...comments];
    arr.splice(index, 1);
    setComments(arr);
    await axios({
      method: "put",
      url: "http://localhost:5000/removeComment",
      data: { id: comments[index].post_id },
      withCredentials: true,
    });
  };

  const displayComments = async () => {
    const res = await axios.get<IComment[]>(
      `http://localhost:5000/getComments/${props.data.post_id}`,
      {
        withCredentials: true,
      }
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
