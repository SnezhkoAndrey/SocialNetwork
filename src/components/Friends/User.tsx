import s from "./FindUsers.module.css";
import React from "react";
import userPhoto from "../../Assets/photo.jpg";
import { NavLink } from "react-router-dom";
import { UsersType } from "../../types/types";

type PropsType = {
  followingInProgress: Array<number>;
  unfollow: (userId: number) => void;
  follow: (userId: number) => void;
  user: UsersType;
};

const User: React.FC<PropsType> = (props) => {
  let u = props.user;
  return (
    <div className={s.findUsersItem}>
      <div className={s.userAvatar}>
        <div>
          <NavLink to={"/profile/" + u.id}>
            <img
              src={u.photos.small != null ? u.photos.small : userPhoto}
              className={s.userPhoto}
            />
          </NavLink>
        </div>
        <div className={s.userFollow}>
          {u.followed ? (
            <button
              disabled={props.followingInProgress.some((id) => id === u.id)}
              onClick={() => {
                props.unfollow(u.id);
              }}
            >
              Unfollow
            </button>
          ) : (
            <button
              disabled={props.followingInProgress.some((id) => id === u.id)}
              onClick={() => {
                props.follow(u.id);
              }}
            >
              Follow
            </button>
          )}
        </div>
      </div>
      <div className={s.userInfo}>
        <div className={s.userText}>
          <div className={s.userName}>{u.name}</div>
          <div>{u.status ? u.status : "No status"}</div>
        </div>
        <div className={s.userText}>
          <div className={s.userCityname}>{u.id}</div>
        </div>
      </div>
    </div>
  );
};

export default User;
