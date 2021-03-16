import { IPost } from "./PostContainer";

import { Link } from "react-router-dom";
import { IComment } from "./CommentContainer";
interface IProps {
  post: IPost | IComment;
}
export const PostLayout = (props: IProps) => {
  return (
    <div className="my-2 border-black">
      <div className="flex items-center mx-2 md:mx-10 flex-row">
        <div>
          <Link to={`/user/${props.post.username}`}>
            <img
              className="w-20 md:w-32 md:m-10 m-2 rounded-full"
              alt="Profile"
              src={props.post?.photo}
            />
          </Link>
        </div>
        <div>
          <Link to={`/user/${props.post?.username}`}>
            <h6 className="text-2xl self-middle align-middle font-bold">
              {props.post?.username}
            </h6>
          </Link>
        </div>
      </div>
      <div className="break-words text-center my-3 px-10 md:px-20">
        <p>{props.post.body}</p>
      </div>

      <div className="justify-center flex">{props.post?.location}</div>
    </div>
  );
};
