import s from './Message.module.css';
import React from 'react';
import {NavLink} from 'react-router-dom';

const Message = (props) => {
    return (
        <div className={s.message}>
            {props.message}
        </div>
    )
}

export default Message;