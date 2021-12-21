import React from "react";
import "./Compose.css";
import ToolbarButton from '../ToolbarButton';
import 'react-ionicons';

export default function Compose(props) {

  const sendTextValue = (e) => {
    if(e.key == 'Enter') { 
      props.getTextValue(e.target.value);

      e.target.value = '';
      e.target.focus();
    }
  };

  return (
    <div className="compose">
          <input
            type="text"
            className="compose-input"
            placeholder="메시지를 입력하세요"
            autoComplete="off"
            onKeyDown={sendTextValue}
          />

        {/* 검색어 전송 아이콘 */}
        <ToolbarButton
          className="send"
          key="send"
          Ionicon="ion-ios-send"
          callBackOnClick={() => refForm.current.dispatchEvent(new Event('submit', { bubbles: true }))}
        />
        {
              props.rightItems
            }
   </div>

  );
}
