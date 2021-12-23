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
  const [hashKeyword, setHashKeyword] = useState('');

  return (
    <div id="whole_wrapper">
      <MemoContext.Provider value={useReducer(memoReducer, memoList)}>
      <HeaderDiv division={division} allinfo={allinfo} chat={chat} setChat={setChat}/>
        <div id="main_sidebar">
          <Sidebar
            division={division}
            setDivision={setDivision}
            allinfo={allinfo}
            hashKeyword={hashKeyword}
            setHashKeyword={setHashKeyword}
          />
        </div>
<<<<<<< HEAD
        <MemoIndex division={division} allinfo={allinfo}/>
=======
        <MemoIndex division={division} allinfo={allinfo} hashKeyword={hashKeyword}/>
      </MemoContext.Provider>
>>>>>>> 019f216ad74b1a470867c2afdffcfcef48d36bcc
      <SideChat2 allinfo={allinfo} />
      </MemoContext.Provider>
    </div>
  );
}
