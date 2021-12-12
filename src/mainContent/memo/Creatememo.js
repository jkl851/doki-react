import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import AlarmAddIcon from "@material-ui/icons/AlarmAdd";
import PaletteIcon from "@material-ui/icons/PaletteOutlined";
import AddPhotoIcon from "@material-ui/icons/AddPhotoAlternateOutlined";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";

export default function (passMemo) {
  const [expand, setexpand] = useState(false);

  const [memo, setMemo] = useState({
    title: "",
    content: "",
    alarm: {
      time: "2021/12/12 15:00",
      repetition: "0",
    },
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

  const alarmEvent = (event) => {
    const name = event.target.name;
    alert(`${name} 메모의 알람 : 개발중`);
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

  const expandIt = () => {
    setexpand(true);
  };
  const collapseIt = () => {
    setexpand(false);
  };

  return (
    <div>
      <form onMouseLeave={collapseIt}>
        <div className="input_wrapper">
          {expand ? (
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
            onMouseEnter={expandIt}
            style={{ height: "18px" }}
          ></textarea>

          {expand ? (
            <div style={{ textAlign: "center" }}>
              <Button className="alarmButton" onClick={alarmEvent}>
                <AlarmAddIcon className="add-alarm" />
              </Button>

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
