import React, {Fragment, useEffect, useState} from 'react';
import '../assets/css/dropdown.css';
import UserDropDown from './UserDropDown.js';
import PropTypes from "prop-types";


export default function UserDropDownList({ userDropDownDatas, searchUser }) {

    // console.log(hint);


       return (
        <div id="myDropdown2" className="dropdown-content">
            {userDropDownDatas.map(userDropDownData => 
                <UserDropDown 
                    key={userDropDownData.no}
                    no={userDropDownData.no}
                    name={userDropDownData.userName} 
                    hint={userDropDownData.hint}
                    searchUser={searchUser}
                    />)}
        </div>

    )
}

UserDropDownList.propTypes = {
    name: PropTypes.string.isRequired
  };
  