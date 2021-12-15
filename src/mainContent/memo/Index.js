import "./Index.css";
import CreateMemo from "./Creatememo";
import Memo from "./Memo";
import React, { useState, useReducer } from "react";
import { MemoContext, memoReducer, memoInitialState} from "./modules/MemoReducer";
import "../../assets/css/main_content.css";

export default function App() {
  const [addItem, setAddItem] = useState([]);

  const addMemo = (memo) => {
    setAddItem((preValue) => {
      return [...preValue, memo];
    });

    if (memo.title === "" || memo.content === "") {
      alert("제목이나 본문을 기입하세요");
      setAddItem([]);
    }
  };

  const onDelete = (id) => {
    setAddItem((oldData) => {
      return oldData.filter((currentValue, indx) => {
        return indx !== id;
      });
    });
  };

  return (
    <div className="main_content">
      <div className="container">
        <div className="main_note">
          <MemoContext.Provider value={ useReducer( memoReducer, memoInitialState )}>
            <CreateMemo passMemo={addMemo} />
          </MemoContext.Provider>
          {addItem.map((value, index) => {
            return (
              <Memo
                key={index}
                id={index}
                titles={value.title}
                contents={value.content}
                deleteItem={onDelete}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
