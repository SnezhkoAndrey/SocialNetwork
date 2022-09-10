import React, {useState} from 'react';
import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import userPhoto from '../../../Assets/photo.jpg';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import {Formik, Form, Field} from "formik";
import {Input} from '../../common/Preloader/FormsControl/FormsControl'

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />
  }

  let [editMode, setEditMode] = useState(false);

  const updateProfile = (profile) => {
    console.log(profile)
    props.updateProfileInfo(profile);
  }

  const onMainPhotoSelected = (e) => {
    if(e.target.files.length) {
      props.savePhoto(e.target.files[0])
    }
  }

    return (
        <div>
            {/* <div>
          <img src='https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg' className={s.profileImg} />
        </div> */}
        <div className={s.descriptionBlock}>
          <div className={s.avatarBlock}>
            <img src={props.profile.photos ? props.profile.photos.large : userPhoto} />
            <div>{props.isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}</div>
          </div>
          <div>
            { editMode 
              ? <ProfileDataForm deactivedEditMode={() => {setEditMode(false)}} profile={props.profile} updateProfile={updateProfile} />
              : <ProfileData goToEditMode={() => {setEditMode(true)}}  profile={props.profile} isOwner={props.isOwner} />}
            <div>
              <div className={s.status}>{<ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} isOwner={props.isOwner} />}</div>
            </div>
          </div>
        </div>
        </div>
    )
}

const ProfileData = (props) => {
  return (
    <div>
      { props.isOwner && <button onClick={props.goToEditMode}>Edit</button>}
      <div><h2>{props.profile.fullName}</h2></div>
      <div>About me: {props.profile.aboutMe}</div>
      <div>Looking for a job: {props.profile.lookingForAJob ? 'yes' : 'no'}</div>
      <div>My professional skills: {props.profile.lookingForAJobDescription}</div>
      <div>Contacts: {Object.keys(props.profile.contacts).map(key => {
        return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]} />
      })}</div>
    </div>
  )
}

const ProfileDataForm = (props) => {
  return ( 
      <div> 
          <Formik 
          initialValues={{
            fullName: props.profile.fullName,
            aboutMe: props.profile.aboutMe,
            lookingForAJobDescription: props.profile.lookingForAJobDescription,
            lookingForAJob: props.profile.lookingForAJob,
            contacts: {
              github: props.profile.contacts.github,
              vk: props.profile.contacts.vk,
              facebook: props.profile.contacts.facebook,
              instagram: props.profile.contacts.instagram,
              twitter: props.profile.contacts.twitter,
              website: props.profile.contacts.website,
              youtube: props.profile.contacts.youtube,
              mainLink: props.profile.contacts.mainLink,
            }
          }}
          onSubmit={(values) => {
            props.deactivedEditMode();
            console.log(values)
            // if(values.profile.length >= 1) 
              props.updateProfile(values)
        }}>
          {({}) => (
          <Form>
            <div>
              <button type={'submit'}>Update profile data</button>
            </div>
            <div>
              <Field 
              name={'fullName'}
              type={'text'} 
              component={Input}
              placeholder='Enter your fullname...' />
            </div>
            <div>
              About me:
              <Field 
              name={'aboutMe'}
              type={'text'} 
              component={Input}
              placeholder='Enter your info...' />
            </div>
            <div>
              Looking for a job:
              <Field 
              name={'lookingForAJob'}
              type={'checkbox'} 
              component={Input}
              placeholder='Enter your info...' />
            </div>
            <div>
              My professional skills:
              <Field 
              name={'lookingForAJobDescription'}
              type={'text'} 
              component={Input}
              placeholder='Enter your info...' />
            </div>
            <div>Contacts: {Object.keys(props.profile.contacts).map(key => {
               return <div key={key} className={s.contact}>
                {key}: 
                <Field 
                name={'contacts.' + key}
                type={'text'} 
                component={Input}
                placeholder={key} />
               </div>
            })}</div>
          </Form>
          )}
    </Formik>
      </div> )
}

const Contact = ({contactTitle, contactValue}) => {
  return <div className={s.contact}>{contactTitle}: {contactValue}</div>
}

export default ProfileInfo;