import React, {Fragment, useState, useRef } from 'react';
import '../assets/css/normaltop.css'
import Modal from 'react-modal';
import updateUserModalStyles from "../assets/css/userupdatemodal.module.css";
import user from '../assets/images/user 1.png';
import { IoIosContact } from "react-icons/io";


Modal.setAppElement('body');

export default function MemoAlarmModal() {
    let no = 2;

    const refForm = useRef(null);

    //유저 업데이트 Modal
    const [userUpdateModalData, setUserUpdateModalData] = useState({isOpen: false});
    const updateUserInfo = (no) => {
        setUserUpdateModalData({
            no: no,
            isOpen: true,
            name: 'JE원호짱12',
            email: 'douzone@gmail.com',
            comment: '견.뎌!',
            password: '',
            passwordcheck: ''
        })
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

           
            const response = await fetch(`/doki/user/update/${userUpdateModalData.no}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    no: userUpdateModalData.no,
                    password: userUpdateModalData.password,
                    email: userUpdateModalData.email,
                    comment: userUpdateModalData.comment
                })
            });

            if(!response.ok) {
                throw  `${response.status} ${response.statusText}`;
            }

            const json = await response.json();

            // 비밀번호가 틀린 경우
            if(json.data === null) {
                alert('비밀번호가 일치하지 않습니다.');
                setUserUpdateModalData(Object.assign({}, userUpdateModalData, {
                    password: '',
                    passwordcheck: ''
                }));
                
                return;
            }

            // 유저 정보 변경이 성공한 경우
            setUserUpdateModalData({
                isOpen: false,
                password:'',
                passwordcheck:''
            });
            
            // notifyMessage.delete(parseInt(json.data));

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