import { instance, APIResponseType, ResultCodesEnum } from "./api";
import { UsersType } from "../types/types";

type GetUsersType = {
  items: Array<UsersType>;
  totalCount: number;
  error: string;
};

export const usersAPI = {
  getUsers(
    currentPage = 1,
    pageSize = 10,
    term: string = "",
    friend: null | boolean = null
  ) {
    return instance
      .get<GetUsersType>(
        `users?page=${currentPage}&count=${pageSize}&term=${term}` +
          (friend === null ? "" : `&friend=${friend}`)
      )
      .then((res) => res.data);
  },
  followSuccess(id: number) {
    return instance
      .post<APIResponseType>(`follow/${id}`, {})
      .then((res) => res.data);
  },
  unfollowSuccess(id: number) {
    return instance
      .delete<APIResponseType>(`follow/${id}`)
      .then((res) => res.data);
  },
};
