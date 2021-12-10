import React, { useEffect, useState } from "react";
import HeaderDiv from "./header/HeaderDiv";
//import Maincontent from "./mainContent/Maincontent";
import Sidebar from "./sidebar/Sidebar";
import SideChat from "./sidechat/SideChat";
import styled from 'styled-components'; // 블록단위 css 먹이기 + 함수화 가능한 라이브러리
// ====에디터=====
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const MyBlock = styled.div`
    .wrapper-class{
      margin-left: auto;
      width: calc(100% - 280px);
      height: 93vh;
      overflow: auto;
    }
  .editor {
    height: 300px !important;
    width: 500px !important;
    border: 1px solid #f1f1f1 !important;
    padding: 5px !important;
    border-radius: 2px !important;
    margin: auto !important;
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



export default function Doki() {

  const [editorState, setEditorState] = useState(() =>
  EditorState.createEmpty()
  );
  useEffect(() => {
    console.log(editorState);
  }, [editorState]);

  return (
    <div id="whole_wrapper">
      <HeaderDiv />
      <div id="main_sidebar">
        <Sidebar />
      </div>

      <div className="main_content">
          <MyBlock>
          <div className="wrapper-class">
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
                  locale: 'ko',
                }}
                editorState={editorState}
                onEditorStateChange={setEditorState}
                hashtag={{
                  separator: ' ',
                  trigger: '#',
                }}
                
              />
            </div>
          </div>
          </MyBlock>
        </div>

      <SideChat />
    </div>
  );
}
