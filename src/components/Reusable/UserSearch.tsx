import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../App";
export interface IUser {
  user_id: number;
  photo: string;
  location: string;
  username: string;
}
interface IProps {
  selectUser: (user: IUser) => void;
  username: string;
}
export const UserSearch = (props: IProps) => {
  const [users, setUsers] = useState<IUser[] | null>(null);
  const [username, setUsername] = useState<string>("");
  useEffect(() => {
    if (users?.length === 0 && props.username.includes(username!)) {
      return;
    } else if (props.username.length > 3) {
      userSearch();
    } else setUsers(null);
  }, [props.username]);

  const userSearch = async () => {
    const res = await axiosInstance.get<IUser[]>(
      `/userSearch/${props.username}`
    );
    setUsername(props.username);
    setUsers(res.data);
  };

  return (
    <div>
      {users?.map((user) => (
        <button
          onClick={(e) => {
            e.preventDefault();
            props.selectUser(user);
            setUsers(null);
          }}
          key={user.user_id}
          className="flex bg-gray-100 w-full h-full"
        >
          <div>
            <p>{user.username}</p>
            <p>{user.location}</p>
          </div>
          <img src={user.photo} alt="p" className="w-12 h-full" />
        </button>
      ))}
    </div>
  );
};
