import React from 'react';
import SearchImg from '../assets/images/Search.png'

const User = ({name}) => {
    return (
        <div>
            <img src={SearchImg} alt="" />
            <label >{name}</label>
            <input id={name} type='checkbox'></input>
        </div>
    );
};

export default User;