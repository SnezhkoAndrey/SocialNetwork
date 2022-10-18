import React, { useEffect, useRef, useState } from "react";
import { MessageChat } from "./MessageChat";
import { useSelector } from "react-redux";
import { AppStateType } from "../redux/redux-store";

export const MessagesChat: React.FC = () => {
  const messagesChat = useSelector(
    (state: AppStateType) => state.chat.messages
  );

  const [isAutoScroll, setIsAutoScroll] = useState(true);

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const element = e.currentTarget;
    if (
      Math.abs(
        element.scrollHeight - element.scrollTop - element.clientHeight
      ) < 300
    ) {
      !isAutoScroll && setIsAutoScroll(true);
    } else {
      isAutoScroll && setIsAutoScroll(false);
    }
  };

  const MessagesAnchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAutoScroll) {
      if (MessagesAnchorRef.current !== null) {
        MessagesAnchorRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [messagesChat]);

  return (
    <div
      style={{ height: "400px", overflowY: "auto" }}
      onScroll={scrollHandler}
    >
      {messagesChat.map((m, index) => (
        <MessageChat key={m.id} message={m} />
      ))}
      <div ref={MessagesAnchorRef}></div>
    </div>
  );
};
