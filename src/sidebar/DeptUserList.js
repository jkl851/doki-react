import React from 'react';
import DeptUser from './DeptUser'

const DeptUserList = ({deptUserDatas, isSidebar, setDeptUserDatas, keyword}) => {
    
    return (
        <ul>
            {deptUserDatas
                .filter(deptUserData => deptUserData.userName.indexOf(keyword) !== -1 || deptUserData.position.indexOf(keyword) !== -1)
                .map(deptUserData => 
                    <DeptUser
                        key={deptUserData.deptUserNo}
                        deptUserNo={deptUserData.deptUserNo}
                        name={deptUserData.userName + " " + deptUserData.position}
                        image={deptUserData.image}
                        auth={deptUserData.auth}
                        isSidebar={isSidebar}
                        deptUserDatas={deptUserDatas}
                        setDeptUserDatas={setDeptUserDatas}
                        />)}
        </ul>
    );
};

export default DeptUserList;