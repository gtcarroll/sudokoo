import React from "react";
import styled from "styled-components";
import { House } from "./";
import { colors, animation } from "./../../params.js";

export const Sudoku = (props) => {
  return (
    <StyledDiv
      className={
        (props.isSolved
          ? "solved "
          : !props.isLoaded
          ? "editable "
          : props.isFailed
          ? "failed "
          : "") + props.shake
      }
    >
      <House
        house={props.sudoku && props.sudoku.houses[0]}
        isSolved={props.isSolved}
        isLoaded={props.isLoaded}
        overlay={props.overlay}
        auto={props.auto}
      />
      <House
        house={props.sudoku && props.sudoku.houses[1]}
        isSolved={props.isSolved}
        isLoaded={props.isLoaded}
        overlay={props.overlay}
        auto={props.auto}
      />
      <House
        house={props.sudoku && props.sudoku.houses[2]}
        isSolved={props.isSolved}
        isLoaded={props.isLoaded}
        overlay={props.overlay}
        auto={props.auto}
      />
      <House
        house={props.sudoku && props.sudoku.houses[3]}
        isSolved={props.isSolved}
        isLoaded={props.isLoaded}
        overlay={props.overlay}
        auto={props.auto}
      />
      <House
        house={props.sudoku && props.sudoku.houses[4]}
        isSolved={props.isSolved}
        isLoaded={props.isLoaded}
        overlay={props.overlay}
        auto={props.auto}
      />
      <House
        house={props.sudoku && props.sudoku.houses[5]}
        isSolved={props.isSolved}
        isLoaded={props.isLoaded}
        overlay={props.overlay}
        auto={props.auto}
      />
      <House
        house={props.sudoku && props.sudoku.houses[6]}
        isSolved={props.isSolved}
        isLoaded={props.isLoaded}
        overlay={props.overlay}
        auto={props.auto}
      />
      <House
        house={props.sudoku && props.sudoku.houses[7]}
        isSolved={props.isSolved}
        isLoaded={props.isLoaded}
        overlay={props.overlay}
        auto={props.auto}
      />
      <House
        house={props.sudoku && props.sudoku.houses[8]}
        isSolved={props.isSolved}
        isLoaded={props.isLoaded}
        overlay={props.overlay}
        auto={props.auto}
      />
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  position: absolute;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  width: calc(100vh - 10rem);
  height: calc(100vh - 10rem);

  @media (orientation: portrait) {
    width: calc(100vw - 2rem);
    height: calc(100vw - 2rem);
    z-index: 999;
  }

  border: 2px solid ${colors.neutral3};
  border-radius: 2px;
  box-sizing: border-box;

  transition: all ${animation.halfSpeed} ease-in-out, width 0s, height 0s;

  &.editable,
  &.solved {
    border-color: ${colors.secondary};
  }
  &.failed {
    border-color: ${colors.tertiary};
  }
  &.solved {
    border-image: conic-gradient(
        ${colors.primary} 0deg,
        ${colors.secondary} 120deg,
        ${colors.tertiary} 240deg,
        ${colors.primary} 360deg
      )
      2;
  }
  &.shake {
    animation: shake 0.5s ease;
  }
  &.shake2 {
    animation: shake2 0.5s ease;
  }
  @keyframes shake {
    25% {
      transform: translateX(0.3rem);
    }
    50% {
      transform: translateX(-0.3rem);
    }
    75% {
      transform: translateX(0.3rem);
    }
  }
  @keyframes shake2 {
    25% {
      transform: translateX(-0.3rem);
    }
    50% {
      transform: translateX(0.3rem);
    }
    75% {
      transform: translateX(-0.3rem);
    }
  }
`;

Sudoku.defaultProps = {
  overlay: false,
  isSolved: false,
  isFailed: false,
  isLoad: false,
  auto: false,
};
