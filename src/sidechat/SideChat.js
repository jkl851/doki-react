import React from "react";
import "../assets/css/offcanvas.css";

import ConversationList from "../ConversationList";

export default function SideChat() {
  return (
    <div id="mySidenav" className="sidenav" style={{}}>
      <ConversationList />
    </div>
  );
}
