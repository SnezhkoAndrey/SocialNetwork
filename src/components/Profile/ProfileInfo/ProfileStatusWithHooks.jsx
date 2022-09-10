import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const ProfileStatusWithHooks = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);
    // let editMode = stateWithSetState[0];
    // let setEditMode = stateWithSetState[1];

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivatedEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

        return ( 
            <div> Status: 
                { !editMode &&
                    <div>
                        {props.isOwner ? <span onClick={activateEditMode}>{props.status || "________"}</span> : <div>{props.status || "________"}</div>}
                    </div>}
                {editMode && 
                    <div>
                        <input onChange={onStatusChange} 
                            autoFocus={true} 
                            onBlur={deactivatedEditMode}
                            value={status} />
                    </div>}
            </div> )
}

export default ProfileStatusWithHooks;