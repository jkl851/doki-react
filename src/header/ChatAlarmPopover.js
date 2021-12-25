import React, { Fragment, useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import Overlay from "react-bootstrap/Overlay";
import alarmModalStyles from "../assets/css/alarmmodal.module.css";
import { IoIosText } from "react-icons/io";
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";
import "../assets/css/normaltop.css";
import Badge from '@mui/material/Badge';
import axios from "axios";

//Stomp
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

export default function ChatAlarmPopover({ setDivision, chatMessages, allinfo }) {
  //챗 알람 Modal
  const no = JSON.stringify(allinfo.no);
  const deptNo = allinfo.departmentNo;

  const target = useRef(null);
  const [chatAlarmPopover, setChatAlarmPopover] = useState({ isOpen: false });

  const chatAlarmInfo = (event) => {
    updateAlarmCheck();
    setChatAlarmPopover({
      isOpen: true,
    });
  };
  
  //버튼을 다시 누르면 popover 종료
  const togglePopover1 = () => {
    setChatAlarmPopover({ isOpen: !chatAlarmPopover.isOpen });
  };

  //부서번호 상위 component로 이동
  const pageMovement = (departmentNo) => {
    setChatAlarmPopover({ isOpen: false });
    setDivision(departmentNo);
    console.log(departmentNo + "번 부서로 이동!!");
  };


  //알람 빨간불 갯수 표시
  useEffect(() => {
    // getChatRoom(10);
    // getChatRoom(20);
    // getChatRoom(30);
    // getChatRoom(40);
    // getChatRoom(50);
    // opensocket(deptNo);
    // getAlarmCount();
  }, []);


    //부서별 채팅알람방(room) 생성 작업
    // const getChatRoom = async(i) => {
    //   await axios
    //     .post(`http://localhost:8080/doki/talk/chatAlarmRoom/${i}`)
    //     .then((Response) => {
    //       // console.log(Response);
    //     })
    //     .catch((Error) => {
    //       console.log(Error);
    //     });
    // };


  // 소켓 열기
  const opensocket = async(deptNo) => {
    try{
      //소켓 열기
      var socket = new SockJS('http://localhost:8080/doki/websocket');
      var stompClient = Stomp.over(socket); //stomp client 구성

      // SockJS와 stomp client를 통해 연결을 시도.
      stompClient.connect({}, function () {
        console.log('Chat Alarm Socket Connected: ' + `${deptNo}`);
        stompClient.subscribe(`/topic/${deptNo}`, (msg) => {
          const data = JSON.parse(msg.body);
          console.log('chatPopOver socket sub : ' + JSON.stringify(data));

          if(chatAlarmPopover.isOpen == false) {
            setCount(+1);
            getAlarmCount();
          } 

        });
      });
        return null;
    
    }catch (error){
        console.log(error);
    }
  }


  // var tempMessages = [];
  const [count, setCount] = useState();
  //채팅 알람 수
  const getAlarmCount = async() => {
    await axios
      .get(`http://localhost:8080/doki/alarm/getAlarmCount/${no}/0`)
      .then((Response) => {
        // console.log('씨발!');
        // for(let i=0; i<Response.data.length; i++) {
        //   console.log(Response.data[i]);
        //   tempMessages.push(Response.data[i]);
        // }
        setCount(Response.data);
      })
      .catch((Error) => {
        console.log(Error);
      });

      // setCount([...count, ...tempMessages]);
  }

  //읽음 표시
  const updateAlarmCheck = async() => {
    setCount(0);
    await axios
      .get(`http://localhost:8080/doki/alarm/updateAlarmCheck/${no}/0`)
      .then((Response) => {
        
      })
      .catch((Error) => {
        console.log(Error);
      });
  }
  

  //외부클릭 시 화면 닫기
  const outsideRef = useOutSideRef(null);
  function useOutSideRef() {
      const ref= useRef(null);

      useEffect(() => {
          function handelClickOutside(event) {
              if(ref.current && !ref.current.contains(event.target)) {
                setChatAlarmPopover({ isOpen: false });
              } 
          }
          document.addEventListener('click', handelClickOutside);

          return () => {
              document.removeEventListener('click', handelClickOutside);
          };
      });

      return ref;
  }

  return (
    <Fragment>
      <a id="mypopover1"
        // ref={target} 
        ref={outsideRef} 
        onClick={chatAlarmInfo} href="#about">
        <Badge badgeContent={count} color="error" >
          <IoIosText />
        </Badge>
        
      </a>

      <Overlay
        show={chatAlarmPopover.isOpen}
        target={target.current}
        placement="bottom"

      >
        <Popover
          style={{ width: "250px" }}
          isOpen={chatAlarmPopover.isOpen}
          target="mypopover1"
          className={alarmModalStyles.Popover}
          toggle={togglePopover1}
        >
          <PopoverHeader className={alarmModalStyles["popoverHeader"]}>
            새로운 알림 - 채팅
          </PopoverHeader>
          <PopoverBody className={alarmModalStyles.popoverbody}>
            {chatMessages &&
              chatMessages.map((chatMessage) => (
                <ChatMessage
                  key={chatMessage.no}
                  no={allinfo.no}
                  userName={chatMessage.userName}
                  position={chatMessage.position}
                  date={chatMessage.date}
                  contents={chatMessage.contents}
                  departmentNo={chatMessage.departmentNo}
                  departmentName={chatMessage.departmentName}
                  pageMovement={pageMovement}
                />
              ))}
          </PopoverBody>
        </Popover>
      </Overlay>
    </Fragment>
  );
}
