import React from "react";
import "./Toolbar.css";
import { closeNav } from "../../assets/js/offcanvas";

export default function Toolbar(props) {
  const { title, leftItems, rightItems } = props;
  return (
    <div className="toolbar">
      <div className="left-items">{leftItems}</div>
      <h1 className="toolbar-title">{title}</h1>
      <div className="right-items">
        <a href="#!" className="closebtn" onClick={closeNav}>
          ×
        </a>
      </div>
    </div>
  );
}
