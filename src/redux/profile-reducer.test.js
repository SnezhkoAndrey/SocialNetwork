import profileReducer, {
  addPostActionCreator,
  deletePost,
} from "./profile-reducer";
import { render, screen } from "@testing-library/react";

let state = {
  posts: [
    { id: 11, message: "Hi, how are you?", likesCount: 11 },
    { id: 12, message: "It's my first post", likesCount: 23 },
    { id: 13, message: "Yio", likesCount: 12 },
    { id: 14, message: "post", likesCount: 17 },
  ],
};

test("length of posts should be incremented", () => {
  //1. stars data
  let action = addPostActionCreator("dorou");

  //2.action
  let newState = profileReducer(state, action);
  //3.expectation
  expect(newState.posts.length).toBe(5);
});

test("message of new posts should be correct", () => {
  //1. stars data
  let action = addPostActionCreator("dorou");

  //2.action
  let newState = profileReducer(state, action);
  //3.expectation
  expect(newState.posts[4].message).toBe("dorou");
});

test("after deleting length of messege should be decrement", () => {
  //1. stars data
  let action = deletePost(11);

  //2.action
  let newState = profileReducer(state, action);
  //3.expectation
  expect(newState.posts.length).toBe(3);
});

test("after deleting length of messege shouldn't be decrement if id is incorrect", () => {
  //1. stars data
  let action = deletePost(110);

  //2.action
  let newState = profileReducer(state, action);
  //3.expectation
  expect(newState.posts.length).toBe(4);
});
