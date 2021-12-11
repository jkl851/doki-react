import React from 'react';
import User from './User.js'

const EntireUserList = ({userDatas}) => {
    return (
        <ul > 
            {userDatas.map(userData => 
                <User key={userData.no} name={userData.userName + " " + userData.position}/>)}
        </ul>
    );
};

export default EntireUserList;