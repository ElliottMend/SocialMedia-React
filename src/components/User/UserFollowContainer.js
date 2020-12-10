import React, { useEffect, useState } from "react";
import axios from "axios";
import UserFollow from "./UserFollow";
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
        url: "https://social-mediasite.herokuapp.com/followData",
        data: { followerUsers: props.follow.followerUsers },
        withCredentials: true,
      });
      console.log(res)
      setState({ followData: [...res], follows: [props.follow] });
    } else {
      if (props.follow.followingUsers.length > 0) {
        const res = await axios({
          method: "post",
          url: "https://social-mediasite.herokuapp.com/followData",
          data: { followingUsers: props.follow.followingUsers },
          withCredentials: true,
        });
        setState({ followData: [...res], follows: [props.follow] });
      }
    }
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
  const getFollowers = async (res) => {
    console.log(res);
    const follow = await axios({
      method: "get",
      url: "https://social-mediasite.herokuapp.com/checkFollow",
      withCredentials: true,
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
