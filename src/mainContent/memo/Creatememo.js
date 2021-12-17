import React, { useState, useContext, useReducer } from "react";
import { MemoContext, memoReducer} from "./modules/MemoReducer";

import MemoAlarm from "./Components/MemoAlarm";
import Palette from './Components/Palette';
import HashTag from './Components/HashTag';

import styled from 'styled-components';
import {Button} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AlarmAddIcon from "@mui/icons-material/AlarmAdd";
import PaletteIcon from "@mui/icons-material/PaletteOutlined";
import AddPhotoIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import HashTagIcon from "@mui/icons-material/Tag";

const BackgroundColor = styled.div`
  background: ${({ color }) => color}
`
// 메모 처음 값
const memoInitialState = {
  no:"",
  title: "",
  contents: "",
  time: new Date(),
  color: "#FFFFFF",
  hash: [],
  pin: "0",
  visible: "1"
};

export default function CreateMemo() {
  // 전역 컨텍스트
  const [ memos, dispatch ] = useContext(MemoContext);

  // Create Memo State
  const [ cmemo, setCmemo] = useState(memoInitialState);
  
  // 메모 토글 
  const [expandMemo, setExpandMemo] = useState(false);
  const [expandAlarm, setExpandAlarm] = useState(false);
  const [expandPalette, setExpandPalette] = useState(false);
  const [expandHashTag, setExpandHashTag] = useState(false);

  const photoEvent = (event) => {
    const name = event.target.name;
    alert(`${name} 메모의 이미지삽입 : 개발중`);
  };

  const hashTagEvent = () => {
    setExpandHashTag(!expandHashTag);
  };
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
    if (cmemo.title === "" || cmemo.content === "") {
      alert("제목이나 본문을 기입하세요");
      return memos
    }
    dispatch({ type: 'ADD_MEMO', memo: cmemo });

    setCmemo({
      no:"",
      title: "",
      contents: "",
      time: new Date(),
      color: "#FFFFFF",
      hash: [],
      pin: "0",
      visible: "1"
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
          {true ? (
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

          {true ? (
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

              {/* Palette */}
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

              {/* Photo */}
              <Button className="photoButton" onClick={photoEvent}>
                <AddPhotoIcon className="add-photo" color="action" />
              </Button>
                
              {/* HashTag */}
              <Button onClick={hashTagEvent}>
                <HashTagIcon color="action" />
              </Button>
              {true ? (
                <HashTag
                  className="memoHashTag"
                  name="hashtag"
                  // cmemo={cmemo}
                  // InputEvent={InputEvent}
                />
              ) : (
                false
              )}

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