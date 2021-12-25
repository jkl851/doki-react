import React, { Fragment, useState, useRef, useEffect } from "react";
import MemoMessage from "./MemoMessage";
import Overlay from "react-bootstrap/Overlay";
import alarmModalStyles from "../assets/css/alarmmodal.module.css";
import { IoIosNotifications } from "react-icons/io";
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";
import "../assets/css/normaltop.css";
import Badge from '@mui/material/Badge';
import axios from "axios";


//Stomp
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

export default function MemoAlarmPopover({ setDivision, memoMessages, allinfo }) {
  //메모 알람 Modal
  const no = JSON.stringify(allinfo.no);
  const deptNo = allinfo.departmentNo * 100;
  const target = useRef(null);
  const [memoAlarmPopover, setMemoAlarmPopover] = useState({ isOpen: false });

  const memoAlarmInfo = (no) => {
    updateAlarmCheck();
    setMemoAlarmPopover({
      isOpen: true,
    });
  };

useEffect(() => {
  getMemoAlarmRoom(100);
  getMemoAlarmRoom(200);
  getMemoAlarmRoom(300);
  getMemoAlarmRoom(400);
  getMemoAlarmRoom(500);
  opensocket(deptNo);
  getAlarmCount();
}, []);

  //부서별 메모방(room) 생성 작업
  const getMemoAlarmRoom = async(i) => {
    await axios
      .post(`http://localhost:8080/doki/talk/memoAlarmRoom/${i}`)
      .then((Response) => {
        // console.log(Response);
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

// 소켓 열기
const opensocket = async(deptNo) => {
  try{
    //소켓 열기
    var socket = new SockJS('http://localhost:8080/doki/websocket');
    var stompClient = Stomp.over(socket); //stomp client 구성

    // SockJS와 stomp client를 통해 연결을 시도.
    stompClient.connect({}, function () {
      console.log('Memo Alarm Socket Connected: ' + `${deptNo}`);
      stompClient.subscribe(`/topic/${deptNo}`, (msg) => {
        const data = JSON.parse(msg.body);
        console.log('memoPopOver socket sub : ' + JSON.stringify(data));
          setCount(+1);
          getAlarmCount();

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
    .get(`http://localhost:8080/doki/alarm/getAlarmCount/${no}/1`)
    .then((Response) => {
      setCount(Response.data);
    })
    .catch((Error) => {
      console.log(Error);
    });
}

//읽음 표시
const updateAlarmCheck = async() => {
  setCount(0);
  await axios
    .get(`http://localhost:8080/doki/alarm/updateAlarmCheck/${no}/1`)
    .then((Response) => {
      
    })
    .catch((Error) => {
      console.log(Error);
    });
}

  //부서번호 상위 component로 이동
  const pageMovement = (departmentNo) => {
    setMemoAlarmPopover({ isOpen: false });
    setDivision(departmentNo);
    console.log(departmentNo + "번 부서로 이동!!");
  };

  //버튼을 다시 누르면 popover 종료
  const togglePopover2 = () => {
    setMemoAlarmPopover({ isOpen: !memoAlarmPopover.isOpen });
  };

  //외부클릭 시 화면 닫기
  const outsideRef = useOutSideRef(null);
  function useOutSideRef() {
      const ref= useRef(null);

      useEffect(() => {
          function handelClickOutside(event) {
              if(ref.current && !ref.current.contains(event.target)) {
                setMemoAlarmPopover({ isOpen: false });
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
      <a id="mypopover2" ref={outsideRef} onClick={memoAlarmInfo} href="#about">
      <Badge badgeContent={count} color="error" >
        <IoIosNotifications />
      </Badge>
      </a>

      <Overlay
        show={memoAlarmPopover.isOpen}
        target={target.current}
        placement="bottom"
       
      >
        <Popover
          style={{ width: "250px" }}
          isOpen={memoAlarmPopover.isOpen}
          target="mypopover2"
          className={alarmModalStyles.Popover}
          toggle={togglePopover2}
                  >
          <PopoverHeader className={alarmModalStyles["popoverHeader"]} >
            새로운 알림 - 메모
          </PopoverHeader>
          <PopoverBody className={alarmModalStyles.popoverbody} >
            {memoMessages &&
              memoMessages.map((memoMessage) => (
                <MemoMessage
                  key={memoMessage.no}
                  userName={memoMessage.userName}
                  position={memoMessage.position}
                  date={memoMessage.date}
                  contents={memoMessage.contents}
                  departmentNo={memoMessage.departmentNo}
                  departmentName={memoMessage.departmentName}
                  pageMovement={pageMovement}
                />
              ))}
          </PopoverBody>
        </Popover>
      </Overlay>
    </Fragment>
  );
}
