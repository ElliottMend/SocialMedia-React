import { IProfile } from "../User/UserPageContainer";
import Follows from "./Follows";
import { useState, useEffect } from "react";
import axios from "axios";

export const FollowsContainer = () => {
  useEffect(() => {
    followSuggestions();
  });
  const [follow, setFollow] = useState<IProfile[]>([]);
  const followSuggestions = async () => {
    const res = await axios.get<IProfile[]>(
      "http://localhost:5000/followsuggestions",
      {
        withCredentials: true,
      }
    );
    setFollow(res.data);
  };
  return (
    <div>
      {follow.map((e) => (
        <Follows data={e} />
      ))}
    </div>
  );
};
