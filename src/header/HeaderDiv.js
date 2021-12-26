import React, { useEffect, useState } from "react";
import "../assets/css/normaltop.css";
import logo from "../assets/images/white_logo_small.png";
import { openNav2, closeNav2 } from "../assets/js/offcanvas";
import ChatAlarmPopover from "./ChatAlarmPopover";
import MemoAlarmPopover from "./MemoAlarmPopover";
import UpdateUserModal from "./UpdateUserModal";
import axios from "axios";

//Stomp
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import ChatMessage from "./ChatMessage";

export default function HeaderDiv({ division, setDivision, allinfo, chat, setChat }) {
  //현재 유저 no
  let no = JSON.stringify(allinfo.no);
  const deptNo = allinfo.departmentNo;

  const chatControll = () => {
    if (chat === false) {
      openNav2();
      setChat(true);
      console.log(chat);

    } else {
      closeNav2();
      setChat(false);
      console.log(chat);
    }
  };

  // useEffect(() => {
  //   opensocket(deptNo);
  // }, []);

  // // 소켓 열기
  // const opensocket = async(deptNo) => {
  //   try{
  //     //소켓 열기
  //     var socket = new SockJS('http://localhost:8080/doki/websocket');
  //     var stompClient = Stomp.over(socket); //stomp client 구성

  //     // SockJS와 stomp client를 통해 연결을 시도.
  //     stompClient.connect({}, function () {
  //       console.log('Chat Alarm Socket Connected: ' + `${deptNo}`);
  //       stompClient.subscribe(`/topic/${deptNo}`, (msg) => {
  //         const data = JSON.parse(msg.body);
  //         const broadCastingMessage = {}
  //         broadCastingMessage.roomId = data.roomId;
  //         broadCastingMessage.userNo = data.userNo;
  //         broadCastingMessage.userName = data.sender;
  //         broadCastingMessage.contents = data.message;
  //         broadCastingMessage.departmentName = data.departmentName;
  //         broadCastingMessage.date = data.date;
  //         broadCastingMessage.position = data.position;
  //         broadCastingMessage.flag = 0;
  //         broadCastingMessage.image = null;

  //         setChatMessages(chatMessages => 
  //           chatMessages.concat(broadCastingMessage));
  //       });

  //     });
  //       return null;
    
  //   }catch (error){
  //       console.log(error);
  //   }
  // }


  //채팅 알림 받기
  // var tempMessages = [];
  // const [chatMessages, setChatMessages] = useState([]);
  // useEffect(async() => {
  //   await axios
  //     .get(`http://localhost:8080/doki/alarm/getAlarm/${no}/0`)
  //     .then((Response) => {
  //       console.log(no + "번 유저 채팅 알림 요청!")
  //       // for(let i=0; i<Response.data.length; i++) {
  //       //   console.log(Response.data[i]);
  //       //     tempMessages.push(Response.data[i]);
  //       // }
  //       console.log(JSON.stringify(Response.data));
  //       setChatMessages(Response.data);
  //     })
  //     .catch((Error) => {
  //       console.log(Error);
  //     });

  //     // setChatMessages([...chatMessages, tempMessages]);
  // }, []);


  //메모 알림 받기
  const [memoMessages, setMemoMessages] = useState([]);
  useEffect(async () => {
    await axios
      .get(`http://localhost:8080/doki/alarm/getAlarm/${no}/1`)
      .then((Response) => {
        // console.log(no + "번 유저 메모 알림 요청!")
        setMemoMessages(Response.data);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, []);

  

  return (
    <div id="header_div">
      <div className="topnav" id="myTopnav">
        <img src={logo} style={{ width: "125px", height: "100%" }} />
        <div className="topnav-right" id="icons">
          <MemoAlarmPopover memoMessages={memoMessages} allinfo={allinfo} setDivision={setDivision} />
          {/* <ChatAlarmPopover chatMessages={chatMessages} allinfo={allinfo} setDivision={setDivision} /> */}
          <UpdateUserModal allinfo={allinfo} />
          {
            division !== 1 &&
            <a onClick={chatControll} href="#about">
            채팅
          </a>}
        </div>
      </div>
    </div>
  );
}
