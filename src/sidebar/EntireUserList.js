import React from 'react';
import User from './User.js'

const EntireUserList = ({userDatas, deptUserDatas, isInvited }) => {
    console.log("====== Entire userDatas ======")
    console.log(userDatas)

    // console.log("====== test ======")
    console.log(...deptUserDatas);
    // console.log("111")
    // console.log(Object.assign({}, deptUserDatas));
    
    // Object.assign({}, deptUserDatas).map(deptUserdata => {
    //     deptUserdata.no ===
    // });
    

    // console.log(JSON.stringify(deptUserDatas));
    // console.log(obj)
    

    console.log(isInvited);
    return (
        <ul > 
            {userDatas.map((userData, index) => 
                <User 
                    key={userData.no}
                    no={userData.no}
                    name={userData.userName + " " + userData.position}
                    image={userData.image}
                    isInvited={isInvited[index]}
                />)}
        </ul>
    );
};

export default EntireUserList;