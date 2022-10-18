import React from "react";
import { Formik, Form, Field } from "formik";
import { Input } from "../../common/Preloader/FormsControl/FormsControl";
import s from "./ProfileInfo.module.css";
import { ProfileType } from "../../../types/types";

type PropsType = {
  profile: ProfileType;
  deactivedEditMode: () => void;
  updateProfile: (newProfile: ProfileType) => void;
};

const ProfileDataForm: React.FC<PropsType> = (props) => {
  return (
    <div>
      <Formik
        initialValues={{
          userId: props.profile.userId,
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
          },
          photos: {
            small: null,
            large: null,
          },
        }}
        onSubmit={(values) => {
          props.deactivedEditMode();
          console.log(values);
          // if(values.profile.length >= 1)
          props.updateProfile(values);
        }}
      >
        {({}) => (
          <Form>
            <div>
              <button type={"submit"}>Update profile data</button>
            </div>
            <div>
              <Field
                name={"fullName"}
                type={"text"}
                component={Input}
                placeholder="Enter your fullname..."
              />
            </div>
            <div>
              About me:
              <Field
                name={"aboutMe"}
                type={"text"}
                component={Input}
                placeholder="Enter your info..."
              />
            </div>
            <div>
              Looking for a job:
              <Field
                name={"lookingForAJob"}
                type={"checkbox"}
                component={Input}
                placeholder="Enter your info..."
              />
            </div>
            <div>
              My professional skills:
              <Field
                name={"lookingForAJobDescription"}
                type={"text"}
                component={Input}
                placeholder="Enter your info..."
              />
            </div>
            <div>
              Contacts:{" "}
              {Object.keys(props.profile.contacts).map((key) => {
                return (
                  <div key={key} className={s.contact}>
                    {key}:
                    <Field
                      name={"contacts." + key}
                      type={"text"}
                      component={Input}
                      placeholder={key}
                    />
                  </div>
                );
              })}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProfileDataForm;
