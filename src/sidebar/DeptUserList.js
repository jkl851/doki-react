import React from 'react';
import DeptUser from './DeptUser'

const DeptUserList = ({deptUserDatas, isSidebar, setDeptUserDatas, userDropDownDatas}) => {
    
    return (
        <ul>
            {userDropDownDatas.map(userDropDownData => 
                <DeptUser
                    key={userDropDownData.deptUserNo}
                    deptUserNo={userDropDownData.deptUserNo}
                    name={userDropDownData.userName + " " + userDropDownData.position}
                    image={userDropDownData.image}
                    auth={userDropDownData.auth}
                    isSidebar={isSidebar}
                    deptUserDatas={deptUserDatas}
                    setDeptUserDatas={setDeptUserDatas}
                    />)}
        </ul>
    );
};

export default DeptUserList;