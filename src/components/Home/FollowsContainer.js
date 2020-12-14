import React, { useState } from "react";
import axios from "axios";
import Follows from "./Follows";
export const FollowsContainer = (props) => {
  const [state, setState] = useState({ checked: true });
  const Follow = async (e) => {
    const check = e.target.checked;
    setState({
      ...state,
      follow: check,
    });
    if (!check) {
      axios({
        method: "put",
        url: "https://social-mediasite.herokuapp.com/removeFollow",
        data: {
          author: props.data.username,
        },
        withCredentials: true,
      });
    } else {
      axios({
        method: "put",
        url: "https://social-mediasite.herokuapp.com/addFollow",
        data: {
          author: props.data.username,
        },
        withCredentials: true,
      });
    }
  };
  return (
    <div>
      <Follows Follow={Follow} data={state} />
    </div>
  );
};
