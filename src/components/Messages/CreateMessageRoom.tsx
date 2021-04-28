import React, { useState } from "react";
import { axiosInstance } from "../../App";
import { UserSearch } from "../Reusable/UserSearch";
import { IUser } from "../Reusable/UserSearch";
export const CreateMessageRoom = () => {
  const [room, setRoom] = useState<string>();
  const [invites, setInvites] = useState<IUser[]>([]);
  const [username, setUsername] = useState<string>("");
  const [inviteUser, setInviteUser] = useState<number[] | undefined>();

  const submitRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axiosInstance.post("/createMessageRoom", {
      roomName: room,
      invites: inviteUser,
    });
  };

  const selectUser = (user: IUser) => {
    let addInvite = true;
    invites.forEach((invitee) => {
      if (invitee.user_id === user.user_id) {
        addInvite = false;
      }
    });
    if (addInvite) {
      setInvites([...invites, user]);
      setInviteUser([...inviteUser!, user.user_id]);
    }
    setUsername("");
  };

  return (
    <div>
      <form onSubmit={submitRoom}>
        <input
          className="border-2"
          value={room}
          onChange={(e) => {
            setRoom(e.target.value);
          }}
        />
        <input
          value={username}
          className="border-2"
          onChange={(e) => setUsername(e.target.value)}
        />
        <UserSearch selectUser={selectUser} username={username} />
        <p>Invited Users:</p>
        {invites.map((user) => (
          <div key={user.user_id} className="flex">
            <div>
              <p>{user.username}</p>
              <p>{user.location}</p>
            </div>
            <img src={user.photo} alt="p" className="w-12 h-full" />
          </div>
        ))}
        <button type="submit">Create Room</button>
      </form>
    </div>
  );
};
