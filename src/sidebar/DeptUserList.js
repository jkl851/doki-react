import React from 'react';
import DeptUser from './DeptUser'

const DeptUserList = ({deptUserDatas, isSidebar, setDeptUserDatas, keyword, allinfo}) => {
    
    return (
        <ul>
            {deptUserDatas
                .filter(deptUserData => deptUserData.userName.indexOf(keyword) !== -1 || deptUserData.position.indexOf(keyword) !== -1)
                .map(deptUserData =>
                    <DeptUser
                        key={deptUserData.deptUserNo}
                        no={deptUserData.no}
                        deptUserNo={deptUserData.deptUserNo}
                        name={deptUserData.userName + " " + deptUserData.position}
                        image={deptUserData.image}
                        auth={deptUserData.auth}
                        isSidebar={isSidebar}
                        deptUserDatas={deptUserDatas}
                        setDeptUserDatas={setDeptUserDatas}
                        allinfo={allinfo}
                        />)}
        </ul>
    );
};

export default DeptUserList;