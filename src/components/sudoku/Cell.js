import React from "react";
import styled from "styled-components";
import { Note } from "./";
import { colors, animation } from "./../../params.js";

let borderBasic = "1px solid " + colors.neutralHigh,
  borderPrimary = "3px double" + colors.accentPrimary,
  borderSecondary = "3px double" + colors.accentSecondary,
  borderTertiary = "3px double" + colors.accentTertiary;

export const Cell = (props) => {
  return (
    <StyledDiv
      className={props.data.preset ? "preset " : ""}
      style={{
        borderTop: props.data.borders.primary[0]
          ? borderPrimary
          : props.data.borders.secondary[0]
          ? borderSecondary
          : props.data.borders.tertiary[0]
          ? borderTertiary
          : borderBasic,
        borderRight: props.data.borders.primary[1]
          ? borderPrimary
          : props.data.borders.secondary[1]
          ? borderSecondary
          : props.data.borders.tertiary[1]
          ? borderTertiary
          : borderBasic,
        borderBottom: props.data.borders.primary[2]
          ? borderPrimary
          : props.data.borders.secondary[2]
          ? borderSecondary
          : props.data.borders.tertiary[2]
          ? borderTertiary
          : borderBasic,
        borderLeft: props.data.borders.primary[3]
          ? borderPrimary
          : props.data.borders.secondary[3]
          ? borderSecondary
          : props.data.borders.tertiary[3]
          ? borderTertiary
          : borderBasic,
      }}
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
    //borders: [false, false, false, false],
    borders: {
      primary: [false, false, false, false],
      secondary: [false, false, false, false],
      tertiary: [false, false, false, false],
    },
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
  color: ${colors.accentPrimary};
  background-color: ${colors.neutralMid};
  box-sizing: border-box;
  position: relative;

  transition: ${animation.halfSpeed};

  @keyframes pulseBorders {
    0% {
      border: 1px solid ${colors.neutralHigh};
    }
  }

  animation: pulseBorders ${animation.speed} ease-in-out;
  }

  @keyframes pulse {
    0% {
      opacity: 0;
    }
    ${animation.midPoint} {
      font-size: ${animation.fontGrow};
      background-color: ${colors.accentPrimary};
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
