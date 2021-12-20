import React, { useEffect, useState, useRef, useCallback } from "react";
import Compose from "./Compose/index";
import Toolbar from './Toolbar';
import ToolbarButton from "./ToolbarButton/index";
import Message from "./Message/index";
import moment from "moment";
import axios from "axios";
import Ionicon from 'react-ionicons';


//Stomp
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import * as StompJs from '@stomp/stompjs';

import "./MessageList.css";
import "../assets/css/offcanvas2.css";


//채팅방 유저 임의 지정
export default function MessageList(props) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  let deptNo = props.departmentNo; //현재 부서번호 1이라 가정
  const userNo = props.userNo; //현재 유저번호 1이라 가정
  const userName = props.userName; //현재 유저번호 1이라 가정
  var tempMessages = [];

  useEffect(() => {
    getChatRoom(1);
    getChatRoom(2);
    getChatRoom(3);
    getChatRoom(4);
    getChatRoom(5);
    getMessages();
    opensocket(deptNo);
    // connect();
  }, []);

    
  //부서별 채팅방(room) 생성 작업
  const getChatRoom = async(i) => {
    await axios
      .post(`http://localhost:8080/doki/talk/topic/${i}`)
      .then((Response) => {
        // console.log(Response);
      })
      .catch((Error) => {
        console.log(Error);
      });
  };
    

  // const client = useRef({});
  // const connect = () => {
  //   client.current = new StompJs.Client({
  //     webSocketFactory: () => new SockJS('http://localhost:8080/doki/websocket'), 
  //     // connectHeaders: {
  //     //   "auth-token": "spring-chat-auth-token",
  //     // },
  //     debug: function (str) {
  //       console.log(str);
  //     },

  //     reconnectDelay: 5000,
  //     heartbeatIncoming: 10000,
  //     heartbeatOutgoing: 10000,

  //     onConnect: () => {
  //       subscribe();
  //     },

  //     onStompError: (frame) => {
  //       console.error(frame);
  //     },
  //   });
  //   client.current.activate();
  // };

  // const disconnect = () => {
  //   client.current.deactivate();
  // };

  // // 브로드캐스팅 받는 부분
  // const subscribe = () => {
  //   client.current.subscribe(`/talk/topic/${deptNo}`, ({msg}) => {
  //     alert("msg : " + JSON.parse(msg).message);
  //     const broadCastingMessage = {}
  //     broadCastingMessage.roomId = JSON.parse(body).roomId;
  //     broadCastingMessage.userNo = JSON.parse(body).userNo;
  //     broadCastingMessage.name = JSON.parse(body).userName;
  //     broadCastingMessage.message = JSON.parse(body).message;

      
  //     ////////////////////////////////////////
  //     // setMessages([...messages, broadCastingMessage])
  //     setMessages((prev) => {
  //       return [...prev, broadCastingMessage]
  //     });
  //     ////////////////////////////////////////
  //     alert('@@@');

  //   });
  // };

  // const publish = (text) => {
  //   if (!client.current.connected) {
  //     return;
  //   }
  //   alert('text : ' + text);
  //   client.current.publish({
  //     destination: `/doki/talk/topic/${deptNo}`,
  //     headers: {
  //       "Accept": "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       roomId: `${deptNo}`,
  //       userNo: `${userNo}`,
  //       name: `${userName}`,
  //       message: text
  //     })

  //   });
  // };




  //전송 데이터
  const getTextValue = (text) => {
    // publish(text);
    sendMessage(text);
  }

    // 소켓 열기
    const opensocket = async(deptNo) => {
      try{
        //소켓 열기
        var socket = new SockJS('http://localhost:8080/doki/websocket');
        console.log('socket : ' + JSON.stringify(socket));
  
        var stompClient = Stomp.over(socket); //stomp client 구성
  
        // SockJS와 stomp client를 통해 연결을 시도.
        stompClient.connect({}, function () {
          console.log('Connected: ');
          stompClient.subscribe(`/topic/${deptNo}`, ({msg}) => {
            alert("msg : " + JSON.parse(msg).message);
            const broadCastingMessage = {}
            broadCastingMessage.roomId = JSON.parse(body).roomId;
            broadCastingMessage.userNo = JSON.parse(body).userNo;
            broadCastingMessage.name = JSON.parse(body).userName;
            broadCastingMessage.message = JSON.parse(body).message;

            // setMessages([...messages, broadCastingMessage])
            setMessages((prev) => {
              return [...prev, broadCastingMessage]
            });

            // getMessages();
            
          });
        });
        
          // console.log("msg : " + msg);
          return null;
      
      }catch (error){
          console.log(error);
      }
    }


    


  //메세지를 보내는 함수
  const sendMessage = async(text) => {
    console.log('message : ' + text);
      try {
        await axios({
          method: "post",
          url: `http://localhost:8080/doki/talk/topic`,
          params: {
            roomId: `${deptNo}`,
            userNo: `${userNo}`,
            name: `${userName}`,
            message: text
          }
        })
        .then((response) => {
          //새로운 데이터 전송
          // setMessages((prev) => {
          //   return [...prev, response]
          // });
          // tempMessages.push(response);

          //채팅 다시불러오기
          // getMessages();

          addMessage(response);

          return response;
        })
        .catch((Error) => {
          console.log(Error);
        })

      } catch (err) {
        console.error(err);
      }
  };

  const addMessage = (response) => {
    // console.log('response : ' + JSON.stringify(response.data));
    tempMessages.push(response.data);

    setMessages([messages, ...tempMessages ]);
    scrollToBotton();
  }

  const getMessages = async() => {
    tempMessages = [];
    await axios
      .get(`http://localhost:8080/doki/chat/getChatList/${deptNo}`)
      .then((Response) => {
        for(let i=0; i<Response.data.length; i++) {
          // console.log(i + ' : ' + JSON.stringify(Response.data[i]));

            tempMessages.push(Response.data[i]);
        }
      })
      .catch((Error) => {
        console.log(Error);
      });

      setMessages([...messages, ...tempMessages]);
      scrollToBotton();
  };

  //스크롤 맨밑으로내리기
  const scrollToBotton = () => {
    scrollRef.current.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'});
  };



  const renderMessages = () => {
    let i = 0;
    let messageCount = messages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];
      let next = messages[i + 1];
      let isMine = current.userNo === userNo;
      let currentMoment = moment(current.date);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.date);
        let previousDuration = moment.duration(
          currentMoment.diff(previousMoment)
        );
        prevBySameAuthor = previous.userNo === current.userNo;

        if (prevBySameAuthor && previousDuration.as("hours") < 1) {
          startsSequence = false;
        }

        if (previousDuration.as("hours") < 1) {
          // showTimestamp = true;
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.date);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.userNo === current.userNo;

        if (nextBySameAuthor && nextDuration.as("hours") < 1) {
          endsSequence = false;
        }
      }

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      );

      // Proceed to the next message.
      i += 1;
    }

    return tempMessages;
  };

  return (
    <div className="message-list"
      ref={scrollRef}
    >
        {/* <Toolbar
          leftItems={[
            <span>
              <ToolbarButton key="info" icon="ion-md-exit" callBackOnClick={ callBackOnClickExit }/>
            </span>
          ]}
          rightItems={[
            <ToolbarButton key="person" icon="ion-ios-person-add">
            </ToolbarButton>,
          <ToolbarButton key="video" icon="ion-ios-videocam" />
        ]}/> */}


      <div className="message-list-container">{renderMessages()}</div>

      <Compose
        rightItems={[
          <ToolbarButton key="photo" icon="ion-ios-camera" />,
          <ToolbarButton key="image" icon="ion-ios-image" />,
          <ToolbarButton key="audio" icon="ion-ios-mic" />,
          <ToolbarButton key="money" icon="ion-ios-card" />,
          <ToolbarButton key="games" icon="ion-logo-game-controller-b" />,
          <ToolbarButton key="emoji" icon="ion-ios-happy" />,
        ]} 
        getTextValue={getTextValue}
        // callbackMessage={callbackMessage}
        />
    </div>
  );
}
