import React, { useEffect, useRef, useState } from "react";
import "../assets/css/sidebar.css";
import SidebarHash from "./SidebarHash";
import SidebarUser from "./SidebarUser";
import VectorImg from "../assets/images/Vector2.png";
import RuedaDentadaImg from "../assets/images/RuedaDentada.png";
import PlusImg from "../assets/images/Plus.png";
import ReactModal from "react-modal";
import InviteStyles from "../assets/css/modal/invite.module.css";
import GroupPermmissionStyles from "../assets/css/modal/grouppermission.module.css";
import SearchImg from "../assets/images/Search.png";
import CloseImg from "../assets/images/Close.png";
import EntireUserList from "./EntireUserList";
import DeptUserList from "./DeptUserList";
import axios from "axios";

ReactModal.setAppElement("#root");

export default function SidebarMenu({ division , hashKeyword, setHashKeyword}) {
    // division은 부서 번호
    const [inviteState, setInviteState] = useState({ isOpen: false });
    const [groupPermissionState, setGroupPermissionState] = useState({
        isOpen: false,
    });
    const [deptUserDatas, setDeptUserDatas] = useState([]);
    const [copiedDeptUserDatas, setCopiedDeptUserDatas] = useState([]);
    const [allUserDatas, setAllUserDatas] = useState([]);
    const [isInvited, setIsInvited] = useState([]);
    const [flag, setFlag] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [allUserKeyword, setAllUserKeyword] = useState("");
    const [deptUserKeyword, setDeptUserKeyword] = useState("");

    const onChangeDeptUserSearchKey = async (e) => {
        setDeptUserKeyword(e.target.value);
    };

    const onChangeAllUserSearchKey = async (e) => {
        setAllUserKeyword(e.target.value);
    };

    const inviteClick = () => {
        setInviteState({ isOpen: true });
    };

    const groupPermissionClick = () => {
        setGroupPermissionState({ isOpen: true });
        setCopiedDeptUserDatas(deptUserDatas);  // 부서 모달을 클릭 시의 부서 유저 상태를 복사해둔다 => 바깥 클릭으로 닫았을 때 다시 돌리기 위함
    };

    // [soo] 초대 모달에서 x버튼 클릭 시 해당 부서로 직원 초대
    const closeInviteModal = async () => {
        setInviteState({ isOpen: false });
        console.log(flag);
        if (flag.length === 0) {    // 체크된 직원이 없으면 아무것도 안한다
            console.log("체크한 사람이 없음")
            return;
        }

        // 부서에 초대할 때는 해당 유저의 departmentNo는 다른 부서에도 존재할 수 있기 때문에 
        // 초대하고자 하는 부서의 번호(division)로 초대해야한다
        const insertData = flag
            .map((data, index) => {
                if (data === true) {
                    return { ...allUserDatas[index], departmentNo: division };
                } else {
                    return null;
                }
            })
            .filter((data) => {
                if (data !== null) {
                    return data;
                }
            });

        console.log("=====insertData=====");
        console.log(insertData);

        // url부분 /api 설정으로 하는법 알아보기
        await axios
            // 체크된 데이터들을 담을 것
            .post(
                "http://localhost:8080/doki/user/inviteUsers",
                
                insertData
            )
            .then((Response) => {
                console.log("====== insert 요청 성공! ======= ");
                console.log(Response.data);
                setDeptUserDatas(
                    (deptUserDatas) => (deptUserDatas = Response.data)
                    
                );
                console.log("=============================== ");
                setFlag([])
            })
            .catch((Error) => {
                console.error(Error);
            });
    };

    // [soo] 부서 모달의 x 버튼 클릭 시 권한 설정한 것을 업데이트 한다
    const closeGroupPermissionModal = async () => {
        setGroupPermissionState({ isOpen: false });

        const updateArr = deptUserDatas.map(data => {
            return data.changed === true ? data : undefined;
        }).filter(data => {
            return data !== undefined;
        })

        console.log("====== updata Arr =====")
        console.log(updateArr)
        console.log("=======================")

        if(updateArr.length === 0){
            console.log("권한 변경 사항 없음")
            return
        }

        // url부분 /api 설정으로 하는법 알아보기
        await axios
            .post(
                "http://localhost:8080/doki/user/updatePermission",
                updateArr
            )
            .then((Response) => {
                console.log("====== update 요청 성공! ======= ");
                console.log(Response);
                console.log("=============================== ");
                setDeptUserDatas(datas => {
                    return datas.map(data => {
                        return {
                            ...data,
                            "changed" : false
                        }
                    })
                })
            })
            .catch((Error) => {
                console.error(Error);
            });
    };

    // 최초 로딩 시 모든 직원의 리스트와 해당 부서의 직원을 가져온다
    useEffect(async () => {
        await axios
            .all([
                // 특정 부서 번호를 가지고 해당 부서의 참가자들 검색
                await axios.get(
                    "http://localhost:8080/doki/user/getUserList/" + division   // res1
                ), 
                // 회사 전체 직원의 리스트 검색
                await axios.get(
                    "http://localhost:8080/doki/user/getAllUserList"            // res2
                ), 
            ])
            .then(
                axios.spread((res1, res2) => {
                    console.log("====== get DeptUserList 요청! ======");
                    console.log(res1.data)
                    setDeptUserDatas(res1.data);

                    console.log("====== get AllUserList 요청! ======");
                    console.log(res2.data)
                    setAllUserDatas(res2.data)
                })
            )
            .catch((Error) => {
                console.log(Error);
            });
    }, [division]); // division의 값이 변할 때 마다 실행 된다

    return (
        <div
            className="sidebar_menu"
            style={{
                display: "inline-block",
                width: "70%",
                height: "100%",
                margin: "0px 5px 0px 8px",
                wordBreak: "break-all",
                wordWrap: "break-word",
                float: "left",
                overflowY: "auto",
                backgroundColor: "#f2f3f5",
            }}
        >
            <br />
            <div>DoKi</div>
            <SidebarHash division={division} hashKeyword={hashKeyword} setHashKeyword={setHashKeyword}/> 
            <div>
                <img src={VectorImg} alt="" />
            </div>
            <br />

            <div>
                <span>참가자</span>
                <img
                    onClick={groupPermissionClick}
                    style={{
                        float: "right",
                        width: "20px",
                        height: "20px",
                        marginRight: "5px",
                    }}
                    src={RuedaDentadaImg}
                    alt=""
                />
                <img
                    onClick={inviteClick}
                    style={{
                        float: "right",
                        width: "17px",
                        height: "17px",
                        marginRight: "10px",
                    }}
                    src={PlusImg}
                    alt=""
                />

                {/* Invite Modal */}
                <ReactModal
                    isOpen={inviteState.isOpen} // modalState.isOpen
                    onRequestClose={() => {
                        setInviteState({ isOpen: false });
                        setFlag([]);
                    }}
                    shouldCloseOnOverlayClick={true}
                    onAfterClose={() => {
                        setAllUserKeyword("");
                    }}
                    className={InviteStyles.Modal}
                >
                    <div className={InviteStyles["close"]}>
                        <img onClick={closeInviteModal} src={CloseImg} alt="" />
                    </div>
                    <div className={InviteStyles["search"]}>
                        <div>
                            <input
                                onChange={onChangeAllUserSearchKey}
                                vluae={allUserKeyword}
                                type={"text"}
                                placeholder="직원 검색"
                            ></input>
                            <img
                                style={{ height: "27px" }}
                                src={SearchImg}
                                alt=""
                            />
                        </div>
                    </div>
                    <div /**직원 목록*/>
                        <div className={InviteStyles["label"]}>
                            <label>전체 직원 목록</label>
                        </div>
                        <div className={InviteStyles["content"]}>
                            <EntireUserList
                                allUserDatas={allUserDatas}
                                deptUserDatas={deptUserDatas}
                                isInvited={isInvited}
                                setIsInvited={setIsInvited}
                                flag={flag}
                                setFlag={setFlag}
                                allUserKeyword={allUserKeyword}
                            />
                        </div>
                    </div>
                </ReactModal>

                {/* Group Permission Modal */}
                <ReactModal
                    isOpen={groupPermissionState.isOpen} // modalState.isOpen
                    shouldCloseOnOverlayClick={true}
                    onRequestClose={() =>{
                        setGroupPermissionState({ isOpen: false });
                        setDeptUserDatas(copiedDeptUserDatas)}  // 부서 모달에서 바깥을 클릭하면 수정되기 전의 부서 유저 정보를 적용한다
                    }
                    onAfterClose={() => setDeptUserKeyword("")}
                    className={GroupPermmissionStyles.Modal}
                >
                    <div className={GroupPermmissionStyles["close"]}>
                        <img
                            onClick={closeGroupPermissionModal}
                            src={CloseImg}
                            alt=""
                        />
                    </div>
                    <div className={GroupPermmissionStyles["search"]}>
                        <div>
                            <input
                                onChange={onChangeDeptUserSearchKey}
                                vluae={deptUserKeyword}
                                type={"text"}
                                placeholder="직원 검색"
                            ></input>
                            <img
                                style={{ height: "27px" }}
                                src={SearchImg}
                                alt=""
                            />
                        </div>
                    </div>
                    <div /**직원 목록*/>
                        <div className={GroupPermmissionStyles["label"]}>
                            <div>
                                <label style={{ width: "55%" }}>이름</label>
                                <label style={{ fontSize: "10px" }}>
                                    읽기
                                    <br />
                                    전용
                                </label>
                                <label style={{ fontSize: "10px" }}>
                                    일반
                                    <br />
                                    권한
                                </label>
                                <label style={{ fontSize: "10px" }}>
                                    관리
                                    <br />
                                    권한
                                </label>
                            </div>
                        </div>

                        {/* 부서 참가자별 권한 주는 부분 */}
                        <div className={GroupPermmissionStyles["content"]}>
                            <DeptUserList
                                deptUserDatas={deptUserDatas}
                                setDeptUserDatas={setDeptUserDatas}
                                keyword={deptUserKeyword}
                            />
                        </div>
                    </div>
                </ReactModal>
            </div>

            <div className="sidebar-user">
                <SidebarUser
                    deptUserDatas={deptUserDatas}
                    keyword={keyword}
                    setKeyword={setKeyword}
                />
            </div>
        </div>
    );
}
