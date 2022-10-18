import s from "./Profile.module.css";
import React, { useEffect } from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import { ProfileType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfile,
  getStatus,
  savePhoto,
  updateProfileInfo,
  updateStatus,
} from "../../redux/profile-reducer";
import { AnyAction, compose } from "redux";
import { Navigate, useParams } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

type PropsType = {
  // savePhoto: any
  // authUserId: number | null
  // profile: ProfileType | null
  // status: string
  // updateStatus: (newStatus: string) => void
  // updateProfileInfo: (newProfileInfo: ProfileType) => void
};

const Profile: React.FC<PropsType> = React.memo((props) => {
  const profile = useSelector(
    (state: AppStateType) => state.profilePage.profile
  );
  const status = useSelector((state: AppStateType) => state.profilePage.status);
  const authUserId = useSelector((state: AppStateType) => state.auth.userId);

  const dispatch = useDispatch();

  const savePhotoProfile = (file: File) => {
    dispatch((savePhoto(file) as unknown) as AnyAction);
  };
  const updateStatusProfile = (status: string) => {
    dispatch((updateStatus(status) as unknown) as AnyAction);
  };
  const updateProfileData = (profile: ProfileType) => {
    dispatch((updateProfileInfo(profile) as unknown) as AnyAction);
  };
  const getProfileData = (userId: number) => {
    dispatch((getProfile(userId) as unknown) as AnyAction);
  };
  const getStatusProfile = (userId: number) => {
    dispatch((getStatus(userId) as unknown) as AnyAction);
  };

  let { userId } = useParams();

  useEffect(() => {
    getProfileData(Number(userId));
    getStatusProfile(Number(userId));
  }, [userId]);

  if (!userId) {
    return <Navigate to={`/profile/${authUserId}`} />;
  }

  return (
    <div className={s.profileBlock}>
      <ProfileInfo
        savePhoto={savePhotoProfile}
        authUserId={authUserId}
        profile={profile}
        status={status}
        updateStatus={updateStatusProfile}
        updateProfileInfo={updateProfileData}
      />
      <MyPostsContainer />
    </div>
  );
});

export default compose<React.ComponentType>(withAuthRedirect)(Profile);
