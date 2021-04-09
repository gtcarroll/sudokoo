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
    <StyledDiv
      className={
        props.data.preset ? "preset " : props.data.val > 0 ? "set" : ""
      }
    >
      {props.data.borders["primary"].set ? (
        <BorderBox
          borders={props.data.borders["primary"]}
          borderStyle={borderStyles["primary"]}
          bgColor={colors.accentPrimaryBG}
          zIndex={104}
        />
      ) : props.data.borders["secondary"].set ? (
        <BorderBox
          borders={props.data.borders["secondary"]}
          borderStyle={borderStyles["secondary"]}
          bgColor={colors.accentSecondaryBG}
          zIndex={103}
        />
      ) : props.data.borders["tertiary"].set ? (
        <BorderBox
          borders={props.data.borders["tertiary"]}
          borderStyle={borderStyles["tertiary"]}
          bgColor={colors.accentTertiaryBG}
          zIndex={102}
        />
      ) : null}
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
      {props.data.val > 0 ? (
        <Value
          className={
            props.data.preset ? "preset " : props.data.val > 0 ? "set" : ""
          }
        >
          <div>{props.data.val}</div>
        </Value>
      ) : null}
      {!props.data.preset ? (
        <Notes>
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
      ) : null}
    </StyledDiv>
  );
};

Cell.defaultProps = {
  data: {
    val: -1,
    preset: false,
    notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
    bgColor: {
      primary: false,
      secondary: false,
      tertiary: false,
    },
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

  z-index: 10;

  height: 100%;
  width: 100%;
  color: ${colors.accentPrimary};
  box-sizing: border-box;
  position: relative;

  transition: ${animation.halfSpeed};

  .preset {
    background-color: ${colors.neutralLow};
  }
  .set {
    background-color: ${colors.neutralMid};
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

  z-index: 5;

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
  animation: pulse ${animation.speed} ease-in-out;
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
