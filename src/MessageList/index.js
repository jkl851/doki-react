import React, { useEffect, useState, useRef } from "react";
import Compose from "./Compose/index";
import ToolbarButton from "./ToolbarButton/index";
import Message from "./Message/index";
import moment from "moment";
import axios from "axios";

//Stomp
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

//css
import "./MessageList.css";
import "../assets/css/offcanvas2.css";


//채팅방 유저 임의 지정
export default function MessageList({allinfo}) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();

  const deptNo = allinfo.departmentNo;
  const userNo = allinfo.no;
  const userName = allinfo.userName;
  const position = allinfo.position;

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
    


  //전송 데이터
  const getTextValue = (text) => {
      if(text === '') {
        return;
      }    
    sendMessage(text);
  }

    // 소켓 열기
    const opensocket = async(deptNo) => {
      try{
        //소켓 열기
        var socket = new SockJS('http://localhost:8080/doki/websocket');
        var stompClient = Stomp.over(socket); //stomp client 구성
  
        // SockJS와 stomp client를 통해 연결을 시도.
        stompClient.connect({}, function () {
          console.log('Chat Socket Connected: ');
          stompClient.subscribe(`/topic/${deptNo}`, (msg) => {

            const data = JSON.parse(msg.body);
            const broadCastingMessage = {}
            broadCastingMessage.departmentNo = data.roomId;
            broadCastingMessage.userNo = data.userNo;
            broadCastingMessage.userName = data.sender;
            broadCastingMessage.message = data.message;
            broadCastingMessage.date = data.date;
            broadCastingMessage.position = data.position;

            console.log('broadCastingMessage : ' + broadCastingMessage);
            tempMessages.push(broadCastingMessage);
        
            setMessages([...messages, ...tempMessages]);
            scrollToBotton();

          });
        });
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
            message: text,
            position: `${position}`
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

  var tempMessages = [];
  const getMessages = async() => {
    // tempMessages;
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
