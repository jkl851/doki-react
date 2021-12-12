import React from 'react';
import UserImg from '../assets/images/user11.png'

const User = ({no, name, image, isInvited}) => {

    const handleChange = (e) => {
        e.target.id // user의 no
    }

    return (
        <div>
            <img src={UserImg} alt="" />
            <label >{name}</label>
            <input disabled={isInvited} onChange={handleChange} id={no} type='checkbox'></input>
        </div>
    );
};

export default User;