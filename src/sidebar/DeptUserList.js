import React from 'react';
import DeptUser from './DeptUser'

const DeptUserList = ({deptUserDatas}) => {
    return (
        <ul>
            {deptUserDatas.map(deptUserData => 
                <DeptUser name={deptUserData.user_name + " " + deptUserData.position}/>)}
        </ul>
    );
};

export default DeptUserList;