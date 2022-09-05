import React from 'react';
import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import userPhoto from '../../../Assets/photo.jpg'
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />
  }

    return (
        <div>
            {/* <div>
          <img src='https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg' className={s.profileImg} />
        </div> */}
        <div className={s.descriptionBlock}>
          <div className={s.avatarBlock}>
            <img src={props.profile.photos.large != null ? props.profile.photos.large : userPhoto} />
          </div>
          <div>
            <div>
              <div><h2>{props.profile.fullName}</h2></div>
              <div className={s.status}>{<ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />}</div>
              <div>About me: {props.profile.aboutMe}</div>
              <div>Looking for a job: {props.profile.lookingForAJobDescription}</div>
            </div>
            <div>
              <div>Contacts:</div>
              <div>
                <a href={props.profile.contacts.instagram}>Instagram</a>
              </div>
              <div>
                <a href={props.profile.contacts.twitter}>Twitter</a>
              </div>
              <div>
                <a href={props.profile.contacts.facebook}>Facebook</a>
              </div>
            </div>
          </div>
        </div>
        </div>
    )
}

export default ProfileInfo;