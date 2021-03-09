import React from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import UserFollowContainer from "./UserFollowContainer";
import PostContainer from "../Posts/PostContainer";
import { IState } from "./UserPageContainer";
import { FollowButtonContainer } from "../Reusable/FollowButtonContainer";
interface IProps {
  username: string;
  customStyles: object;
  modal: { element: string | null; isOpen: boolean };
  modalStatus: (e: React.MouseEvent<HTMLElement>) => void;
  state: IState | undefined;
}
export default function UserPage(props: IProps) {
  const more = true;
  let display = 0;
  return (
    <div>
      <div className="font-semibold bg-blue-100 my-2 rounded-lg container mx-auto">
        <div className="flex md:mx-6 justify-between items-center flex-col md:flex-row">
          <img
            className="m-4 w-64"
            src={props.state?.user_profile.photo}
            alt="Profile"
          />
          <div className="flex my-10  flex-col">
            <h1 className="text-3xl font-semibold">{props.username}</h1>
            <div className="flex flex-row">
              <p
                id="0"
                onClick={props.modalStatus}
                className="md:mx-4 cursor-pointer rounded-lg py-3 px-6 bg-gray-300"
              >
                Followers: {props.state?.user_profile.followers}
              </p>
              <Modal isOpen={props.modal.isOpen} style={props.customStyles}>
                <UserFollowContainer
                  user={props.state?.user_profile.username}
                  follow={props.state?.follows}
                  data={props.modal}
                />
              </Modal>
              <p
                id="1"
                onClick={props.modalStatus}
                className="md:mx-4 cursor-pointer rounded-lg py-3 px-6 bg-gray-300"
              >
                Following: {props.state?.user_profile.following}
              </p>
            </div>
            <p className="my-12">{props.state?.user_profile.bio}</p>
            <p>{props.state?.user_profile.location}</p>
          </div>
          {props.state?.user_profile.username === props.username ? (
            <Link to={`/user/${props.username}/edit`}>
              <button className="bg-seafoam h-20 w-40 rounded-full">
                Edit
              </button>
            </Link>
          ) : (
            <FollowButtonContainer user={props.username} />
          )}
        </div>
      </div>
      <ul className="list-reset flex justify-center container flex mx-auto border-b">
        <li className="-mb-px mr-1">
          <button
            id="0"
            onClick={() => (display = 0)}
            className={
              display != 0
                ? "bg-white inline-block py-2 px-4 text-blue-300 font-semibold"
                : "bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-white bg-blue-300 font-semibold"
            }
          >
            Posts
          </button>
        </li>
        <li className="mr-1">
          <button
            onClick={() => (display = 1)}
            id="1"
            className={
              display != 1
                ? "bg-white inline-block py-2 px-4 text-blue-300 font-semibold"
                : "bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-white bg-blue-300 font-semibold"
            }
          >
            Likes
          </button>
        </li>
        <li className="mr-1">
          <button
            onClick={() => (display = 2)}
            id="2"
            className={
              display != 2
                ? "bg-white inline-block py-2 px-4 text-blue-300 font-semibold"
                : "bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-white bg-blue-300 font-semibold"
            }
          >
            Comments
          </button>
        </li>
      </ul>
      <div className="container mx-auto">
        {
          display === 0
            ? props.state?.post.map((e: any) => (
                <PostContainer more={more} key={e.post_id} data={e} />
              ))
            : display === 1 &&
              props.state?.likes.map((e) => (
                <PostContainer more={more} key={e} data={e} />
              ))
          // : display === 2 &&
          //   props.sstate.map((e) => (
          //     <PostContainer more={more} key={e._id} data={e} />
          //   ))
        }
      </div>
    </div>
  );
}
