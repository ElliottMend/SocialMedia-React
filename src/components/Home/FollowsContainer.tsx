import { IProfile } from "../User/UserPageContainer";
import Follows from "./Follows";
import { useState, useEffect } from "react";
import axios from "axios";

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
    return await axios.get<IProfile[]>(
      "http://localhost:5000/followsuggestions",
      {
        withCredentials: true,
      }
    );
  };
  return (
    <div>
      {follow.map((e) => (
        <Follows data={e} />
      ))}
    </div>
  );
};
