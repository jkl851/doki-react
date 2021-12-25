import React from "react";
import PropTypes from "prop-types";
import alarmModalStyles from "../assets/css/alarmmodal.module.css";
import noneImg from '../../src/assets/images/katalk.png'

export default function MemoMessage({
  userNo,
  userName,
  position,
  contents,
  departmentNo,
  departmentName,
  pageMovement,
}) {
  let UserImg = null;
  if(userNo !== null || userNo !== undefined){
    UserImg = "https://randomuser.me/api/portraits/men/" + (userNo) + ".jpg"  
  } else {
    UserImg = noneImg;
  }
  

  return (
    <div
      className={alarmModalStyles.content}
      onClick={() => pageMovement(departmentNo)}
      style={{ cursor: "pointer", height: "80px" }}
    >
      <div
        className={alarmModalStyles.profile}
        style={{ borderRight: "1px solid rgba(170, 170, 170, 0.3)" }}
      >
        <img
          style={{
            borderRadius:"100px",
            transform: "scale(0.3)",
            margin: "-28px 0px 0px -42px",
          }}
          src={UserImg}
          className={alarmModalStyles["user-profile"]}
          alt="profile"
        />
      </div>
      <div
        style={{
          float: "left",
          marginLeft: "2px",
          paddingTop: "4px",
          //   border: "1px solid blue",
          height: "100%",
        }}
      >
        <div
          style={{
            // border: "1px solid purple",
            height: "40%",
            fontWeight: "bolder",
            fontSize: "18px",
            width: "180px",
          }}
        >{`${userName} ${position} (${departmentName})`}</div>

        <div
          style={{
            // border: "1px solid magenta",
            height: "60%",
            width: "180px",
            textOverflow: "ellipsis",
            borderTop: "1px solid rgba(170, 170, 170, 0.3)",
          }}
        >{`${contents}`}</div>
      </div>
    </div>
  );
}

MemoMessage.propTypes = {
  departmentNo: PropTypes.number.isRequired
};
