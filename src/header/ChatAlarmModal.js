import React, { Fragment, useState, useRef, useEffect } from "react";
import alarmModalStyles from "../assets/css/alarmmodal.module.css";
import "../assets/css/normaltop.css";
import { IoIosText } from "react-icons/io";
import user from "../assets/images/user3.png";
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";
import Overlay from "react-bootstrap/Overlay";
import "@restart/ui/Overlay";

export default function ChatAlarmModal() {
  //챗 알람 Modal
  let no = 2;
  const [chatAlarmModal, setChatAlarmModal] = useState({ isOpen: false });
  // const chatAlarmInfo = (no) => {
  // setChatAlarmModal({
  //     isOpen: true
  // })
  // };

  const chatAlarmInfo = (event) => {
    setChatAlarmModal({
      isOpen: !chatAlarmModal.isOpen,
    });
  };

  //버튼을 다시 누르면 popover 종료
  const togglePopover = () => {
    setChatAlarmModal({ isOpen: !chatAlarmModal.isOpen });
  };

  const target = useRef(null);

  return (
    <Fragment>
      <a id="mypopover" ref={target} onClick={chatAlarmInfo} href="#about">
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
          target="mypopover"
          className={alarmModalStyles.Popover}
          toggle={togglePopover}
          style={{ width: "250px" }}
        >
          <PopoverHeader>새로운 알림 - 채팅</PopoverHeader>
          <PopoverBody className={alarmModalStyles.popoverbody}>
            <div className={alarmModalStyles.content}>
              <div className={alarmModalStyles.profile}>
                <img
                  src={user}
                  className={alarmModalStyles["user-profile"]}
                  alt="profile"
                />
              </div>
              <div className={alarmModalStyles.message}>
                <div className={alarmModalStyles.name}>김민철 대리</div>
                <div className={alarmModalStyles.messages}>
                  민트 초코 진짜 개 노맛 음식 폐기물 수준 ㅇㅈ? ㅇ ㅇㅈ
                </div>
              </div>
            </div>
            <div className={alarmModalStyles.content}>
              <div className={alarmModalStyles.profile}>
                <img
                  src={user}
                  className={alarmModalStyles["user-profile"]}
                  alt="profile"
                />
              </div>
              <div className={alarmModalStyles.message}>
                <div className={alarmModalStyles.name}>제원호 대리</div>
                <div className={alarmModalStyles.messages}>
                  sadfffffffffffffffffffffffffffffffffffffff
                </div>
              </div>
            </div>
            <div className={alarmModalStyles.content}>
              <div className={alarmModalStyles.profile}>
                <img
                  src={user}
                  className={alarmModalStyles["user-profile"]}
                  alt="profile"
                />
              </div>
              <div className={alarmModalStyles.message}>
                <div className={alarmModalStyles.name}>김수형 대리</div>
                <div className={alarmModalStyles.messages}>
                  민트 초코 진짜 개 노맛 음식 폐기물 수준 ㅇㅈ? ㅇ ㅇㅈ
                </div>
              </div>
            </div>
            <div className={alarmModalStyles.content}>
              <div className={alarmModalStyles.profile}>
                <img
                  src={user}
                  className={alarmModalStyles["user-profile"]}
                  alt="profile"
                />
              </div>
              <div className={alarmModalStyles.message}>
                <div className={alarmModalStyles.name}>허정우 대리</div>
                <div className={alarmModalStyles.messages}>
                  민트 초코 진짜 개 노맛 음식 폐기물 수준 ㅇㅈ? ㅇ ㅇㅈ
                </div>
              </div>
            </div>
          </PopoverBody>
        </Popover>
      </Overlay>
    </Fragment>
  );
}
