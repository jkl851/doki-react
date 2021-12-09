import React, { Fragment } from "react";
import "../assets/css/dropdown.css";
import UserDropDownList from "./UserDropDownList";

import {
  filterFunction,
  myFunction2,
  myFunction4,
} from "../assets/js/dropdown";

export default function SidebarUser() {
  return (
    <div className="dropdown">
      <input
        type="text"
        placeholder="이름"
        id="myInput2"
        onKeyUp={filterFunction}
        onMouseUp={myFunction2}
        onMouseDown={myFunction4}
      />
      <UserDropDownList />

      <div id="participant">
        <div style={{ height: "100%" }}></div>
      </div>
    </div>
  );
}
