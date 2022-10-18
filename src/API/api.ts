import axios from "axios";

export const instance = axios.create({
  withCredentials: true,
  headers: {
    "API-KEY": "20953ceb-ea30-4381-8db5-490625f2fa1d",
  },
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
});

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}

export enum ResultCodeForCaptcha {
  CaptchaIsRequaired = 10,
}

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
  data: D;
  messages: Array<string>;
  resultCode: RC;
};
