import s from "./Header.module.css";
import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../Assets/Logo.png";
import Avatar from "antd/lib/avatar/avatar";
import Tooltip from "antd/es/tooltip";

type PropsType = {
  isAuth: boolean;
  login: string | null;
  logout: () => void;
};

const Header: React.FC<PropsType> = (props) => {
  return (
    <header className={s.header}>
      <div className={s.logo}>
        <img src={logo} />
        <div>SocialNetwork</div>
      </div>
      <div className={s.loginBlock}>
        {props.isAuth ? (
          <div className={s.loginName}>
            <Tooltip title={props.login} placement="top">
              <Avatar src="https://joeschmoe.io/api/v1/random" />
            </Tooltip>
            {/* <Avatar src="https://joeschmoe.io/api/v1/random" /> */}{" "}
            <button onClick={props.logout}>Logout</button>{" "}
          </div>
        ) : (
          <NavLink to={"/login"}>Login</NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
