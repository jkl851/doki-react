import React, {Fragment} from 'react';
import '../assets/css/dropdown.css';

export default function HashDropDownList() {
    return (
    
        <div id="myDropdown" className="dropdown-content">
            <a href="#about">About</a>
            <a href="#base">Base</a>
            <a href="#blog">Blog</a>
            <a href="#contact">Contact</a>
            <a href="#custom">Custom</a>
            <a href="#support">Support</a>
            <a href="#tools">Tools</a>
        </div>

    )
}