import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "./Compose.css";

//Stomp
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import * as StompJs from '@stomp/stompjs';

  
//채팅방 유저 임의 지정
let userNo = 1;
let userName = '둘리';
let deptNo = 1;
export default function Compose(props) {
  
  useEffect(() => {
    opensocket(deptNo);
    getChatRoom(1);
    getChatRoom(2);
    getChatRoom(3);
    getChatRoom(4);
    getChatRoom(5);
    // connect();
  }, []);

    
  //부서별 채팅방(room) 생성 작업
  const getChatRoom = async(i) => {
    await axios
      .put(`http://localhost:8080/doki/pubsub/room/${i}`)
      .then((Response) => {
        // console.log(Response);
      })
      .catch((Error) => {
        console.log(Error);
      });
  };
    

    //소켓 열기
    const opensocket = async(deptNo) => {
      try{
        //소켓 열기
        var socket = new SockJS('http://localhost:8080/doki/websocket');
        console.log('socket : ' + JSON.stringify(socket));
  
        var stompClient = Stomp.over(socket); //stomp client 구성
  
        // SockJS와 stomp client를 통해 연결을 시도.
        stompClient.connect({}, function () {
          console.log('Connected: ');
          stompClient.subscribe(`/sub/room/room/${deptNo}`);
        });
      
          // console.log("msg : " + msg);
          return null;
      
      }catch (error){
          console.log(error);
      }
    }


  //전송 데이터
  const [msgcontents, setmsgcontents] = useState('');

  //메세지를 보내는 함수
  const sendMessage = async(e) => {
    if(e.key == 'Enter') { 
    console.log("Enter : " + e.target.value);

    const messageData= {
      userNo: `${userNo}`,
      name: `${userName}`,
      message: e.target.value
    }

    
    // publish(e.target.value);
      try {
        await axios({
          method: "post",
          url: `http://localhost:8080/doki/pubsub/room/${deptNo}`,
          params: {
            userNo: `${userNo}`,
            name: `${userName}`,
            message: e.target.value
          }
        })
        .then((response) => {
          console.log("msg send1: ", JSON.stringify(messageData));
          console.log("msg send2: ", response);
          return response;
        })
        .catch((Error) => {
          console.log(Error);
        })

      } catch (err) {
        console.error(err);
      }

      e.target.value = '';
      e.target.focus();
    }
  };








  //client객체 생성
  // const client = useRef({});

  // //STOMP 연결
  // const connect = () => {
  //   client.current  = new StompJs.Client({
  //       webSocketFactory: () => new SockJS("http://localhost:8080/doki/websocket"), // proxy를 통한 접속
  //       connectHeaders: {
  //           "auth-token": "spring-chat-auth-token",
  //       },
  //       debug: function (str) {
  //           console.log(str);
  //       },
  //       reconnectDelay: 5000,
  //       heartbeatIncoming: 4000,
  //       heartbeatOutgoing: 4000,
  //       onConnect: () => {
  //           subscribe();
  //           // publish(message, "JOIN");
  //       },
  //       onStompError: (frame) => {
  //           console.error(frame);
  //       },
  //   });

  //   client.current.activate();
  // };


  // /**
  //      *  Stomp 연결 끊는 함수
  //      */
  // const disconnect = () => {
  //   client.current.deactivate();
  // };

  // /**
  // *  Stomp Subscribe 함수
  // */
  // const subscribe = () => {
  //   client.current.subscribe(`/sub/room/room/${deptNo}`, ({ message }) => {
  //     const msg =  JSON.parse(message.body);
  //     console.log("message : " + message);
  //     console.log("msg.contents : " + msg.message);
  //   });
  // };


  // /**
  // *  Stomp Publish 함수
  // */
  // const publish = (message) => {
  //   if (!client.current.connected) {
  //     console.log('연결안됨');
  //       return;
  //   }

  //   client.current.publish({
  //       destination: `/pubsub/room/${deptNo}`,
  //       headers: {
  //           "Accept": "application/json",
  //           "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //           userNo: `${userNo}`,
  //           name: `${userName}`,
  //           message: message
  //       }),
  //   });

  // };






    


  return (
    <div className="compose">
      <input
        type="text"
        className="compose-input"
        placeholder="메시지를 입력하세요"
        onKeyPress={sendMessage}
      />

      {props.rightItems}
    </div>
  );
}
