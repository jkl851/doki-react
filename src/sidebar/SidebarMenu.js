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
import DeptUserList from './DeptUserList'
import axios from 'axios';

ReactModal.setAppElement('#root');

export default function SidebarMenu() {
    const [inviteState, setInviteState] = useState({isOpen : false});
    const [groupPermissionState, setGroupPermissionState] = useState({isOpen : false});
    const [deptUserDatas, setDeptUserDatas] = useState([]);
    const [allUserDatas, setAllUserDatas] = useState([]);
    const [isInvited, setIsInvited] = useState([]);
    const [flag, setFlag] = useState([])

    const inviteClick = () => {
        setInviteState({isOpen: true})

    }

    const groupPermissionClick = () => {
        setGroupPermissionState({isOpen: true})
    }

    const closeInviteModal = async() => {
        setInviteState({isOpen: false})
        console.log(flag);
        // info : 닫았을 때 db를 먼저 때리고 response가 ok이면 sidebar deptUserDatas에 추가한다
        const insertData = flag.map((data,index) => {
            if( data === true ) {
                return allUserDatas[index]
            } else {
                return null;
            }
        })

        console.log("insertData")
        console.log(insertData)

        // surl부분 /api 설정으로 하는법 알아보기
        await axios.post('http://localhost:8080/doki/user/inviteUsers',
                // 체크된 데이터들을 담을 것
                insertData
            )
            .then((Response) => {
                console.log("====== insert 요청 성공! ======= ");
                console.log(Response.data)
                setDeptUserDatas(deptUserDatas => 
                    deptUserDatas = Response.data);
                console.log("=============================== ");

                // allUserDatas에 보낸 데이터(체크된 것)을 추가할 것

            })
            .catch((Error) => {console.error(Error)})
    }

    const closeGroupPermissionModal = async() => {
        setGroupPermissionState({isOpen: false})

        // url부분 /api 설정으로 하는법 알아보기
        await axios.put('http://localhost:8080/doki/user/updatePermission',
                [...deptUserDatas]
            )
            .then((Response) => {
                console.log("====== update 요청 성공! ======= ");
                console.log(Response);
                console.log("=============================== ");
            })
            .catch((Error) => {console.error(Error)})
    }

    useEffect(async() => {
        await axios.all([
            await axios.get('http://localhost:8080/doki/user/getUserList/' + '1'),   // 특정 부서 번호를 가지고 해당 부서의 참가자들 검색
            await axios.get('http://localhost:8080/doki/user/getAllUserList')        // 회사 전체 직원의 리스트 검색
        ]) 
        .then(
            axios.spread((res1, res2) => {
                console.log("====== get DeptUserList 요청! ======")
                setDeptUserDatas(deptUserDatas => 
                    deptUserDatas = res1.data);

                console.log("====== get AllUserList 요청! ======")
                setAllUserDatas(allUserDatas => 
                    allUserDatas = res2.data);
            })
        )
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
                            <EntireUserList 
                                userDatas={allUserDatas}
                                deptUserDatas={deptUserDatas}
                                isInvited={isInvited}
                                setIsInvited={setIsInvited}
                                flag={flag}
                                setFlag={setFlag}
                                />
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

                        {/* 부서 참가자별 권한 주는 부분 */}
                        <div className={GroupPermmissionStyles['content']}>
                            <DeptUserList
                                deptUserDatas={deptUserDatas}
                                setDeptUserDatas={setDeptUserDatas}
                                />
                        </div>

                    </div>
                </ReactModal>
            </div>
            
            <div className="sidebar-user">
                <SidebarUser 
                    deptUserDatas={deptUserDatas}
                    setDeptUserDatas={setDeptUserDatas}/>
            </div>
        </div>
    )
}