import { Dispatch } from "react";
import { APIResponseType, ResultCodesEnum } from "../API/api";
import { usersAPI } from "../API/users-api";
import { updateObjectInArray } from "../components/utils/object-helper";
import { UsersType } from "../types/types";
import { AppStateType, InferActionsTypes } from "./redux-store";
import { ThunkAction } from "redux-thunk";

export type InitialStateType = typeof initialState;
export type FilterType = typeof initialState.filter;
let initialState = {
  users: [] as Array<UsersType>,
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>, //array of users ids
  filter: {
    term: "",
    friend: null as null | boolean,
  },
};

export const usersReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "FOLLOW":
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: true,
        }),
        // users: state.users.map((u) => {
        //   if (u.id === action.userId) {
        //     return { ...u, followed: true };
        //   }
        //   return u;
        // }),
      };
    case "UNFOLLOW":
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: false,
        }),
        // users: state.users.map((u) => {
        //   if (u.id === action.userId) {
        //     return { ...u, followed: false };
        //   }
        //   return u;
        // }),
      };
    case "SET_USERS":
      return {
        ...state,
        users: action.users,
      };
    case "SET_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case "SET_FILTER":
      return {
        ...state,
        filter: action.filter,
      };
    case "SET_TOTAL_USERS_COUNT":
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      };
    case "TOGGLE_IS_FETCHING":
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case "TOGGLE_IS_FOLLOWING_PROGRESS":
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };
    default:
      return state;
  }
};

type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
  followSuccess: (userId: number) =>
    ({
      type: "FOLLOW",
      userId,
    } as const),

  unfollowSuccess: (userId: number) =>
    ({
      type: "UNFOLLOW",
      userId,
    } as const),

  setUsers: (users: Array<UsersType>) =>
    ({
      type: "SET_USERS",
      users,
    } as const),

  setCurrentPage: (currentPage: number) =>
    ({
      type: "SET_CURRENT_PAGE",
      currentPage,
    } as const),

  setFilter: (filter: FilterType) =>
    ({
      type: "SET_FILTER",
      filter: filter,
    } as const),

  setTotalUsersCount: (totalUsersCount: number) =>
    ({
      type: "SET_TOTAL_USERS_COUNT",
      totalUsersCount,
    } as const),

  toggleIsFetching: (isFetching: boolean) =>
    ({
      type: "TOGGLE_IS_FETCHING",
      isFetching,
    } as const),

  toggleIsFollowingProgress: (isFetching: boolean, userId: number) =>
    ({
      type: "TOGGLE_IS_FOLLOWING_PROGRESS",
      isFetching,
      userId,
    } as const),
};

// type GetStateType = () => AppStateType;
type CurrentDicpatchType = Dispatch<ActionsTypes>;

type ThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>;

export const getUsers = (
  pageNumber: number,
  pageSize: number,
  filter: FilterType
): ThunkType => async (dispatch, getState) => {
  dispatch(actions.setCurrentPage(pageNumber));
  dispatch(actions.setFilter(filter));
  dispatch(actions.toggleIsFetching(true));
  let getUsersData = await usersAPI.getUsers(
    pageNumber,
    pageSize,
    filter.term,
    filter.friend
  );
  dispatch(actions.toggleIsFetching(false));
  dispatch(actions.setUsers(getUsersData.items));
  dispatch(actions.setTotalUsersCount(getUsersData.totalCount));
};

const _followUnfollowFlow = async (
  dispatch: CurrentDicpatchType,
  userId: number,
  apiMethod: (userId: number) => Promise<APIResponseType>,
  actionCreator: (userId: number) => ActionsTypes
) => {
  dispatch(actions.toggleIsFollowingProgress(true, userId));
  let response = await apiMethod(userId);
  if (response.resultCode == ResultCodesEnum.Success) {
    dispatch(actionCreator(userId));
  }
  dispatch(actions.toggleIsFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => async (
  dispatch,
  getstate
) => {
  await _followUnfollowFlow(
    dispatch,
    userId,
    usersAPI.followSuccess.bind(usersAPI),
    actions.followSuccess
  );
};

export const unfollow = (userId: number): ThunkType => async (
  dispatch,
  getState
) => {
  await _followUnfollowFlow(
    dispatch,
    userId,
    usersAPI.unfollowSuccess.bind(usersAPI),
    actions.unfollowSuccess
  );
};

export default usersReducer;
