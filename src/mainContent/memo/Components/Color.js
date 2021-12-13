import React, {useState} from "react";
import Tooltip from "./Tooltip";
import styled from "styled-components";

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
  color,
  border,
  selectedColor,
  tooltip,
  onClick,
}) {
  const [startDate, setStartDate] = useState()

  return (
    <Wrapper onClick={onClick}>
      <StyledCircle color={color} border={border} selectedColor={selectedColor}>
      
      </StyledCircle>
      {!!tooltip && <Tooltip content={tooltip} />}
    </Wrapper>
  );
}
