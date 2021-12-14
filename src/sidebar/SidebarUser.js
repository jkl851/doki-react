import React from 'react';
import '../assets/css/dropdown.css'
import '../assets/css/sidebar.css'
import DeptUserList from './DeptUserList'

export default function SidebarUser({deptUserDatas, setDeptUserDatas, keyword, setKeyword}) {

    //검색을 입력하고 땠을때 이벤트 발생 (검색 키워드 적용)
    const onChangeSearchKey = async(e) => {
        setKeyword(e.target.value)
    }

    return (
        <>
            <div className="dropdown">
                <input type="text" placeholder="이름" id="myInput2"
                    onChange={onChangeSearchKey}
                    autoComplete='off'
                    value={keyword}
                    />  
            </div>
            <div className="userList" id="participant">
                    <DeptUserList 
                        deptUserDatas={deptUserDatas}
                        isSidebar={true} 
                        keyword={keyword}/>
            </div>
        </>
        
        
    )
}

