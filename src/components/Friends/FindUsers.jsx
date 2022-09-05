import s from'./FindUsers.module.css';
import React from 'react';
import Paginator from '../common/Preloader/Paginator/Paginator';
import User from './User';

const FindUsers = (props) => {
    return (
        <div className={s.findUsers}>
                <Paginator onPageChanged={props.onPageChanged}
                    currentPage={props.currentPage}
                    totalUsersCount={props.totalUsersCount}
                    pageSize={props.pageSize} />
                {props.users.map( user => 
                    <User key={user.id}
                        followingInProgress={props.followingInProgress}
                        unfollow={props.unfollow}
                        follow={props.follow}
                        user={user} /> 
                )}
        </div>
    )
}

export default FindUsers;