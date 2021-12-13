import React from 'react';
import DeptUser from './DeptUser'

const DeptUserList = ({deptUserDatas, isSidebar, setDeptUserDatas}) => {
    // console.log("====== DeptUserDatas ======")
    // console.log(deptUserDatas)

    
    return (
        <ul>
            {deptUserDatas.map(deptUserData => 
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