import { ResultCodesEnum } from "../API/api";
import { profileAPI } from "../API/profile-api";
import { PostsType, ProfileType, PhotosType } from "../types/types";
import { ThunkAction } from "redux-thunk";
import { AppStateType, InferActionsTypes } from "./redux-store";

export type InitialStateType = typeof initialState;

let initialState = {
  posts: [
    { id: 11, message: "Hi, how are you?", likesCount: 11 },
    { id: 12, message: "It's my first post", likesCount: 23 },
    { id: 13, message: "Yio", likesCount: 12 },
    { id: 14, message: "post", likesCount: 17 },
  ] as Array<PostsType>,
  profile: {
    userId: null,
    lookingForAJob: false,
    lookingForAJobDescription: "",
    fullName: "",
    contacts: {
      github: "",
      vk: "",
      facebook: "",
      instagram: "",
      twitter: "",
      website: "",
      youtube: "",
      mainLink: "",
    },
    photos: {
      small: null,
      large: null,
    },
  } as ProfileType | null,
  status: "",
};

const profileReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "ADD_POST": {
      let newPost = action.post;
      return {
        ...state,
        posts: [...state.posts, { id: 15, message: newPost, likesCount: 0 }],
      };
    }
    case "SET_USER_PROFILE": {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case "SET_STATUS": {
      return {
        ...state,
        status: action.status,
      };
    }
    case "DELETE_POST": {
      return {
        ...state,
        posts: state.posts.filter((p) => p.id != action.postId),
      };
    }
    case "SAVE_PHOTO_SUCCESS": {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      };
    }
    default:
      return state;
  }
};

type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
  addPostActionCreator: (post: string) =>
    ({
      type: "ADD_POST",
      post,
    } as const),

  setUserProfile: (profile: ProfileType) =>
    ({
      type: "SET_USER_PROFILE",
      profile,
    } as const),

  setStatus: (status: string) =>
    ({
      type: "SET_STATUS",
      status,
    } as const),

  deletePost: (postId: number) =>
    ({
      type: "DELETE_POST",
      postId,
    } as const),

  savePhotoSuccess: (photos: PhotosType) =>
    ({
      type: "SAVE_PHOTO_SUCCESS",
      photos,
    } as const),
};

// type GetStateType = () => AppStateType;
// type CurrentDicpatchType = Dispatch<ActionsTypes>;

type ThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>;

export const getProfile = (userId: number | null): ThunkType => async (
  dispatch,
  getState
) => {
  let getProfileData = await profileAPI.getProfilePage(userId);
  dispatch(
    actions.setUserProfile({
      ...getState().profilePage.profile,
      ...getProfileData,
    })
  );
};
export const getStatus = (userId: number): ThunkType => async (
  dispatch,
  getState
) => {
  let response = await profileAPI.getStatus(userId);
  dispatch(actions.setStatus(response.data));
};
export const updateStatus = (status: string) => async (dispatch: any) => {
  try {
    let updateStatusData = await profileAPI.updateStatus(status);
    if (updateStatusData.resultCode === ResultCodesEnum.Success) {
      dispatch(actions.setStatus(status));
    }
  } catch (error) {}
};
export const updateProfileInfo = (profile: ProfileType): ThunkType => async (
  dispatch,
  getState
) => {
  const userId = getState().auth.userId;

  let updateProfileData = await profileAPI.updateProfileInfo({
    ...getState().profilePage.profile,
    ...profile,
  });
  if (updateProfileData.resultCode === ResultCodesEnum.Success) {
    dispatch(getProfile(userId));
  }
};
export const savePhoto = (file: File): ThunkType => async (
  dispatch,
  getState
) => {
  let savePhotoData = await profileAPI.savePhoto(file);
  if (savePhotoData.resultCode === ResultCodesEnum.Success) {
    dispatch(actions.savePhotoSuccess(savePhotoData.data.photos));
  }
};

export default profileReducer;
