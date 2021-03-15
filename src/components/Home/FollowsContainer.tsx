import { IProfile } from "../UserProfile/UserPageContainer";
import Follows from "./Follows";
import { useState, useEffect } from "react";
import { axiosInstance } from "../../App";

export const FollowsContainer = () => {
  useEffect(() => {
    let isCancelled = false;
    followSuggestions().then((res) => {
      if (!isCancelled) setFollow(res.data);
    });
    return () => {
      isCancelled = true;
    };
  }, []);
  const [follow, setFollow] = useState<IProfile[]>([]);
  const followSuggestions = async () => {
    return await axiosInstance.get<IProfile[]>("/followsuggestions", {});
  };
  return (
    <div>
      {follow.map((e) => (
        <Follows data={e} />
      ))}
    </div>
  );
};
