import React, {useState, useRef, useEffect} from 'react';

const User = ({no, name, image, isInvited, checkedItemHandler}) => {
    const UserImg= "https://randomuser.me/api/portraits/men/" + (no) + ".jpg"  

    const [bChecked, setChecked] = useState(false);

    const checkHandler = ({ target }) => {
        setChecked(!bChecked);
        checkedItemHandler(target.checked, target.id-1 );
    };

    return (
        <div>
            <img style={{borderRadius:"100px", width:"40px", height:"40px"}} src={UserImg} alt=""/>
            <label >{name}</label>
            <input checked={bChecked} disabled={isInvited[no-1] === true} onChange={(e) => checkHandler(e)} id={no} type='checkbox'></input>
        </div>
    );
};

export default User;