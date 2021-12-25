import React from "react";
import moment from "moment";
import "./Message.css";

export default function Message(props) {
  const { data, isMine, startsSequence, endsSequence, showTimestamp} = props;
    let UserImg = "https://randomuser.me/api/portraits/men/" + (data.userNo) + ".jpg"

    const friendlyTimestamp = moment(data.date).format('LLLL');
    // console.log(JSON.stringify(data));
    return (
      <div className={[
        'message',
        'name',
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
<div className="name">
        {!isMine && data.userName + ' ' + data.position}
        </div>
        <div className="bubble-container">
        
        {!isMine && 
          <img style={{borderRadius:"100px", width:"64px", height:"64px"}} src={UserImg} alt=""/>
          }

        <div className="bubble" title={friendlyTimestamp}>
          {data.message}
        </div>
      </div>
    </div>
  );
}
