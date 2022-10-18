import { InferActionsTypes } from "./redux-store";

// export type InitialStateType = {
//   dialogs: Array<DialogsType>,
//   messages: Array<MessagesType>,
// };

type DialogsType = {
  id: number;
  name: string;
};
type MessagesType = {
  id: number;
  message: string;
};

export type InitialStateType = typeof initialState;

let initialState = {
  dialogs: [
    { id: 21, name: "Dima" },
    { id: 22, name: "Andrey" },
    { id: 23, name: "Sveta" },
    { id: 24, name: "Sasha" },
    { id: 25, name: "Victor" },
    { id: 26, name: "Valera" },
  ] as Array<DialogsType>,
  messages: [
    { id: 31, message: "Hi" },
    { id: 32, message: "How is your job?" },
    { id: 33, message: "Yo" },
    { id: 34, message: "Yo" },
    { id: 35, message: "Yo" },
  ] as Array<MessagesType>,
};

const dialogsReducer = (
  state = initialState,
  action: any
): InitialStateType => {
  switch (action.type) {
    case "SEND_MESSAGE": {
      let body = action.message;
      return {
        ...state,
        messages: [...state.messages, { id: 36, message: body }],
      };
    }
    default:
      return state;
  }
};

type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
  sendMessageCreator: (message: string) =>
    ({
      type: "SEND_MESSAGE",
      message,
    } as const),
};

export default dialogsReducer;
