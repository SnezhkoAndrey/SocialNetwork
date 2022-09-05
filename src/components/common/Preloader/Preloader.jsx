import React from 'react';
import preloader from '../../../Assets/load.gif'

const Preloader = (props) => {
    return (
        <div>
            <img src={preloader} style={ {width: '100px', height: '100px'} } />
        </div>
    )
}

export default Preloader;