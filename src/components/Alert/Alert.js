import React from 'react';
import styled from 'styled-components';

const PopUp = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 100px;
    border: 2px solid #fdc605;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
    position: absolute;
    right: 25%;
    top: 10px;
    height: 200px;
    width: 50%;
    background:#fff;
`;

const Message = styled.p`
    margin: 0;
    text-align: center;
    width: 90%;
`;

const CloseIcon = styled.span`
    font-size: 1.5em;
    cursor: pointer;
    position: absolute;
    right: 14px;
    top: 5px;
`;

export function Alert(props) {
    const { message, handleClick } = props;

    return (
        <PopUp>
            <CloseIcon onClick={handleClick} aria-label="close popup">&times;</CloseIcon>
            <Message>{ message }</Message>
        </PopUp>
    );
};
