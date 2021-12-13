import React, { Fragment, useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import Overlay from "react-bootstrap/Overlay";
import alarmModalStyles from "../assets/css/alarmmodal.module.css";
import { IoIosText } from "react-icons/io";
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";
import "../assets/css/normaltop.css";

export default function ChatAlarmPopover({ chatMessages }) {
  //챗 알람 Modal
  const target = useRef(null);
  const [chatAlarmPopover, setChatAlarmPopover] = useState({ isOpen: false });

  const chatAlarmInfo = (event) => {
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


    //외부클릭 시 화면 닫기
    const outsideRef = useOutSideRef(null);
    function useOutSideRef() {
        const ref= useRef(null);
  
        useEffect(() => {
            function handelClickOutside(event) {
                if(ref.current && !ref.current.contains(event.target)) {
                  setChatAlarmPopover({ isOpen: false });
                  $("#myPopover01").hide();
                    console.log('외부 클릭 감지');
                } else {
                  $("#myPopover01").show();

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
        ref={target} 
        onClick={chatAlarmInfo} href="#about">
        <IoIosText />
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
