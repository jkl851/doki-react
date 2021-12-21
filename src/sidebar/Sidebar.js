import React from "react";
import SidebarDivision from "./SidebarDivision";
import SidebarMenu from "./SidebarMenu";
import "../assets/css/sidebar.css";

export default function Sidebar({ division, setDivision, allinfo }) {
  //console.log("division => " + division);

  return (
    <div className="sidebar" style={{ backgroundColor: "#f2f3f5" }}>
      <SidebarDivision division={division} setDivision={setDivision} allinfo={allinfo}/>
      <SidebarMenu division={division} />
    </div>
  );
}
