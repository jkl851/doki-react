import React, { Fragment, useState, useRef, useEffect } from "react";
import MemoMessage from "./MemoMessage";
import Overlay from "react-bootstrap/Overlay";
import alarmModalStyles from "../assets/css/alarmmodal.module.css";
import { IoIosNotifications } from "react-icons/io";
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";
import "../assets/css/normaltop.css";

export default function MemoAlarmPopover({ setDivision, memoMessages, allinfo }) {
  //메모 알람 Modal
  const no = JSON.stringify(allinfo.no);
  const target = useRef(null);
  const [memoAlarmPopover, setMemoAlarmPopover] = useState({ isOpen: false });

  const memoAlarmInfo = (no) => {
    setMemoAlarmPopover({
      isOpen: true,
    });
  };

  //버튼을 다시 누르면 popover 종료
  const togglePopover2 = () => {
    setMemoAlarmPopover({ isOpen: !memoAlarmPopover.isOpen });
  };

  const pageMovement = (departmentNo) => {
    setMemoAlarmPopover({ isOpen: false });
    setDivision(departmentNo);
    console.log(departmentNo + "번 부서로 이동!!");
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
        <IoIosNotifications />
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
                  userNo={memoMessage.userNo}
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
