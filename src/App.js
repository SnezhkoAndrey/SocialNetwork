import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
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
import store from "./redux/redux-store";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";

// import DialogsContainer from "./components/Dialogs/DialogsContainer";
const DialogsContainer = React.lazy(() =>
  import("./components/Dialogs/DialogsContainer")
);
// import ProfileContainer from "./components/Profile/ProfileContainer";
const ProfileContainer = React.lazy(() =>
  import("./components/Profile/ProfileContainer")
);
const FindUsersContainer = React.lazy(() =>
  import("./components/Friends/FindUsersContainer")
);
const Login = React.lazy(() => import("./components/Login/Login"));

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
    // usersAPI.getAuth().then(data => {
    //         if (data.resultCode === 0) {
    //           let {id, email, login} = data.data;
    //           this.props.setAuthUserData(id, email, login);
    //         }
    //     });
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
              <Route path="/profile/:userId" element={<ProfileContainer />} />
              <Route path="/profile" element={<ProfileContainer />} />
              <Route path="/dialogs" element={<DialogsContainer />} />
              <Route path="/login" element={<Login />} />
              <Route path="/news" element={<News />} />
              <Route path="/music" element={<Music />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/users" element={<FindUsersContainer />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

let AppContainer = connect(mapStateToProps, { initializeApp })(App);

const MainApp = (props) => {
  return (
    <HashRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </HashRouter>
  );
};

export default MainApp;
