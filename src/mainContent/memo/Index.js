import "./Index.css";
import CreateMemo from "./Creatememo";
import Memo from "./Memo";
import { MemoContext } from "./modules/MemoReducer"
import React, { useContext } from "react";

import "../../assets/css/main_content.css";

export default function App() {
  const [ memos, dispatch ] = useContext(MemoContext);

  const addMemo = (memo) => {
    if (memo.title === "" || memo.content === "") {
      alert("제목이나 본문을 기입하세요");
      return memos
    }
    dispatch({ type: 'ADD_MEMO', memo: memo });
  };

  return (
    <div className="main_content">
      <div className="container">
        <div className="main_note">
            <CreateMemo passMemo={addMemo} />
          {memos.map((value, index) => {
            return (
              <Memo
                key={index}
                id={index}
                title={value.title}
                contents={value.contents}
                color={value.color}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
