import React, { Fragment, useState, useRef } from "react";
import MemoMessage from "./MemoMessage";
import Overlay from "react-bootstrap/Overlay";
import alarmModalStyles from "../assets/css/alarmmodal.module.css";
import { IoIosNotifications } from "react-icons/io";
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";
import "../assets/css/normaltop.css";

export default function MemoAlarmModal({ memoMessages }) {
  //메모 알람 Modal
  const target = useRef(null);
  const [memoAlarmModal, setMemoAlarmModal] = useState({ isOpen: false });

  const memoAlarmInfo = (no) => {
    setMemoAlarmModal({
      isOpen: true,
    });
  };

  //버튼을 다시 누르면 popover 종료
  const togglePopover2 = () => {
    setMemoAlarmModal({ isOpen: !memoAlarmModal.isOpen });
  };

  const pageMovement = (departmentNo) => {
    setMemoAlarmModal({ isOpen: false });
    alert(departmentNo + "번 부서로 이동!!");
  };

  return (
    <Fragment>
      <a id="mypopover2" ref={target} onClick={memoAlarmInfo} href="#about">
        <IoIosNotifications />
      </a>

      <Overlay
        show={memoAlarmModal.isOpen}
        target={target.current}
        placement="bottom"
        rootClose={true}
        onHide={() => {
          setMemoAlarmModal({ isOpen: false });
        }}
      >
        <Popover
          style={{ width: "250px" }}
          isOpen={memoAlarmModal.isOpen}
          target="mypopover2"
          className={alarmModalStyles.Popover}
          toggle={togglePopover2}
        >
          <PopoverHeader className={alarmModalStyles["popoverHeader"]}>
            새로운 알림 - 메모
          </PopoverHeader>
          <PopoverBody className={alarmModalStyles.popoverbody}>
            {memoMessages.map((memoMessage) => (
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
