import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../LoginPage/Login.css";
import Logo from "../assets/images/white_black_logo.svg";
import axios from "axios";

const Login = ({ setAllinfo }) => {
  const refForm = useRef(null);

  const navigate = useNavigate();

  const [ID, setID] = useState("");
  const [Password, setPassword] = useState("");

  const handleID = (e) => {
    setID(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    console.log("왓냐");
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

      await axios
        .post(
          "http://localhost:8080/doki/user/login",
          `id=${ID}&password=${Password}`
        )
        .then((Response) => {
          
          if (Response.data !== "") {  
            sessionStorage.setItem('User', JSON.stringify(Response.data));
            
            setAllinfo(Response.data);
            navigate("/doki");
          } 
          else {
            alert("계정 정보를 확인하십시오.");
            setID("");
            setPassword("");
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

        {/* form form form form form form form form form form form form form form form form form form form form form form form form form form form form form form */}
        <form ref={refForm} onSubmit={handleSubmit}>
          {/* form form form form form form form form form form form form form form form form form form form form form form form form form form form form form form */}
          <div
            style={{
              textAlign: "left",
              fontSize: "12px",
              marginRight: "90%",
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
              onChange={handleID}
            />
          </div>
          <div
            style={{
              textAlign: "left",
              fontSize: "12px",
              marginRight: "85%",
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
              onChange={handlePassword}
            />
          </div>
          <div style={{ display: "inline-block", marginBottom: "8vh" }}>
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
