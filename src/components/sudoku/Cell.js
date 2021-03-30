import React from "react";
import styled from "styled-components";
import { Note } from "./";
import { colors, animation } from "./../../params.js";

export const Cell = (props) => {
  return (
    <StyledDiv
      className={
        (props.data.preset ? "preset " : "") +
        (props.data.borders[0] ? "top " : "") +
        (props.data.borders[1] ? "right " : "") +
        (props.data.borders[2] ? "bottom " : "") +
        (props.data.borders[3] ? "left " : "")
      }
    >
      <Value className={props.data.val > 0 ? "show" : "hide"}>
        <div>{props.data.val}</div>
      </Value>
      <Notes className={props.data.preset ? "hide" : ""}>
        <Note num={1} tag={props.data.notes[0]} />
        <Note num={2} tag={props.data.notes[1]} />
        <Note num={3} tag={props.data.notes[2]} />
        <Note num={4} tag={props.data.notes[3]} />
        <Note num={5} tag={props.data.notes[4]} />
        <Note num={6} tag={props.data.notes[5]} />
        <Note num={7} tag={props.data.notes[6]} />
        <Note num={8} tag={props.data.notes[7]} />
        <Note num={9} tag={props.data.notes[8]} />
      </Notes>
    </StyledDiv>
  );
};

Cell.defaultProps = {
  data: {
    val: -1,
    set: false,
    notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
    // TODO: allow for 3 different border colors
    borders: [false, false, false, false],
    // bordersPrimary: [false, false, false, false],
    // bordersSecondary: [false, false, false, false],
    // bordersTertiary: [false, false, false, false],
  },
};

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 5;

  height: 100%;
  width: 100%;
  overflow: hidden;
  border: 1px solid ${colors.neutralHigh};
  color: ${colors.accentHighlight};
  background-color: ${colors.neutralMid};
  box-sizing: border-box;
  position: relative;

  //transition: 0.8s;

  @keyframes pulseBorders {
    0% {
      border: 1px solid ${colors.neutralHigh};
    }
  }

  animation: pulseBorders ${animation.speed} ease-in-out;

  &.top {
    border-top: 3px double ${colors.accentHighlight};
  }
  &.right {
    border-right: 3px double ${colors.accentHighlight};
  }
  &.bottom {
    border-bottom: 3px double ${colors.accentHighlight};
  }
  &.left {
    border-left: 3px double ${colors.accentHighlight};
  }

  @keyframes pulse {
    0% {
      opacity: 0;
    }
    ${animation.midPoint} {
      font-size: ${animation.fontGrow};
      background-color: ${colors.accentHighlight};
      color: ${colors.neutralMid};
      opacity: 1;
    }
  }

  &.preset {
    background-color: ${colors.neutralLow};
  }

  .show {
    background-color: inherit;
    animation: pulse ${animation.speed} ease-in-out;
  }

  .hide {
    opacity: 0;
  }
`;

const Value = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 10;
`;

const Notes = styled.div`
  position: absolute;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  height: 95%;
  width: 95%;
  padding: 5%;
`;
