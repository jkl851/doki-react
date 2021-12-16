import React, { useEffect, useState } from "react";
import Compose from "./Compose/index";
import ToolbarButton from "./ToolbarButton/index";
import Message from "./Message/index";
import moment from "moment";
import axios from "axios";

import "./MessageList.css";
import "../assets/css/offcanvas2.css";


export default function MessageList(props) {
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    getMessages();
  }, []);

  
  const userNo = 1; //현재 유저번호 1이라 가정
  let departmentNo = 1; //현재 부서번호 1이라 가정
  const getMessages = async() => {
    var tempMessages = [];
    await axios
      .get(`http://localhost:8080/doki/chat/getChatList/${departmentNo}`)
      .then((Response) => {
        for(let i=0; i<Response.data.length; i++) {
            tempMessages.push(Response.data[i]);
        }
      })
      .catch((Error) => {
        console.log(Error);
      });

    setMessages([...messages, ...tempMessages]);
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
    <div className="message-list">
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
      />
    </div>
  );
}
