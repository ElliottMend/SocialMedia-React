import React, { useEffect, useState } from "react";
import axios from "axios";
import UserFollow from "./UserFollow";
interface IProps {
  user: string | undefined;
  data: { isOpen: boolean; element: string | null };
}
export interface IFollowData {
  username: string;
  bio: string;
  location: string;
  photo: string;
}
export default function UserFollowContainer(props: IProps) {
  const [state, setState] = useState<IFollowData[]>([]);
  useEffect(() => {
    let isCancelled = false;
    followData().then((res) => {
      if (!isCancelled) setState(res.data);
    });
    return () => {
      isCancelled = true;
    };
  }, []);
  const followData = async () => {
    return await axios.get<IFollowData[]>(
      `http://localhost:5000/users/${props.user}/${
        props.data.element === "0" ? "followers" : "following"
      }`,
      {
        withCredentials: true,
      }
    );
  };
  return (
    <div>
      <div>
        {state && state.map((e, index) => <UserFollow key={index} data={e} />)}
      </div>
    </div>
  );
}
