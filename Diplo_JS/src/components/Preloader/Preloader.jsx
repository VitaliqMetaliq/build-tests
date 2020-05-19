import React from 'react';
import preloader from '../../assets/img/preloader.gif';

const Preloader = (props) => {
    return(
        <img src={preloader} alt='preloader' className={"preloader"}/>
    );
}

export default Preloader;