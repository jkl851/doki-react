import React, {Fragment, useState } from 'react';
import '../assets/css/normaltop.css'
import Modal from 'react-modal';
import alarmModalStyles from "../assets/css/alarmmodal.module.css";
import user from '../assets/images/user 1.png';
import { IoIosNotifications } from "react-icons/io";

Modal.setAppElement('body');

export default function MemoAlarmModal() {
    let no = 2;

    //메모 알람 Modal
    const [memoAlarmModal, setMemoAlarmModal] = useState({isOpen: false});
    const memoAlarmInfo = (no) => {
        setMemoAlarmModal({
            isOpen: true
        })
    }

    return (
        <Fragment>
            <a onClick={() => memoAlarmInfo(no)} href="#about"><IoIosNotifications /></a>

           {/* 메모 알람 Modal */}
           <Modal
                isOpen={memoAlarmModal.isOpen}
                onRequestClose={ () => setMemoAlarmModal({isOpen: false}) }
                shouldCloseOnOverlayClick={true}
                // ariaHideApp={false}
                className={alarmModalStyles.Modal}
                // overlayClassName={alarmModalStyles.Overlay}
                style={{content: {width: 350}}}
                >
                <h1>
                    새로운 알림 - 메모
                </h1>
                <div className={alarmModalStyles.content}>
                    <div className={alarmModalStyles.profile}>                  
                           
                        <img src={user} className={alarmModalStyles['user-profile']} alt='profile' />
                    </div>
                    <div style={{}}>
                        허정우 더존 교육생님이 <br/>
                        (개발부) 메모3을 수정하였습니다.

                    </div>
                </div>
                <div className={alarmModalStyles.content}>
                    <div className={alarmModalStyles.profile}>                  
                        <img src={user} className={alarmModalStyles['user-profile']} alt='profile' />
                    </div>
                    <div className={alarmModalStyles.message}>                  
                        허정우 더존 교육생님이 <br/>
                        (개발부) 메모1을 삭제하였습니다.
                    </div>
                </div>
                <div className={alarmModalStyles.content}>
                    <div className={alarmModalStyles.profile}>                  
                        <img src={user} className={alarmModalStyles['user-profile']} alt='profile' />
                    </div>
                    <div className={alarmModalStyles.message}>                  
                        허정우 더존 교육생님이 <br/>
                        (개발부) 메모1을 수정하였습니다.
                    </div>
                </div>
                <div className={alarmModalStyles.content}>
                    <div className={alarmModalStyles.profile}>                  
                        <img src={user} className={alarmModalStyles['user-profile']} alt='profile' />
                    </div>
                    <div className={alarmModalStyles.message}>                  
                        허정우 더존 교육생님이 <br/>
                        (개발부) 메모1을 생성하였습니다.
                    </div>
                </div>
            </Modal>

            
        </Fragment>
    );
}