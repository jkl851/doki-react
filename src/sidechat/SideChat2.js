import React from "react";
import "../assets/css/offcanvas2.css";

import MessageList from "../MessageList";

export default function SideChat2() {
  return (
    <div id="mySidenav2" className="sidenav2" style={{}}>
      <MessageList />
    </div>
  );
}
