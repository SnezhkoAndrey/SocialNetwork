import { authAPI, securityAPI } from "../API/api";

const SET_USER_DATA = "auth/SET-USER-DATA";
const GET_CAPTCHA_URL_SUCCESS = "auth/GET-CAPTCHA-URL-SUCCESS";

let initialState = {
  userId: null,
  email: null,
  login: null,
  isFetching: false,
  isAuth: false,
  messages: null,
  captchaUrl: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
    case GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};

export const setAuthUserData = (userId, email, login, isAuth, messages) => ({
  type: SET_USER_DATA,
  data: { userId, email, login, isAuth, messages },
});

export const getCaptchaUrlSuccess = (captchaUrl) => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  data: { captchaUrl },
});

export const getAuth = () => async (dispatch) => {
  let response = await authAPI.getAuthMe();
  if (response.data.resultCode === 0) {
    let { id, email, login } = response.data.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
};

export const login = (email, password, rememberMe, captcha) => async (
  dispatch
) => {
  let response = await authAPI.login(email, password, rememberMe, captcha);
  if (response.data.resultCode === 0) {
    dispatch(getAuth());
  } else {
    if (response.data.resultCode === 10) {
      dispatch(getCaptchaUrl());
    }
    dispatch(setAuthUserData(null, null, null, false, response.data.messages));
  }
};

export const logout = () => async (dispatch) => {
  let response = await authAPI.logout();
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};

export const getCaptchaUrl = () => async (dispatch) => {
  const response = await securityAPI.getCaptchaUrl();
  const captchaUrl = response.data.url;
  dispatch(getCaptchaUrlSuccess(captchaUrl));
};

export default authReducer;
