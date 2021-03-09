import React, { useState, useEffect, useContext } from "react";
import { FollowButton } from "./FollowButton";
import axios from "axios";
import { usernameContext } from "../Context/usernameContext";

export const FollowButtonContainer = (props) => {
  const [user] = useState(props.user);
  const [username] = useState(useContext(usernameContext));

  const [checked] = useState();
  const [follow, setFollow] = useState();
  useEffect(() => {
    let isCancelled = false;
    checkFollow().then((items) => {
      if (!isCancelled) {
        setFollow(!items.data.followerUsers.includes(username) ? false : true);
      }
    });
    return () => {
      isCancelled = true;
    };
  }, []);
  const changeFollow = (e) => {
    let check = e.target.checked;
    setFollow(e.target.checked);
    if (!check) {
      axios({
        method: "put",
        url: "http://localhost:5000/removeFollow",
        data: {
          author: e.target.id,
        },
        withCredentials: true,
      });
    } else {
      axios({
        method: "put",
        url: "http://localhost:5000/addFollow",
        data: {
          author: e.target.id,
        },
        withCredentials: true,
      });
    }
  };
  const checkFollow = async () => {
    const follows = await axios({
      method: "get",
      url: `http://localhost:5000/checkFollow/${props.user}`,
      data: {
        user: props.user,
      },
      withCredentials: true,
    });
    return follows;
  };
  return (
    <div>
      {props.user !== username && (
        <FollowButton
          follow={follow}
          checked={checked}
          changeFollow={changeFollow}
          user={user}
        />
      )}
    </div>
  );
};
