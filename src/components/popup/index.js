import React from 'react';
import classes from './popup.scss';

const Popup = props => {
    return(
        <div className={classes.wrapper}>
            <div className={classes.closeIcon} onClick={props.onClose}>
                <i className='fas fa-times-circle'></i>
            </div>
            {props.children}
        </div>
    );
};

export default Popup;