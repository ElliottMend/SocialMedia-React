import React, { useState, useEffect, useContext } from "react";
import { FollowButton } from "./FollowButton";
import { axiosInstance } from "../../App";
import { usernameContext } from "../Context/usernameContext";
interface IProps {
  user: string;
}
export const FollowButtonContainer = (props: IProps) => {
  const [username] = useState(useContext(usernameContext));
  const [follow, setFollow] = useState<boolean>(false);

  useEffect(() => {
    let isCancelled = false;
    if (props.user)
      checkFollow().then((items) => {
        if (!isCancelled) setFollow(items!.data);
      });
    return () => {
      isCancelled = true;
    };
  }, [props.user]);

  const changeFollow = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFollow(!follow);
    axiosInstance.put("/changeFollow", {
      user: e.target.id,
    });
  };

  const checkFollow = async () => {
    return await axiosInstance.get<boolean>(`/checkFollow/${props.user}`);
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
