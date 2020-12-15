import React from "react";
import Follows from "./Follows";
export const FollowsContainer = (props) => {

  return (
    <div>
      <Follows data={props.data} />
    </div>
  );
};
