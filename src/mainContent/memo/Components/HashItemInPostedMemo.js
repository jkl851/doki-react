import React, { useState } from "react";

const HashItemInPostedMemo = ({
    no,
    name,
    checkedHash,
    allHashList,
    setAllHashList,
}) => {
    const checkHandler = () => {
        // allHashDatas의 true false를 설정하는 부분
        const checkedDatas = allHashList.map((data) => {
            no === data.hashNo ? (data.checkedHash = !data.checkedHash) : true;
            return {
                hashNo: data.hashNo,
                hashName: data.hashName,
                checkedHash: data.checkedHash
            };
        });

        setAllHashList(checkedDatas);


        // 위의 checkedDatas의 checked가 true인 객체만 따로 배열로 만들어서 메모 추가 버튼 Event에 세팅한다
        const postedHashDatas = Object.assign(
            [],
            checkedDatas
                .map((data) => {
                    // data.checked => true인 애들만 return
                    if (data.checkedHash) {
                        return {
                            hashNo: data.hashNo,
                            hashName: data.hashName,
                            checkedHash: data.checkedHash,
                        };
                    }
                    
                })
                .filter((data) => {
                    return data !== undefined;
                })
        );
        console.log("==== checked datas ====");
        console.log(postedHashDatas);
        console.log("===================");
    };
    return (
        <div
            style={{
                display: "inline-block",
                width: "100%",
                height: "auto",
                borderBottom: "1px solid #cccccc",
            }}
        >
            <input
                onChange={checkHandler}
                id={no}
                checked={checkedHash}
                style={{
                    marginLeft: "5px",
                    float: "left",
                    width: "18px",
                    height: "18px",
                }}
                type="checkbox"
            ></input>
            <label
                id={no}
                style={{
                    position: "relative",
                    top: "-2px",
                    marginLeft: "5px",
                    textAlign: "left",
                    float: "left",
                    width: "80%",
                    height: "90%",
                }}
            >
                {name}
            </label>
        </div>
    );
};

export default HashItemInPostedMemo;
