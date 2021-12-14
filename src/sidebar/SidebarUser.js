import React, {Fragment, useState, useEffect, useRef, useCallback} from 'react';
import '../assets/css/dropdown.css'
import '../assets/css/sidebar.css'
import DeptUserList from './DeptUserList'
import axios from 'axios';

import UserDropDownList from './UserDropDownList';
import {filterFunction, myFunction2, myFunction4} from '../assets/js/dropdown';

export default function SidebarUser({deptUserDatas, setDeptUserDatas}) {

    //1번 부서라고 가정
    let no = 1;
    const [userDropDownDatas, setUserDropDownDatas] = useState([]);

    //초기값 호출 (이름 검색 X)
    // useEffect(async() => {
    //     await axios.get(`http://localhost:8080/doki/user/getUserList/${no}`)
    //     .then((Response) => {
    //         setUserDropDownDatas(
    //             Response.data
    //         );
    //     })
    //     .catch((Error) => {console.log(Error)})
    // }, [])


    //검색을 입력하고 땠을때 이벤트 발생 (검색 키워드 적용)
    const onChangeSearchKey = async(e) => {
        await axios.get(`http://localhost:8080/doki/user/getUserList/${no}`, {
            params: {
                hint: e.target.value
            }
        })
        .then((Response) => {
            setDeptUserDatas(
                Response.data
            );
        })
        .catch((Error) => {console.log(Error)})
    }

    return (
        <>
            <div className="dropdown">
                <input type="text" placeholder="이름" id="myInput2"
                    // onMouseUp={myFunction2} 
                    // onMouseDown={myFunction4}
                    onKeyUp={onChangeSearchKey}
                    autoComplete='off'
                    />  
                {/* <UserDropDownList 
                    // deptUserDatas={deptUserDatas}
                    userDropDownDatas={userDropDownDatas}
                    searchUser={searchUser}
                    /> */}
            </div>
            <div className="userList" id="participant">
                    <DeptUserList 
                        deptUserDatas={deptUserDatas}
                        userDropDownDatas={userDropDownDatas}
                        isSidebar={true} />
            </div>
        </>
        
        
    )
}

