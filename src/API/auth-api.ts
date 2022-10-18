import {
  instance,
  ResultCodesEnum,
  ResultCodeForCaptcha,
  APIResponseType,
} from "./api";

type GetAuthMeDataType = {
  id: number;
  email: string;
  login: string;
};
type LoginDataType = {
  userId: number;
};

export const authAPI = {
  getAuthMe() {
    return instance
      .get<APIResponseType<GetAuthMeDataType>>(`auth/me`)
      .then((res) => res.data);
  },
  login(
    email: string,
    password: string,
    rememberMe = false,
    captcha: null | string = null
  ) {
    return instance
      .post<
        APIResponseType<LoginDataType, ResultCodesEnum | ResultCodeForCaptcha>
      >(`auth/login`, {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((res) => res.data);
  },
  logout() {
    return instance
      .delete<APIResponseType>(`auth/login`)
      .then((res) => res.data);
  },
};
