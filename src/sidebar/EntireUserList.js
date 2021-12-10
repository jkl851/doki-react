import React from 'react';
import User from './User.js'

const EntireUserList = ({userDatas}) => {
    console.log(userDatas);
    return (
        <ul > 
            {userDatas.map(userData => 
                <User key={userData.no} name={userData.user_name + " " + userData.position}/>)}
        </ul>
    );
};

export default EntireUserList;