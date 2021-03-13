import React, { useState, useEffect, useContext } from "react";
import { FollowButton } from "./FollowButton";
import axios from "axios";
import { usernameContext } from "../Context/usernameContext";
interface IProps {
  user: string;
}
export const FollowButtonContainer = (props: IProps) => {
  const [username] = useState(useContext(usernameContext));

  const [follow, setFollow] = useState<boolean | undefined>();
  useEffect(() => {
    let isCancelled = false;
    checkFollow().then((items) => {
      setFollow(items.data);
    });
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      isCancelled = true;
    };
  }, []);
  const changeFollow = (e: React.ChangeEvent<HTMLInputElement>) => {
    let check = e.target.checked;
    setFollow(e.target.checked);
    axios({
      method: "put",
      url: `http://localhost:5000/${check ? "addfollow" : "removeFollow"}`,
      data: {
        author: e.target.id,
      },
      withCredentials: true,
    });
  };
  const checkFollow = async () => {
    return await axios.get<boolean>(
      `http://localhost:5000/checkFollow/${props.user}`,
      {
        withCredentials: true,
      }
    );
  };
  return (
    <div>
      {props.user !== username && (
        <FollowButton
          follow={follow}
          changeFollow={changeFollow}
          user={props.user}
        />
      )}
    </div>
  );
};
