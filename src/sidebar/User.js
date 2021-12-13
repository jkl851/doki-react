import React, {useState, useRef, useEffect} from 'react';
import UserImg from '../assets/images/user11.png'

const User = ({no, name, image, isInvited, flag, setFlag}) => {
    
    console.log(no-1 +' : '  +isInvited[no-1]);

    const handleChange = (e) => {
        setFlag(isInvited.map((data, index) => {
            if(data === false ) {
                if(index === (no-1)){
                    return !data;
                } else {
                    return data;
                }
            } else {
                return data
            }
        }))
    }

    return (
        <div>
            <img src={UserImg} alt="" />
            <label >{name}</label>
            <input checked={isInvited[no-1] === true } disabled={isInvited[no-1] === true} onChange={handleChange} id={no} type='checkbox'></input>
        </div>
    );
};

export default User;