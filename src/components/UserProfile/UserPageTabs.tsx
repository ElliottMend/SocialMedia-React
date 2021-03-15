import React, { useState } from "react";
import { IData } from "./UserPageContainer";
import PostContainer, { IPost } from "../Posts/PostContainer";
interface IProps {
  data: IData;
  more: boolean;
}
export const UserPageTabs = (props: IProps) => {
  const [state, setState] = useState<number>(0);
  const tab: string[] = ["Posts", "Likes", "Comments"];
  return (
    <div>
      <ul className="list-reset flex justify-center container flex mx-auto border-b">
        {tab.map((e, index) => (
          <button
            key={index}
            onClick={() => setState(index)}
            className={`bg-white inline-block py-2 px-4 font-semibold ${
              index !== state
                ? "py-2 px-4 text-blue-300"
                : "border-l border-t border-r rounded-t text-white bg-blue-300"
            } `}
          >
            {e}
          </button>
        ))}
      </ul>
      <div>
        <PostContainer postData={props.data[tab[state]]} />
      </div>
    </div>
  );
};
