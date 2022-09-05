import s from'./FindUsers.module.css';
import React from 'react';
import axios from 'axios';
import userPhoto from '../../Assets/photo.jpg'

const FindUsers = (props) => {

    let getUsers = () => {
        if (props.users.length === 0) {
            //         [
            //             {
            //                 id: 51,
            //                 photoUrl:
            //                   "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGVuc3xlbnwwfHwwfHw%3D&w=1000&q=80",
            //                 followed: false,
            //                 fullName: "Dmitry",
            //                 status: "I am the boss",
            //                 location: { city: "Kyiv", country: "Ukraine" },
            //               },
            //               {
            //                 id: 52,
            //                 photoUrl:
            //                   "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGVuc3xlbnwwfHwwfHw%3D&w=1000&q=80",
            //                 followed: true,
            //                 fullName: "Sasha",
            //                 status: "Not, I am the boss",
            //                 location: { city: "Lviv", country: "Ukraine" },
            //               },
            //               {
            //                 id: 53,
            //                 photoUrl:
            //                   "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGVuc3xlbnwwfHwwfHw%3D&w=1000&q=80",
            //                 followed: false,
            //                 fullName: "Sergey",
            //                 status: "I am lol",
            //                 location: { city: "Wroclaw", country: "Poland" },
            //               },
            // ]
            axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
                props.setUsers(response.data.items);
            });

        }
    }
    return (
        <div className={s.findUsers}>
            <button onClick={getUsers}>Get users</button>
            {props.users.map( u => <div key={u.id}>
                <div className={s.findUsersItem}>
                    <div className={s.userAvatar}>
                        <div>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto} className={s.userPhoto}/>
                        </div>
                        <div className={s.userFollow}>
                            {u.followed 
                            ? <button onClick={() => {props.unfollow(u.id)}}>Unfollow</button> 
                            : <button onClick={() => {props.follow(u.id)}}>Follow</button>}
                        </div>
                    </div>
                    <div className={s.userInfo}>
                        <div className={s.userText}>
                            <div className={s.userName}>{u.name}</div>
                            <div>{"u.status"}</div>
                        </div>
                        <div className={s.userText}>
                            <div className={s.userCityname}>{"u.location.city"}</div>
                            <div>{"u.location.country"}</div>
                        </div>
                    </div>
                </div>
            </div>)}
        </div>
    )
}

// export default FindUsers;