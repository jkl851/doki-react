import React, { useState, useRef } from "react";
import styled from "styled-components";
import HashItem from "./HashItem";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
const Wrapper = styled.div`
    position: relative;
    display: inline-block;
`;

const HashTag = styled.div`
    border: 1px solid #9d9d9d;
    border-radius: 5px;
    z-index: 9999;
    position: absolute;
    width: 200px;
    height: fit-content;
    background: white;
    transform: translate(-30%, 8%);
    box-shadow: 3px 3px 10px 0px rgba(0, 0, 0, 0.16);
    cursor: default;

    flex-wrap: wrap;
    align-items: center;
`;

const HashTagBox = ({ allHashDatas, setAllHashDatas, cmemo, InputEvent }) => {
    const [keyword, setKeyword] = useState("");
    const [canMakeFlag, setCanMakeFlag] = useState(false);

    const Ref = useRef();

    const handleKeyword = (e) => {
        setKeyword(e.target.value);
        const filteredDatas = allHashDatas.filter((data) => {
            return data.hashName === e.target.value ? data : null;
        });

        // keyword가 모든 해시들을 조회해서 맞는 값이 없거나 빈 스트링이면 해시를 만들 수 있는 조건이다
        setCanMakeFlag(
            filteredDatas.length === 0 && e.target.value !== "" ? true : false
        );
    };

    const handleToCreateHash = () => {
        console.log("[keyword] =>> " + keyword);
        if (keyword === "") {
            return;
        }

        axios
            .post(`http://localhost:8080/doki/hash/addHash`, { hashName: keyword }) // 여기수정
            .then((Response) => {
                console.log("===== Add Hash 응답받음! =====");
                console.log(Response);
                console.log("=============================");
                setAllHashDatas(
                    Response.data.map((data) => {
                        return {
                            hashNo: data.hashNo,
                            hashName: data.hashName,
                            checkedHash: false,
                        };
                    })
                );
                setKeyword("");
                setCanMakeFlag(false);
            })
            .catch((Error) => {
                console.log(Error);
            });
    };

    return (
        <Wrapper>
            <HashTag ref={Ref}>
                <div
                    style={{
                        width: "100%",
                        height: "20px",
                        backgroundColor: "#7995f1",
                        borderTopLeftRadius: "5px",
                        borderTopRightRadius: "5px",
                    }}
                >
                    <label style={{ color: "#ffffff" }}>
                        메모 해시태그 지정
                    </label>
                </div>

                {/* 해시 검색 */}
                <div
                    style={{
                        width: "100%",
                        height: "25px",
                        borderBottom: "1px solid",
                    }}
                >
                    <input
                        onChange={handleKeyword}
                        value={keyword}
                        style={{
                            textAlign: "center",
                            float: "left",
                            position: "relative",
                            width: "90%",
                            height: "100%",
                        }}
                        type="text"
                        placeholder="해시태그 입력"
                    ></input>
                    <SearchIcon
                        style={{
                            textAlign: "center",
                            float: "right",
                            width: "10%",
                            height: "100%",
                        }}
                    />
                </div>
                {/* 해시 리스트 */}
                <div 
                    className="hashList2"
                    style={{
                        overflow: "overlay",
                        msOverflowStyle: "none",
                        width: "100%",
                        height: "208px",
                        cursor: "pointer",
                        outline: "none",
                        padding: "5px 10px 3px 3px",
                        position: "relative",
                    }}
                >
                    {
                    
                        allHashDatas
                        .filter((data) => {
                            return data.hashName.indexOf(keyword) !== -1;
                        })

                        .map((data, index) => {
                            return (
                                <HashItem
                                    key={index}
                                    no={data.hashNo}
                                    name={data.hashName}
                                    checkedHash={data.checkedHash}
                                    allHashDatas={allHashDatas}
                                    setAllHashDatas={setAllHashDatas}
                                    InputEvent={InputEvent}
                                />
                            );
                        })}
                </div>
                {
                    // 해시 검색어가 db에 없는 상태라면 만들기 버튼 활성화
                    canMakeFlag && (
                        <div
                            onClick={handleToCreateHash}
                            style={{
                                display: "flex",
                                borderTop: "1px solid ",
                                cursor: "pointer",
                                display: "block",
                                width: "100%",
                                height: "fit-content",
                                position: "relative",
                                top: "-10%",
                                paddingRight: "10px",
                            }}
                        >
                            <AddIcon
                                style={{
                                    float: "left",
                                    width: "15%",
                                    height: "25px",
                                }}
                            />
                            <div
                                style={{
                                    width: "100%",
                                    wordBreak: "break-all",
                                    maxHeight: "75px",
                                }}
                            >
                                '
                                <span
                                    style={{
                                        width: "100%",
                                        maxHeight: "100%",
                                        fontSize: "12px",
                                        textOverflow: "ellipsis",
                                        wordBreak: "break-all",
                                    }}
                                >
                                    {keyword}
                                </span>
                                ' 만들기
                            </div>
                        </div>
                    )
                }
            </HashTag>
        </Wrapper>
    );
};

export default HashTagBox;
