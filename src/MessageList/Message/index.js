import React, { useEffect, useRef, useState } from "react";
import moment from 'moment';
import './Message.css';
import axios from "axios";

//Stomp
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

export default function Message(props) {
    const {
      data,
      isMine,
      startsSequence,
      endsSequence,
      showTimestamp
    } = props;

    const friendlyTimestamp = moment(data.date).format('LLLL');


    
    //채팅방 유저 임의 지정
    let userNo = 1;
    let userName = '둘리';
    let deptNo = 1;

    useEffect(() => {
      opensocket(deptNo);
    }, []);

    const [chatMessages, setChatMessages] = useState([]);

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
          stompClient.subscribe(`/sub/room/room/${deptNo}`,  ({message}) => {
            setChatMessages((_chatMessages) => [..._chatMessages, JSON.parse(message)]);
           });
        });
      
          // console.log("msg : " + msg);
          return null;
      
      }catch (error){
          console.log(error);
      }
    }








    return (
      <div className={[
        'message',
        `${isMine ? 'mine' : ''}`,
        `${startsSequence ? 'start' : ''}`,
        `${endsSequence ? 'end' : ''}`
      ].join(' ')}>
        {
          showTimestamp &&
            <div className="timestamp">
              { friendlyTimestamp }
            </div>
        }

        <div className="bubble-container">
          <div className="bubble" title={friendlyTimestamp}>
            { data.message }

            {chatMessages.message}

          </div>
        </div>
      </div>
    );
}