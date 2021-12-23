import React, { useState } from 'react';
import PropTypes from "prop-types";


export default function HashDropDown({hashName, searchHash}) {
 
    return (
        <a href="#" onClick={() => searchHash(hashName)}># {hashName}</a>

    )
}

HashDropDown.propTypes = {
    hashName: PropTypes.string.isRequired
  };
  