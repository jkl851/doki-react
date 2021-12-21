import React, { useState, useContext, Fragment } from "react";
import { MemoContext } from "./modules/MemoReducer"
import axios from 'axios'

import MemoAlarm from "./Components/MemoAlarm";
import Palette from './Components/Palette';
import HashTagBox from "./Components/HashTagBox";

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
import PostedHash from './Components/PostedHash'

// 컬러 변경 적용
const BackgroundColor = styled.div`
  background: ${({ color }) => color};
  .delete-button {
    color: ${({ color }) => color};
  }
`
export default function(memo) {

  const [ memos, dispatch ] = useContext(MemoContext);
  var pin = memo.pin

  
  // 메모 토글 
  const [expandMemo, setExpandMemo] = useState(false);
  const [expandAlarm, setExpandAlarm] = useState(false);
  const [expandPalette, setExpandPalette] = useState(false);
  const [expandHashTag, setExpandHashTag] = useState(false);

  // 해당 메모의 해시 리스트
  const [memoHashList, setMemoHashList] = useState([]);
  const [allHashList, setAllHashList]  = useState([]);

   // 메모삭제
  const deleteMemo = () => {
    const no = memo.no
    // api 통신 (visible => "0")
    dispatch({ type: 'DEL_MEMO', no, pin});
  };

  const photoEvent = (event) => {
      const name = event.target.name;
      alert(`${name} 메모의 이미지삽입 : 개발중`);
  };
  
 //메모 수정 확인
  const addEvent = () => {
    // passMemo.passMemo(memo);
    // dispatch({type: 'INITIALIZE'})
  };

  // 토글에 따른 메모 버튼 활성화
  const expandCreateMemo = () => {
      setExpandMemo(true);

      // 전체 리스트도 가져온다
      getAllHashList() 

      // 확장 되었을 때 해당 메모의 해시 리스트를 가져온다
      getHashListByMemo();
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

  const hashTagEvent = () => {
    setExpandHashTag(!expandHashTag);
  }


  const getHashListByMemo = () => {
    console.log('=====[확장된 memo 정보]=====');
    console.log(memo);

    axios
      .get('http://localhost:8080/doki/memo/getHashListByMemo/' + memo.no)
      .then((Response) => {
        console.log("[GET Hash List By Memo 요청 성공!]");
        setMemoHashList(Response.data);
        
      })
      .catch((Error) => {
        console.log(Error);
      });
  }

  const getAllHashList = () => {
    axios
      .get('http://localhost:8080/doki/hash/getAllHashList')
      .then((Response) => {
        console.log("[GET All Hash List in Memo.js 요청 성공!]");
        console.log(Response);
        setAllHashList(
          Response.data.map((data) => {
            return  {
                hashNo: data.hashNo,
                hashName: data.hashName,
                checkedHash: false,
            }
          })

        )
        
      })
      .catch((Error) => {
        console.log(Error);
      });
  }

  return(
  
      <Fragment>
              {/* expandMemo */}
              { expandMemo ? ( 
                  <div>
                  <form className="create-memo-form" onMouseLeave={collapseCreateMemo}>
                    <BackgroundColor className="input_wrapper" color={memo.color}>
                            <Fragment>
                                <input
                                    no={memo.no}
                                    type="text"
                                    placeholder="제목"
                                    className="title_input"
                                    value={memo.title}
                                    name="title"
                                    onChange={ (e) => dispatch({ type: 'MODIFY_MEMO', no: memo.no, name : e.target.name, value : e.target.value })  }
                                />
                                { pin === '1' ? (
                                <PinnedIcon
                                    no={memo.no}
                                    className="pin_in_cmemo"
                                    name="pin"
                                    value="0"
                                    onClick={ (e) => dispatch({ type: 'MODIFY_MEMO', no: memo.no, name : "pin", value : "0" })  }
                                />
                                ) : (
                                  <PinIcon
                                    no={memo.no}
                                    className="pin_in_cmemo"
                                    name="pin"
                                    value="1"
                                    onClick={ (e) => dispatch({ type: 'MODIFY_MEMO', no: memo.no, name : "pin", value : "1" }) }
                                />
                                )}
                            </Fragment>
                        
                      <textarea
                        rows="6"
                        column="20"
                        placeholder=">"
                        className="description_input"
                        value={memo.contents}
                        name="contents"
                        onChange={ (e) => dispatch({ type: 'MODIFY_MEMO', no: memo.no, name : e.target.name, value : e.target.value }) }
                        ></textarea>
            
                      {/* 확장된 메모에 해시가 추가되는 부분 */}
                      <div style={{display: 'flex'}}>
                        {/* 해시가 하나 이상이면 n개의 해시 중 첫 해시명 표시*/}
                        {
                          memo.hashCount > 0 ?
                          memoHashList.map(item => {
                            return (<div className="memo-hash">
                              <PostedHash key={item.hashNo} hashName={'#'+item.hashName}/> 
                            </div>)
                         }) : true
                        }
                      </div>


                    <div className="buttons-div" style={{ textAlign: "center" }}>
                        <div className="alarm-div">
                          <Button className="alarmButton" onClick={expandAlarmTable}>
                            <AlarmAddIcon className="add-alarm" color="action" />
                          </Button>
                          {expandAlarm ? (
                            <div className="alarm-div-dropdown">
                              <MemoAlarm isPosted={true} className="memoAlarm" memo={memo}/>
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
                              memo={memo}
                              isPosted={true}
                              className="memoPalette"
                              name="color"
                              isPosted={true}
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

                        
                        {expandHashTag ? ( //false로 바꿔둠 (가리기용)
                            <HashTagBox
                                shouldCloseOnOverlayClick={true}
                                onRequestClose={hashTagEvent}
                                name="hashtag"
                                allHashDatas={allHashList}
                                setAllHashDatas={setAllHashList}
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

              ):(
                  <BackgroundColor className="memo" color={memo.color}>
                   <div style={{display:"inline-block"}}>
                    <h4 className="memo-title" onClick={expandCreateMemo}>{memo.title}</h4>
                    { pin === '1' ? (
                                  <PinnedIcon
                                      no={memo.no}
                                      className="pin_in_memo"
                                      name="pin"
                                      value="0"
                                      onClick={ (e) => dispatch({  type: 'MODIFY_MEMO', no: memo.no, name : "pin", value : "0"  })  }
                                  />
                                  ) : (
                                    <PinIcon
                                      no={memo.no}
                                      className="pin_in_memo"
                                      name="pin"
                                      value="1"
                                      onClick={ (e) => dispatch({  type: 'MODIFY_MEMO', no: memo.no, name : "pin", value : "1" })  }
                                  />
                                  )}
                   </div>
                    <div className="memo-area" onClick={expandCreateMemo}>
                      <span className="memo-description">
                          {memo.contents}
                      </span>
                    </div>
                    
                  
                    {/* 메모에 해시가 추가되는 부분 */}
                    <div style={{display: "flex"}}>
                      {/* 해시가 하나 이상이면 n개의 해시 중 첫 해시명 표시*/}
                      { memo.hashCount > 0 &&
                        <div className="memo-hash">
                          <PostedHash key={memo.hashNo} hashName={'#'+memo.hashName}/> 
                        </div>
                      }
                      {/* 해시가 하나 이상이면서 첫 해시를 제외한 나머지 해시 개수 표시*/}
                      { memo.hashCount > 1 && 
                        <div className="memo-hash">
                        <PostedHash key={memo.hashNo} hashName={'외 '+ (memo.hashCount-1) +"개"}/> 
                      </div>
                      }

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