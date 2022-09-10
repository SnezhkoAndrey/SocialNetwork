import { profileAPI } from "../API/api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET-USER-PROFILE";
const SET_STATUS = "SET-STATUS";
const DELETE_POST = "DELETE-POST";
const SAVE_PHOTO_SUCCESS = "SAVE-PHOTO-SUCCESS";

let initialState = {
  posts: [
    { id: 11, message: "Hi, how are you?", likesCount: 11 },
    { id: 12, message: "It's my first post", likesCount: 23 },
    { id: 13, message: "Yio", likesCount: 12 },
    { id: 14, message: "post", likesCount: 17 },
  ],
  profile: {
    userId: "",
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
  },
  status: "",
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = action.post;
      return {
        ...state,
        posts: [...state.posts, { id: 15, message: newPost, likesCount: 0 }],
      };
    }
    case SET_USER_PROFILE: {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case SET_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter((p) => p.id != action.postId),
      };
    }
    case SAVE_PHOTO_SUCCESS: {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos },
      };
    }
    default:
      return state;
  }
};

export const addPostActionCreator = (post) => ({ type: ADD_POST, post });
export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
});
export const setStatus = (status) => ({
  type: SET_STATUS,
  status,
});
export const deletePost = (postId) => ({
  type: DELETE_POST,
  postId,
});
export const savePhotoSuccess = (photos) => ({
  type: SAVE_PHOTO_SUCCESS,
  photos,
});

export const getProfile = (userId) => async (dispatch, getState) => {
  let response = await profileAPI.getProfilePage(userId);
  dispatch(
    setUserProfile({ ...getState().profilePage.profile, ...response.data })
  );
};
export const getStatus = (userId) => async (dispatch) => {
  let response = await profileAPI.getStatus(userId);
  dispatch(setStatus(response.data));
};
export const updateStatus = (status) => async (dispatch) => {
  let response = await profileAPI.updateStatus(status);
  if (response.data.resultCode === 0) {
    dispatch(setStatus(status));
  }
};
export const updateProfileInfo = (profile) => async (dispatch, getState) => {
  const userId = getState().auth.userId;

  let response = await profileAPI.updateProfileInfo({
    ...getState().profilePage.profile,
    ...profile,
  });
  if (response.data.resultCode === 0) {
    dispatch(getProfile(userId));
  }
};
export const savePhoto = (file) => async (dispatch) => {
  let response = await profileAPI.savePhoto(file);
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos));
  }
};

export default profileReducer;
