import { ResultCodesEnum, ResultCodeForCaptcha } from "../API/api";
import { authAPI } from "../API/auth-api";
import { securityAPI } from "../API/security-api";
import { AppStateType, InferActionsTypes } from "./redux-store";
import { ThunkAction } from "redux-thunk";

// export type InitialStateType = {
//   userId: number | null,
//   email: string | null,
//   login: string | null,
//   isFetching: boolean,
//   isAuth: boolean,
//   messages: string | null,
//   captchaUrl: string | null,
// }

export type InitialStateType = typeof initialState;

let initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isFetching: false,
  isAuth: false,
  messages: null as Array<string> | null,
  captchaUrl: null as string | null,
};

const authReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case "auth/SET_USER_DATA":
    case "auth/GET_CAPTCHA_URL_SUCCESS":
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};

type ActionsTypes = InferActionsTypes<typeof actions>;

const actions = {
  setAuthUserData: (
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    messages: Array<string> | null
  ) =>
    ({
      type: "auth/SET_USER_DATA",
      data: { userId, email, login, isAuth, messages },
    } as const),

  getCaptchaUrlSuccess: (captchaUrl: string) =>
    ({
      type: "auth/GET_CAPTCHA_URL_SUCCESS",
      data: { captchaUrl },
    } as const),
};

type ThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>;

export const getAuth = (): ThunkType => async (dispatch, getState) => {
  const meData = await authAPI.getAuthMe();
  if (meData.resultCode === ResultCodesEnum.Success) {
    let { id, email, login } = meData.data;
    dispatch(actions.setAuthUserData(id, email, login, true, null));
  }
};

export const logIn = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: any
): ThunkType => async (dispatch, getState) => {
  const loginData = await authAPI.login(email, password, rememberMe, captcha);
  if (loginData.resultCode === ResultCodesEnum.Success) {
    dispatch(getAuth());
  } else {
    if (loginData.resultCode === ResultCodeForCaptcha.CaptchaIsRequaired) {
      dispatch(getCaptchaUrl());
    }
    dispatch(
      actions.setAuthUserData(null, null, null, false, loginData.messages)
    );
  }
};

export const logout = (): ThunkType => async (dispatch, getState) => {
  const logoutData = await authAPI.logout();
  if (logoutData.resultCode === ResultCodesEnum.Success) {
    dispatch(actions.setAuthUserData(null, null, null, false, null));
  }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch, getState) => {
  const response = await securityAPI.getCaptchaUrl();
  const captchaUrl = response.url;
  dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
};

export default authReducer;
