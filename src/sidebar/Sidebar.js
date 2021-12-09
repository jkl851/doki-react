import React from 'react';
import SidebarDivision from './SidebarDivision'
import SidebarMenu from './SidebarMenu'
import '../assets/css/sidebar.css'

export default function Sidebar() {
    return (
        <div className="sidebar" style={{backgroundColor: '#f2f3f5'}}>
            <SidebarDivision />
            <SidebarMenu />
        </div> 
    );
}

