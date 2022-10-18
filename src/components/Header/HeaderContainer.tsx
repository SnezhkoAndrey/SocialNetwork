import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { logout } from "../../redux/auth-reducer";
import { AppStateType } from "../../redux/redux-store";
import { compose } from "redux";

type MapStateToPropsType = {
  isAuth: boolean;
  login: string | null;
};

type MapDispatchToPropsType = {
  logout: () => void;
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

const HeaderContainer: React.FC<PropsType> = (props) => {
  return <Header {...props} />;
};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});

export default compose<React.ComponentType>(
  connect<
    MapStateToPropsType,
    MapDispatchToPropsType,
    /*OwnPropsType*/ null,
    AppStateType
  >(mapStateToProps, { logout })
)(HeaderContainer);
