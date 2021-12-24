import React, { useReducer, useEffect, useState } from "react";
import HeaderDiv from "./header/HeaderDiv";
import { MemoContext, memoReducer, memoList} from "./mainContent/memo/modules/MemoReducer";
import Sidebar from "./sidebar/Sidebar";
import SideChat2 from "./sidechat/SideChat2";
import "../src/assets/css/Doki.css";
import MemoIndex from "./mainContent/memo/Index";

export default function Doki({ allinfo, setAllinfo, deptInfo }) {
  // [soo] division은 부서 번호이다
  const [division, setDivision] = useState(1);
  const [chat, setChat] = useState(false);
  const [hashKeyword, setHashKeyword] = useState('');
  const [deptAuth, setDeptAuth] = useState("0");



  return (
    <div id="whole_wrapper">
      <HeaderDiv division={division} allinfo={allinfo} chat={chat} setChat={setChat}/>
      <MemoContext.Provider value={useReducer(memoReducer, memoList)}>
        <div id="main_sidebar">
          <Sidebar
            division={division}
            setDivision={setDivision}
            allinfo={allinfo}
            setAllinfo={setAllinfo}
            hashKeyword={hashKeyword}
            setHashKeyword={setHashKeyword}
            deptInfo={deptInfo}
            deptAuth={deptAuth}
            setDeptAuth={setDeptAuth}
          />
        </div>
        <MemoIndex division={division} allinfo={allinfo} hashKeyword={hashKeyword} deptAuth={deptAuth}/>
      </MemoContext.Provider>
      <SideChat2 allinfo={allinfo} />
    </div>
  );
}
