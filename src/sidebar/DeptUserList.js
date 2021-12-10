import React from 'react';
import DeptUser from './DeptUser'

const DeptUserList = ({deptUserDatas}) => {
    return (
        <ul>
            {deptUserDatas.map(deptUserData => 
                <DeptUser key={deptUserData.no} name={deptUserData.user_name + " " + deptUserData.position}/>)}
        </ul>
    );
};

export default DeptUserList;