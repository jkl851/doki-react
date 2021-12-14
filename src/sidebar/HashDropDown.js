import React, { useState } from 'react';
import PropTypes from "prop-types";


export default function HashDropDown({name, searchHash}) {
    // const [hint, setHint] = useStat

    // console.log(name)

    return (
        <a href="#" onClick={() => searchHash(name)}># {name}</a>

    )
}

HashDropDown.propTypes = {
    name: PropTypes.string.isRequired
  };
  