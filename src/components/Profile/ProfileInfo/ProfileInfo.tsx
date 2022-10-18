import React, { ChangeEvent, useState } from "react";
import Preloader from "../../common/Preloader/Preloader";
import s from "./ProfileInfo.module.css";
import userPhoto from "../../../Assets/photo.jpg";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileDataForm";
import { ProfileType } from "../../../types/types";
import { Button } from "antd";

type PropsType = {
  savePhoto: (file: File) => void;
  authUserId: number | null;
  profile: ProfileType | null;
  status: string;
  updateStatus: (newStatus: string) => void;
  updateProfileInfo: (newProfileInfo: ProfileType) => void;
};

const ProfileInfo: React.FC<PropsType> = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }

  const editSuccess = props.profile.userId === props.authUserId;

  let [editMode, setEditMode] = useState(false);

  const updateProfile = (profile: ProfileType) => {
    console.log(profile);
    props.updateProfileInfo(profile);
  };

  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  };

  return (
    <div>
      {/* <div>
          <img src='https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg' className={s.profileImg} />
        </div> */}
      <div className={s.descriptionBlock}>
        <div className={s.avatarBlock}>
          <img
            src={
              props.profile.photos.large
                ? props.profile.photos.large
                : userPhoto
            }
          />
          <div>
            {editSuccess && (
              <input type={"file"} onChange={onMainPhotoSelected} />
            )}
          </div>
        </div>
        <div>
          {editMode ? (
            <ProfileDataForm
              deactivedEditMode={() => {
                setEditMode(false);
              }}
              profile={props.profile}
              updateProfile={updateProfile}
            />
          ) : (
            <ProfileData
              goToEditMode={() => {
                setEditMode(true);
              }}
              profile={props.profile}
              editSuccess={editSuccess}
            />
          )}
          <div>
            <div className={s.status}>
              {
                <ProfileStatusWithHooks
                  status={props.status}
                  updateStatus={props.updateStatus}
                  editSuccess={editSuccess}
                />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type PropsProfileDataType = {
  profile: ProfileType;
  editSuccess: boolean;
  goToEditMode: () => void;
};

const ProfileData: React.FC<PropsProfileDataType> = (props) => {
  return (
    <div>
      {props.editSuccess && (
        <Button type="ghost" onClick={props.goToEditMode}>
          Edit
        </Button>
      )}
      <div>
        <h2>{props.profile.fullName}</h2>
      </div>
      <div>About me: {props.profile.aboutMe}</div>
      <div>
        Looking for a job: {props.profile.lookingForAJob ? "yes" : "no"}
      </div>
      <div>
        My professional skills: {props.profile.lookingForAJobDescription}
      </div>
      <div>
        Contacts:{" "}
        {Object.keys(props.profile.contacts).map((key) => {
          return (
            <Contact
              key={key}
              contactTitle={key}
              contactValue={props.profile.contacts[key]}
            />
          );
        })}
      </div>
    </div>
  );
};

type PropsContactType = {
  contactTitle: string;
  contactValue: string;
};

const Contact: React.FC<PropsContactType> = ({
  contactTitle,
  contactValue,
}) => {
  return (
    <div className={s.contact}>
      {contactTitle}: {contactValue}
    </div>
  );
};

export default ProfileInfo;
