import "./Index.css";
import CreateMemo from "./Creatememo";
import MemoListContainer from "./MemoListContainer";
import { MemoContext } from "./modules/MemoReducer"
import React, { useContext, useRef } from "react";

import "../../assets/css/main_content.css";

export default function App() {
  //const [ memos, dispatch ] = useContext(MemoContext);

  return (
    <div className="main_content">
        <div className="main_note">
            <CreateMemo />
              <MemoListContainer className="memolistcontainer" title="고정됨" filter = {{pin: "1", visible: "1"}} />
              <MemoListContainer className="memolistcontainer" title="일반" filter = {{pin: "0", visible: "1"}} />
        </div>
    </div>
  );
}
