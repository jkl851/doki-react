import React, { Fragment, useState, useRef } from "react";
import ChatMessage from "./ChatMessage";
import Overlay from "react-bootstrap/Overlay";
import alarmModalStyles from "../assets/css/alarmmodal.module.css";
import { IoIosText } from "react-icons/io";
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";
import "../assets/css/normaltop.css";

export default function ChatAlarmModal({ chatMessages }) {
  //챗 알람 Modal
  const target = useRef(null);
  const [chatAlarmModal, setChatAlarmModal] = useState({ isOpen: false });

  const chatAlarmInfo = (event) => {
    setChatAlarmModal({
      isOpen: true,
    });
  };

  //버튼을 다시 누르면 popover 종료
  const togglePopover1 = () => {
    setChatAlarmModal({ isOpen: !chatAlarmModal.isOpen });
  };

  const pageMovement = (departmentNo) => {
    setChatAlarmModal({ isOpen: false });
    alert(departmentNo + "번 부서로 이동!!");
  };

  return (
    <Fragment>
      <a id="mypopover1" ref={target} onClick={chatAlarmInfo} href="#about">
        <IoIosText />
      </a>

      <Overlay
        show={chatAlarmModal.isOpen}
        target={target.current}
        placement="bottom"
        rootClose={true}
        onHide={() => {
          setChatAlarmModal({ isOpen: false });
        }}
      >
        <Popover
          isOpen={chatAlarmModal.isOpen}
          target="mypopover1"
          className={alarmModalStyles.Popover}
          toggle={togglePopover1}
        >
          <PopoverHeader>새로운 알림 - 채팅</PopoverHeader>
          <PopoverBody className={alarmModalStyles.popoverbody}>
            {chatMessages.map((chatMessage) => (
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

// ChatAlarmModal.propTypes = {
//     no: PropTypes.number.isRequired
// }
