import axios from "axios";
import React, { Fragment } from "react";
import "../../src/assets/css/sidedivision.css";
import Group from "../assets/images/Group.png";
import Server1 from "../assets/images/Server1.png";
import Server2 from "../assets/images/Server2.png";
import Server3 from "../assets/images/Server3.png";
import Server4 from "../assets/images/Server4.png";
import Server5 from "../assets/images/Server5.png";

export default function SidebarDivision({ setDivision }) {
  return (
    // 여기도 컴포넌트화 필요

    <div
      className="sidebar_division"
      style={{
        display: "inline-block",
        width: "23%",
        minWidth: "20%",
        backgroundColor: "#e9e9e9",
        float: "left",
        height: "100%",
        overflowY: "auto",
      }}
    >
      <br />
      <div>
        <img
          style={{ width: "50px", height: "50px", margin: "3px 5px 3px 5px" }}
          src={Group}
          alt="1"
          onClick={() => {setDivision(1)}}
        />
      </div>
      <br />
      <div>
        <img
          style={{ width: "50px", height: "50px", margin: "3px 5px 3px 5px" }}
          src={Server1}
          alt="2"
          onClick={() => setDivision(2)}
        />
      </div>
      <div>
        <img
          style={{ width: "50px", height: "50px", margin: "3px 5px 3px 5px" }}
          src={Server2}
          onClick={() => setDivision(3)}
        />
      </div>
      <div>
        <img
          style={{ width: "50px", height: "50px", margin: "3px 5px 3px 5px" }}
          src={Server3}
          alt=""
        />
      </div>
      <div>
        <img
          style={{ width: "50px", height: "50px", margin: "3px 5px 3px 5px" }}
          src={Server4}
          alt=""
        />
      </div>
      <div>
        <img
          style={{ width: "50px", height: "50px", margin: "3px 5px 3px 5px" }}
          src={Server5}
          alt=""
        />
      </div>
    </div>
  );
}
