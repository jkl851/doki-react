import React from "react";
import "./Toolbar.css";
import { closeNav } from "../../assets/js/offcanvas";
import ChatAlarmPopover from "../../header/ChatAlarmPopover";
import UpdateUserModal from "../../header/UpdateUserModal";
import MemoAlarmPopover from "../../header/MemoAlarmPopover";

export default function Toolbar(props) {
  const { title, leftItems, rightItems } = props;

  return (
    <div className="toolbar">
      {/* <div className="left-items">{leftItems}</div>
      <h1 className="toolbar-title"></h1>
      <div className="right-items"> */}
      {/* <MemoAlarmPopover memoMessages={memoMessages} />
      <ChatAlarmPopover chatMessages={chatMessages} /> */}
      <MemoAlarmPopover />
      <ChatAlarmPopover />
      <UpdateUserModal />
      <a href="#!" className="closebtn" onClick={closeNav}>
        ×
      </a>
      {/* </div> */}
    </div>
  );
}
