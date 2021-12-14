import React, { useState } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AlarmAddIcon from "@mui/icons-material/AlarmAdd";
import PaletteIcon from "@mui/icons-material/PaletteOutlined";
import AddPhotoIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import HashTag from "@mui/icons-material/Tag";
import MemoAlarm from "./Components/MemoAlarm";
import Palette from "./Components/Palette";
import Color from "./Components/Color";

export default function (passMemo) {
  const [expandMemo, setExpandMemo] = useState(false);
  const [expandAlarm, setExpandAlarm] = useState(false);
  const [expandPalette, setExpandPalette] = useState(false);

  // const [changeHeight, setHeight] = useState(false);

  // const heightControll = () => {
  //   if (changeHeight === false) {
  //     narrowHeight( () => {
  //       style
  //       setHeight(true)

  //     });

  //     console.log(chat);
  //   } else {
  //     closeNav2();
  //     setHeight(false);
  //     console.log(chat);
  //   }
  // };

  const [memo, setMemo] = useState({
    title: "",
    content: "",
    alarm: {
      time: "2021/12/12 15:00",
      repetition: "0",
    },
    color: "#FFFFFF",
  });

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
    this.style = { height: "1500px" };
  };
  const collapseCreateMemo = () => {
    setExpandMemo(false);
  };

  const expandAlarmTable = () => {
    setExpandAlarm(!expandAlarm);
  };

  const expandPaletteTable = () => {
    setExpandPalette(!expandPalette);
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
            placeholder=">"
            className="description_input"
            value={memo.content}
            name="content"
            onChange={InputEvent}
            onMouseEnter={expandCreateMemo}
          ></textarea>

          {expandMemo ? (
            <div className="buttons-div" style={{ textAlign: "center" }}>
              <div className="alarm-div">
                <Button className="alarmButton" onClick={expandAlarmTable}>
                  <AlarmAddIcon className="add-alarm" color="action" />
                </Button>
                {expandAlarm ? (
                  <div className="alarm-div-dropdown">
                    <MemoAlarm className="memoAlarm" />
                  </div>
                ) : (
                  false
                )}
              </div>

              <Button className="paletteButton" onClick={expandPaletteTable}>
                <PaletteIcon className="add-palette" color="action" />
              </Button>
              {expandPalette ? (
                <Palette
                  className="memoPalette"
                  value={memo.color}
                  name="color"
                />
              ) : (
                false
              )}

              <Button className="photoButton" onClick={photoEvent}>
                <AddPhotoIcon className="add-photo" color="action" />
              </Button>

              <Button onClick={hashTagEvent}>
                <HashTag color="action" />
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
