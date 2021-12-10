import React, {Fragment, useState, useRef, useEffect } from 'react';
import alarmModalStyles from "../assets/css/alarmmodal.module.css";
import '../assets/css/normaltop.css';
import { IoIosText } from "react-icons/io";
import user from '../assets/images/user 1.png';
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";
import Overlay from 'react-bootstrap/Overlay';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import '@restart/ui/Overlay';

export default function ChatAlarmModal() {
    //챗 알람 Modal
    let no = 2;
    const [chatAlarmModal, setChatAlarmModal] = useState({isOpen: false});
    // const chatAlarmInfo = (no) => {
        // setChatAlarmModal({
        //     isOpen: true            
        // })
    // };

    
    const chatAlarmInfo = (event) => {
      setChatAlarmModal({
        isOpen: !(chatAlarmModal.isOpen)
      })
    };
  

    //버튼을 다시 누르면 popover 종료
    const togglePopover = () => {    
        setChatAlarmModal({ isOpen: !(chatAlarmModal.isOpen) })  
    };


    const target = useRef(null);

  
    return (
        <Fragment>                   

            <a id="mypopover" ref={target} onClick={chatAlarmInfo} href="#about"><IoIosText /></a>
            
            <Overlay
              show={chatAlarmModal.isOpen}
              target={target.current}
              placement="bottom"
              rootClose={true}
              onHide={() => {setChatAlarmModal({isOpen: false})}}
            >
                <Popover
                isOpen={chatAlarmModal.isOpen}
                target="mypopover"
                className={alarmModalStyles.Popover}
                toggle={togglePopover}
                >
                    <PopoverHeader >새로운 알림 - 채팅</PopoverHeader> 
                        <PopoverBody className={alarmModalStyles.popoverbody}>    
                            {/* <h1>
                                새로운 알림 - 채팅
                            </h1> */}
                            <div className={alarmModalStyles.content}>
                                <div className={alarmModalStyles.profile}>                  
                                    
                                    <img src={user} className={alarmModalStyles['user-profile']} alt='profile' />
                                </div>
                                <div style={{float: 'left'}}>                        
                                    허정우 더존 교육생 (개발부) <br/> 
                                    남은 부분은 제가 내일 와서 처리하...
                                </div>
                            </div>
                            <div className={alarmModalStyles.content}>
                                <div className={alarmModalStyles.profile}>                  
                                    <img src={user} className={alarmModalStyles['user-profile']} alt='profile' />
                                </div>
                                <div className={alarmModalStyles.message}>                  
                                    허정우 더존 교육생 (개발부) <br/> 
                                    대리님 말씀하신 코드수정 완료했...
                                </div>
                            </div>
                            <div className={alarmModalStyles.content}>
                                <div className={alarmModalStyles.profile}>                  
                                    <img src={user} className={alarmModalStyles['user-profile']} alt='profile' />
                                </div>
                                <div className={alarmModalStyles.message}>                  
                                    허정우 더존 교육생 (클동호회) <br/> 
                                    클라이밍 저도 배우고 싶어서 가입...
                                </div>
                            </div>
                            <div className={alarmModalStyles.content}>
                                <div className={alarmModalStyles.profile}>                  
                                    <img src={user} className={alarmModalStyles['user-profile']} alt='profile' />
                                </div>
                                <div className={alarmModalStyles.message}>                  
                                    허정우 더존 교육생 (클동호회) <br/> 
                                    안녕하세요~~~~ 반갑습니다! 저...
                                </div>
                            </div>
                        </PopoverBody>                
                </Popover>
            </Overlay>
            

        </Fragment>
    );
}