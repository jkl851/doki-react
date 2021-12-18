import React from "react";
import Color from "./Color";
import styled from "styled-components";

const Wrapper = styled.div`
    position: relative;
    display: inline-block;
`;

const Palette = styled.div`
    z-index: 9999;
    position: absolute;
    width: 130px;
    height: 110px;
    background: white;

    transform: translate(-50%, 15%);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    cursor: default;

    display: flex;
    flex-wrap: wrap;
    align-items: center;
`;

const colors = [
    {
        color: "#FFFFFF",

        border: "#d9dce0",
        tooltip: "기본값",
    },
    { color: "#f28b82", tooltip: "빨강" },
    { color: "#fbbc04", tooltip: "주황" },
    { color: "#fff475", tooltip: "노랑" },
    { color: "#ccff90", tooltip: "녹색" },
    { color: "#a7ffeb", tooltip: "청록" },
    { color: "#cbf0f8", tooltip: "파랑" },
    { color: "#aecbfa", tooltip: "진파랑" },
    { color: "#d7aefb", tooltip: "보라" },
    { color: "#fdcfe8", tooltip: "분홍" },
    { color: "#e6c9a8", tooltip: "갈색" },
    { color: "#e8eaed", tooltip: "회색" },
];

export default function ColorPalette({ cmemo, InputEvent }) {
    return (
        <Wrapper>
            <Palette>
                {colors.map((color, idx) => (
                    <Color
                        key={idx}
                        name="color"
                        value={color.color}
                        onClick={InputEvent}
                        border={color.border ? color.border : color.color}
                        selectedColor={cmemo.color}
                        tooltip={color.tooltip}
                    />
                ))}
            </Palette>
        </Wrapper>
    );
}
