import React from "react";
import { actions, InitialStateType } from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";
import { AppStateType } from "../../../redux/redux-store";
import { compose } from "redux";

// const MyPostsContainer = (props) => {

//     return (
//       <StoreContext.Consumer>
//         { (store) => {
//       let state = store.getState();
//       let addPost = () => {
//         store.dispatch(addPostActionCreator());
//       };

//       let onPostChange = (text) => {
//         let action = updateNewPostTextActionCreator(text);
//         store.dispatch(action);
//       };
//       return  <MyPosts
//       updateNewPostText={onPostChange}
//       addPost={addPost}
//       posts={state.profilePage.posts}
//       newPostText={state.profilePage.newPostText} />
//       }}
//       </StoreContext.Consumer>
//     );
// }

type MapStateToPropsType = {
  profilePage: InitialStateType;
};

type MapDispatchToPropsType = {
  addPost: (post: string) => void;
};

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    profilePage: state.profilePage,
  };
};

export default compose<React.ComponentType>(
  connect<
    MapStateToPropsType,
    MapDispatchToPropsType,
    /*OwnPropsType*/ null,
    AppStateType
  >(mapStateToProps, {
    addPost: actions.addPostActionCreator,
  })
)(MyPosts);
