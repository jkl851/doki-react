//Stomp
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import axios from 'axios'




 //메모 사용중을 보내는 함수
 export const sendMessage = async(props) => {

    console.log('메모 번호1 : ' + props.no);
      try {
        await axios({
          method: "post",
          url: `http://localhost:8080/doki/talk/memo`,
          params: {
            handling: '1',
            roomId: 0,
            userNo: props.allinfo.no,
            userName: props.allinfo.userName,
            memoNo: props.no, 
            // name: props.name,
            // value: props.value
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

  // 메모 추가
  export const sendMemo = async(props) => {

    console.log('메모 번호1 : ' + props.no);
      try {
        await axios({
          method: "post",
          url: `http://localhost:8080/doki/talk/memoadd`,
          params: {
            handling: '1',
            roomId: 0,
            userNo: props.allinfo.no,
            userName: props.allinfo.userName,
            memoNo: props.no, 
            name: props.name,
            value: props.value
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
  export const sendMessageOut = async(props) => {
    console.log('allinfo 넘버어어어어어')
    console.log(props.allinfo)
    console.log('메모 번호2 : ' + props.no);
      try {
        await axios({
          method: "post",
          url: `http://localhost:8080/doki/talk/memoOut`,
          params: {
            handling: '0',
            roomId: 0,
            userNo: props.allinfo.no,
            userName: props.allinfo.userName,
            memoNo: props.no,
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