import React, { useReducer, useEffect, useState } from "react";
import HeaderDiv from "./header/HeaderDiv";
import { MemoContext, memoReducer, memoList} from "./mainContent/memo/modules/MemoReducer";
import Sidebar from "./sidebar/Sidebar";
import SideChat2 from "./sidechat/SideChat2";
import "../src/assets/css/Doki.css";
import MemoIndex from "./mainContent/memo/Index";

export default function Doki({ allinfo, setAllinfo }) {
  // [soo] division은 부서 번호이다
  const [division, setDivision] = useState(1);
  const [chat, setChat] = useState(false);
  const [hashKeyword, setHashKeyword] = useState('');
  const [deptAuth, setDeptAuth] = useState("0");
  const [allUserDatas, setAllUserDatas] = useState([]);

  return (
    <div id="whole_wrapper">
      <MemoContext.Provider value={useReducer(memoReducer, memoList)}>
      <HeaderDiv division={division} allinfo={allinfo} chat={chat} setChat={setChat} setDivision={setDivision} allUserDatas={allUserDatas}/>
        <div id="main_sidebar">
          <Sidebar
            division={division}
            setDivision={setDivision}
            allinfo={allinfo}
            setAllinfo={setAllinfo}
            hashKeyword={hashKeyword}
            setHashKeyword={setHashKeyword}
            deptAuth={deptAuth}
            setDeptAuth={setDeptAuth}
            allUserDatas={allUserDatas}
            setAllUserDatas={setAllUserDatas}
          />
        </div>
        <MemoIndex division={division} allinfo={allinfo} hashKeyword={hashKeyword} deptAuth={deptAuth}/>
      <SideChat2 allinfo={allinfo}/>
      </MemoContext.Provider>
    </div>
  );
}
