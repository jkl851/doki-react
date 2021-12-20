import React, { useState, useContext, Fragment } from "react";
import { MemoContext } from "./modules/MemoReducer"

import MemoAlarm from "./Components/MemoAlarm";
import Palette from './Components/Palette';

import styled from 'styled-components';
import {Button} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AlarmAddIcon from "@mui/icons-material/AlarmAdd";
import PaletteIcon from "@mui/icons-material/PaletteOutlined";
import AddPhotoIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import HashTag from "@mui/icons-material/Tag";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PinIcon from "@mui/icons-material/PushPinOutlined";
import PinnedIcon from "@mui/icons-material/PushPin";


// 컬러 변경 적용
const BackgroundColor = styled.div`
  background: ${({ color }) => color};
  Button {
    color: ${({ color }) => color};
  }
`

export default function(memo) {
  const [ memos, dispatch ] = useContext(MemoContext);
  var id = memo.id
  var pin = memo.pin

  // 메모 토글 
  const [expandMemo, setExpandMemo] = useState(false);
  const [expandAlarm, setExpandAlarm] = useState(false);
  const [expandPalette, setExpandPalette] = useState(false);

   // 메모삭제
  const deleteMemo = () => {
    dispatch({ type: 'DEL_MEMO', id, pin});
  };

  const photoEvent = (event) => {
      const name = event.target.name;
      alert(`${name} 메모의 이미지삽입 : 개발중`);
  };
  
  const hashTagEvent = (event) => {
      const name = event.target.name;
      alert(`${name} 메모의 해쉬태그달기 : 개발중`);
  };

 //메모 수정 확인
  const addEvent = () => {
    // passMemo.passMemo(memo);
    // dispatch({type: 'INITIALIZE'})
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


  return(
  
      <Fragment>
              { expandMemo ? (
                  <div>
                  <form className="create-memo-form" onMouseLeave={collapseCreateMemo}>
                    <BackgroundColor className="input_wrapper" color={memo.color}>
                            <Fragment>
                                <input
                                    type="text"
                                    placeholder="제목"
                                    className="title_input"
                                    value={memo.title}
                                    name="title"
                                    onChange={ (e) => dispatch({ type: 'MODIFY_MEMO', name : e.target.name, value : e.target.value })  }
                                />
                                { pin === '1' ? (
                                <PinnedIcon
                                    className="pin_in_cmemo"
                                    name="pin"
                                    value="0"
                                    onClick={ (e) => dispatch({ type: 'MODIFY_MEMO', name : e.target.name, value : e.target.value })  }
                                />
                                ) : (
                                  <PinIcon
                                    className="pin_in_cmemo"
                                    name="pin"
                                    value="1"
                                    onClick={ (e) => dispatch({ type: 'MODIFY_MEMO', name : e.target.name, value : e.target.value }) }
                                />
                                )}
                            </Fragment>
                        
                      <textarea
                        rows="6"
                        column="20"
                        placeholder=">"
                        className="description_input"
                        value={memo.contents}
                        name="content"
                        onChange={ (e) => dispatch({ type: 'MODIFY_MEMO', name : e.target.name, value : e.target.value }) }
                        ></textarea>
            
                    
                        <div className="buttons-div" style={{ textAlign: "center" }}>
                          <div className="alarm-div">
                            <Button className="alarmButton" onClick={expandAlarmTable}>
                              <AlarmAddIcon className="add-alarm" color="action" />
                            </Button>
                            {expandAlarm ? (
                              <div className="alarm-div-dropdown">
                                <MemoAlarm className="memoAlarm" />
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
                    </BackgroundColor>
                  </form>
                </div>

              ):(
                  <BackgroundColor className="memo" color={memo.color}>
                   <div style={{display:"inline-block"}}>
                    <h4 className="memo-title" onClick={expandCreateMemo}>{memo.title}</h4>
                    { pin === '1' ? (
                                  <PinnedIcon
                                      className="pin_in_memo"
                                      name="pin"
                                      value="0"
                                      onClick={ (e) => dispatch({ type: 'MODIFY_MEMO', name : e.target.name, value : e.target.value })  }
                                  />
                                  ) : (
                                    <PinIcon
                                      className="pin_in_memo"
                                      name="pin"
                                      value="1"
                                      onClick={ (e) => dispatch({ type: 'MODIFY_MEMO', name : e.target.name, value : e.target.value })  }
                                  />
                                  )}
                   </div>
                    <div className="memo-area" onClick={expandCreateMemo}>
                      <span className="memo-description">
                          {memo.contents}
                      </span>
                    </div>

                    {/* 메모에 해시가 추가되는 부분 */}
                    <div className="memo-hash">
                        {/* {allHashDatas
                            .filter((data) => data.checked === true)
                            .map((data, index) => {
                                return (
                                    <PostedHash key={index} hashName={data.hashName} />
                                );
                            })} */}
                    </div>
                    <Button className="delete-button" onClick={deleteMemo}>
                        <DeleteOutlineIcon className="delete-icon" color={memo.color}/>
                    </Button> 
                  </BackgroundColor>
                  ) 
              }
      </Fragment>
    
    )
}