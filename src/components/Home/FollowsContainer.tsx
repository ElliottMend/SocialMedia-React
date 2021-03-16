import { IProfile } from "../UserProfile/UserPageContainer";
import Follows from "./Follows";
import { useState, useEffect } from "react";
import { axiosInstance } from "../../App";

export const FollowsContainer = () => {
  const [follow, setFollow] = useState<IProfile[]>([]);
  useEffect(() => {
    let isCancelled = false;
    followSuggestions().then((res) => {
      if (!isCancelled) setFollow(res.data);
    });
    return () => {
      isCancelled = true;
    };
  }, []);
  const followSuggestions = async () => {
    return await axiosInstance.get<IProfile[]>("/followsuggestions");
  };
  return (
    <div>
      {follow.map((e) => (
        <Follows key={e.user_id} data={e} />
      ))}
    </div>
  );
};
