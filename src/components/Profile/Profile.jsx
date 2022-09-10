import s from './Profile.module.css';
import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';


const Profile = React.memo((props) => {
    return (
      <div className={s.profileBlock}>
        <ProfileInfo savePhoto={props.savePhoto} isOwner={props.isOwner} profile={props.profile} status={props.status} updateStatus={props.updateStatus} updateProfileInfo={props.updateProfileInfo} />
        <MyPostsContainer />
      </div>
    );
})

export default Profile;