import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import AlarmAddIcon from "@material-ui/icons/AlarmAdd";
import PaletteIcon from "@material-ui/icons/PaletteOutlined";
import AddPhotoIcon from "@material-ui/icons/AddPhotoAlternateOutlined";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
import MemoAlarm from "./Components/MemoAlarm";

export default function (passMemo) {
  const [expandMemo, setExpandMemo] = useState(false);
  const [expandAlarm, setExpandAlarm] = useState(false);

  const [memo, setMemo] = useState({
    title: "",
    content: "",
    alarm: {
      time: "2021/12/12 15:00",
      repetition: "0",
    },
  });

  const alarmEvent = (event) => {
    const name = event.target.name;
    alert(`${name} 메모의 알람 : 개발중`); //@222
  };

  const InputEvent = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setMemo((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const paletteEvent = (event) => {
    const name = event.target.name;
    alert(`${name} 메모의 파레트 : 개발중`);
  };

  const photoEvent = (event) => {
    const name = event.target.name;
    alert(`${name} 메모의 이미지삽입 : 개발중`);
  };

  const hashTagEvent = (event) => {
    const name = event.target.name;
    alert(`${name} 메모의 해쉬태그달기 : 개발중`);
  };

  const addEvent = () => {
    passMemo.passMemo(memo);
    setMemo({
      title: "",
      content: "",
    });
  };

  const expandCreateMemo = () => {
    setExpandMemo(true);
  };
  const collapseCreateMemo = () => {
    setExpandMemo(false);
  };

  const expandAlarmTable = () => {
    setExpandAlarm(!expandAlarm);
  };



  return (
    <div>
      <form onMouseLeave={collapseCreateMemo}>
        <div className="input_wrapper">
          {expandMemo ? (
            <input
              type="text"
              placeholder="제목"
              className="title_input"
              value={memo.title}
              name="title"
              onChange={InputEvent}
            />
          ) : (
            false
          )}

          <textarea
            rows="6"
            column="20"
            placeholder="본문"
            className="description_input"
            value={memo.content}
            name="content"
            onChange={InputEvent}
            onMouseEnter={expandCreateMemo}
            style={{ height: "18px" }}
          ></textarea>

          {expandMemo ? (
            <div className="buttons-div" style={{ textAlign: "center" }}>
                <div className="alarm-div">
                    <Button className="alarmButton" onClick={expandAlarmTable}>
                        <AlarmAddIcon className="add-alarm" />
                    </Button>
                        {
                        expandAlarm ?
                        <div className="alarm-div-dropdown">
                        <MemoAlarm className="memoAlarm"/>
                        </div> : 
                        false
                        }
                </div>

                    <Button className="paletteButton" onClick={paletteEvent}>
                        <PaletteIcon className="add-palette" />
                    </Button>

                    <Button className="photoButton" onClick={photoEvent}>
                        <AddPhotoIcon className="add-photo" />
                    </Button>

                    <Button onClick={hashTagEvent}>
                        <LocalOfferOutlinedIcon />
                    </Button>

                    <Button className="addButton" onClick={addEvent}>
                        <AddIcon className="add-icon" />
                    </Button>
            </div>
          ) : (
            false
          )}
            
        </div>

      </form>
    </div>
  );
}
