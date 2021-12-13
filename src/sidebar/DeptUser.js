import React, { Fragment, useState } from 'react';
import UserImg from '../assets/images/user3.png'
import Modal from 'react-modal';
import axios from "axios";

const DeptUser = ({deptUserNo, name, image, auth, isSidebar, deptUserDatas, setDeptUserDatas}) => {

    const handleImgClick = () => {
        // img는 isSidebar일 때만 onClick시 profile 정보 modal을 띄운다
        isSidebar && setProfileIsOpen(true);
    }

    const handleChange = (e) => {
        // e.target은 onChange 될 때의 element(<input>)이다
        // 해당 input의 id는 string 형태이므로 Number로 바꿔준다
        console.log("deptUserNo : " + deptUserNo)
        console.log("auth : " + e.target.id)

        // 권한 moaal에서 radio 버튼을 클릭할 때마다 SidebarMenu 파일의 deptUserDatas의 상태를 변경한다
        // 원래 데이터들(deptUserDatas)에서 각 user 데이터(data)와 현재 선택한 유저의 deptUSerNo를 비교 후
        // 값이 같으면 해당 유저 auth의 값을 변경한다
        // 값이 다르면 원래 데이터를 그대로 set하는 반복문
        setDeptUserDatas(deptUserDatas.map(data => {
            return data.deptUserNo === deptUserNo ?
                {...data, auth: e.target.id} :
                {...data}
        }))
        console.log("radio 선택...")
    }




    //정우 작업
    //userInfoModal 정보 불러오기
    let no = 3; //ex) 3번 user
    const [userInfoModalData, setUserInfoModalData] = useState({isOpen: false});
    const getUserInfo = async(no) => {        
        await axios.get(`http://localhost:8080/doki/user/findUser/${no}`)
        .then((Response) => {
            setUserInfoModalData({
                no: Response.data.list.no,
                id: Response.data.list.id,
                name: Response.data.list.userName,
                position: Response.data.list.position,
                iamge: Response.data.list.image,
                email: Response.data.list.email,
                comment: Response.data.list.comment,
                isOpen: true
            });        
        })
        .catch((Error) => {console.log(Error)})
}

    return (
        <div>
            {/* src에 image 변수를 이용하여 db 데이터로 적용 시킬 것!! */}
            <img onClick={handleImgClick} src={UserImg} alt="" />
            <label >{name}</label>
            {/* 
                radio의name 속성은 각 user별로 동작해야하기 때문에 name을 고유하게 줘야한다
                user의 id 또는 user의 name을 줘야할 듯?

                    checked는 onChange 속성을 줘야한다
                    그렇지 않으면 고정된 값으로써 다른 값 선택 불가능하다
                    
                    auth 0 : read-only
                    1 : normal
                    2 : admin
                */}
                {/* 불러낸 곳이 sidebar가 아니면 권한 modal이므로 radio 버튼 추가 */}
                {!isSidebar && 
                    <>
                        <input onChange={handleChange} checked={auth === 0} type='radio' id='0' name={name} ></input>
                        <input onChange={handleChange} checked={auth === 1} type='radio' id='1' name={name} ></input>
                        <input onChange={handleChange} checked={auth === 2} type='radio' id='2' name={name} ></input>
                    </>
                }


            {!isSidebar && 
                <>
                    <input onChange={handleChange} checked={auth === '0'} type='radio' id='0' name={name} ></input>
                    <input onChange={handleChange} checked={auth === '1'} type='radio' id='1' name={name} ></input>
                    <input onChange={handleChange} checked={auth === '2'} type='radio' id='2' name={name} ></input>
                </>
            }
        </div>
    );
};

export default DeptUser;
