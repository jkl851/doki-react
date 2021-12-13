import React, {Fragment, useState, useEffect, useRef, useCallback} from 'react';
import '../assets/css/dropdown.css'
import '../assets/css/sidebar.css'
import UserDropDownList from './UserDropDownList';
import DeptUserList from './DeptUserList'
import axios from 'axios';

import {filterFunction, myFunction2, myFunction4} from '../assets/js/dropdown';

export default function SidebarUser({deptUserDatas}) {

    //1번 부서라고 가정
    let no = 1;
    const [userDropDownDatas, setUserDropDownDatas] = useState([]);

    //초기값 호출 (이름 검색 X)
    useEffect(async() => {
        await axios.get(`http://localhost:8080/doki/user/getUserList/${no}`)
        .then((Response) => {
            setUserDropDownDatas(
                Response.data
            );
        })
        .catch((Error) => {console.log(Error)})
    }, [])


    //검색을 입력하고 땠을때 이벤트 발생 (검색 키워드 적용)
    const onChangeSearchKey = async(e) => {
        await axios.get(`http://localhost:8080/doki/user/getUserList/${no}`, {
            params: {
                hint: e.target.value
            }
        })
        .then((Response) => {
            setUserDropDownDatas(
                Response.data
            );
        })
        .catch((Error) => {console.log(Error)})
    }


    //Dropdown 클릭시 해당 데이터 입력
    // const [hint, setHint] = useState(null);
    // const searchUser = (name) => {
    //     console.log(name + "이름!@!#!");
    //     setHint({hint: name});
    // };


    //외부클릭 감지
    const outsideRef = useOutSideRef(null);
    function useOutSideRef() {
        const ref= useRef(null);

        useEffect(() => {
            function handelClickOutside(event) {
                if(ref.current && !ref.current.contains(event.target)) {
                    // console.log('외부 클릭 감지');
                }
            }
            document.addEventListener('click', handelClickOutside);

            return () => {
                document.removeEventListener('click', handelClickOutside);
            };
        });

        return ref;
    }
    
 

    return (
        <>
            <div className="dropdown">
                <input type="text" placeholder="이름" id="myInput2" ref={outsideRef} 
                    onMouseUp={myFunction2} 
                    onMouseDown={myFunction4}
                    onKeyUp={onChangeSearchKey}
                    autocomplete='off'
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

