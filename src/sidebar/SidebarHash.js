import React, {Fragment} from 'react';
import '../assets/css/dropdown.css';
import HashDropDownList from './HashDropDownList';

import {filterFunction, myFunction, myFunction3} from '../assets/js/dropdown';

export default function SidebarHash() {

    return (
        <div className="dropdown">
            <input type="text" placeholder="#Hash Tag" id="myInput" onKeyUp={filterFunction} onMouseUp={myFunction} onMouseDown={myFunction3}/>  
            <HashDropDownList />
        </div>
    )
}