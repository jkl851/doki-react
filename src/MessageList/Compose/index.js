import React from "react";
import "./Compose.css";

export default function Compose(props) {
  return (
    <div className="compose">
      <input
        type="text"
        className="compose-input"
        placeholder="메시지를 입력하세요"
      />

      {props.rightItems}
    </div>
  );
}
