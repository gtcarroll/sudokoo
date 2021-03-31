import React from "react";
import styled from "styled-components";
import { Note, BorderBox } from "./";
import { colors, animation } from "./../../params.js";

// const getColor = (props) => {
//   if (props.data.borders.primary.set) return "primary";
//   else if (props.data.borders.secondary.set) return "secondary";
//   else return "tertiary";
// };

//TODO: add house borders to cells

let borderStyles = {
  basic: "1px solid " + colors.neutralHigh50,
  house: "2px solid " + colors.neutralHigh,
  primary: "3px solid " + colors.accentPrimary50,
  secondary: "3px solid " + colors.accentSecondary50,
  tertiary: "3px solid " + colors.accentTertiary50,
};

export const Cell = (props) => {
  return (
    <StyledDiv className={props.data.preset ? "preset " : ""}>
      <BorderBox
        borders={props.data.borders["primary"]}
        borderStyle={borderStyles["primary"]}
        zIndex={104}
      />
      <BorderBox
        borders={props.data.borders["secondary"]}
        borderStyle={borderStyles["secondary"]}
        zIndex={103}
      />
      <BorderBox
        borders={props.data.borders["tertiary"]}
        borderStyle={borderStyles["tertiary"]}
        zIndex={102}
      />
      <BorderBox
        borders={props.sides}
        borderStyle={borderStyles["house"]}
        zIndex={101}
      />
      <BorderBox
        borders={[true, true, true, true]}
        borderStyle={borderStyles["basic"]}
        zIndex={100}
      />
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
  sides: [false, false, false, false],
};

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 5;

  height: 100%;
  width: 100%;
  //overflow: hidden;
  //border: 1px solid ${colors.neutralHigh};
  color: ${colors.accentPrimary};
  background-color: ${colors.neutralMid};
  box-sizing: border-box;
  position: relative;

  transition: ${animation.halfSpeed};

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
