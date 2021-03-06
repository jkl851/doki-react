import React, {Fragment} from 'react';
import HashDropDown from './HashDropDown'
import PropTypes from "prop-types";
import '../assets/css/dropdown.css';

export default function HashDropDownList({hashDropDownDatas, searchHash}) {
    return (
    
        <div id="myDropdown" className="dropdown-content">
            {hashDropDownDatas.map(data =>
                <HashDropDown
                    key={data.hashNo}
                    hashName={data.hashName}
                    searchHash={searchHash}
                />)}

        </div>

    )
}

//상위 component로 이동 prop 사용
HashDropDownList.propTypes = {
    name: PropTypes.string.isRequired
  };
  
//default prop
HashDropDownList.defaultProps = {
    name: ''
}