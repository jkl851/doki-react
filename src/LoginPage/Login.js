import React, { useState, useRef } from "react";
import "../LoginPage/Login.css";
import Logo from "../assets/images/white_black_logo.svg";
import axios from "axios";

const Login = () => {
  const refForm = useRef(null);

  const [ID, setID] = useState("");
  const [Password, setPassword] = useState("");

  const handleID = (e) => {
    setID(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (ID === "") {
        alert("사번이 비어있습니다.");
        return;
      }
      if (Password === "") {
        alert("비밀번호가 비어있습니다.");
        return;
      }
      const Data = { id: ID, password: Password };

      await axios
        .post("http://localhost:8080/doki/user/userCheck", Data, {
          withCredentials: true,
        })
        .then((Response) => {
          console.log(Response);
          console.log(Response.data);
          if (Response.data.id === ID) {
            alert("회원정보가 틀립니다.");
          }
          if (Response.data.result === "fail") {
            alert("회원정보가 틀립니다.");
          }
          if (
            Response.data.list.id === ID &&
            Response.data.list.password === Password
          ) {
            alert("로그인 성공");
          }
        })
        .catch((Error) => {
          console.log(Error);
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="area">
      <div
        style={{
          margin: "auto",
          height: "10vh",
          width: "100%",
        }}
      ></div>
      {/* 윗받침 */}
      <div className="login_form">
        <div>
          <img
            src={Logo}
            alt="logo"
            style={{
              width: "400px",
              height: "190px",
              marginTop: "10px",
              transform: "scale(1.2)",
            }}
          />
        </div>
        <div
          style={{ textAlign: "center", fontSize: "15px", fontWeight: "bold" }}
        >
          로그인
        </div>
        {/* form form form form form form form form form form form form form form form form form form form form form form form form form form form form form form */}
        <form ref={refForm} onSubmit={handleSubmit}>
          {/* form form form form form form form form form form form form form form form form form form form form form form form form form form form form form form */}
          <div
            style={{
              textAlign: "left",
              fontSize: "12px",
              marginLeft: "5px",
              marginBottom: "2px",
            }}
          >
            사번
          </div>
          <div>
            <input
              style={{
                width: "395px",
                borderRadius: "3px",
                height: "25px",
                paddingLeft: "5px",
                marginBottom: "15px",
                border: "1px solid #a2a3a5",
              }}
              type="text"
              name={"id"}
              value={ID}
              autoComplete="off"
              placeholder="사번"
              onChange={handleID}
            />
          </div>
          <div
            style={{
              textAlign: "left",
              fontSize: "12px",
              marginLeft: "5px",
              marginBottom: "2px",
            }}
          >
            비밀번호
          </div>
          <div>
            <input
              style={{
                width: "395px",
                borderRadius: "3px",
                height: "25px",
                paddingLeft: "5px",
                marginBottom: "15px",
                border: "1px solid #a2a3a5",
              }}
              type="password"
              name="password"
              value={Password}
              autoComplete="off"
              placeholder="비밀번호"
              onChange={handlePassword}
            />
          </div>
          <div style={{ display: "inline-block", marginBottom: "8vh" }}>
            <input
              type="checkbox"
              style={{
                width: "14px",
                height: "14px",
                border: "1px solid #a2a3a5",
              }}
            />
            <span
              style={{
                fontSize: "15px",
                fontWeight: "500",
              }}
            >
              로그인 상태 유지
            </span>
          </div>

          <div>
            <button
              style={{
                width: "400px",
                height: "35px",
                marginBottom: "10px",
                backgroundColor: "#5048e5",
                border: "none",
                color: "#fff",
              }}
              onSubmit={handleSubmit}
            >
              로그인
            </button>
          </div>

          {/* form form form form form form form form form form form form form form form form form form form form form form form form form form form form form form */}
        </form>
        {/* form form form form form form form form form form form form form form form form form form form form form form form form form form form form form form */}
        <div>
          <button
            style={{
              width: "400px",
              height: "35px",
              backgroundColor: "#fff",
              border: "1px solid #b2b3b5",
            }}
          >
            비밀번호 재설정
          </button>
        </div>
      </div>
      {/* 밑받침 */}
      <div
        style={{
          margin: "auto",
          height: "10vh",
          width: "100%",
        }}
      ></div>

      <ul className="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
};

export default Login;
