import React, { Fragment, useState, useRef } from "react";
import "../assets/css/normaltop.css";
import Modal from "react-modal";
import updateUserModalStyles from "../assets/css/userupdatemodal.module.css";
import logo from "../assets/images/white_black_logo.png";
import { IoIosContact } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";

Modal.setAppElement("body");

export default function MemoAlarmModal({ allinfo }) {
  let UserImg = null;
  let no = allinfo.no;
  if(allinfo.no !== null){
    UserImg= "https://randomuser.me/api/portraits/men/" + (allinfo.no) + ".jpg"
  }
  
  const navigate = useNavigate();

  const refForm = useRef(null);

  //유저 업데이트 Modal
  const [userUpdateModalData, setUserUpdateModalData] = useState({
    isOpen: false,
  });
  const updateUserInfo = async (no) => {
    await axios
      .get(`http://localhost:8080/doki/user/findUser/${no}`)
      .then((Response) => {
        console.log("유저정보호출 : " + JSON.stringify(Response.data));
        setUserUpdateModalData({
          no: Response.data.no,
          departmentName: Response.data.departmentName,
          position: Response.data.position,
          name: Response.data.userName,
          email: Response.data.email,
          comment: Response.data.comment,
          password: Response.data.password,
          passwordcheck: Response.data.passwordcheck,
          isOpen: true,
        });
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  // 유저 로그 아웃
  const logout = async () => {
    await axios
      .get(`http://localhost:8080/doki/user/logout`)
      .then((Response) => {
        if (Response.data === "세션 제거") {
          sessionStorage.removeItem('User');
          sessionStorage.clear();
          navigate("/login");
        }
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  //유저 업데이트 Modal submit 작업
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //비밀번호 유효성 검사
      if (e.target.password.value === "") {
        alert("비밀번호가 비어있습니다.");
        return;
      }
      if (e.target.passwordcheck.value === "") {
        alert("비밀번호 확인이 비어있습니다.");
        return;
      }

      if (!(e.target.password.value === e.target.passwordcheck.value)) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }

      //유저 정보 수정 axios
      await axios({
        method: "post",
        url: `http://localhost:8080/doki/user/update/${no}`,
        //axios 자동으로 json 변환?
        data: {
          no: `${no}`,
          email: e.target.email.value,
          comment: e.target.comment.value,
          password: e.target.password.value,
        },
      })
        .then((Response) => {
          console.log(
            no + "번 유저정보변경! : " + JSON.stringify(Response.data)
          );

          // 비밀번호가 틀린 경우
          if (JSON.stringify(Response.data) == "false") {
            alert("비밀번호가 일치하지 않습니다.");
            setUserUpdateModalData(
              Object.assign({}, userUpdateModalData, {
                password: "",
                passwordcheck: "",
                isOpen: true,
              })
            );

            //실패시 password로 focus()
            e.target.password.focus();
            return;
          }

          // 유저 정보 변경이 성공한 경우
          setUserUpdateModalData({
            isOpen: false,
            password: "",
            passwordcheck: "",
          });
        })
        .catch((Error) => {
          console.log(Error);
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Fragment>
      <a onClick={() => updateUserInfo(no)} href="#about">
        <IoIosContact />
      </a>

      {/* 유저 프로필 수정 Modal */}
      <Modal
        isOpen={userUpdateModalData.isOpen}
        onRequestClose={() => setUserUpdateModalData({ isOpen: false })}
        shouldCloseOnOverlayClick={true}
        className={updateUserModalStyles.Modal}
        overlayClassName={updateUserModalStyles.Overlay}
        style={{ content: { width: 350, border: "1px solid #b2b3b5" } }}
      >
        <div className={updateUserModalStyles["logoBox"]}>
          <img src={logo} />
        </div>

        <div className={updateUserModalStyles["mid"]}>
          <img style={{borderRadius:"100px", width:"72px", height:"72px"}} src={UserImg} alt="profile" />
          <div>{userUpdateModalData.name}</div>
        </div>
        <div className={updateUserModalStyles["form_wrapper"]}>
          <form ref={refForm} onSubmit={handleSubmit}>
            <label
              style={{
                marginRight: "250px",
                fontSize: "15px",
                marginBottom: "2px",
              }}
            >
              부서
            </label>
            <p>
              <input
                style={{ width: "285px", height: "25px", paddingLeft: "5px" }}
                type={"text"}
                name={"departmentName"}
                // defaultValue={userUpdateModalData.password}
                value={userUpdateModalData.departmentName}
                autoComplete={"off"}
                readOnly
              />
            </p>
            <label
              style={{
                marginRight: "250px",
                fontSize: "15px",
                marginBottom: "2px",
              }}
            >
              직책
            </label>
            <p>
              <input
                style={{ width: "285px", height: "25px", paddingLeft: "5px" }}
                type={"text"}
                name={"passwordcheck"}
                value={userUpdateModalData.position}
                // defaultValue={userUpdateModalData.passwordcheck}
                autoComplete={"off"}
                placeholder={"비밀번호 확인"}
                readOnly
              />
            </p>
            <label
              style={{
                marginRight: "240px",
                fontSize: "15px",
                marginBottom: "2px",
              }}
              
            >
              이메일
            </label>
            <p>
              <input
                style={{
                  width: "285px",
                  height: "25px",
                  paddingLeft: "5px",
                }}
                type={"text"}
                name={"email"}
                defaultValue={userUpdateModalData.email}
                autoComplete={"off"}
                placeholder={"이메일"}
                readOnly
              />
            </p>
            <label
              style={{
                marginRight: "210px",
                fontSize: "15px",
                marginBottom: "2px",
                
              }}
              
            >
              상태메세지
            </label>
            <p>
              <input
                style={{ width: "285px", height: "25px", paddingLeft: "5px" }}
                type={"text"}
                name={"comment"}
                defaultValue={userUpdateModalData.comment}
                autoComplete={"off"}
                placeholder={"상태메세지"}
                readOnly
              />
            </p>
          </form>
          <div className={updateUserModalStyles["modal-dialog-buttons"]}>
            <button
              style={{
                width: "125px",
                marginTop: "20px",
                backgroundColor: "#fff",
                color: "black",
              }}
              onClick={logout}
            >
              로그 아웃
            </button>
            <button
              style={{
                width: "125px",
                marginTop: "20px",
                backgroundColor: "#5048e5",
                color: "white",
              }}
            >
              확인
            </button>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
}
