import React, { Fragment, useState } from 'react';
import UserImg from '../assets/images/user3.png'

const DeptUser = ({name, auth, isSidebar}) => {
    // 추후 profile modal을 위한 state
    const [profileIsOpen, setProfileIsOpen] = useState(false);
    const [radioAuth, setRadioAuth] = useState(auth);

    const imgClick = () => {
        {/* img는 isSidebar일 때만 onClick시 profile 정보 modal을 띄운다 */}
        isSidebar && setProfileIsOpen(true);
    }

    const handleChange = (e) => {
        // e.target은 onChange 될 때의 element(<input>)이다
        // 해당 input의 id는 string 형태이므로 Number로 바꿔준다
        setRadioAuth(Number(e.target.id))
        console.log("radio 선택...")
    }
    return (
        <div>
            <img onClick={imgClick} src={UserImg} alt="" />
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
            {!isSidebar && 
                <>
                    <input onChange={handleChange} checked={radioAuth === 0} type='radio' id='0' name={name} ></input>
                    <input onChange={handleChange} checked={radioAuth === 1} type='radio' id='1' name={name} ></input>
                    <input onChange={handleChange} checked={radioAuth === 2} type='radio' id='2' name={name} ></input>
                </>
            }
        </div>
    );
};

export default DeptUser;
