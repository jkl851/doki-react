import React, {Fragment} from 'react';
import HashDropDown from './HashDropDown'
import PropTypes from "prop-types";
import '../assets/css/dropdown.css';

export default function HashDropDownList({hashDropDownDatas, searchHash}) {
    return (
    
        <div id="myDropdown" className="dropdown-content">
            {hashDropDownDatas.map(hashDropDownData =>
                <HashDropDown
                    key={hashDropDownData.no}
                    name={hashDropDownData.name}
                    searchHash={searchHash}
                />)}

        </div>

    )
}

HashDropDownList.propTypes = {
    name: PropTypes.string.isRequired
  };
  