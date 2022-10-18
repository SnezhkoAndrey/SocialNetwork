import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Music from "./components/Music/Music";
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
// import FindUsersContainer from "./components/Friends/FindUsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
// import Login from "./components/Login/Login";
import { connect } from "react-redux";
import { initializeApp } from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store, { AppStateType } from "./redux/redux-store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "antd/dist/antd.css";

// import DialogsContainer from "./components/Dialogs/DialogsContainer";
const DialogsContainer = React.lazy(() =>
  import("./components/Dialogs/DialogsContainer")
);
// import ProfileContainer from "./components/Profile/ProfileContainer";
const Profile = React.lazy(() => import("./components/Profile/Profile"));
const ChatPage = React.lazy(() => import("./pages/ChatPages"));
const FindUsersContainer = React.lazy(() =>
  import("./components/Friends/FindUsersContainer")
);
const Login = React.lazy(() => import("./components/Login/Login"));

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

class App extends React.Component<PropsType> {
  catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {};
  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    // usersAPI.getAuth().then(data => {
    //         if (data.resultCode === 0) {
    //           let {id, email, login} = data.data;
    //           this.props.setAuthUserData(id, email, login);
    //         }
    //     });
  }
  componentWillUnmount() {
    window.removeEventListener(
      "unhandledrejection",
      this.catchAllUnhandledErrors
    );
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Suspense fallback={<Preloader />}>
            <Routes>
              <Route path="/" element={<Navigate to={"/profile"} />} />
              <Route path="/profile/:userId" element={<Profile />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/dialogs" element={<DialogsContainer />} />
              <Route path="/login" element={<Login />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/news" element={<News />} />
              <Route path="/music" element={<Music />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/users" element={<FindUsersContainer />} />
              <Route path="*" element={<div>404 NOT FOUND</div>} />
            </Routes>
          </Suspense>
        </div>
      </div>
    );
  }
}

type MapStateToPropsType = {
  initialized: boolean;
};
type MapDispatchToPropsType = {
  initializeApp: () => void;
};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  initialized: state.app.initialized,
});

let AppContainer = connect(mapStateToProps, { initializeApp })(App);

const MainApp: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
};

export default MainApp;
