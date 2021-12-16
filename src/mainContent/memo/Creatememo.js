import React, { useState, useContext } from "react";
import { MemoContext} from "./modules/MemoReducer";

import MemoAlarm from "./Components/MemoAlarm";
import Palette from './Components/Palette';

import styled from 'styled-components';
import {Button} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AlarmAddIcon from "@mui/icons-material/AlarmAdd";
import PaletteIcon from "@mui/icons-material/PaletteOutlined";
import AddPhotoIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import HashTag from "@mui/icons-material/Tag";

const BackgroundColor = styled.div`
  background: ${({ color }) => color}
`

const memoInitialState = {
  no:"",
  title: "",
  contents: "",
  time: new Date(),
  color: "#FFFFFF",
  hash: []
};

export default function (passMemo) {
  // 전역 컨텍스트
  const [ memo, dispatch ] = useContext(MemoContext);

  // Create Memo State
  const [ cmemo, setCmemo] = useState(memoInitialState);
  
  // 메모 토글 
  const [expandMemo, setExpandMemo] = useState(false);
  const [expandAlarm, setExpandAlarm] = useState(false);
  const [expandPalette, setExpandPalette] = useState(false);

  const photoEvent = (event) => {
    const name = event.target.name;
    alert(`${name} 메모의 이미지삽입 : 개발중`);
  };

  const hashTagEvent = (event) => {
    const name = event.target.name;
    alert(`${name} 메모의 해쉬태그달기 : 개발중`);
  };
'#f28b82'
  // 메모 value 추가 이벤트
  const InputEvent = (name, value) => {
    setCmemo( (prevValue) => {
        return{
            ...prevValue,
            [name]:value
        }
    })
  }

  // 메모 추가 이벤트
  const addEvent = () => {
    passMemo.passMemo(cmemo);
    setCmemo({
      no:"",
      title: "",
      contents: "",
      time: new Date(),
      color: "#FFFFFF",
      hash: []
    })
  };

  // 토글에 따른 메모 버튼 활성화
  const expandCreateMemo = () => {
    setExpandMemo(true);
  };
  
  const collapseCreateMemo = () => {
    setExpandMemo(false);
  };

  const expandAlarmTable = () => {
    setExpandAlarm(!expandAlarm);
  };

  const expandPaletteTable = () => {
    setExpandPalette(!expandPalette);
  };

  return (
    <div>
      <form onMouseLeave={collapseCreateMemo}>
        <BackgroundColor className="input_wrapper" color={cmemo.color}>
          {expandMemo ? (
            <input
              type="text"
              placeholder="제목"
              className="title_input"
              value={cmemo.title}
              name="title"
              onChange={ (e) => {InputEvent(e.target.name, e.target.value)}}
            />
          ) : (
            false
          )}

          <textarea
            rows="6"
            column="20"
            placeholder=">"
            className="description_input"
            value={cmemo.contents}
            name="contents"
            onChange={(e) => {InputEvent(e.target.name, e.target.value)}}
            onMouseEnter={expandCreateMemo}
          ></textarea>

          {expandMemo ? (
            <div className="buttons-div" style={{ textAlign: "center" }}>
              <div className="alarm-div">
                <Button className="alarmButton" onClick={expandAlarmTable}>
                  <AlarmAddIcon className="add-alarm" color="action" />
                </Button>
                {expandAlarm ? (
                  <div className="alarm-div-dropdown">
                    <MemoAlarm className="memoAlarm" cmemo={cmemo} InputEvent={InputEvent} />
                  </div>
                ) : (
                  false
                )}
              </div>

              <Button className="paletteButton" onClick={expandPaletteTable}>
                <PaletteIcon className="add-palette" color="action" />
              </Button>
              {expandPalette ? (
                <Palette
                  className="memoPalette"
                  name="color"
                  cmemo={cmemo}
                  InputEvent={InputEvent}
                />
              ) : (
                false
              )}

              <Button className="photoButton" onClick={photoEvent}>
                <AddPhotoIcon className="add-photo" color="action" />
              </Button>
    
              <Button onClick={hashTagEvent}>
                <HashTag color="action" />
              </Button>

              <Button className="addButton" onClick={addEvent}>
                <AddIcon className="add-icon" />
              </Button>
            </div>
          ) : (
            false
          )}
        </BackgroundColor>
      </form>
    </div>
  );
}