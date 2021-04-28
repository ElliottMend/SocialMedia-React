import React from "react";
import { Link } from "react-router-dom";
interface IRooms {
  room_id: string;
  host_id?: number;
  room_name: string;
  user_id?: number;
}
interface IProps {
  room: IRooms;
}
export const MessageRoomList = (props: IProps) => {
  return (
    <Link to={`/messages/${props.room.room_id}`}>
      <p className="my-1 border border-black bg-blue-300">
        {props.room.room_name}
      </p>
    </Link>
  );
};
