import React, {Fragment} from 'react';
import '../assets/css/dropdown.css'
import '../assets/css/sidebar.css'
import UserDropDownList from './UserDropDownList';
import DeptUserList from './DeptUserList'

import {filterFunction, myFunction2, myFunction4} from '../assets/js/dropdown';

export default function SidebarUser({deptUserDatas}) {
    return (
        <>
            <div className="dropdown">
                <input type="text" placeholder="이름" id="myInput2" onKeyUp={filterFunction} onMouseUp={myFunction2} onMouseDown={myFunction4}/>  
                <UserDropDownList />
            </div>
            <div className="userList" id="participant">
                    <DeptUserList deptUserDatas={deptUserDatas} isSidebar={true} />
            </div>
        </>
        
        
    )
}

