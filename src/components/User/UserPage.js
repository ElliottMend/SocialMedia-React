import React from "react";
import Post from "../Posts/Post";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import UserFollowContainer from "./UserFollowContainer";

export default function UserPage(props) {
  return (
    <div>
      {props.state.error ? (
        <h1>{props.state.error}</h1>
      ) : (
        <div className="bg-salmon font-semibold text-navy my-2 rounded-lg container md:mx-auto">
          <div className="flex md:mx-6 justify-between items-center flex-col md:flex-row">
            <img className="m-4 w-64" src={props.user.img} alt="Profile" />
            <div className="flex my-10  flex-col">
              <h1 className="text-3xl font-semibold">{props.state.user}</h1>
              <div className="flex flex-row">
                {console.log(props.user.img)}
                <p
                  id="0"
                  onClick={props.openModal}
                  className="md:mx-4 rounded-lg py-3 px-6 bg-gray-300"
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
                    changeFollow={props.changeFollow}
                    follow={props.follows}
                    data={props.modalIsOpen}
                  />
                </Modal>
                <p
                  id="1"
                  onClick={props.openModal}
                  className="md:mx-4  rounded-lg py-3 px-6 bg-gray-300"
                >
                  Following: {props.follows.following}
                </p>
              </div>
              <p className="my-12">{props.user.bio}</p>
              <p>{props.user.location}</p>
            </div>
            {localStorage.getItem("username") === props.state.user && (
              <Link className="" to={`/user/${props.state.user}/edit`}>
                <button className="bg-seafoam h-20 w-40 rounded-full">
                  Edit
                </button>
              </Link>
            )}
            <input
              onClick={props.changeFollow}
              defaultChecked={props.follows.follow}
              id={props.state.user}
              className="hidden"
              type="checkbox"
            ></input>

            {localStorage.getItem("username") !== props.state.user && (
              <label className="md:mx-20" htmlFor={props.state.user}>
                {props.follows.follow ? (
                  <p className="self-center bg-blue-300 h-20 w-40 rounded-full">
                    Following
                  </p>
                ) : (
                  <p className="bg-blue-300 h-20 w-40 rounded-full">Follow</p>
                )}
              </label>
            )}
          </div>
        </div>
      )}
      <div className="container mx-auto">
        {props.state.postItems.map((e) => (
          <Post key={e._id} data={e} />
        ))}
      </div>
    </div>
  );
}
