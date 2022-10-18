import s from "./FindUsers.module.css";
import React, { useEffect } from "react";
import Paginator from "../common/Preloader/Paginator/Paginator";
import User from "./User";
import UserSearchForm from "./UserSearchForm";
import {
  FilterType,
  getUsers,
  follow,
  unfollow,
} from "../../redux/users-reducer";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentPage,
  getFollowingInProgress,
  getPageSize,
  getTotalUsersCount,
  getUsersFilter,
  getUsersSelector,
} from "../../redux/users-selectors";
import { AnyAction } from "redux";
import { useNavigate, useSearchParams } from "react-router-dom";

export const FindUsers: React.FC = (props) => {
  const totalUsersCount = useSelector(getTotalUsersCount);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const filter = useSelector(getUsersFilter);
  const users = useSelector(getUsersSelector);
  const followingInProgress = useSelector(getFollowingInProgress);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    navigate({
      pathname: "/users",
      search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`,
    });
  }, [filter, currentPage]);

  useEffect(() => {
    const result: any = {};
    // @ts-ignore
    for (const [key, value] of searchParams.entries()) {
      let value2: any = +value;
      if (isNaN(value2)) {
        value2 = value;
      }
      if (value === "true") {
        value2 = true;
      } else if (value === "false") {
        value2 = false;
      }
      result[key] = value2;
    }

    let actualPage = result.page || currentPage;
    let term = result.term || filter.term;

    let friend = result.friend || filter.friend;
    if (result.friend === false) {
      friend = result.friend;
    }

    const actualFilter = { friend, term };
    dispatch(
      (getUsers(actualPage, pageSize, actualFilter) as unknown) as AnyAction
    );
  }, []);

  const onPageChanged = (pageNumber: number) => {
    dispatch((getUsers(pageNumber, pageSize, filter) as unknown) as AnyAction);
  };

  const onFilterChanged = (filter: FilterType) => {
    dispatch((getUsers(1, pageSize, filter) as unknown) as AnyAction);
  };

  const followUser = (userId: number) => {
    dispatch((follow(userId) as unknown) as AnyAction);
  };

  const unfollowUser = (userId: number) => {
    dispatch((unfollow(userId) as unknown) as AnyAction);
  };

  return (
    <div className={s.findUsers}>
      <div>
        <UserSearchForm onFilterChanged={onFilterChanged} />
      </div>
      <Paginator
        onPageChanged={onPageChanged}
        currentPage={currentPage}
        totalUsersCount={totalUsersCount}
        pageSize={pageSize}
      />
      {users.map((user) => (
        <User
          key={user.id}
          followingInProgress={followingInProgress}
          unfollow={unfollowUser}
          follow={followUser}
          user={user}
        />
      ))}
    </div>
  );
};
