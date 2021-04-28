import React from "react";
import { DateTime } from "../Reusable/DateTime";
import { IMessage } from "./MessageContainer";
import { usernameContext } from "../Context/usernameContext";
interface IProps {
  message: IMessage;
}
export const Message = (props: IProps) => {
  return (
    <div className="flex items-center justify-center flex-row">
      <div className="flex flex-col">
        <div className="bg-seafoam">
          <p>{props.message.body}</p>
          <DateTime date={props.message.message_timestamp} />
        </div>
        <p>{props.message.username}</p>
      </div>
      <img
        className="w-16 h-16 rounded-full"
        alt="msgPic"
        src={props.message.photo}
      />
    </div>
  );
};
