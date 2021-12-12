import React from 'react';
import UserImg from '../assets/images/user11.png'

const User = ({no, name, image, deptUserDatas}) => {


    const handleChange = (e) => {
        
    }

    return (
        <div>
            <img src={UserImg} alt="" />
            <label >{name}</label>
            <input onChange={handleChange} id={no} type='checkbox'></input>
        </div>
    );
};

export default User;