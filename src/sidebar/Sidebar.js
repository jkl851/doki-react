import React, {useState} from "react";
import SidebarDivision from "./SidebarDivision";
import SidebarMenu from "./SidebarMenu";
import "../assets/css/sidebar.css";

export default function Sidebar({ division, setDivision, allinfo, setAllinfo, hashKeyword, setHashKeyword, deptAuth, setDeptAuth}) {
  
  return (
    <div className="sidebar" style={{ backgroundColor: "#f2f3f5" }}>
      <SidebarDivision division={division} setDivision={setDivision} allinfo={allinfo}/>
      <SidebarMenu division={division} hashKeyword={hashKeyword} setHashKeyword={setHashKeyword} allinfo={allinfo} setAllinfo={setAllinfo} deptAuth={deptAuth} setDeptAuth={setDeptAuth}/>
    </div>
  );
}
