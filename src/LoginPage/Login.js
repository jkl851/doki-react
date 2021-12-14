import React from "react";
import "../LoginPage/Login.css";
import Logo from "../assets/images/white_black_logo.svg";

const Login = () => {
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
        <form>
          <div
            style={{
              textAlign: "left",
              fontSize: "12px",
              marginLeft: "5px",
              marginBottom: "2px",
            }}
          >
            아이디
          </div>
          <div>
            <input
              type="text"
              style={{
                width: "395px",
                height: "25px",
                paddingLeft: "5px",
                marginBottom: "15px",
                border: "1px solid #a2a3a5",
              }}
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
              type="text"
              style={{
                width: "395px",
                height: "25px",
                paddingLeft: "5px",
                marginBottom: "10px",
                border: "1px solid #a2a3a5",
              }}
            />
          </div>
          <div style={{ display: "inline-block", marginBottom: "10vh" }}>
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
          <div style={{ display: "inline-block" }}>
            <a href="#" style={{ marginLeft: "160px", textDecoration: "none" }}>
              비밀번호 찾기
            </a>
          </div>
        </form>
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
          >
            로그인
          </button>
        </div>
        <div>
          <button
            style={{
              width: "400px",
              height: "35px",
              backgroundColor: "#fff",
              border: "1px solid #b2b3b5",
            }}
          >
            회원가입{" "}
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
