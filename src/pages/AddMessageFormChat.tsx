import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { sendMessageChat } from "../redux/chat-reduser";
import { AppStateType } from "../redux/redux-store";

export const AddMessagseFormChat: React.FC = () => {
  let [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const status = useSelector((state: AppStateType) => state.chat.status);

  const sendMessageHandler = () => {
    if (!message) {
      return;
    }
    dispatch((sendMessageChat(message) as unknown) as AnyAction);
    setMessage("");
  };
  return (
    <div>
      <div>
        <textarea
          onChange={(e) => setMessage(e.currentTarget.value)}
          value={message}
        ></textarea>
      </div>
      <div>
        <button disabled={status !== "ready"} onClick={sendMessageHandler}>
          Send Message
        </button>
      </div>
    </div>
  );
};
