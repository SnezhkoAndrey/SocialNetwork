import s from "./Post.module.css";
import React from "react";

type PropsType = {
  message: string;
  likesCount: number;
};

const Post: React.FC<PropsType> = (props) => {
  return (
    <div className={s.item}>
      <img src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGVuc3xlbnwwfHwwfHw%3D&w=1000&q=80" />
      {props.message}
      <div>
        <div>Like: {props.likesCount} </div>
      </div>
    </div>
  );
};

export default Post;
