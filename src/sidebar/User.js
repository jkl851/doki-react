import React, {useState, useRef, useEffect} from 'react';
import UserImg from '../assets/images/user11.png'

const User = ({no, name, image, isInvited, checkedItemHandler}) => {

    const [bChecked, setChecked] = useState(false);

    const checkHandler = ({ target }) => {
        setChecked(!bChecked);
        checkedItemHandler(target.checked, target.id-1 );
    };

    return (
        <div>
            <img src={UserImg} alt="" />
            <label >{name}</label>
            <input checked={bChecked} disabled={isInvited[no-1] === true} onChange={(e) => checkHandler(e)} id={no} type='checkbox'></input>
        </div>
    );
};

export default User;