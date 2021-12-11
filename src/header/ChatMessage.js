import React from 'react';
import PropTypes from 'prop-types';
import alarmModalStyles from "../assets/css/alarmmodal.module.css";
import user from '../assets/images/user 1.png';

export default function ChatMessage({userName, position, contents, departmentNo, departmentName, pageMovement}) {
    return (
        <div className={alarmModalStyles.content} onClick={() => pageMovement(departmentNo)} style={{cursor: 'pointer'}}>
            <div className={alarmModalStyles.profile}>                  
                
                <img src={user} className={alarmModalStyles['user-profile']} alt='profile' />
            </div>
            <div style={{float: 'left'}}>                        
                {`${userName} ${position} (${departmentName})`} <br/> 
                {`${contents}`}
            </div>
        </div>
    );
};

ChatMessage.propTypes = {
    departmentNo: PropTypes.number.isRequired
}