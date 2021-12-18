import React, { useState } from "react";

const HashItem = ({
    no,
    name,
    checked,
    allHashDatas,
    setAllHashDatas,
    InputEvent,
}) => {
    const checkHandler = () => {
        // allHashDatas의 true false를 설정하는 부분
        const checkedDatas = allHashDatas.map((data) => {
            no === data.no ? (data.checked = !data.checked) : true;
            return {
                no: data.no,
                name: data.name,
                checked: data.checked,
            };
        });

        setAllHashDatas(() => {
            return checkedDatas;
        });


        // 위의 checkedDatas의 checked가 true인 객체만 따로 배열로 만들어서 메모 추가 버튼 Event에 세팅한다
        const postedHashDatas = Object.assign(
            [],
            checkedDatas
                .map((data) => {
                    // data.checked => true인 애들만 return
                    if (data.checked) {
                        return {
                            no: data.no,
                            name: data.name,
                            checked: data.checked,
                        };
                    }
                    // no === data.no ?
                    //     data.checked = !data.checked :
                    //     true;
                    // return {
                    //     no: data.no,
                    //     name: data.name,
                    //     checked: data.checked
                    // }
                })
                .filter((data) => {
                    return data !== undefined;
                })
        );
        console.log("==== checked datas ====");
        console.log(postedHashDatas);
        console.log("===================");

        InputEvent(
            // name, value => value는 name 속성의 배열
            "hash",
            postedHashDatas
        );
    };
    return (
        <div
            style={{
                padding: "1px 1px",
                display: "block",
                width: "100%",
                height: "30px",
                borderBottom: "1px solid #cccccc",
            }}
        >
            <input
                onChange={checkHandler}
                id={no}
                checked={checked}
                style={{
                    marginLeft: "5px",
                    float: "left",
                    width: "10%",
                    height: "100%",
                }}
                type="checkbox"
            ></input>
            <label
                id={no}
                style={{
                    paddingTop: "3px",
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

export default HashItem;
