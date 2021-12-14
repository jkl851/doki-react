import React, { useState } from 'react';
import PropTypes from "prop-types";


export default function UserDropDown({name, searchUser}) {
    // const [hint, setHint] = useState(null);
    // const searchUser = (name) => {
    //     console.log(name + " 유저 클릭");
    //     setHint({hint: name})
    // } 


    return (
        <a href="#" onClick={() => searchUser(name)}>{name}</a>

    )
}

UserDropDown.propTypes = {
    name: PropTypes.string.isRequired
  };
  