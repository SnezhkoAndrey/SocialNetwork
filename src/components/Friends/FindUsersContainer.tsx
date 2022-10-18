import React from "react";
import { FindUsers } from "./FindUsers";
import { useSelector } from "react-redux";
import Preloader from "../common/Preloader/Preloader";
import { getIsFetching } from "../../redux/users-selectors";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

// type OwnPropsType = {props which were passed through attributes (Own props)};

type PropsType = {};

const FindUsersContainer: React.FC<PropsType> = (props) => {
  const isFetching = useSelector(getIsFetching);

  return (
    <>
      {isFetching ? <Preloader /> : null}
      <FindUsers />
    </>
  );
};

export default compose<React.ComponentType>(withAuthRedirect)(
  FindUsersContainer
);
