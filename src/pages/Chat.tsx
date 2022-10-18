import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import {
  startMessagesListening,
  stopMessagesListening,
} from "../redux/chat-reduser";
import { AppStateType } from "../redux/redux-store";
import { AddMessagseFormChat } from "./AddMessageFormChat";
import { MessagesChat } from "./MessagesChat";

export const Chat: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch((startMessagesListening() as unknown) as AnyAction);
    return () => {
      dispatch((stopMessagesListening() as unknown) as AnyAction);
    };
  }, []);

  const status = useSelector((state: AppStateType) => state.chat.status);

  return (
    <div>
      {status === "error" && <div>Some error. Please refresh page.</div>}
      <div>
        <MessagesChat />
        <AddMessagseFormChat />
      </div>
    </div>
  );
};
