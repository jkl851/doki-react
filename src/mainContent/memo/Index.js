import React, { useContext, useState, useEffect } from "react";
import { MemoContext } from "./modules/MemoReducer"
import axios from 'axios';

import "./Index.css";
import CreateMemo from "./Creatememo";
import MemoListContainer from "./MemoListContainer";

import "../../assets/css/main_content.css";

export default function App({division, allinfo, hashKeyword, deptAuth}) {
  const [ memos, dispatch ] = useContext(MemoContext);

 
  // 메인 구현 후 사이드바 클릭시 불러오는거로 이동
    const groupNo = division;
    // console.log('groupNo ==> '+ groupNo)
    
    useEffect(() => {
      
      const url = 'http://localhost:8080/doki/memo/list/'+ groupNo + (hashKeyword !== undefined ? ('/'+ hashKeyword) : '' );
      console.log(url)
      axios.get(url, {withCredentials: true})
      .then((Response) => {
        console.log("===== GET MemoList =====");
        console.log(Response.data);
          dispatch({ type: 'GET_MEMOLIST', memoListFromServer : Response.data });
          console.log("===== GET MemoList =====");
          console.log(Response.data);


      })
      .catch((Error) => {console.log(Error)})
  }, [division, hashKeyword])


  return (
    <div className="main_content">
        <div className="main_note">
            <CreateMemo allinfo={allinfo} division={division} deptAuth={deptAuth}/>
            <MemoListContainer className="memolistcontainer" title="고정됨" filter = {{pin: "1", visible: "1"}} deptAuth={deptAuth}  allinfo={allinfo}/>
            <MemoListContainer className="memolistcontainer" title="일반" filter = {{pin: "0", visible: "1"} } deptAuth={deptAuth} allinfo={allinfo}/>
        </div>
    </div>
  );
}
