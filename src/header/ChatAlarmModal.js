import React, {Fragment, useState, useRef, Component } from 'react';
import Modal from 'react-modal';
import alarmModalStyles from "../assets/css/alarmmodal.module.css";
import '../assets/css/normaltop.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { IoIosText } from "react-icons/io";
import user from '../assets/images/user 1.png';
// import {Popover, PopoverHeader, PopoverBody }  from "react-popover";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";

Modal.setAppElement('body');

export default function ChatAlarmModal() {
    
    //챗 알람 Modal
    let no = 2;
    const [chatAlarmModal, setChatAlarmModal] = useState({isOpen: false});
    const chatAlarmInfo = (no) => {
        setChatAlarmModal({
            isOpen: true
            
        })
    };

  
    //버튼을 다시 누르면 popover 종료
    const togglePopover = () => {    
        setChatAlarmModal({ isOpen: !(chatAlarmModal.isOpen) })  
    };

 

    return (
        <Fragment>
            <a id="mypopover" onClick={() => chatAlarmInfo(no)} href="#about"><IoIosText /></a>

            {/* 채팅 알람 Modal */}
            <Popover
                isOpen={chatAlarmModal.isOpen}
                placement="bottom"                
                target="mypopover"
                // onRequestClose={ () => setChatAlarmModal({isOpen: false}) }
                // shouldCloseOnOverlayClick={true}
                // ariaHideApp={false}
                className={alarmModalStyles.Popover}
                toggle={togglePopover}
                

                // overlayClassName={alarmModalStyles.Overlay}
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





        </Fragment>
    );
}
