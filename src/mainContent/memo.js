import React, { useEffect, useState } from "react";
// ====에디터=====
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styled from "styled-components";
import "../assets/css/main_content.css";

const MyBlock = styled.div`
  #mydiv {
    position: absolute;
    z-index: 0;
    background-color: #f1f1f1;
    border: 1px solid #d3d3d3;
    text-align: center;
  }

  #mydivheader {
    padding: 10px;
    cursor: move;
    z-index: 10;
    background-color: #2196f3;
    color: #fff;
  }
  .editor {
    height: 300px !important;
    width: 500px !important;
    border: 1px solid #f1f1f1 !important;
    padding: 5px !important;
    border-radius: 2px !important;
    margin: auto !important;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  .editor::-webkit-scrollbar {
    display: none !important; /* Chrome, Safari, and Opera */
  }

  .toolbar {
    height: 100px !important;
    width: 500px !important;
    border: 1px solid #f1f1f1 !important;
    padding: 5px !important;
    border-radius: 2px !important;
    margin: auto !important;
  }
`;
//==============

const memo = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  useEffect(() => {
    console.log(editorState);
  }, [editorState]);

  // 드래그 앤 드롭 기능 ==========================
  useEffect(() => {
    dragElement(document.getElementById("mydiv"));

    function dragElement(elmnt) {
      var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
      if (document.getElementById(elmnt.id + "header")) {
        document.getElementById(elmnt.id + "header").onmousedown =
          dragMouseDown;
      } else {
        elmnt.onmousedown = dragMouseDown;
      }

      function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();

        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;

        document.onmousemove = elementDrag;
      }

      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();

        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        elmnt.style.top = elmnt.offsetTop - pos2 + "px";
        elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
      }

      function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }
  }, []);

  return (
    <div className="main_content">
      <MyBlock>
        <div id="mydiv">
          <div id="mydivheader">Drag to move</div>
          <div>
            <Editor
              editorClassName="editor"
              toolbarClassName="toolbar"
              toolbarOnFocus
              toolbar={{
                // inDropdown: 해당 항목과 관련된 항목을 드롭다운으로 나타낼것인지
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: false },
              }}
              placeholder="내용을 작성해주세요."
              // 한국어 설정
              localization={{
                locale: "ko",
              }}
              editorState={editorState}
              onEditorStateChange={setEditorState}
              hashtag={{
                separator: " ",
                trigger: "#",
              }}
            />
          </div>
        </div>
      </MyBlock>
    </div>
  );
};

export default memo;
