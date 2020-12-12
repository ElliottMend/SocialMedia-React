import React, { useEffect, useState } from "react";
import axios from "axios";
import UserFollow from "./UserFollow";
export default function UserFollowContainer(props) {
  const [state, setState] = useState();
  useEffect(() => {
    console.log(typeof props.follow.followerUsers);
    console.log(props.follow.followerUsers);
    followData();
  }, [setState]);
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
    console.log(res.data);
    setState({ followData: [...res.data], follows: [props.follow] });
  };
  const Follow = (e) => {
    let check = e.target.checked;
    setState({ ...state, checked: check ? true : false });
    if (!check) {
      axios({
        method: "put",
        url: "https://social-mediasite.herokuapp.com/removeFollow",
        data: {
          author: e.target.id,
          withCredentials: true,
        },
      });
    } else {
      axios({
        method: "put",
        url: "https://social-mediasite.herokuapp.com/addFollow",
        data: {
          author: e.target.id,
          withCredentials: true,
        },
      });
    }
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
