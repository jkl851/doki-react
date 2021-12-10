import React, { useEffect } from "react";
import shave from "shave";

import "./ConversationListItem.css";
import { openNav2 } from "../../assets/js/offcanvas";

export default function ConversationListItem(props) {
  useEffect(() => {
    shave(".conversation-snippet", 20);
  });

  const { photo, name, text } = props.data;

  function openMessage() {
    document.getElementById("message-list").style.width = "400px";
    document.getElementById("whole_wrapper").style.marginRight = "0";
  }

  return (
    <div className="conversation-list-item" onDoubleClick={openNav2}>
      <img className="conversation-photo" src={photo} alt="conversation" />
      <div className="conversation-info">
        <h1 className="conversation-title">{name}</h1>
      </div>
    </div>
  );
}
