import React from "react";
import styled from "styled-components";
import { Cell } from "./";
import { colors } from "./../../params.js";

export const House = (props) => {
  return (
    <StyledDiv
      className={
        (props.isSolved ? "solved " : "") + (props.overlay ? "overlay" : "")
      }
    >
      <Cell
        data={props.house && props.house[0]}
        sides={[true, false, false, true]}
      />
      <Cell
        data={props.house && props.house[1]}
        sides={[true, false, false, false]}
      />
      <Cell
        data={props.house && props.house[2]}
        sides={[true, true, false, false]}
      />
      <Cell
        data={props.house && props.house[3]}
        sides={[false, false, false, true]}
      />
      <Cell
        data={props.house && props.house[4]}
        sides={[false, false, false, false]}
      />
      <Cell
        data={props.house && props.house[5]}
        sides={[false, true, false, false]}
      />
      <Cell
        data={props.house && props.house[6]}
        sides={[false, false, true, true]}
      />
      <Cell
        data={props.house && props.house[7]}
        sides={[false, false, true, false]}
      />
      <Cell
        data={props.house && props.house[8]}
        sides={[false, true, true, false]}
      />
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

  /* border: 1px solid ${colors.neutralHigh}; */

  box-sizing: border-box;

  &.solved {
    border-color: ${colors.accentPrimary};
  }

  &.overlay {
    border: none;
  }
`;
