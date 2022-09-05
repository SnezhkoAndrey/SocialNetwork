const SEND_MESSAGE = "SEND-MESSAGE";

let initialState = {
  dialogs: [
    { id: 21, name: "Dima" },
    { id: 22, name: "Andrey" },
    { id: 23, name: "Sveta" },
    { id: 24, name: "Sasha" },
    { id: 25, name: "Victor" },
    { id: 26, name: "Valera" },
  ],
  messages: [
    { id: 31, message: "Hi" },
    { id: 32, message: "How is your job?" },
    { id: 33, message: "Yo" },
    { id: 34, message: "Yo" },
    { id: 35, message: "Yo" },
  ],
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE: {
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

export const sendMessageCreator = (message) => ({
  type: SEND_MESSAGE,
  message,
});

export default dialogsReducer;
