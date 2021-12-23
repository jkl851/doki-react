import React from 'react';
import Memo from './Memo';

import styled from 'styled-components';
import {media} from './modules/style-utils';

const Wrapper = styled.div`
  padding: 0 4rem;
  ${media.desktop`
  padding: 0 0.5rem;
`}
  margin-top: 1rem;
  header {
    font-size: 0.8rem;
    padding: 1rem;
  }
`

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  grid-gap: 1rem;
`

const Column = styled.div`
  display: grid;
  grid-gap: 0rem;
  grid-auto-rows: max-content;
`
 // {memos.map((value, index) => {
  //   return (
  //     <Memo
  //       key={index}
  //       id={index}
  //       title={value.title}
  //       contents={value.contents}
  //       color={value.color}
  //     />
  //   );
  // })}



  // 메모 동기화 작업 소켓 설정 중
  // const [allinfo, setAllinfo] = useState(JSON.parse(sessionStorage.getItem('User')));

  // useEffect(() => {
  //   opensocket();
  // }, []);

  // const opensocket = async() => {
  //   try{
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
  //           console.log(data.userName + ' 유저가 ' + data.memoNo + '번 메모를 사용중!')
  //         } else {
  //             //사용중인 메모 알람 함수
  //              alert(data.userName + '님이 현재 사용 중 입니다.');
  //         }
  //       });

  //       console.log('Memo Out Socket Connected: ');
  //       stompClient.subscribe(`/topicOut/0`, (msg) => {
  //         const data = JSON.parse(msg.body);
  //         console.log('data : ' + JSON.stringify(data));
  //           console.log(data.userName + ' 유저가 ' + data.memoNo + '번 메모를 사용끝!')
  //       });
  //     });
  //       return null;
    
  //   }catch (error){
  //       console.log(error);
  //   }
  // }




  
  const MemoList = ( {memos , cols , title}) => {
    const memoList = memos.map( (value, index) => <Memo no={value.no} 
                                                        id={index}
                                                        title={value.title}
                                                        contents={value.contents}
                                                        color={value.color}
                                                        pin={value.pin} 
                                                        regDate={value.regDate}
                                                        visible={value.visible}
                                                        userNo={value.userNo}
                                                        departmentNo={value.departmentNo}
                                                        hash={value.hash}
                                                        hashNo={value.hashNo}
                                                        hashName={value.hashName}
                                                        hashCount={value.hashCount}
                                                        handling={value.handling}
                                                        // opensocket={opensocket}
                                                        />)
    var output = []

    if (cols !== 0) {
        output = memoList.reduce((acc, child, i) => {
        acc[i % cols] = [...acc[i % cols], child]
        return acc
        }, new Array(cols).fill([]))
    }
    if (memos.length === 0) return <Wrapper></Wrapper>

    return (
        <Wrapper>
        <header>{title}</header>
        <List columns={cols}>
          {output.map((column, i) => (
            <Column key={i}>{column}</Column>
          ))}
        </List>
      </Wrapper>
    )
}

export default MemoList