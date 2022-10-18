import { ChatAPI, ChatMessageType, StatusType } from "../API/chat-api";
import { AppStateType, InferActionsTypes } from "./redux-store";
import { ThunkAction } from "redux-thunk";
import { Dispatch } from "redux";
import { randomUUID } from "crypto";

export type InitialStateType = typeof initialState;

let initialState = {
  messages: [] as ChatMessageIdType[],
  status: "pending" as StatusType,
};

type ChatMessageIdType = ChatMessageType & { id: string };

const chatReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case "chat/MESSAGES_RESEIVED":
      return {
        ...state,
        messages: [
          ...state.messages,
          ...action.data.messages.map((m: ChatMessageIdType) => ({
            ...m,
            id: randomUUID,
          })),
        ].filter((m, index, array) => index >= array.length - 100),
      };
    case "chat/STATUS_CHANGED":
      return {
        ...state,
        status: action.data.status,
      };
    default:
      return state;
  }
};

type ActionsTypes = InferActionsTypes<typeof actions>;

const actions = {
  messagesReseived: (messages: ChatMessageType[]) =>
    ({
      type: "chat/MESSAGES_RESEIVED",
      data: { messages },
    } as const),
  statusChanged: (status: StatusType) =>
    ({
      type: "chat/STATUS_CHANGED",
      data: { status },
    } as const),
};

type ThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>;

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;

const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(actions.messagesReseived(messages));
    };
  }
  return _newMessageHandler;
};

let _statusChangedHandler: ((status: StatusType) => void) | null = null;

const statusChangedHandlerCreator = (dispatch: Dispatch) => {
  if (_statusChangedHandler === null) {
    _statusChangedHandler = (status) => {
      dispatch(actions.statusChanged(status));
    };
  }
  return _statusChangedHandler;
};

export const startMessagesListening = (): ThunkType => async (
  dispatch,
  getState
) => {
  ChatAPI.start();
  ChatAPI.subscribeOnNewMessage(newMessageHandlerCreator(dispatch));
  ChatAPI.subscribeOnStatusChanged(statusChangedHandlerCreator(dispatch));
};

export const stopMessagesListening = (): ThunkType => async (
  dispatch,
  getState
) => {
  ChatAPI.unsubscribeOnNewMessage(newMessageHandlerCreator(dispatch));
  ChatAPI.unsubscribeOnStatusChanged(statusChangedHandlerCreator(dispatch));
  ChatAPI.stop();
};

export const sendMessageChat = (message: string): ThunkType => async (
  dispatch,
  getState
) => {
  ChatAPI.sendMessage(message);
};

export default chatReducer;
