import React, { useContext, useRef, useEffect } from "react";
import { MemoContext } from "./modules/MemoReducer"
import axios from 'axios';

import "./Index.css";
import CreateMemo from "./Creatememo";
import MemoListContainer from "./MemoListContainer";



import "../../assets/css/main_content.css";

export default function App() {
  const [ memos, dispatch ] = useContext(MemoContext);
  // 메인 구현 후 사이드바 클릭시 불러오는거로 이동
    const groupNo = 2;
    useEffect(() => {
      axios.get(`http://localhost:8080/doki/memo/list/${groupNo}`, {withCredentials: true})
      .then((Response) => {
          dispatch({ type: 'GET_MEMOLIST', memoListFromServer : Response.data });
          console.log(Response.data);
      })
      .catch((Error) => {console.log(Error)})
  }, [])

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
