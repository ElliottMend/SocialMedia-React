import React, { useState, useEffect, useContext } from "react";
import { FollowButton } from "./FollowButton";
import { axiosInstance } from "../../App";
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
    axiosInstance({
      method: "put",
      url: `/${check ? "addfollow" : "removeFollow"}`,
      data: {
        author: e.target.id,
      },
    });
  };
  const checkFollow = async () => {
    return await axiosInstance.get<boolean>(`/checkFollow/${props.user}`, {});
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
