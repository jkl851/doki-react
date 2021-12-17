import React, { useReducer, Component } from "react";
import HeaderDiv from "./header/HeaderDiv";
import {
  MemoContext,
  memoReducer,
  memoList,
} from "./mainContent/memo/modules/MemoReducer";

import Sidebar from "./sidebar/Sidebar";

import SideChat2 from "./sidechat/SideChat2";
import "../src/assets/css/Doki.css";
import Memo from "./mainContent/memo/Index";
import axios from "axios";

export default class Doki extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillUnmount() {
    const navigate = useNavigate();

    axios
      .post("http://localhost:8080/doki/user/checkSession")
      .then((Response) => {
        if (Response.data === "no session") {
          alert("로그인 하십시오.");
          navigate("/login");
        }
        if (Response.data === "has session") {
          alert("정상 로그인.");
        }
      })
      .catch((Error) => {
        console.log(Error);
      });
  }

  render() {
    <div id="whole_wrapper">
      <HeaderDiv />
      <div id="main_sidebar">
        <Sidebar />
      </div>

      <MemoContext.Provider value={useReducer(memoReducer, memoList)}>
        <Memo />
      </MemoContext.Provider>

      <SideChat2 />
    </div>;
  }
}
