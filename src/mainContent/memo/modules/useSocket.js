//Stomp
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import axios from 'axios'

// 소켓 열기
export const opensocket = async() => {
    try{
        console.log('소켓이 메모 안에서 열렸습니다!!!!!');
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
 export const sendMessage = async(no, handling, allinfo) => {

    console.log('메모 번호1 : ' + no);
    console.log('handling1 : ' + handling);
      try {
        await axios({
          method: "post",
          url: `http://localhost:8080/doki/talk/memo`,
          params: {
            handling: handling,
            roomId: 0,
            userNo: allinfo.no,
            userName: allinfo.userName,
            memoNo: no,
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
  export const sendMessageOut = async(no, handling, allinfo) => {
    console.log('메모 번호2 : ' + no);
    console.log('handling2 : ' + handling);
      try {
        await axios({
          method: "post",
          url: `http://localhost:8080/doki/talk/memoOut`,
          params: {
            handling: handling,
            roomId: 0,
            userNo: allinfo.no,
            userName: allinfo.userName,
            memoNo: no,
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