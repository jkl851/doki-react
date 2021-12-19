import React, { useState, useEffect } from "react";
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
    height: 280px;
    background: white;
    fontsize: 5px;

    transform: translate(-30%, 8%);
    box-shadow: 3px 3px 10px 0px rgba(0, 0, 0, 0.16);
    cursor: default;

    flex-wrap: wrap;
    align-items: center;
`;

const HashTagBox = ({ allHashDatas, setAllHashDatas, cmemo, InputEvent }) => {
    
    const [keyword, setKeyword] = useState("");

    const handleKeyword = (e) => {
        setKeyword(e.target.value);
    };

    const handleAddHashToMemo = () => {
        // 어떤 데이터를 put?
        const putDatas = Object.assign(
            [],
            allHashDatas.map((data) => {
                // data.checked => true인 애들만 return
                if (data.checked === true) {
                    return data;
                }
            })
        );
        console.log("==== put datas ====");
        console.log(putDatas);
        console.log("===================");
    };

    const handleToCreateHash = () => {
        console.log("[keyword] =>> " + keyword);
        if (keyword === "") {
            return;
        }

        axios
            .post(`http://localhost:8080/doki/hash/addHash`, { name: keyword })
            .then((Response) => {
                console.log("===== Add Hash 응답받음! =====");
                console.log(Response);
                console.log("=============================");
                setAllHashDatas(
                    Response.data.map((data) => {
                        return {
                            no: data.no,
                            name: data.name,
                            checked: false,
                        };
                    })
                );
                setKeyword("");
            })
            .catch((Error) => {
                console.log(Error);
            });
    };

    return (
        <Wrapper>
            <HashTag>
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
                    style={{
                        overflowY: "auto",
                        width: "100%",
                        height: "210px",
                        borderBottom: "1px solid",
                        
                    }}
                >
                    {
                        (console.log("=============="),
                        console.log(allHashDatas),
                        console.log("=============="),
                        allHashDatas
                            .filter((data) => {
                                return data.name.indexOf(keyword) !== -1;
                            })
                            .map((data, index) => {
                                return (
                                    <HashItem
                                        key={index}
                                        no={data.no}
                                        name={data.name}
                                        checked={data.checked}
                                        allHashDatas={allHashDatas}
                                        setAllHashDatas={setAllHashDatas}
                                        InputEvent={InputEvent}
                                    />
                                );
                            }))
                    }
                </div>
                {
                    allHashDatas.forEach(element => {
                        element.name !== keyword ? console.log(keyword) : true
                    })
                
                && (
                    // {/* 검색의 keyword와 리스트의 해시 값의 일치 유무에 따라 display를 보였다 안보였다 토글한다*/}
                    <div
                        onClick={handleToCreateHash}
                        style={{
                            cursor: "pointer",
                            width: "100%",
                            height: "25px",
                        }}
                    >
                        <AddIcon
                            style={{
                                float: "left",
                                width: "15%",
                                height: "25px",
                            }}
                        />
                        '
                        <span
                            style={{
                                width: "85%",
                                height: "25px",
                                overflow: "hidden",
                            }}
                        >
                            {keyword}
                        </span>
                        ' 만들기
                    </div>
                )}
            </HashTag>
        </Wrapper>
    );
};

export default HashTagBox;
