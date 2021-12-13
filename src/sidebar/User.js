import React from 'react';
import UserImg from '../assets/images/user11.png'

const User = ({no, name, image, isInvited, setIsInvited}) => {
    
    const handleChange = (e) => {
        // setIsInvited(() => {
        //     return isInvited[no] = !isInvited[no];
        // })

        
    }

    return (
        <div>
            <img src={UserImg} alt="" />
            <label >{name}</label>
            <input disabled={isInvited[no]} onChange={handleChange} id={no} type='checkbox'></input>
        </div>
    );
};

export default User;