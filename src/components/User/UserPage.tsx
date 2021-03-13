import React from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import UserFollowContainer from "./UserFollowContainer";
import { UserPageTabs } from "./UserPageTabs";
import { IProfile, IData } from "./UserPageContainer";
import { FollowButtonContainer } from "../Reusable/FollowButtonContainer";
interface IProps {
  username: string;
  customStyles: object;
  modal: { element: string | null; isOpen: boolean };
  modalStatus: (e: React.MouseEvent<HTMLElement>) => void;
  state: IData;
  profile: IProfile;
}
export const UserPage = (props: IProps) => {
  const more = true;
  return (
    <div>
      <div className="font-semibold bg-blue-100 my-2 rounded-lg container mx-auto">
        <div className="flex md:mx-6 justify-between items-center flex-col md:flex-row">
          <img className="m-4 w-64" src={props.profile.photo} alt="Profile" />
          <div className="flex my-10  flex-col">
            <h1 className="text-3xl font-semibold">{props.username}</h1>
            <div className="flex flex-row">
              <p
                id="0"
                onClick={props.modalStatus}
                className="md:mx-4 cursor-pointer rounded-lg py-3 px-6 bg-gray-300"
              >
                Followers: {props.profile.followers}
              </p>
              <Modal isOpen={props.modal.isOpen} style={props.customStyles}>
                <UserFollowContainer
                  user={props.profile.username}
                  data={props.modal}
                />
              </Modal>
              <p
                id="1"
                onClick={props.modalStatus}
                className="md:mx-4 cursor-pointer rounded-lg py-3 px-6 bg-gray-300"
              >
                Following: {props.profile.following}
              </p>
            </div>
            <p className="my-12">{props.profile.bio}</p>
            <p>{props.profile.location}</p>
          </div>
          {props.profile.username === props.username ? (
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
      <UserPageTabs more={more} data={props.state} />
    </div>
  );
};
