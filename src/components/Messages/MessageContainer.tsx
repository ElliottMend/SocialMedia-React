import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../App";
import { Message } from "./Message";
export interface IMessage {
  body: string;
  message_timestamp: string;
  photo: string;
  username: string;
  message_id: number;
}
export const MessageContainer = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const roomId = window.location.pathname.split("/")[2];

  useEffect(() => {
    let isCancelled = false;
    getMessages().then((res) => {
      if (!isCancelled) setMessages(res.data);
      console.log(res.data);
    });
    return () => {
      isCancelled = true;
    };
  }, []);

  const getMessages = async () => {
    return await axiosInstance.get<IMessage[]>(`/getMessages/${roomId}`);
  };

  return (
    <div>
      {messages.map((message) => (
        <Message key={message.message_id} message={message} />
      ))}
    </div>
  );
};
