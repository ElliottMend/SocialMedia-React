import { IComment } from "./CommentContainer";
import { PostLayout } from "./PostLayout";
import { DateTime } from "../Reusable/DateTime";
import { Likes } from "./Likes";
interface IProps {
  username: number | undefined;
  deleteComment: () => void;
  data: IComment;
}
export const Comment = (props: IProps) => {
  return (
    <div className="my-1 flex text-center text-navy text-lg flex-col justify-center py-3 bg-seafoam">
      <PostLayout post={props.data} />
      <div className="flex mt-2 justify-center flex-row">
        <DateTime date={props.data.date} />
      </div>
      <button
        className="bg-salmon py-2 px-4 m-2 rounded-lg"
        onClick={props.deleteComment}
      >
        Delete Comment
      </button>
    </div>
  );
};
