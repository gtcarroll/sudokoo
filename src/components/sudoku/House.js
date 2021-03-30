import React from "react";
import styled from "styled-components";
import { colors } from "./../../params.js";

export const House = (props) => {
  return (
    <StyledDiv
      className={
        (props.isSolved ? "solved " : "") + (props.overlay ? "overlay" : "")
      }
    >
      {props.children}
    </StyledDiv>
  );
};

House.defaultProps = {
  isSolved: false,
  overlay: false,
};

const StyledDiv = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);

  height: 100%;
  width: 100%;
  background-color: ${colors.neutralMid};

  border: 1px solid ${colors.neutralHigh};

  box-sizing: border-box;

  &.solved {
    border-color: ${colors.accentPrimary};
  }

  &.overlay {
    border: none;
  }
`;
