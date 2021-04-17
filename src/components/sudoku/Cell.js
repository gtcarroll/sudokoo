import React from "react";
import styled from "styled-components";
import { Note, NoteOverlay } from "./";
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
  // console.log(props.noteAccents);
  let repeat =
    props.data.borders["primary"].set ||
    props.data.borders["secondary"].set ||
    props.data.borders["tertiary"].set;
  return (
    <StyledDiv
      className={
        (props.data.preset ? "preset " : "") + (repeat ? "repeat " : "")
      }
    >
      {(props.data.borders["primary"].set || props.data.bgColor["primary"]) && (
        <NoteOverlay
          borders={props.data.borders["primary"]}
          borderStyle={borderStyles["primary"]}
          bgColor={colors.accentPrimaryBG}
          zIndex={14}
        />
      )}
      {(props.data.borders["secondary"].set ||
        props.data.bgColor["secondary"]) && (
        <NoteOverlay
          borders={props.data.borders["secondary"]}
          borderStyle={borderStyles["secondary"]}
          bgColor={colors.accentSecondaryBG}
          zIndex={13}
        />
      )}
      {(props.data.borders["tertiary"].set ||
        props.data.bgColor["tertiary"]) && (
        <NoteOverlay
          borders={props.data.borders["tertiary"]}
          borderStyle={borderStyles["tertiary"]}
          bgColor={colors.accentTertiaryBG}
          zIndex={12}
        />
      )}
      <NoteOverlay
        borders={props.sides}
        borderStyle={borderStyles["house"]}
        zIndex={11}
      />
      <NoteOverlay
        borders={[true, true, true, true]}
        borderStyle={borderStyles["basic"]}
        zIndex={10}
      />
      {props.data.val > 0 && (
        <Value
          className={
            (repeat ? "repeat " : "") +
            (props.data.preset ? "preset " : props.data.val > 0 ? "set " : "")
          }
        >
          {props.data.val}
        </Value>
      )}
      {!props.data.preset && (
        <Notes>
          <Note
            num={1}
            toggle={props.data.notes[0]}
            accent={props.data.noteAccents}
          />
          <Note
            num={2}
            toggle={props.data.notes[1]}
            accent={props.data.noteAccents}
          />
          <Note
            num={3}
            toggle={props.data.notes[2]}
            accent={props.data.noteAccents}
          />
          <Note
            num={4}
            toggle={props.data.notes[3]}
            accent={props.data.noteAccents}
          />
          <Note
            num={5}
            toggle={props.data.notes[4]}
            accent={props.data.noteAccents}
          />
          <Note
            num={6}
            toggle={props.data.notes[5]}
            accent={props.data.noteAccents}
          />
          <Note
            num={7}
            toggle={props.data.notes[6]}
            accent={props.data.noteAccents}
          />
          <Note
            num={8}
            toggle={props.data.notes[7]}
            accent={props.data.noteAccents}
          />
          <Note
            num={9}
            toggle={props.data.notes[8]}
            accent={props.data.noteAccents}
          />
        </Notes>
      )}
    </StyledDiv>
  );
};

Cell.defaultProps = {
  data: {
    val: -1,
    preset: false,
    notes: [true, true, true, true, true, true, true, true, true],
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

  z-index: 0;

  height: 100%;
  width: 100%;
  color: ${colors.accentPrimary};
  box-sizing: border-box;
  position: relative;

  .preset {
    background-color: ${colors.neutralLow};
  }
  .set {
    background-color: ${colors.neutralMid};
  }
  .repeat {
    animation-iteration-count: infinite;
    opacity: 0;
  }
`;

const Value = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 1;

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
