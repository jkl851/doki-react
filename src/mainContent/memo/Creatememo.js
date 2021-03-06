import React, {
    useState,
    useContext,
    useReducer,
    useEffect,
    Fragment,
    useRef
} from "react";
import { MemoContext, memoReducer } from "./modules/MemoReducer";
import axios from "axios";

import MemoAlarm from "./Components/MemoAlarm";
import Palette from "./Components/Palette";
import HashTagBox from "./Components/HashTagBox";
import PostedHash from "./Components/PostedHash";

import styled from "styled-components";
import { Button } from "@mui/material";
import PinIcon from "@mui/icons-material/PushPinOutlined";
import PinnedIcon from "@mui/icons-material/PushPin";
import AddIcon from "@mui/icons-material/Add";
import AlarmAddIcon from "@mui/icons-material/AlarmAdd";
import PaletteIcon from "@mui/icons-material/PaletteOutlined";
import AddPhotoIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import HashTagIcon from "@mui/icons-material/Tag";
import dayjs from 'dayjs'

const BackgroundColor = styled.div`
    background: ${({ color }) => color};
`;
// 메모 처음 값
const memoInitialState = {
    no: "",
    title: "",
    image: "",
    contents: "",
    alarm: dayjs(new Date()).format("YYYY-MM-DD hh:mm"),
    checked: '0',
    alarmset: "0",
    color: "#FFFFFF",
    hash: [],
    pin: "0",
    visible: "1",
};

export default function CreateMemo({allinfo, division, deptAuth}) {

    console.log("내 부서 권한(createMemo) "+ deptAuth)
    const [imgBase64, setImgBase64] = useState(""); // 파일 base64
    const [imgFile, setImgFile] = useState(null);	//파일	
    const [visible, setVisible] = useState(false);

    const visibleHandle = () => {
        setVisible(true);
    }

    const handleChangeFile = (event) => {
      let reader = new FileReader();
  
      reader.onloadend = () => {
        // 2. 읽기가 완료되면 아래코드가 실행됩니다.
        const base64 = reader.result;

        if (base64) {
          setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
          alert(base64.toString());
        }
        console.log(imgBase64);
        console.log(base64.toString());
        
      }

      if (event.target.files[0]) {
        reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
        setImgFile(event.target.files[0]); // 파일 상태 업데이트
      }

    }
    
    // 전역 컨텍스트
    const [memos, dispatch] = useContext(MemoContext);

    // Create Memo State
    const [cmemo, setCmemo] = useState(memoInitialState);

     // Create Hash State
    const [allHashDatas, setAllHashDatas] = useState([]);



    // 메모 토글
    const [expandMemo, setExpandMemo] = useState(false);
    const [expandAlarm, setExpandAlarm] = useState(false);
    const [expandPalette, setExpandPalette] = useState(false);
    const [expandHashTag, setExpandHashTag] = useState(false);
    const [pinned, setPinned] = useState(false);

    // const photoEvent = (event) => {
    //     const name = event.target.name;
    //     alert(`${name} 메모의 이미지삽입 : 개발중`);
    // };

    const hashTagEvent = () => {
        setExpandHashTag(!expandHashTag);
    };

    // 메모 value 추가 이벤트
    const InputEvent = (name, value) => {
        console.log(name +': 네임  인풋이벤트 밸류 : '+ value);
        setCmemo((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
            };
        });
    };

    // 메모 추가 이벤트
    const addEvent = async() => {
        if (cmemo.title === "" || cmemo.contents === "") {
            alert("제목이나 본문을 기입하세요");
            return memos;
        }
            
        // cmemo에 userNo, departmentNo를 추가하여 전송한다
        Object.assign(cmemo, {"userNo": allinfo.no, "departmentNo": division} );
        
        console.log('[cmemo]=================')
        console.log(cmemo)
        // addMemo를 한 후 Response가 ok(200)일 때 front에도 뿌려주고 초기화를 한다
        await axios
            .post("http://localhost:8080/doki/memo/addMemo", cmemo)
            .then((Response) => {
                
                Object.assign(cmemo, {"no": Response.data.no});
                
                console.log('[newObj!!!!!!!!!!!]')
                console.log(cmemo)
                
                let newObj = null;
                // 해시 길이가 0이상이면 새로운 객체로 만들어야한다
                if(cmemo.hash.length > 0) {
                    newObj = Object.assign(cmemo, {
                        'hashNo': cmemo.hash[0].hashNo,
                        'hashName': cmemo.hash[0].hashName,
                        'hashCount': cmemo.hash.length
                    })                    
                } else {
                    newObj = Object.assign(cmemo, {
                        'hashNo': null,
                        'hashName': null,
                        'hashCount': 0
                    })
                }

                dispatch({ type: "ADD_MEMO", memo: newObj });

                // 초기화
                setCmemo({
                    no: "",
                    title: "",
                    contents: "",
                    alarm: dayjs(new Date()).format("YYYY-MM-DD hh:mm"),
                    checked: '0',
                    alarmset: "0",
                    color: "#FFFFFF",
                    hash: [],
                    pin: "0",
                    visible: "1",
                });
                setPinned(false);
                setAllHashDatas(datas => {
                  return datas.map(data => {
                    return {
                      hashNo: data.hashNo,
                      hashName: data.hashName,
                      checkedHash: false
                    }
                  })
                })
                setExpandHashTag(false);
            })
            .catch((Error) => {
                console.log(Error);
            });
        
            //MemoAlarm Pub 작업
            // try {
            //     await axios({
            //         method: "post",
            //         url: `http://localhost:8080/doki/talk/memoAlarmPub`,
            //         params: {
            //         roomId: allinfo.departmentNo * 100,
            //         memoNo: 999,
            //         title: cmemo.title,
            //         senderNo: allinfo.no,
            //         messageType: 'add'
            //         }
            //     })
            //     .then((response) => {
            //         return response;
            //     })
            //     .catch((Error) => {
            //         console.log(Error);
            //     })
        
            // } catch (err) {
            // console.error(err);
            // }
    };

    // 토글에 따른 메모 버튼 활성화
    const expandCreateMemo = () => {
        if(division === 1){
            deptAuth === 2 ? setExpandMemo(true) : true
        } else {
            deptAuth !== '0' ? 
            setExpandMemo(true)
            : true
        }
        
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

    const isPinned = () => {
      if(pinned){
        InputEvent("pin", "0")
        setPinned(!pinned);
      } else {
        InputEvent("pin", "1")
        setPinned(!pinned);
      }

    };

    
  // [soo] 임시로 전체 해시값 가져옴 => 나중에 allHashDatas를 전역 context로 옮겨야함
  useEffect(() => {
    axios
        .get(`http://localhost:8080/doki/hash/getAllHashList`)
        .then((Response) => {

            setAllHashDatas(
                Response.data.map((data) => {
                    return {
                        hashNo: data.hashNo,
                        hashName: data.hashName,
                        checkedHash: false,
                    };
                })
            );
        })
        .catch((Error) => {
            console.log(Error);
        });
  }, []);
/////////////////////////////////////////////////////////////////////////



    ////////////////////// 외부 클릭시 토글 닫기 기능 ////////////////////////
    const alarmOutsideRef = useAlarmOutSideRef(null);
    function useAlarmOutSideRef() {
        const alarmRef= useRef(null);
        useEffect(() => {
            function handelClickOutside(event) {
                if(alarmRef.current && !alarmRef.current.contains(event.target)) {
                    setExpandAlarm(false);
                } 
            }
            document.addEventListener('click', handelClickOutside);

            return () => {
                document.removeEventListener('click', handelClickOutside);
            };
        });
        return alarmRef;
    }

    const paletteOutsideRef = usePaletteOutSideRef(null);
    function usePaletteOutSideRef() {
        const palletRef= useRef(null);
        useEffect(() => {
            function handelClickOutside(event) {
                if(palletRef.current && !palletRef.current.contains(event.target)) {
                    setExpandPalette(false);
                } 
            }
            document.addEventListener('click', handelClickOutside);

            return () => {
                document.removeEventListener('click', handelClickOutside);
            };
        });
        return palletRef;
    }

    const hashOutsideRef = useHashOutSideRef(null);
    function useHashOutSideRef() {
        const hashRef= useRef(null);
        useEffect(() => {
            function handelClickOutside(event) {
                if(hashRef.current && !hashRef.current.contains(event.target)) {
                    setExpandHashTag(false);
                } 
            }
            document.addEventListener('click', handelClickOutside);

            return () => {
                document.removeEventListener('click', handelClickOutside);
            };
        });
        return hashRef;
    }

    const createMemoOutsideRef = useCreateMemoOutSideRef(null);
    function useCreateMemoOutSideRef() {
        const createMemoRef= useRef(null);
        useEffect(() => {
            function handelClickOutside(event) {
                if(createMemoRef.current && !createMemoRef.current.contains(event.target)) {
                    collapseCreateMemo();
                } else {
                    expandCreateMemo();
                }
            }
            document.addEventListener('click', handelClickOutside);

            return () => {
                document.removeEventListener('click', handelClickOutside);
            };
        });
        return createMemoRef;
    }
    /////////////////////////////////////////////////////////////////

    // 부서 번호가 바뀔 때 마다 cmemo의 값을 초기화 해준다
    useEffect(() => {
        setCmemo(memoInitialState)
        setExpandAlarm(false);        
        setExpandHashTag(false)
        setExpandPalette(false)
    }, [division])



    return (
        deptAuth !== '0' &&
        <div>
            <form className="create-memo-form">
                {/* onMouseLeave={collapseCreateMemo}> */}
                <BackgroundColor className="input_wrapper" color={cmemo.color} ref={createMemoOutsideRef} >
                    {/* 제목 */}
                    {expandMemo ? (
                            <div>
                                <textarea
                                    type="text"
                                    placeholder="제목"
                                    className="title_input"
                                    value={cmemo.title}
                                    name="title"
                                    onChange={(e) => { InputEvent( e.target.name, e.target.value ); }}
                                />
                                { pinned ? (
                                <PinnedIcon
                                    className="pin_in_cmemo"
                                    name="pin"
                                    value="0"
                                    onClick={(e) => { isPinned() }}
                                />
                                 ) : (
                                <PinIcon
                                    className="pin_in_cmemo"
                                    name="pin"
                                    value="1"
                                    onClick={(e) => {  isPinned() }}
                                />
                                 )}
                            </div>
                    ) : (
                        false
                    )}
{/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                    {/* 본문 */}
                    {visible === true 
                        ? 
                            <div style={{textAlign:"center"}}>
                                <input type="image" src={imgBase64} style={{ margin:'auto', width:'100%', height:'100%'}}/>
                            </div>
                        : 
                            <div style={{textAlign:"center"}}>
                                <input type="image" src={imgBase64} style={{ display:"none", margin:'auto', width:'100%', height:'100%'}}/>
                            </div>
                    }
{/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}                    
                    
                    <textarea
                        rows="6"
                        column="20"
                        placeholder=">"
                        className="description_input"
                        value={cmemo.contents}
                        name="contents"
                        onChange={(e) => { InputEvent(e.target.name, e.target.value); }}
                        // onMouseEnter={expandCreateMemo}
                    ></textarea>

                    {/* 메모에 해시가 추가되는 부분 */}
                    <div className="hash_box">
                        {allHashDatas
                            .filter((data) => data.checkedHash === true)
                            .map((data, index) => {
                                return (
                                    <PostedHash key={index} hashName={'#'+data.hashName} />
                                );
                            })}
                    </div>

                    <div
                        className="buttons-div"
                        style={{ textAlign: "center" }}
                    >
                        <div className="alarm-div" 
                        //ref={alarmOutsideRef}
                        >
                            <Button
                                className="alarmButton"
                                onClick={expandAlarmTable}
                            >
                                <AlarmAddIcon
                                    className="add-alarm"
                                    color="action"
                                />
                            </Button>
                            {expandAlarm ? (
                                <div className="alarm-div-dropdown">
                                    <MemoAlarm
                                        className="memoAlarm"
                                        memo={cmemo}
                                        InputEvent={InputEvent}
                                        isPosted={false}
                                    />
                                </div>
                            ) : (
                                false
                            )}
                        </div>

                        {/* Palette */}
                        <Button
                            className="paletteButton"
                            onClick={expandPaletteTable}
                            ref={paletteOutsideRef}
                        >
                            <PaletteIcon
                                className="add-palette"
                                color="action"
                            />
                        </Button>
                        {expandPalette ? (
                            <Palette
                                className="memoPalette"
                                name="color"
                                memo={cmemo}
                                InputEvent={InputEvent}
                            />
                        ) : (
                            false
                        )}


                        
{/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                        <Button className="photoButton" component="label">
                            
                            <AddPhotoIcon className="add-photo" color="action"/>
                            <input style={{ display: 'none' }} type="file" accept="image/*" onChange={handleChangeFile} onClick={visibleHandle}/>
                            
                        </Button>
{/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}



                        {/* HashTag */}
                        <Button onClick={hashTagEvent}
                            //</div>ref={hashOutsideRef}
                            >
                            <HashTagIcon color="action" />
                        </Button>
                        {expandHashTag ? ( //false로 바꿔둠 (가리기용)
                            <HashTagBox
                                shouldCloseOnOverlayClick={true}
                                onRequestClose={hashTagEvent}
                                name="hashtag"
                                allHashDatas={allHashDatas}
                                setAllHashDatas={setAllHashDatas}
                                cmemo={cmemo}
                                InputEvent={InputEvent}
                            />
                        ) : (
                            false
                        )}

                        <Button className="addButton" onClick={addEvent}>
                            <AddIcon className="add-icon" />
                        </Button>
                    </div>
                </BackgroundColor>
            </form>
        </div>
        
    );
}
