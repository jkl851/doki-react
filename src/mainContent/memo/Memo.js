import React, { useState, useContext, Fragment, useRef, useEffect } from "react";
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
import PostedHash from './Components/PostedHash'
import axios from "axios";

//Stomp
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

// 컬러 변경 적용
const BackgroundColor = styled.div`
  background: ${({ color }) => color};
  Button {
    color: ${({ color }) => color};
  }
`
export default function(memo) {
  // console.log("[각 메모의 정보들]")
  // console.log(memo)

  const [allinfo, setAllinfo] = useState(JSON.parse(sessionStorage.getItem('User')));
  useEffect(() => {
    getMemoRoom(0);
    // opensocket();
  }, []);


  //메모 방(room) 생성 작업
  const getMemoRoom = async(i) => {
    await axios
      .post(`http://localhost:8080/doki/talk/memoRoom/${i}`)
      .then((Response) => {
        // console.log(Response);
      })
      .catch((Error) => {
        console.log(Error);
      });
  };


  // 소켓 열기
  const opensocket = async() => {
      try{
      //소켓 열기
      var socket = new SockJS('http://localhost:8080/doki/websocket');
      var stompClient = Stomp.over(socket); //stomp client 구성
      
      // SockJS와 stomp client를 통해 연결을 시도.
      stompClient.connect({}, function () {
        console.log('Memo In Socket Connected: ');

        stompClient.subscribe(`/topic/0`, (msg) => {
          const data = JSON.parse(msg.body);
          console.log('data : ' + JSON.stringify(data));
          if(data.handling == 0) {
            console.log(data.userName + ' 유저가 ' + data.memoNo + '번 메모를 사용중!')
          } else {
              //사용중인 메모 알람 함수
               alert(data.userName + '님이 현재 사용 중 입니다.');
          }
        });

        console.log('Memo Out Socket Connected: ');
        stompClient.subscribe(`/topicOut/0`, (msg) => {
          const data = JSON.parse(msg.body);
          console.log('data : ' + JSON.stringify(data));
            console.log(data.userName + ' 유저가 ' + data.memoNo + '번 메모를 사용끝!')
        });




      });
        return null;
    
    }catch (error){
        console.log(error);
    }
  }




  //메모 사용중을 보내는 함수
  const sendMessage = async() => {

    console.log('메모 번호1 : ' + memo.no);
    console.log('handling1 : ' + memo.handling);
      try {
        await axios({
          method: "post",
          url: `http://localhost:8080/doki/talk/memo`,
          params: {
            handling: memo.handling,
            roomId: 0,
            userNo: allinfo.no,
            userName: allinfo.userName,
            memoNo: memo.no,
            visible: memo.visible
          }
        })
        .then((response) => {
          return response;
        })
        .catch((Error) => {
          console.log(Error);
        })

      } catch (err) {
        console.error(err);
      }
  };

    //메모 사용끝을 보내는 함수
    const sendMessageOut = async() => {
      console.log('메모 번호2 : ' + memo.no);
      console.log('handling2 : ' + memo.handling);
        try {
          await axios({
            method: "post",
            url: `http://localhost:8080/doki/talk/memoOut`,
            params: {
              handling: memo.handling,
              roomId: 0,
              userNo: allinfo.no,
              userName: allinfo.userName,
              memoNo: memo.no,
              visible: memo.visible
            }
          })
          .then((response) => {
            return response;
          })
          .catch((Error) => {
            console.log(Error);
          })
  
        } catch (err) {
          console.error(err);
        }
    };

  const [ memos, dispatch ] = useContext(MemoContext);
  var pin = memo.pin;

  // 메모 토글 
  const [expandMemo, setExpandMemo] = useState(false);
  const [expandAlarm, setExpandAlarm] = useState(false);
  const [expandPalette, setExpandPalette] = useState(false);
  // const [isBlock, setIsBlock] = useState(false);

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
  
  const hashTagEvent = (event) => {
      const name = event.target.name;
      alert(`${name} 메모의 해쉬태그달기 : 개발중`);
  };

 //메모 수정 확인
  const addEvent = () => {
    // passMemo.passMemo(memo);
    // dispatch({type: 'INITIALIZE'})
  };


//ASDFASDFASDFASDFA!!!!!!!!!!!!
//ASDFASDFASDFASDFA!!!!!!!!!!!!
//ASDFASDFASDFASDFA!!!!!!!!!!!!
//ASDFASDFASDFASDFA!!!!!!!!!!!!
//ASDFASDFASDFASDFA!!!!!!!!!!!!
//ASDFASDFASDFASDFA!!!!!!!!!!!!
//ASDFASDFASDFASDFA!!!!!!!!!!!!
  // 토글에 따른 메모 버튼 활성화
  const expandCreateMemo = () => {
      setExpandMemo(true);
      opensocket();
      sendMessage();
    };
  
  const collapseCreateMemo = () => {
      setExpandMemo(false);
      // opensocket();
      sendMessageOut();
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
                  <form className="create-memo-form" 
                    onMouseLeave={collapseCreateMemo}
                    >
                    <BackgroundColor className="input_wrapper" color={memo.color} >
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

              ):( (memo.handling == 1) ? 
                (
                <BackgroundColor className="memo" color={memo.color} style={{border: "5px solid red"}}  onClick={sendMessage} >
                   <div style={{display:"inline-block"}} >
                    <h4 className="memo-title" 
                      >{memo.title}</h4>
                    { pin === '1' ? (
                                  <PinnedIcon
                                      no={memo.no}
                                      className="pin_in_memo"
                                      name="pin"
                                      value="0"
                                      // onClick={ (e) => dispatch({  type: 'MODIFY_MEMO', no: memo.no, name : "pin", value : "0"  })  }
                                  />
                                  ) : (
                                    <PinIcon
                                      no={memo.no}
                                      className="pin_in_memo"
                                      name="pin"
                                      value="1"
                                      // onClick={ (e) => dispatch({  type: 'MODIFY_MEMO', no: memo.no, name : "pin", value : "1" })  }
                                  />
                                  )}
                   </div>
                    <div className="memo-area" 
                      // onClick={expandCreateMemo}
                      >
                      <span className="memo-description">
                          {memo.contents}
                      </span>
                    </div>
                    
                  
                    {/* 메모에 해시가 추가되는 부분 */}
                    <div style={{display: "flex"}}>
                      { memo.hashCount > 0 &&
                        <div className="memo-hash">
                          <PostedHash key={memo.hashNo} hashName={'#'+memo.hashName}/> 
                        </div>
                      }
                      { memo.hashCount > 1 && 
                        <div className="memo-hash">
                        <PostedHash key={memo.hashNo} hashName={'외 '+ (memo.hashCount-1) +"개"}/> 
                      </div>
                      }

                    </div>
                    
                    <Button className="delete-button" 
                          >
                        <DeleteOutlineIcon className="delete-icon" color={memo.color}/>
                    </Button> 
                  </BackgroundColor>
                ):(
                  <BackgroundColor className="memo" color={memo.color} >
                   <div style={{display:"inline-block"}}>
                    <h4 className="memo-title" 
                      onClick={expandCreateMemo}
                      >{memo.title}</h4>
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
                    <div className="memo-area" 
                      onClick={expandCreateMemo}
                      >
                      <span className="memo-description">
                          {memo.contents}
                      </span>
                    </div>
                    
                  
                    {/* 메모에 해시가 추가되는 부분 */}
                    <div style={{display: "flex"}}>
                      { memo.hashCount > 0 &&
                        <div className="memo-hash">
                          <PostedHash key={memo.hashNo} hashName={'#'+memo.hashName}/> 
                        </div>
                      }
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
                )
              }
      </Fragment>
    
    )
}