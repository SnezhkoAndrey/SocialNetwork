const subscribers = {
  "messages-received": [] as MessagesReceivedSubscriberType[],
  "status-changed": [] as StatusChangedSubscriberType[],
};

let ws: WebSocket | null = null;

type EventsNamesType = "messages-received" | "status-changed";

const closeHandler = () => {
  notifySubscribersAboutStatus("pending");
  setTimeout(createChannel, 3000);
};
const messageHandler = (e: MessageEvent) => {
  let newMessagesChat = JSON.parse(e.data);
  subscribers["messages-received"].forEach((s) => s(newMessagesChat));
};
const openHandler = () => {
  notifySubscribersAboutStatus("ready");
};
const errorHandler = () => {
  notifySubscribersAboutStatus("error");
};

const cleanUp = (ws: WebSocket) => {
  ws.addEventListener("close", closeHandler);
  ws.addEventListener("message", messageHandler);
  ws.addEventListener("open", openHandler);
  ws.addEventListener("error", errorHandler);
};

const notifySubscribersAboutStatus = (status: StatusType) => {
  subscribers["status-changed"].forEach((s) => s(status));
};

function createChannel() {
  if (ws !== null) {
    cleanUp(ws);
    ws.close();
  }
  ws = new WebSocket(
    "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
  );
  notifySubscribersAboutStatus("pending");
  cleanUp(ws);
}

export const ChatAPI = {
  start() {
    createChannel();
  },
  stop() {
    if (ws !== null) {
      subscribers["messages-received"] = [];
      subscribers["status-changed"] = [];
      cleanUp(ws);
      ws.close();
    }
  },
  subscribeOnNewMessage(callback: MessagesReceivedSubscriberType) {
    subscribers["messages-received"].push(callback);
    return () => {
      subscribers["messages-received"] = subscribers[
        "messages-received"
      ].filter((s) => s !== callback);
    };
  },
  unsubscribeOnNewMessage(callback: MessagesReceivedSubscriberType) {
    subscribers["messages-received"] = subscribers["messages-received"].filter(
      (s) => s !== callback
    );
  },
  subscribeOnStatusChanged(callback: StatusChangedSubscriberType) {
    subscribers["status-changed"].push(callback);
    return () => {
      subscribers["status-changed"] = subscribers["status-changed"].filter(
        (s) => s !== callback
      );
    };
  },
  unsubscribeOnStatusChanged(callback: StatusChangedSubscriberType) {
    subscribers["status-changed"] = subscribers["status-changed"].filter(
      (s) => s !== callback
    );
  },
  sendMessage(message: string) {
    if (ws !== null) {
      ws.send(message);
    }
  },
};

export type MessagesReceivedSubscriberType = (
  messages: ChatMessageType[]
) => void;
export type StatusChangedSubscriberType = (status: StatusType) => void;

export type StatusType = "pending" | "ready" | "error";

export type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};
