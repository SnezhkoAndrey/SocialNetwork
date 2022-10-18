import s from "./DialogItem.module.css";
import React from "react";
import { NavLink } from "react-router-dom";

type PropsType = {
  id: number;
  name: string;
};

const DialogItem: React.FC<PropsType> = (props) => {
  return (
    <div className={s.dialog}>
      <img src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGVuc3xlbnwwfHwwfHw%3D&w=1000&q=80" />
      <NavLink to={"/dialogs/" + props.id}>{props.name}</NavLink>
    </div>
  );
};

export default DialogItem;
