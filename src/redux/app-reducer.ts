import { getAuth } from "./auth-reducer";
import { ThunkAction } from "redux-thunk";
import { AppStateType, InferActionsTypes } from "./redux-store";

let initialState = {
  initialized: false,
};

export type InitialStateType = typeof initialState;

const appReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case "SET_INITIALIZED":
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

const actions = {
  setInitialized: () =>
    ({
      type: "SET_INITIALIZED",
    } as const),
};

type ActionsTypes = InferActionsTypes<typeof actions>;

type ThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>;

export const initializeApp = (): ThunkType => async (dispatch, getState) => {
  let promise = await dispatch(getAuth());
  await Promise.all([promise]).then(() => {
    dispatch(actions.setInitialized());
  });
};

export default appReducer;
