import React, { useState, useContext, Fragment, useRef, useEffect } from "react";
import { MemoContext } from "./modules/MemoReducer"
import axios from 'axios'
import ReactModal from "react-modal";

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


//Stomp
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

import checkDelMemoStyle from "../../assets/css/modal/checkDelMemoStyle.module.css";

// 컬러 변경 적용
const BackgroundColor = styled.div`
  background: ${({ color }) => color};
  .delete-button {
    color: ${({ color }) => color};
  }
`
export default function(memo) {
  // console.log("[각 메모의 정보들]")
  // console.log(memo)
  // const [memo, setMemo] = useState(props);
  
  const [ memos, dispatch ] = useContext(MemoContext);
  var pin = memo.pin;
  
  const [allinfo, setAllinfo] = useState(JSON.parse(sessionStorage.getItem('User')));

  // useEffect(() => {
  //   getMemoRoom(0);
  //   // opensocket();
  // }, []);


  // //메모 방(room) 생성 작업
  // const getMemoRoom = async(i) => {
  //   await axios
  //     .post(`http://localhost:8080/doki/talk/memoRoom/${i}`)
  //     .then((Response) => {
  //       // console.log(Response);
  //     })
  //     .catch((Error) => {
  //       console.log(Error);
  //     });
  // };


  // // 소켓 열기
  // const opensocket = async() => {
  //     try{
  //     //소켓 열기
  //     var socket = new SockJS('http://localhost:8080/doki/websocket');
  //     var stompClient = Stomp.over(socket); //stomp client 구성
      
  //     // SockJS와 stomp client를 통해 연결을 시도.
  //     stompClient.connect({}, function () {
  //       console.log('Memo In Socket Connected: ');

  //       stompClient.subscribe(`/topic/0`, (msg) => {
  //         const data = JSON.parse(msg.body);
  //         console.log('data : ' + JSON.stringify(data));
  //         if(data.handling == 0) {
  //           console.log(data.userName + ' 유저가 ' + data.memoNo + '번 메모를 사용중!');

  //         } else {
  //             //사용중인 메모 알람 함수
  //              alert(data.userName + '님이 현재 사용 중 입니다.');
  //         }
  //       });

  //       console.log('Memo Out Socket Connected: ');
  //       stompClient.subscribe(`/topicOut/0`, (msg) => {
  //         const data = JSON.parse(msg.body);
  //         console.log('data : ' + JSON.stringify(data));



  //         console.log(data.userName + ' 유저가 ' + data.memoNo + '번 메모를 사용끝!')
  //       });




  //     });
  //       return null;
    
  //   }catch (error){
  //       console.log(error);
  //   }
  // }


//name : e.target.name, value : e.target.value, handling: memo.handling

  // //메모 사용중을 보내는 함수
  // const sendMessage = async(e) => {

  //   console.log('메모 번호1 : ' + memo.no);
  
  //     try {
  //       await axios({
  //         method: "post",
  //         url: `http://localhost:8080/doki/talk/memo`,
  //         params: {
  //           handling: memo.handling,
  //           roomId: 0,
  //           userNo: allinfo.no,
  //           userName: allinfo.userName,
  //           memoNo: memo.no
  //         }
  //       })
  //       .then((response) => {
  //         return response;
  //       })
  //       .catch((Error) => {
  //         console.log(Error);
  //       })

  //     } catch (err) {
  //       console.error(err);
  //     }
  // };

  //   //메모 사용끝을 보내는 함수
  //   const sendMessageOut = async() => {
  //     console.log('메모 번호2 : ' + memo.no);
  //     console.log('handling2 : ' + memo.handling);
  //       try {
  //         await axios({
  //           method: "post",
  //           url: `http://localhost:8080/doki/talk/memoOut`,
  //           params: {
  //             handling: memo.handling,
  //             roomId: 0,
  //             userNo: allinfo.no,
  //             userName: allinfo.userName,
  //             memoNo: memo.no,
  //             visible: memo.visible
  //           }
  //         })
  //         .then((response) => {
  //           return response;
  //         })
  //         .catch((Error) => {
  //           console.log(Error);
  //         })
  
  //       } catch (err) {
  //         console.error(err);
  //       }
  //   };


  // 메모 토글 
  const [expandMemo, setExpandMemo] = useState(false);
  const [expandAlarm, setExpandAlarm] = useState(false);
  const [expandPalette, setExpandPalette] = useState(false);
  const [expandHashTag, setExpandHashTag] = useState(false);

  // 삭제 확인 모달
  const [checkDelMemo, setCheckDelMemo] = useState({
    isOpen: false,
  });

  // 해당 메모의 해시 리스트
  const [allHashList, setAllHashList]  = useState([]);
  
  
   // 메모삭제
  const deleteEvent = () => {
    let no = memo.no;
    let obj = Object.assign({}, memo, {"visible": "0"});
    // api 통신 (visible => "0")
    axios
    .post("http://localhost:8080/doki/memo/updateMemo", obj)
    .then((Response) => {
      console.log(Response.data)
    })
    .catch(error => 
      console.error(error)
      )

    dispatch({ type: 'DEL_MEMO', no, pin});
  };

  const photoEvent = (event) => {
      const name = event.target.name;
      alert(`${name} 메모의 이미지삽입 : 개발중`);
  };
  
 //메모 수정 확인 버튼 클릭 시
  const addEvent = () => {
      if(memo === null) {
        return
      }

      console.log('[수정할 Memo 정보]')
      console.log(memo)
      
      // 메모 제출 dispatch for 공동편집
      dispatch({ type: 'MODIFY_MEMO_SEND', no: memo.no, name: 'contents', value: memo.contents, allinfo: allinfo})

      axios
        .post("http://localhost:8080/doki/memo/updateMemo", memo)
        .then((Response) => {
          console.log("[메모 Update 성공!!]")
        })
        .catch(error => 
          console.error(error)
          )
   };



  // 토글에 따른 메모 버튼 활성화
  const expandCreateMemo = () => {
      setExpandMemo(true);
      //opensocket();
      // sendMessage();
    };
  
  const collapseCreateMemo = () => {
      setExpandMemo(false);
      // opensocket();
      dispatch({ type: 'USER_LEAVE_MEMO_SELF', no: memo.no, handling : memo.handling , allinfo: allinfo})
      // sendMessageOut();
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

  const handlePinClick = (pin) => {
    dispatch({ type: 'MODIFY_PIN', no: memo.no, name : "pin", value : pin })

    if(memo === null) {
      return true
    }
    let obj = Object.assign({}, memo, {"pin": pin})

    axios
      .post("http://localhost:8080/doki/memo/updateMemo", obj)
      .then((Response) => {
        console.log(Response.data)
      })
      .catch(error => 
        console.error(error)
        )
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
                            <div>
                                <textarea
                                    no={memo.no}
                                    type="text"
                                    placeholder="제목"
                                    className="title_input"
                                    value={memo.title}
                                    name="title"
                                    onChange={ (e) => {
                                      dispatch({ type: 'MODIFY_MEMO_SELF', no: memo.no, name : e.target.name, value : e.target.value, handling: memo.handling, allinfo: allinfo})
                                    } }
                                />
                                { pin === '1' ? (
                                <PinnedIcon
                                    no={memo.no}
                                    className="pin_in_cmemo"
                                    name="pin"
                                    value="0"
                                    onClick={ (e) => {handlePinClick("0")} }
                                />
                                ) : (
                                  <PinIcon
                                    no={memo.no}  
                                    className="pin_in_cmemo"
                                    name="pin"
                                    value="1"
                                    onClick={  (e) => {handlePinClick("1")}  }
                                />
                                )}
                            </div>
                        
                      <textarea
                        rows="6"
                        column="20"
                        placeholder=">"
                        className="description_input"
                        value={memo.contents}
                        name="contents"
                        onChange={ (e) => dispatch({ type: 'MODIFY_MEMO_SELF', no: memo.no, name : e.target.name, value : e.target.value, handling: memo.handling, allinfo: allinfo}) }
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

              ):( (memo.handling == 1) ? 
                (
                <BackgroundColor className="memo" color={memo.color} style={{border: "5px solid red"}}>
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
                    <label className="memo-title" onClick={expandCreateMemo}>{memo.title}</label>
                    { pin === '1' ? (
                                  <PinnedIcon
                                      no={memo.no}
                                      className="pin_in_memo"
                                      name="pin"
                                      value="0"
                                      onClick={ (e) => {handlePinClick("0")}  }
                                  />
                                  ) : (
                                    <PinIcon
                                      no={memo.no}
                                      className="pin_in_memo"
                                      name="pin"
                                      value="1"
                                      onClick={ (e) => {handlePinClick("1")}  }
                                  />
                                  )}
                   </div>

                    <div className="memo-area" onClick={expandCreateMemo}>
                      <textarea className="memo-description" value={memo.contents} onChange={() => {}}>
                      </textarea>
                    </div>
                    
                  
                    {/* 메모에 해시가 추가되는 부분 */}
                    <div style={{display: "flex"}}>
                      {/* 해시가 하나 이상이면 n개의 해시 중 첫 해시명 표시*/}
                      {
                        memo.hashCount > 0 ?
                          (<div className="memo-hashDot">
                            <PostedHash key={memo.hashNo} hashName={'#'+memo.hashName} isDot={true}/> 
                          </div>)
                        : null
                      }

                      {
                        memo.hashCount > 1 ?
                          <div className="memo-hashEtc">
                            <PostedHash key={memo.hashNo} hashName={'외 '+(memo.hashCount-1)+'개'}/> 
                          </div>
                        : null
                      }

                    </div>

                    <Button className="delete-button" onClick={()=> setCheckDelMemo({ isOpen: true })}>
                        <DeleteOutlineIcon className="delete-icon" color={memo.color}/>
                    </Button> 
                  </BackgroundColor>
                  ) 
                )
              }
               {/* Delete Memo Modal */}
               <ReactModal
                    isOpen={checkDelMemo.isOpen} // checkDelMemo.isOpen
                    shouldCloseOnOverlayClick={true}
                    onRequestClose={() =>{
                        setCheckDelMemo({ isOpen: false }) 
                      }}
                    className={checkDelMemoStyle.Modal}>
                      
                    <div className={checkDelMemoStyle["close"]}>
                       {memo.title}<br/>  
                       {`메모를 정말로 삭제하시겠습니까?`}
                    </div>
                    <div>
                      <button
                        style={{
                          width: "fit-content",
                          height:'fit-content',
                          marginTop: "10px",
                          fontSize: "0.9em",
                          backgroundColor: "#5048e5",
                          color: "white",
                        }}
                        onClick={ deleteEvent } >
                        삭제
                      </button>
                      <button
                        style={{
                          width: "fit-content",
                          height:'fit-content',
                          fontSize: "0.9em",
                          marginTop: "10px",
                          backgroundColor: "#fff",
                          color: "black",
                        }}
                        onClick={()=> setCheckDelMemo({ isOpen: false })}
                      >
                        취소
                      </button>
                      
                    </div>
                </ReactModal>
      </Fragment>
    
    )
}