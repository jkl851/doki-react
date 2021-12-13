import React, {useState, useRef, useEffect} from 'react';
import UserImg from '../assets/images/user11.png'

const User = ({no, name, image, isInvited, flag, setFlag, checkedItems, setCheckedItems, checkedItemHandler}) => {

    const [bChecked, setChecked] = useState(false);

    const checkHandler = ({ target }) => {
        setChecked(!bChecked);
        checkedItemHandler(target.checked, target.id-1 );
    };

    const handleChange = (checked, id) => {
        console.log(checked)
        console.log(no-1)
        console.log(flag)

        if(checked){

        } else {
            
        }
        setFlag(isInvited.map((data, index) => {
            if(data === false) {
                if(index === (no-1)){
                    return !data;
                } else {
                    return data;
                }
            } else {
                return data
            }
        }))
          
        // setFlag(isInvited.map((data, index) => {
        //     if(data === false) {
        //         if(index === (no-1)){
        //             return !data;
        //         } else {
        //             return data;
        //         }
        //     } else {
        //         return data
        //     }
        // }))
    }

    return (
        <div>
            <img src={UserImg} alt="" />
            <label >{name}</label>
            <input checked={bChecked} disabled={isInvited[no-1] === true} onChange={(e) => checkHandler(e)} id={no} type='checkbox'></input>
        </div>
    );
};

export default User;