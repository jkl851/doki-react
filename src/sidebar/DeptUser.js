import React from 'react';
import SearchImg from '../assets/images/Search.png'

const DeptUser = ({name}) => {
    return (
        <div>
            <img src={SearchImg} alt="" />
            <label >{name}</label>
            {/* 
                radio name은 각 user별로 동작해야하기 때문에 name을 고유하게 줘야한다
                user의 id 또는 user의 name을 줘야할 듯?
             */}
            <input type='radio' id='1' name={name} ></input>
            <input type='radio' id='2' name={name} ></input>
            <input type='radio' id='3' name={name} ></input>
        </div>
    );
};

export default DeptUser;