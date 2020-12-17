import React, { useState } from "react";
import Follows from "./Follows";
export const FollowsContainer = (props) => {
  const [followers, setFollowers] = useState();
  const updateFollow = (e) => {
    console.log(e)
  };
  return (
    <div>
      <Follows changeFollowers={updateFollow} data={props.data} />
    </div>
  );
};
