import React from 'react';
import './Alert.css';

export function Alert(props) {
    const { message, handleClick } = props;

    return (
        <div className='popup'>
            <span class="close" onClick={handleClick}>&times;</span>
            <p>{ message }</p>
        </div>
    );
};
