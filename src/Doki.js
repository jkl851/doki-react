import React from "react";
import HeaderDiv from "./header/HeaderDiv";
import Maincontent from "./mainContent/Maincontent";
import Sidebar from "./sidebar/Sidebar";
import SideChat from "./sidechat/SideChat";

export default function Doki() {
  return (
    <div id="whole_wrapper">
      <HeaderDiv />
      <div id="main_sidebar">
        <Sidebar />
      </div>

      <Maincontent />

      <SideChat />
    </div>
  );
}
