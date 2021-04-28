import React from "react";
import { CreateMessage } from "./CreateMessage";
import { MessageContainer } from "./MessageContainer";

export const MessageRoom = () => {
  return (
    <div className="w-full flex flex-col h-full">
      <div className="bg-gray-100 border-2 flex h-full flex-1">
        <MessageContainer />
      </div>
      <CreateMessage />
    </div>
  );
};
