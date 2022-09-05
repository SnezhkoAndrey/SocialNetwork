import s from'./Navbar.module.css';
import React from 'react';
import {NavLink} from 'react-router-dom';
import profile from '../../Assets/nav icon profile.png';
import dialogs from '../../Assets/nav icon messages.png';
import friends from '../../Assets/nav icon friends.png';
import news from '../../Assets/nav icon news.png';
import music from '../../Assets/nav icon music.png';
import settings from '../../Assets/nav icon setting.png';

// let s = {
//     'nav': 'Navbar_nav__1fp7n',
//     'item': 'Navbar_item__Q8Nvt',
// }

const getActiveClass = (isActive, s) => {
  const linkClasses = [s.itemLink];
  if (isActive) linkClasses.push(s.active);
  
  return linkClasses.join(" "); 
}

const Navbar = (props) => {
    return (
          <nav className={s.nav}>
            <div className={s.item}>
              <img src={profile} />
              <NavLink to="/profile" className={({ isActive }) => getActiveClass(isActive, s)}>Profile</NavLink>
            </div>
            <div className={s.item}>
              <img src={dialogs} />
              <NavLink to="/dialogs" className={({ isActive }) => getActiveClass(isActive, s)}>Messages</NavLink>
            </div>
            <div className={`${s.item } ${s.friends}`}>
              <img src={friends} />
              <NavLink to="/users" className={({ isActive }) => getActiveClass(isActive, s)}>Find users</NavLink>
            </div>
            <div className={s.item}>
              <img src={news} />
              <NavLink to="/news" className={({ isActive }) => getActiveClass(isActive, s)}>News</NavLink>
            </div>
            <div className={s.item}>
              <img src={music} />
              <NavLink to="/music" className={({ isActive }) => getActiveClass(isActive, s)}>Music</NavLink>
            </div>
            <div className={s.item}>
              <img src={settings} />
              <NavLink to="/settings" className={({ isActive }) => getActiveClass(isActive, s)}>Settings</NavLink>
            </div>
        </nav> )
}

export default Navbar;