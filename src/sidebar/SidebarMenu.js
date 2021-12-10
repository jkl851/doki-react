import React, {useEffect, useRef, useState } from 'react';
import '../assets/css/sidebar.css'
import SidebarHash from './SidebarHash'
import SidebarUser from './SidebarUser'
import VectorImg from '../assets/images/Vector2.png'
import RuedaDentadaImg from '../assets/images/RuedaDentada.png'
import PlusImg from '../assets/images/Plus.png'
import ReactModal from 'react-modal';
import InviteStyles from '../assets/css/modal/invite.module.css'
import GroupPermmissionStyles from '../assets/css/modal/grouppermission.module.css'
import SearchImg from '../assets/images/Search.png'
import CloseImg from '../assets/images/Close.png'
import EntireUserList from './EntireUserList'
import EntireUserDatas from '../assets/data/entireUserData.json'
import DeptUserList from './DeptUserList'
import axios from 'axios';

ReactModal.setAppElement('#root');

export default function SidebarMenu() {
    const [inviteState, setInviteState] = useState({isOpen : false});
    const [groupPermissionState, setGroupPermissionState] = useState({isOpen : false});
    const [deptUserDatas, setDeptUserDatas] = useState([]);
    const inviteClick = () => {
        setInviteState({isOpen: true})
    }

    const groupPermissionClick = () => {
        setGroupPermissionState({isOpen: true})
    }

    const closeInviteModal = () => {
        setInviteState({isOpen: false})
    }

    const closeGroupPermissionModal = () => {
        setGroupPermissionState({isOpen: false})
    }

    // SidebarMenu의 파라미터로 1번이 넘어왔다고 가정하고 axios 요청을 한다
    // const departmentNo = 1;

    // dependency를 []로 해주었기 때문에 한번 밖에 실행이 안된다
    // 어떤 dependency를 줄지 고민
    useEffect(async() => {
        await axios.get('http://localhost:8080/doki/user/getUserList/1')
        .then((Response) => {
            setDeptUserDatas(Response.data);
            console.log("get중...")
        })
        .catch((Error) => {console.log(Error)})
    }, [])

    return (
        <div className="sidebar_menu" style={{display: 'inline-block', width:'70%', height : '100%', margin: '0px 5px 0px 8px', wordBreak: 'break-all', wordWrap: 'break-word', float:'left', overflowY: 'auto', backgroundColor: '#f2f3f5'}}>
            <br/>
            <div>DoKi</div>
            <SidebarHash />
            <div>
                <img src={VectorImg} alt=""/>
            </div>
            <br/>
                        
            <div>
                <span>참가자</span>
                <img onClick={groupPermissionClick} style={{float:'right', width:'20px', height:'20px', marginRight: '5px'}} src={RuedaDentadaImg} alt="" />
                <img onClick={inviteClick} style={{float:'right', width:'17px', height:'17px', marginRight: '10px'}} src={PlusImg} alt="" />

                {/* Invite Modal */}
                <ReactModal 
                    isOpen={inviteState.isOpen} // modalState.isOpen
                    onRequestClose={ () => setInviteState({isOpen: false}) }
                    shouldCloseOnOverlayClick={true}
                    className={InviteStyles.Modal}>
                    <div className={InviteStyles['close']}>
                        <img onClick={closeInviteModal} src={CloseImg} alt="" />
                    </div>
                    <div className={InviteStyles['search']} >
                        <div>
                            <input type={'text'} placeholder="직원 검색"></input>
                            <img style={{height:'27px'}} src={SearchImg} alt="" />
                        </div>
                    </div>
                    <div /**직원 목록*/>
                        <div className={InviteStyles['label']} >
                            <label>전체 직원 목록</label>
                        </div>
                        <div className={InviteStyles['content']}  >
                            <EntireUserList userDatas={EntireUserDatas}/>
                        </div>

                    </div>
                </ReactModal>

                {/* Group Permission Modal */}
                <ReactModal 
                    isOpen={groupPermissionState.isOpen} // modalState.isOpen
                    shouldCloseOnOverlayClick={true}
                    onRequestClose={ () => setGroupPermissionState({isOpen: false}) }
                    className={GroupPermmissionStyles.Modal}>
                    <div className={GroupPermmissionStyles['close']}>
                        <img onClick={closeGroupPermissionModal} src={CloseImg} alt="" />
                    </div>
                    <div className={GroupPermmissionStyles['search']} >
                        <div>
                            <input type={'text'} placeholder="직원 검색"></input>
                            <img style={{height:'27px'}} src={SearchImg} alt="" />
                        </div>
                    </div>
                    <div /**직원 목록*/>
                        <div className={GroupPermmissionStyles['label']} >
                            <div>
                                <label style={{width: '55%'}}>이름</label>
                                <label style={{fontSize: '10px'}}>읽기<br/>전용</label>
                                <label style={{fontSize: '10px'}}>일반<br/>권한</label>
                                <label style={{fontSize: '10px'}}>관리<br/>권한</label>
                            </div>
                        </div>
                        <div className={GroupPermmissionStyles['content']}  >
                            <DeptUserList deptUserDatas={deptUserDatas}/>
                        </div>

                    </div>
                </ReactModal>
            </div>
            
            <div className="sidebar-user">
                <SidebarUser deptUserDatas={deptUserDatas}/>
            </div>
        </div>
    )
}