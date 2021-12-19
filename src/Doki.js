import React, { useReducer, useEffect, useState } from "react";
import HeaderDiv from "./header/HeaderDiv";
import {
    MemoContext,
    memoReducer,
    memoList,
} from "./mainContent/memo/modules/MemoReducer";
import Sidebar from "./sidebar/Sidebar";

import SideChat2 from "./sidechat/SideChat2";
import "../src/assets/css/Doki.css";

import MemoIndex from "./mainContent/memo/Index";

export default function Doki() {

    // [soo] division은 부서 번호이다
    const [division, setDivision] = useState(2);

    return (
        <div id="whole_wrapper">
            <HeaderDiv />
            <MemoContext.Provider value={useReducer(memoReducer, memoList)}>
                <div id="main_sidebar">
                    <Sidebar 
                          division={division}
                           setDivision={setDivision} />
                </div>
                <MemoIndex />
            </MemoContext.Provider>
            <SideChat2 />
        </div>
    );
}
