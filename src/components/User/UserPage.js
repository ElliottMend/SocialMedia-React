import React from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import UserFollowContainer from "./UserFollowContainer";
import PostContainer from "../Posts/PostContainer";
import { FollowButtonContainer } from "../Reusable/FollowButtonContainer";
export default function UserPage(props) {
  return (
    <div>
      {props.state.error ? (
        <h1>{props.state.error}</h1>
      ) : (
        <div className="font-semibold bg-blue-100 my-2 rounded-lg container mx-auto">
          <div className="flex md:mx-6 justify-between items-center flex-col md:flex-row">
            <img className="m-4 w-64" src={props.user.img} alt="Profile" />
            <div className="flex my-10  flex-col">
              <h1 className="text-3xl font-semibold">{props.state.user}</h1>
              <div className="flex flex-row">
                <p
                  id="0"
                  onClick={props.openModal}
                  className="md:mx-4 cursor-pointer rounded-lg py-3 px-6 bg-gray-300"
                >
                  Followers: {props.follows.followers}
                </p>
                <Modal
                  isOpen={props.modalIsOpen.isOpen}
                  onAfterOpen={props.afterOpenModal}
                  onRequestClose={props.closeModal}
                  style={props.customStyles}
                >
                  <UserFollowContainer
                    user={props.state.user}
                    changeFollow={props.changeFollow}
                    follow={props.follows}
                    data={props.modalIsOpen}
                  />
                </Modal>
                <p
                  id="1"
                  onClick={props.openModal}
                  className="md:mx-4 cursor-pointer rounded-lg py-3 px-6 bg-gray-300"
                >
                  Following: {props.follows.following}
                </p>
              </div>
              <p className="my-12">{props.user.bio}</p>
              <p>{props.user.location}</p>
            </div>
            {props.state.user === props.username ? (
              <Link className="" to={`/user/${props.state.user}/edit`}>
                <button className="bg-seafoam h-20 w-40 rounded-full">
                  Edit
                </button>
              </Link>
            ) : (
              <FollowButtonContainer user={props.state.user} />
            )}
          </div>
        </div>
      )}
      <ul className="list-reset flex justify-center container flex mx-auto border-b">
        <li className="-mb-px mr-1">
          <button
            id="0"
            onClick={props.clickDisplays}
            className={
              props.display === 0
                ? "bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-white bg-blue-300 font-semibold" 
                : "bg-white inline-block py-2 px-4 text-blue-300 font-semibold"
            }
          >
            Posts
          </button>
        </li>
        <li className="mr-1">
          <button
            onClick={props.clickDisplays}
            id="1"
            className={
              props.display === 0
                ? "bg-white inline-block py-2 px-4 text-blue-300 font-semibold"
                : "bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-white bg-blue-300 font-semibold"
            }
          >
            Likes
          </button>
        </li>
      </ul>
      <div className="container mx-auto">
        {props.display === 0
          ? props.state.postItems.map((e) => (
              <PostContainer key={e._id} data={e} />
            ))
          : props.userLikes.map((e) => <PostContainer key={e._id} data={e} />)}
      </div>
    </div>
  );
}
