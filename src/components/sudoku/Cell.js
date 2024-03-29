import React from "react";
import styled from "styled-components";
import { Note, NoteOverlay } from "./";
import { colors, animation } from "./../../params.js";

let borderStyles = {
  basic: "1px solid " + colors.neutral3,
  house: "2px solid " + colors.neutral3,
  primary: "3px solid " + colors.primary50,
  secondary: "3px solid " + colors.secondary50,
  tertiary: "3px solid " + colors.tertiary50,

  housePri: "2px solid " + colors.primary50,
  basicPri: "1px solid " + colors.primary50,
};

export const Cell = (props) => {
  let highlighted =
    props.data.borders["primary"].set ||
    props.data.borders["secondary"].set ||
    props.data.borders["tertiary"].set;
  return (
    <StyledDiv
      className={
        (props.data.preset || !props.isLoaded ? "preset " : "") +
        (highlighted ? "highlighted " : "")
      }
    >
      <NoteOverlay
        toggle={props.data.bgColor["primary"]}
        borders={props.data.borders["primary"]}
        borderStyle={borderStyles["primary"]}
        bgColor={colors.primary15}
        zIndex={14}
      />

      <NoteOverlay
        toggle={props.data.bgColor["secondary"]}
        borders={props.data.borders["secondary"]}
        borderStyle={borderStyles["secondary"]}
        bgColor={colors.secondary15}
        zIndex={13}
      />

      {
        <NoteOverlay
          toggle={props.data.bgColor["tertiary"]}
          borders={props.data.borders["tertiary"]}
          borderStyle={borderStyles["tertiary"]}
          bgColor={colors.tertiary15}
          zIndex={12}
        />
      }
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
      {!props.isLoaded ? (
        <Value style={{ zIndex: 99 }}>
          <input className="input-cell" type="number"></input>
        </Value>
      ) : !props.auto ? (
        props.data.val > 0 && (
          <Value
            className={
              (props.data.val > 0 ? "" : "off ") +
              (props.auto ? "" : "repeat ") +
              (highlighted ? "highlighted " : "") +
              (props.data.preset ? "preset " : props.data.val > 0 ? "set " : "")
            }
          >
            {props.data.val}
          </Value>
        )
      ) : (
        <Value
          className={
            (props.data.val > 0 ? "" : "off ") +
            (props.auto ? "" : "repeat ") +
            (highlighted ? "highlighted " : "") +
            (props.data.preset ? "preset " : props.data.val > 0 ? "set " : "")
          }
        >
          {props.data.val}
        </Value>
      )}

      {!props.data.preset && props.isLoaded && (
        <Notes>
          <Note
            num={1}
            toggle={props.data.notes[0]}
            accent={props.data.noteAccents}
            auto={props.auto}
          />
          <Note
            num={2}
            toggle={props.data.notes[1]}
            accent={props.data.noteAccents}
            auto={props.auto}
          />
          <Note
            num={3}
            toggle={props.data.notes[2]}
            accent={props.data.noteAccents}
            auto={props.auto}
          />
          <Note
            num={4}
            toggle={props.data.notes[3]}
            accent={props.data.noteAccents}
            auto={props.auto}
          />
          <Note
            num={5}
            toggle={props.data.notes[4]}
            accent={props.data.noteAccents}
            auto={props.auto}
          />
          <Note
            num={6}
            toggle={props.data.notes[5]}
            accent={props.data.noteAccents}
            auto={props.auto}
          />
          <Note
            num={7}
            toggle={props.data.notes[6]}
            accent={props.data.noteAccents}
            auto={props.auto}
          />
          <Note
            num={8}
            toggle={props.data.notes[7]}
            accent={props.data.noteAccents}
            auto={props.auto}
          />
          <Note
            num={9}
            toggle={props.data.notes[8]}
            accent={props.data.noteAccents}
            auto={props.auto}
          />
        </Notes>
      )}
    </StyledDiv>
  );
};

Cell.defaultProps = {
  isLoaded: false,
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
  auto: false,
  sides: [false, false, false, false],
};

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 0;

  height: 100%;
  width: 100%;
  color: ${colors.primary};
  box-sizing: border-box;
  position: relative;

  &.preset,
  .preset {
    background-color: ${colors.neutral1};
    opacity: 1;
  }
  .set {
    background-color: ${colors.neutral2};
    opacity: 1;
  }
`;

const Value = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  transition: ${animation.halfSpeed} ease-in-out;

  z-index: 1;

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }

  input {
    z-index: 100;
    background-color: transparent;
    color: ${colors.secondary};
    width: 100%;
    font-size: calc(10px + 2vmin);
    text-align: center;
    height: 100%;
    border: none;
    margin: auto;
    padding: 0;

    &:hover {
      background: ${colors.secondary15};
      box-shadow: inset 0 0 0 2px ${colors.secondary25};
    }
    &:focus {
      box-shadow: inset 0 0 0 2px ${colors.secondary};
      outline: none;
    }
  }

  &.off {
    opacity: 0 !important;
  }

  &.highlighted {
    font-size: ${animation.fontGrow};
    background-color: ${colors.primary};
    color: ${colors.neutral2};
    &.repeat {
      opacity: 0;
      animation: pulse ${animation.speed} ease-in-out;
      animation-iteration-count: infinite;
    }
  }

  @keyframes pulse {
    0% {
      opacity: 0;
    }
    ${animation.midPoint} {
      font-size: ${animation.fontGrow};
      background-color: ${colors.primary};
      color: ${colors.neutral2};
      opacity: 1;
    }
  }
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
