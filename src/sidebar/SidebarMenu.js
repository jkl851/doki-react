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

ReactModal.setAppElement("#root");

export default function SidebarMenu() {
  const [inviteState, setInviteState] = useState({ isOpen: false });
  const [groupPermissionState, setGroupPermissionState] = useState({
    isOpen: false,
  });

  const inviteClick = () => {
    setInviteState({ isOpen: true });
  };

  const groupPermissionClick = () => {
    setGroupPermissionState({ isOpen: true });
  };

  const closeInviteModal = () => {
    setInviteState({ isOpen: false });
  };

  const closeGroupPermissionModal = () => {
    setGroupPermissionState({ isOpen: false });
  };

  return (
    <div
      className="sidebar_menu"
      style={{
        display: "inline-block",
        width: "calc(100% - 73px)",
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
      <div id="sidebar_menu_DoKi">DoKi</div>
      <SidebarHash />
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

        <ReactModal isOpen={inviteState.isOpen} className={InviteStyles.Modal}>
          <div className={InviteStyles["close"]}>
            <img onClick={closeInviteModal} src={CloseImg} alt="" />
          </div>
          <div className={InviteStyles["search"]}>
            <div>
              <input type={"text"} placeholder="직원 검색"></input>
              <img style={{ height: "27px" }} src={SearchImg} alt="" />
            </div>
          </div>
          <div>
            <div className={InviteStyles["label"]}>
              <label>전체 직원 목록</label>
            </div>
            <div className={InviteStyles["content"]}>
              <div>
                <img src={SearchImg} alt="" />
                <label>이름 직급</label>
                <input type="checkbox"></input>
              </div>
              <div>
                <img src={SearchImg} alt="" />
                <label>이름 직급</label>
                <input type="checkbox"></input>
              </div>
              <div>
                <img src={SearchImg} alt="" />
                <label>이름 직급</label>
                <input type="checkbox"></input>
              </div>

              <div>
                <img src={SearchImg} alt="" />
                <label>이름 직급</label>
                <input type="checkbox"></input>
              </div>

              <div>
                <img src={SearchImg} alt="" />
                <label>이름 직급</label>
                <input type="checkbox"></input>
              </div>

              <div>
                <img src={SearchImg} alt="" />
                <label>이름 직급</label>
                <input type="checkbox"></input>
              </div>

              <div>
                <img src={SearchImg} alt="" />
                <label>이름 직급</label>
                <input type="checkbox"></input>
              </div>
            </div>
          </div>
        </ReactModal>

        <ReactModal
          isOpen={groupPermissionState.isOpen}
          className={GroupPermmissionStyles.Modal}
        >
          <div className={GroupPermmissionStyles["close"]}>
            <img onClick={closeGroupPermissionModal} src={CloseImg} alt="" />
          </div>
          <div className={GroupPermmissionStyles["search"]}>
            <div>
              <input type={"text"} placeholder="직원 검색"></input>
              <img style={{ height: "27px" }} src={SearchImg} alt="" />
            </div>
          </div>
          <div>
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
            <div className={GroupPermmissionStyles["content"]}>
              <div>
                <img src={SearchImg} alt="" />
                <label>이름 직급</label>
                <input type="radio" name="name1"></input>
                <input type="radio" name="name1"></input>
                <input type="radio" name="name1"></input>
              </div>

              <div>
                <img src={SearchImg} alt="" />
                <label>이름 직급</label>
                <input type="radio" name="name2"></input>
                <input type="radio" name="name2"></input>
                <input type="radio" name="name2"></input>
              </div>
              <div>
                <img src={SearchImg} alt="" />
                <label>이름 직급</label>
                <input type="radio" name="name3"></input>
                <input type="radio" name="name3"></input>
                <input type="radio" name="name3"></input>
              </div>
              <div>
                <img src={SearchImg} alt="" />
                <label>이름 직급</label>
                <input type="radio" name="name4"></input>
                <input type="radio" name="name4"></input>
                <input type="radio" name="name4"></input>
              </div>

              <div>
                <img src={SearchImg} alt="" />
                <label>이름 직급</label>
                <input type="radio" name="name5"></input>
                <input type="radio" name="name5"></input>
                <input type="radio" name="name5"></input>
              </div>

              <div>
                <img src={SearchImg} alt="" />
                <label>이름 직급</label>
                <input type="radio" name="name6"></input>
                <input type="radio" name="name6"></input>
                <input type="radio" name="name6"></input>
              </div>

              <div>
                <img src={SearchImg} alt="" />
                <label>이름 직급</label>
                <input type="radio" name="name7"></input>
                <input type="radio" name="name7"></input>
                <input type="radio" name="name7"></input>
              </div>

              <div>
                <img src={SearchImg} alt="" />
                <label>이름 직급</label>
                <input type="radio" name="name8"></input>
                <input type="radio" name="name8"></input>
                <input type="radio" name="name8"></input>
              </div>
            </div>
          </div>
        </ReactModal>
      </div>
      <SidebarUser />
    </div>
  );
}
