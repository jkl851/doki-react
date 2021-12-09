import React from "react";
import "../assets/css/normaltop.css";
import Modal from "react-modal";
import logo from "../assets/images/white_logo.png";
import { openNav } from "../assets/js/offcanvas";
import ChatAlarmModal from "./ChatAlarmModal";
import MemoAlarmModal from "./MemoAlarmModal";
import UpdateUserModal from "./UpdateUserModal";

Modal.setAppElement("body");

export default function HeaderDiv() {
  return (
    <div id="header_div">
      <div className="topnav" id="myTopnav">
        <img src={logo} style={{ width: "100px", height: "100%" }} />
        <div className="topnav-right" id="icons">
          <MemoAlarmModal />
          <ChatAlarmModal />
          <UpdateUserModal />
          <a onClick={openNav} href="#about">
            채팅
          </a>
        </div>
      </div>
    </div>
  );
}
