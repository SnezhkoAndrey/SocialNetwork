import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchemaPostForm } from "./MyPostsValidation";
import {
  Textarea,
  ErrorForm,
} from "../../common/Preloader/FormsControl/FormsControl";
import { InitialStateType } from "../../../redux/profile-reducer";

type PropsType = {
  profilePage: InitialStateType;
  addPost: (post: string) => void;
};

const MyPosts: React.FC<PropsType> = React.memo((props) => {
  let postsElements = props.profilePage.posts.map((p) => (
    <Post message={p.message} key={p.id} likesCount={p.likesCount} />
  ));

  // let newPostElement = React.createRef();

  let onAddPost = (post: string) => {
    props.addPost(post);
  };

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <div>
        <AddNewPostForm onAddPost={onAddPost} />
      </div>
      <div className={s.posts}>{postsElements}</div>
    </div>
  );
});

type AddNewPostPropsType = {
  onAddPost: (post: string) => void;
};

const AddNewPostForm: React.FC<AddNewPostPropsType> = (props) => {
  return (
    <Formik
      enableReinitialize
      initialValues={{
        post: "",
      }}
      validationSchema={validationSchemaPostForm}
      onSubmit={(values) => {
        if (values.post.length >= 1) {
          props.onAddPost(values.post);
        }
      }}
    >
      {({}) => (
        <Form>
          <div>
            <Field
              name={"post"}
              type={"text"}
              component={Textarea}
              placeholder="Enter your post..." /*onChange={onPostChange} value={props.profilePage.newPostText}*/
            />
          </div>
          <ErrorMessage name="post" component={ErrorForm}></ErrorMessage>
          <div className={s.postButton}>
            <button type={"submit"} /*onClick={ onAddPost }*/>Add post</button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MyPosts;
