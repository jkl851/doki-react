import React, { useState } from 'react';
import PropTypes from "prop-types";


export default function HashDropDown({hashName, searchHash}) {
    // const [hint, setHint] = useStat

    // console.log(name)

    return (
        <a href="#" onClick={() => searchHash(hashName)}># {hashName}</a>

    )
}

HashDropDown.propTypes = {
    hashName: PropTypes.string.isRequired
  };
  