import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import navbarReducer from "./navbar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMidlleware from "redux-thunk";
import appReducer from "./app-reducer";
import chatReducer from "./chat-reduser";

let rootReduser = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  navBar: navbarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
  chat: chatReducer,
});

type RootReduserType = typeof rootReduser; // (globalstate: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReduserType>;

export type InferActionsTypes<T> = T extends {
  [key: string]: (...args: any[]) => infer U;
}
  ? U
  : never;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReduser,
  composeEnhancers(applyMiddleware(thunkMidlleware))
);

// let store = createStore(reducers, applyMiddleware(thunkMidlleware));

// @ts-ignore
window.__store__ = store;

export default store;
