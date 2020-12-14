import React, { useEffect, useState } from "react";
import axios from "axios";
import UserFollow from "./UserFollow";
export default function UserFollowContainer(props) {
  const [state, setState] = useState();
  useEffect(() => {
    followData();
  }, []);
  const followData = async () => {
    const res = await axios({
      method: "post",
      url: "https://social-mediasite.herokuapp.com/followData",
      data: {
        users:
          props.data.modal === "0"
            ? props.follow.followerUsers
            : props.follow.followingUsers,
      },
      withCredentials: true,
    });
    setState({ followData: [...res.data], follows: [props.follow] });
  };
  const Follow = (e) => {
    
  };
  const getColor = () => {
    color = !color;
  };
  var color = false;
  return (
    <div>
      <div>
        {state &&
          state.followData.map((e, index) => (
            <div>
              {getColor()}
              <UserFollow
                color={color}
                key={e.username}
                follow={state.follows}
                onChange={(e) => Follow(e)}
                data={e}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
