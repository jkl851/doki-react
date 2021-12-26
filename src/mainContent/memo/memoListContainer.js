import React, {useRef, useEffect, useState, useContext} from 'react';
import { MemoContext } from "./modules/MemoReducer";
import axios from 'axios'

//Stomp
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

import MemoList from "./MemoList";

export default function memoList ({filter, title, deptAuth, allinfo}) {
    // 전역 컨텍스트
    const [ memos, dispatch ] = useContext(MemoContext); 
    // 세션 유저정보
  
    // 최상단 테스트 =====================================================================
    useEffect(() => {
        getMemoRoom(0);
        opensocket();
    }, []);


    //메모 방(room) 생성 작업
    const getMemoRoom = async(i) => {
        await axios
        .post(`http://localhost:8080/doki/talk/memoRoom/${i}`)
        .then((Response) => {
            // console.log(Response);
        })
        .catch((Error) => {
            console.log(Error);
        });
    };

    // 소켓 열기
  const opensocket = async() => {
    try{
    //소켓 열기
    var socket = new SockJS('http://localhost:8080/doki/websocket');
    var stompClient = Stomp.over(socket); //stomp client 구성
    
    // SockJS와 stomp client를 통해 연결을 시도.
    stompClient.connect({}, function () {
      console.log('Memo In Socket Connected: ');

      stompClient.subscribe(`/topic/0`, (msg) => {
        const data = JSON.parse(msg.body);
        console.log('data : ' + JSON.stringify(data));
        console.log(allinfo);
        if( data.userNo == allinfo.no ) {


          // set 들어갈부분


        } else {
           console.log(data.userName + ' 유저가 ' + data.memoNo + '번 메모를 사용중!');
            dispatch({ type: 'MODIFY_MEMO', no: data.memoNo, name : data.name, value : data.value, handling: "1", allinfo: allinfo})
            //사용중인 메모 알람 함수
             //alert(data.userName + '님이 현재 사용 중 입니다.');
        }
      });


      
      console.log('Memo Out Socket Connected: ');
      stompClient.subscribe(`/topicOut/0`, (msg) => {
        const data = JSON.parse(msg.body);
        // console.log('data : ' + JSON.stringify(data));
        if(data.userNo == allinfo.no ) {

            // 소켓 연결 종료
            //setMemo({...memo, ["handling"]: "0" })
            // dispatch({ type: 'USER_LEAVE_MEMO', no: data.no, handling : data.handling , allinfo: allinfo})
    
        } else {
            // 소켓 연결 종료
            //setMemo({...memo, ["handling"]: "0" })
            dispatch({ type: 'USER_LEAVE_MEMO', no: data.memoNo,  handling: "0", allinfo: allinfo})
             
            console.log(data.userName + ' 유저가 ' + data.memoNo + '번 메모를 사용끝!')
        }
      });


    });
      return null;
  
  }catch (error){
      console.log(error);
  }
}



// 최상단 테스트 =====================================================================


    // 배열용
    const ref = useRef()
    const [cols, setCols] = useState(0)

    // 메모 필터
    const filterKeyArray = Object.keys(filter)
    const filteredMemos = memos.filter((memo) => {
        const mapResult = filterKeyArray.map((key) => {
        return filter[key] === memo[key]
        })
        const findResult = mapResult.includes(false)
        return !findResult
    })

    useEffect(() => {
        handleResize()
    }, [ref])

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => {
        window.removeEventListener('resize', handleResize)
        }
    }, [])

    const handleResize = (e) => {
        const colsNum = parseInt(ref.current.scrollWidth / 300)
        if (colsNum === 0) setCols(1)
        else setCols(colsNum)
    }

    return (
        <div className="memo_list" ref={ref}>
            <MemoList memos={filteredMemos} cols={cols} title={title} deptAuth={deptAuth} allinfo={allinfo}/>
        </div>
    );
};
