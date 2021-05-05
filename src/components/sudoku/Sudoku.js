import React from "react";
import styled from "styled-components";
import { House } from "./";
import { colors, animation } from "./../../params.js";

export const Sudoku = (props) => {
  return (
    <StyledDiv
      className={
        props.isSolved ? "solved " : !props.isLoaded ? "editable " : ""
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
  width: 100%;
  height: 100%;

  border: 2px solid ${colors.neutral3};
  border-radius: 2px;
  box-sizing: border-box;

  transition: ${animation.halfSpeed} ease-in-out;

  &.editable {
    border-color: ${colors.secondary};
  }
  &.solved {
    border-image: conic-gradient(
        ${colors.secondary} 40deg,
        ${colors.primary} 130deg,
        ${colors.tertiary} 230deg,
        ${colors.secondary} 320deg
      )
      2;
  }
`;

Sudoku.defaultProps = {
  overlay: false,
  isSolved: false,
  isLoad: false,
  auto: false,
};
