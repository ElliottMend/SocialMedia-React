import React, { useState } from "react";
import { axiosInstance } from "../../App";
export const CreateMessage = () => {
  const [message, setMessage] = useState<string>("");
  const roomId = window.location.pathname.split("/")[2];
  const submitMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axiosInstance.post("/sendMessage", { roomId, message });
  };
  return (
    <div>
      <form className="" onSubmit={submitMessage}>
        <input
          className="border-2 border-black"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button />
      </form>
    </div>
  );
};
