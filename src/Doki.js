import React, { useReducer, useEffect, useState } from "react";
import HeaderDiv from "./header/HeaderDiv";
import { MemoContext, memoReducer, memoList} from "./mainContent/memo/modules/MemoReducer";
import Sidebar from "./sidebar/Sidebar";
import SideChat2 from "./sidechat/SideChat2";
import "../src/assets/css/Doki.css";
import MemoIndex from "./mainContent/memo/Index";

export default function Doki({ allinfo }) {
  // [soo] division은 부서 번호이다
  const [division, setDivision] = useState(1);
  const [chat, setChat] = useState(false);

  return (
    <div id="whole_wrapper">
      <MemoContext.Provider value={useReducer(memoReducer, memoList)}>
      <HeaderDiv division={division} allinfo={allinfo} chat={chat} setChat={setChat}/>
        <div id="main_sidebar">
          <Sidebar
            division={division}
            setDivision={setDivision}
            allinfo={allinfo}
          />
        </div>
        <MemoIndex division={division} allinfo={allinfo}/>
      <SideChat2 allinfo={allinfo} />
      </MemoContext.Provider>
    </div>
  );
}
