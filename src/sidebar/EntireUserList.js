import React from 'react';
import User from './User.js'

const EntireUserList = ({userDatas, deptUserDatas}) => {
    console.log("====== Entire userDatas ======")
    console.log(userDatas)

    // Object.assign([], ...deptUserDatas);
    return (
        <ul > 
            {userDatas.map(userData => 
                <User 
                    key={userData.no}
                    no={userData.no}
                    name={userData.userName + " " + userData.position}
                    image={userData.image}
                    deptUserDatas={deptUserDatas}
                />)}
        </ul>
    );
};

export default EntireUserList;