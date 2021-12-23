import React from "react";
import SidebarDivision from "./SidebarDivision";
import SidebarMenu from "./SidebarMenu";
import "../assets/css/sidebar.css";

export default function Sidebar({ division, setDivision, allinfo, hashKeyword, setHashKeyword }) {
  //console.log("division => " + division);

  return (
    <div className="sidebar" style={{ backgroundColor: "#f2f3f5" }}>
<<<<<<< HEAD
      <SidebarDivision division={division} setDivision={setDivision} allinfo={allinfo}/>
      <SidebarMenu division={division} hashKeyword={hashKeyword} setHashKeyword={setHashKeyword} />
=======
      <SidebarDivision division={division} allinfo={allinfo} setDivision={setDivision}/>
      <SidebarMenu division={division} />
>>>>>>> 67fb3bbe6d37f5d5ea107861feaa78a2104220bf
    </div>
  );
}
