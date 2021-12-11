import React, {Fragment, useState, useRef } from 'react';
import '../assets/css/normaltop.css'
import Modal from 'react-modal';
import updateUserModalStyles from "../assets/css/userupdatemodal.module.css";
import user from '../assets/images/user 1.png';
import { IoIosContact } from "react-icons/io";
import axios from "axios";


Modal.setAppElement('body');

export default function MemoAlarmModal() {
    let no = 2;

    const refForm = useRef(null);

    //유저 업데이트 Modal
    const [userUpdateModalData, setUserUpdateModalData] = useState({isOpen: false});
    const updateUserInfo = async(no) => {        
            await axios.get(`http://localhost:8081/doki/user/findUser/${no}`)
            .then((Response) => {
                console.log("유저정보호출 : " + JSON.stringify(Response.data.list));
                setUserUpdateModalData({
                    no: Response.data.list.no,
                    name: Response.data.list.userName,
                    email: Response.data.list.email,
                    comment: Response.data.list.comment,
                    password: Response.data.list.password,
                    passwordcheck: Response.data.list.passwordcheck,
                    isOpen: true
                });        
            })
            .catch((Error) => {console.log(Error)})
    }
      
    
    //유저 업데이트 Modal submit 작업
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //비밀번호 유효성 검사
            if(e.target.password.value === '') {
                alert("비밀번호가 비어있습니다.");
                return;
            }
            if(e.target.passwordcheck.value === '') {
                alert("비밀번호 확인이 비어있습니다.");
                return;
            }

            if(!(e.target.password.value === e.target.passwordcheck.value)) {
                alert("비밀번호가 일치하지 않습니다.");
                return;      
            }

            //유저 정보 수정 axios
            await axios({
                method: 'put',
                url: `http://localhost:8081/doki/user/update/${no}`,
                //axios 자동으로 json 변환?
                data: {
                    no: `${no}`,
                    email: e.target.email.value,
                    comment: e.target.comment.value,
                    password: e.target.password.value
                }
            })
            .then((Response) => {
                console.log(no + "번 유저정보변경! : " + (JSON.stringify(Response.data)))
                    
                    // 비밀번호가 틀린 경우
                    // 물어보자 용수
                    if((JSON.stringify(Response.data)) == 'false') {
                        alert('비밀번호가 일치하지 않습니다.');
                        setUserUpdateModalData(Object.assign({}, userUpdateModalData, {                            
                            password: '',
                            passwordcheck: '',
                            isOpen: true
                        }));


                        console.log(userUpdateModalData);
                        return;
                    }

                // 유저 정보 변경이 성공한 경우
                setUserUpdateModalData({
                    isOpen: false,
                    password:'',
                    passwordcheck:''

                });


            })
            .catch((Error) => {console.log(Error)})




        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Fragment>
            <a onClick={() => updateUserInfo(no)} href="#about"><IoIosContact /></a>

           {/* 유저 프로필 수정 Modal */}
           <Modal
                isOpen={userUpdateModalData.isOpen}
                onRequestClose={ () => setUserUpdateModalData({isOpen: false}) }
                shouldCloseOnOverlayClick={true}
                className={updateUserModalStyles.Modal}
                overlayClassName={updateUserModalStyles.Overlay}
                style={{content: {width: 350}}}
                >
                <h1>
                    <div>
                        <img src={user} className={updateUserModalStyles['user-profile']} alt='profile' />
                    </div>
                    {userUpdateModalData.name}
                </h1>
                <div>
                    <form
                        ref={refForm}
                        onSubmit={handleSubmit}
                        >
                        <label>비밀번호</label>
                        <p>
                            <input
                                type={'password'}
                                name={'password'}
                                // defaultValue={userUpdateModalData.password}
                                autoComplete={'off'}
                                placeholder={'비밀번호'}
                                onChange={(e) => setUserUpdateModalData(Object.assign({}, userUpdateModalData, {password: e.target.value}))}
                                />
                        </p>
                        <label>비밀번호 확인</label>
                        <p>
                            <input
                                type={'password'}
                                name={'passwordcheck'}
                                // defaultValue={userUpdateModalData.passwordcheck}
                                autoComplete={'off'}
                                placeholder={'비밀번호 확인'}
                                onChange={(e) => setUserUpdateModalData(Object.assign({}, userUpdateModalData, {passwordcheck: e.target.value}))}
                                />
                        </p>
                        <label>이메일</label>
                        <p>
                            <input
                                type={'text'}
                                name={'email'}
                                defaultValue={userUpdateModalData.email}
                                autoComplete={'off'}
                                placeholder={'이메일'}
                                onChange={(e) => setUserUpdateModalData(Object.assign({}, userUpdateModalData, {email: e.target.value}))}
                                />
                        </p>
                        <label>상태메세지</label>
                        <p>
                            <input
                                type={'text'}
                                name={'comment'}
                                defaultValue={userUpdateModalData.comment}
                                autoComplete={'off'}
                                placeholder={'상태메세지'}
                                onChange={(e) => setUserUpdateModalData(Object.assign({}, userUpdateModalData, {comment: e.target.value}))}
                                />
                        </p>
                    </form>
                    <div className={updateUserModalStyles['modal-dialog-buttons']}>
                        <button onClick={ () => {
                            refForm.current.dispatchEvent(new Event("submit", {cancelable: true, bubbles: true}));
                        } }>수정 완료</button>
                    </div>
                </div>
            </Modal>            
        </Fragment>
    );
}