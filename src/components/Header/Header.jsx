import s from './Header.module.css';
import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../Assets/Logo.png';

const Header = (props) => {
    return (
        <header className={s.header}>
        <div className={s.logo}>
          <img src={logo} />
          <div>SocialNetwork</div>
        </div>  
        <div className={s.loginBlock}>
          {props.isAuth 
          ? <div className={s.loginName}>{props.login} - <button onClick={props.logout}>Logout</button> </div>
            :<NavLink to={'/login'}>Login</NavLink>}
        </div>
      </header>
    );
}

export default Header;