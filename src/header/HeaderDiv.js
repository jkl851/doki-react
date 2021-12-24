import React, { useEffect, useState } from "react";
import "../assets/css/normaltop.css";
import logo from "../assets/images/white_logo_small.png";
import { openNav2, closeNav2 } from "../assets/js/offcanvas";
import ChatAlarmPopover from "./ChatAlarmPopover";
import MemoAlarmPopover from "./MemoAlarmPopover";
import UpdateUserModal from "./UpdateUserModal";
import axios from "axios";

export default function HeaderDiv({ setDivision, allinfo, chat, setChat }) {
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

  useEffect(async () => {
    getChatMessages();
  }, []);




  //채팅 알림 받기
  const [chatMessages, setChatMessages] = useState([]);
  const getChatMessages = async() => {
    await axios
      .get(`http://localhost:8080/doki/alarm/getAlarm/${no}/0`)
      .then((Response) => {
        // console.log(no + "번 유저 채팅 알림 요청!")
        // for(let i=0; i<Response.data.length; i++) {
        //   console.log(Response.data[i]);
        //     tempMessages.push(Response.data[i]);
        // }
        setChatMessages(Response.data);
      })
      .catch((Error) => {
        console.log(Error);
      });

      // setChatMessages([...chatMessages, tempMessages]);
  }


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
          <ChatAlarmPopover chatMessages={chatMessages} allinfo={allinfo} setDivision={setDivision} />
          <UpdateUserModal allinfo={allinfo} />
          <a onClick={chatControll} href="#about">
            채팅
          </a>
        </div>
      </div>
    </div>
  );
}
