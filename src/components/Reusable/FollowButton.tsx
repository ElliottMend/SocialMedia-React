import React from "react";

interface IProps {
  changeFollow: (e: React.ChangeEvent<HTMLInputElement>) => void;
  user: string;
  follow: boolean | undefined;
}
export const FollowButton = (props: IProps) => {
  return (
    <div>
      <label>
        <input
          onChange={props.changeFollow}
          defaultChecked={props.follow}
          id={props.user}
          className="hidden"
          type="checkbox"
        ></input>
        {props.follow ? (
          <p className="bg-blue-300 text-white cursor-pointer md:w-40 md:h-20 w-32 h-16 flex items-center justify-center rounded-full ">
            Following
          </p>
        ) : (
          <p className="border-blue-300 text-blue-300 border-2 cursor-pointer md:w-40 md:h-20 w-32 h-16 flex items-center justify-center rounded-full ">
            Follow
          </p>
        )}
      </label>
    </div>
  );
};
