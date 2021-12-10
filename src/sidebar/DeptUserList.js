import React from 'react';
import DeptUser from './DeptUser'

const DeptUserList = ({deptUserDatas, isSidebar}) => {
    return (
        <ul>
            {deptUserDatas.map(deptUserData => 
                <DeptUser 
                    key={deptUserData.no}
                    name={deptUserData.user_name + " " + deptUserData.position}
                    auth={deptUserData.auth}
                    isSidebar={isSidebar}
                    />)}
        </ul>
    );
};

export default DeptUserList;