import React, { useEffect, useState } from "react";
import { MessageRoomList } from "./MessageRoomList";
import { axiosInstance } from "../../App";
import { CreateMessageRoom } from "./CreateMessageRoom";
interface IRooms {
  room_id: string;
  host_id?: number;
  room_name: string;
  user_id?: number;
}
export const MessageRoomListContainer = () => {
  const [state, setState] = useState<IRooms[]>([]);
  useEffect(() => {
    let isCancelled = false;
    getMessageRooms().then((res) => {
      if (!isCancelled) setState(res.data);
    });
    return () => {
      isCancelled = true;
    };
  }, []);
  const getMessageRooms = async () => {
    return axiosInstance.get<IRooms[]>("/getMessageRooms");
  };
  return (
    <div className="container mx-auto">
      <CreateMessageRoom />
      {state.map((room) => (
        <MessageRoomList key={room.room_id} room={room} />
      ))}
    </div>
  );
};
