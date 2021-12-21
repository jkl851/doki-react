import React, { Fragment, useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import Overlay from "react-bootstrap/Overlay";
import alarmModalStyles from "../assets/css/alarmmodal.module.css";
import { IoIosText } from "react-icons/io";
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";
import "../assets/css/normaltop.css";
import Badge from '@mui/material/Badge';
import axios from "axios";

export default function ChatAlarmPopover({ chatMessages, allinfo }) {
  //챗 알람 Modal
  const no = JSON.stringify(allinfo.no);
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
    alert(departmentNo + "번 부서로 이동!!");
  };


  //알람 빨간불 갯수 표시
  const [count, setCount] = useState();
  useEffect(() => {
    getChatAlarmCount();
  }, []);

  const getChatAlarmCount = async() => {
    await axios
      .get(`http://localhost:8080/doki/alarm/getChatAlarmCount/${no}`)
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
      .get(`http://localhost:8080/doki/alarm/updateAlarmCheck/${no}`)
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
