import React, { useState, useContext, useReducer, useEffect, Fragment } from "react";
import { MemoContext, memoReducer} from "./modules/MemoReducer";
import axios from "axios";

import MemoAlarm from "./Components/MemoAlarm";
import Palette from './Components/Palette';
import HashTagWindow from './Components/HashTagWindow';
import PostedHash from "./Components/PostedHash";

import styled from 'styled-components';
import {Button} from "@mui/material";
import PinIcon from '@mui/icons-material/PushPinOutlined';
import PinnedIcon from '@mui/icons-material/PushPin';
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

  // Create Hash State
  const [allHashDatas, setAllHashDatas] = useState([]);
  
  // 메모 토글 
  const [expandMemo, setExpandMemo] = useState(false);
  const [expandAlarm, setExpandAlarm] = useState(false);
  const [expandPalette, setExpandPalette] = useState(false);
  const [expandHashTag, setExpandHashTag] = useState(false);
  const [pinned, setPinned] = useState(false);

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
            [name]: value
        }
    })
    console.log(cmemo);
  }

  // 메모 추가 이벤트
  const addEvent = () => {
    if (cmemo.title === "" || cmemo.contents === "") {
      alert("제목이나 본문을 기입하세요");
      return memos
    }
    dispatch({ type: 'ADD_MEMO', memo: cmemo });

    // 초기화
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
    setPinned(false);

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

  const isPinned = () => {
    setPinned(!pinned);
  };
  
  // [soo] 임시로 전체 해시값 가져옴 => 나중에 allHashDatas를 전역 context로 옮겨야함
  useEffect(() => {
    axios.get(`http://localhost:8080/doki/hash/getAllHashList`)
    .then((Response) => {
        console.log('===== Get Hash 응답받음! =====')
        console.log(Response)
        console.log('=============================')
        setAllHashDatas(
            Response.data.map(data => {
                return {
                no: data.no,
                name: data.name,
                checked: false}
            })
        );
    })
    .catch((Error) => {console.log(Error)})
  }, [])
  /////////////////////////////////////////////////////////////////////////

  return (
    <div>
      <form className="create-memo-form" onMouseLeave={collapseCreateMemo}>
        <BackgroundColor className="input_wrapper" color={cmemo.color}>
            {/* 제목 */}
          { expandMemo ? ( 
              pinned ? (
                <Fragment>
                  <input
                  type="text"
                  placeholder="제목"
                  className="title_input"
                  value={cmemo.title}
                  name="title"
                  onChange={ (e) => {InputEvent(e.target.name, e.target.value)}}
                  />
                  <PinnedIcon 
                    className="pin_in_cmemo" name="pin"
                                    value="0" onClick={(e) => {InputEvent("pin", "0"); isPinned();}}/>
                </Fragment> 
              ) : (
                <Fragment>
                  <input
                  type="text"
                  placeholder="제목"
                  className="title_input"
                  value={cmemo.title}
                  name="title"
                  onChange={ (e) => {InputEvent(e.target.name, e.target.value)}}
                  />
                  <PinIcon className="pin_in_cmemo" name="pin" 
                                    value="1" onClick={(e) => {InputEvent("pin", "1"); isPinned();}}/>
               </Fragment>   
               )
          ) : (
            false
          )}
           
           {/* 본문 */}
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

          {/* 메모에 해시가 추가되는 부분 */}
          <div className="hash_box">
            {
              allHashDatas
                .filter(data => data.checked === true)
                .map((data, index) => {
                  return (<PostedHash
                    key={index}
                    name={data.name}
                  />)
                })
            }
          </div>

          
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
              {expandHashTag ? ( //false로 바꿔둠 (가리기용)
                <HashTagWindow
                  className="memoHashTag"
                  name="hashtag"
                  allHashDatas={allHashDatas}
                  setAllHashDatas={setAllHashDatas}
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
        </BackgroundColor>
      </form>
    </div>
  );
}