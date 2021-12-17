import React, {useRef} from "react";
import Tooltip from "./Tooltip";
import styled from "styled-components";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

const Wrapper = styled.div`
  position: relative;
`;
const StyledCircle = styled.div`
  width: 25px;
  height: 25px;
  margin: 3px;
  border-radius: 50%;
  z-index: 9999;
  border: 2px solid ${({ border }) => border};
  background: ${({ color }) => color};

  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  > svg {
    display: ${({ color, selectedColor }) =>
      color === selectedColor ? "block" : "none"};
  }
`;

export default function Color({
  value,
  border,
  selectedColor,
  tooltip,
  onClick,
}) {
<<<<<<< HEAD
  return (
    <Wrapper onClick={onClick} value={value} name="color">
=======

  return (
    <Wrapper value={value} name="color" onClick={(e) => {onClick('color', value)}}>
>>>>>>> 86e8c9b6f27bce9757801c1e7975a8909e913e5a
      <StyledCircle color={value} border={border} selectedColor={selectedColor}>
        <CheckOutlinedIcon />
      </StyledCircle>
      {!!tooltip && <Tooltip content={tooltip} />}
    </Wrapper>
  );
}
