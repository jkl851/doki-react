import React, { useReducer } from "react";
import HeaderDiv from "./header/HeaderDiv";
import { MemoContext, memoReducer, memoList} from "./mainContent/memo/modules/MemoReducer";
import Sidebar from "./sidebar/Sidebar";
import SideChat from "./sidechat/SideChat";
import SideChat2 from "./sidechat/SideChat2";
import "../src/assets/css/Doki.css";

import Memo from "./mainContent/memo/Index";

export default function Doki() {
  return (
    <div id="whole_wrapper">
      <HeaderDiv />
      <MemoContext.Provider value={ useReducer( memoReducer, memoList )}>
      <div id="main_sidebar">
        <Sidebar />
      </div>

      <Memo />
      </MemoContext.Provider>

      <SideChat2 />
    </div>
  );
}
