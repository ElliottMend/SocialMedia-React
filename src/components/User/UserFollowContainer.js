import React, { useEffect, useState } from "react";
import axios from "axios";
import UserFollowDisplay from "./UserFollow";
export default function UserFollowContainer(props) {
  const [state, setState] = useState();
  const [follow, setFollow] = useState();
  useEffect(() => {
    followData();
  }, [setState, setFollow]);
  const followData = async () => {
    if (props.data.modal === "0" && props.follow.followerUsers.length > 0) {
      const res = await axios({
        method: "post",
        url:
          "https://social-mediasite.herokuapp.com/followData",
        data: { followerUsers: props.follow.followerUsers },
      });
      getFollowers(res.data);
    } else {
      if (props.follow.followingUsers.length > 0) {
        const res = await axios({
          method: "post",
          url:
            "https://social-mediasite.herokuapp.com/followData",
          data: { followingUsers: props.follow.followingUsers },
        });
        getFollowers(res.data);
      }
    }
  };
  const Follow = (e) => {
    let check = e.target.checked;
    setState({ ...state, checked: check ? true : false });
    if (!check) {
      axios({
        method: "put",
        url:
          "https://social-mediasite.herokuapp.com/removeFollow",
        data: {
          user: localStorage.getItem("username"),
          author: e.target.id,
        },
      });
    } else {
      axios({
        method: "put",
        url:
          "https://social-mediasite.herokuapp.com/addFollow",
        data: {
          user: localStorage.getItem("username"),
          author: e.target.id,
        },
      });
    }
  };
  const getColor = () => {
    color = !color;
  };
  const getFollowers = async (res) => {
    const follow = await axios({
      method: "post",
      url:
        "https://social-mediasite.herokuapp.com/checkFollow",
      data: { user: localStorage.getItem("username") },
    });
    setState({ followData: [...res], follows: [follow.data] });
  };
  var color = false;
  return (
    <div>
      <div>
        {state &&
          state.followData.map((e, index) => (
            <div>
              {getColor()}
              <UserFollowDisplay
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
