import React from "react";
import { ChatMessageType } from "./../API/chat-api";

export const MessageChat: React.FC<{ message: ChatMessageType }> = React.memo(
  ({ message }) => {
    return (
      <div>
        <img src={message.photo} style={{ width: "30px" }} />{" "}
        <b>{message.userName}</b>
        <br />
        {message.message}
        <hr />
      </div>
    );
  }
);
