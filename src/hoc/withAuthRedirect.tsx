import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { AppStateType } from "../redux/redux-store";

let mapStateToPropsForRedirect = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
});

type PropsType = {
  isAuth: boolean;
};

export function withAuthRedirect<WCP extends JSX.IntrinsicAttributes>(
  WrappedComponent: React.ComponentType<WCP>
) {
  const RedirectComponent: React.FC<PropsType> = (props) => {
    let { isAuth, ...restProps } = props;
    if (!isAuth) return <Navigate to={"/login"} />;

    return <WrappedComponent {...(restProps as WCP)} />;
  };

  let ConnectedAuthRedirectComponent = connect<
    PropsType,
    {},
    WCP,
    AppStateType
  >(mapStateToPropsForRedirect)(RedirectComponent);

  return ConnectedAuthRedirectComponent;
}
