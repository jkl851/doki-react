import React, { useState, useContext, Fragment, useEffect } from "react";
import { MemoContext } from "./modules/MemoReducer"
import axios from 'axios'

import MemoAlarm from "./Components/MemoAlarm";
import Palette from './Components/Palette';
import HashTagBoxInPostedMemo from "./Components/HashTagBoxInPostedMemo";

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
  console.log(`memo ${memo.no} 의 값들 : ${memo.checked}`);
  
  // 메모 토글 
  const [expandMemo, setExpandMemo] = useState(false);
  const [expandAlarm, setExpandAlarm] = useState(false);
  const [expandPalette, setExpandPalette] = useState(false);
  const [expandHashTag, setExpandHashTag] = useState(false);

  // 해당 메모의 해시 리스트
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
      if(memo === null) {
        return
      }

      axios
        .post("http://localhost:8080/doki/memo/updateMemo", memo)
        .then((Response) => {
          console.log(Response.data)
        })
        .catch(error => 
          console.error(error)
          )
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

  const hashTagEvent = () => {
    setExpandHashTag(!expandHashTag);
  }


  useEffect(async() => {

    axios
      .all([
          // 특정 부서 번호를 가지고 해당 부서의 참가자들 검색
          await axios
            .get('http://localhost:8080/doki/memo/getHashListByMemo/' + memo.no), 
          // 회사 전체 직원의 리스트 검색
          await axios
          .get('http://localhost:8080/doki/hash/getAllHashList') 
      ])
      .then(
          axios.spread((res1, res2) => {
            
            const newArr = res2.data.map(data => {
              if(res1.data.length > 0 ){
                for(let j=0; j<res1.data.length; j++){
                  if(data.hashNo === res1.data[j].hashNo){
                    return {
                      hashNo: data.hashNo,
                      hashName: data.hashName,
                      checkedHash: true
                    }
                  }
                  if(j+1 === res1.data.length){
                    return {
                      hashNo: data.hashNo,
                      hashName: data.hashName,
                      checkedHash: false
                    }
                  }
                }
              } else {
                return {
                  hashNo: data.hashNo,
                  hashName: data.hashName,
                  checkedHash: false
                }
              }
              
            })
    
            setAllHashList(
              newArr
            )
          })
      )
      .catch((Error) => {
          console.log(Error);
      });

    
  }, [])

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
                      <div className="expand-memo-hash">

                        {/* 해시가 하나 이상이면 n개의 해시 중 첫 해시명 표시*/}
                        {
                          allHashList.map(data => {
                            return data.checkedHash === true ?  
                              <PostedHash key={data.hashNo} hashName={'#'+data.hashName}/> 
                            : null
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
                            <HashTagBoxInPostedMemo
                                shouldCloseOnOverlayClick={true}
                                onRequestClose={hashTagEvent}
                                name="hashtag"
                                allHashList={allHashList}
                                setAllHashList={setAllHashList}
                                memo={memo}
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
                      {
                        memo.hashCount > 0 ?
                          (<div className="memo-hash">
                            <PostedHash key={memo.hashNo} hashName={'#'+memo.hashName}/> 
                          </div>)
                        : null
                      }

                      {
                        memo.hashCount > 1 ?
                          <div className="memo-hash">
                            <PostedHash key={memo.hashNo} hashName={'외'+(memo.hashCount-1)+'개'}/> 
                          </div>
                        : null
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