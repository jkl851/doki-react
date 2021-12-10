import React, { useEffect, useState } from "react";
import HeaderDiv from "./header/HeaderDiv";
//import Maincontent from "./mainContent/Maincontent";
import Sidebar from "./sidebar/Sidebar";
import SideChat from "./sidechat/SideChat";
import Memo from "./mainContent/memo";

export default function Doki() {

  return (
    <div id="whole_wrapper">
      <HeaderDiv />
      <div id="main_sidebar">
        <Sidebar />
      </div>

      <div className="main_content">
          <Memo />
      </div>

      <SideChat />
    </div>
  );
}
