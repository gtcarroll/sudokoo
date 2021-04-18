import React from "react";
import styled from "styled-components";
import { House } from "./";
import { colors, animation } from "./../../params.js";

export const Sudoku = (props) => {
  return (
    <StyledDiv className={props.isSolved ? "solved" : props.overlay ? "" : ""}>
      <House
        house={props.sudoku && props.sudoku.houses[0]}
        isSolved={props.isSolved}
        overlay={props.overlay}
        auto={props.auto}
      />
      <House
        house={props.sudoku && props.sudoku.houses[1]}
        isSolved={props.isSolved}
        overlay={props.overlay}
        auto={props.auto}
      />
      <House
        house={props.sudoku && props.sudoku.houses[2]}
        isSolved={props.isSolved}
        overlay={props.overlay}
        auto={props.auto}
      />
      <House
        house={props.sudoku && props.sudoku.houses[3]}
        isSolved={props.isSolved}
        overlay={props.overlay}
        auto={props.auto}
      />
      <House
        house={props.sudoku && props.sudoku.houses[4]}
        isSolved={props.isSolved}
        overlay={props.overlay}
        auto={props.auto}
      />
      <House
        house={props.sudoku && props.sudoku.houses[5]}
        isSolved={props.isSolved}
        overlay={props.overlay}
        auto={props.auto}
      />
      <House
        house={props.sudoku && props.sudoku.houses[6]}
        isSolved={props.isSolved}
        overlay={props.overlay}
        auto={props.auto}
      />
      <House
        house={props.sudoku && props.sudoku.houses[7]}
        isSolved={props.isSolved}
        overlay={props.overlay}
        auto={props.auto}
      />
      <House
        house={props.sudoku && props.sudoku.houses[8]}
        isSolved={props.isSolved}
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

  border: 2px solid ${colors.neutralHigh};
  transition: ${animation.halfSpeed} ease-in-out;

  box-sizing: border-box;

  &.solved {
    border-color: ${colors.accentPrimary};
  }
`;

Sudoku.defaultProps = {
  overlay: false,
  isSolved: false,
  isLoad: false,
  auto: false,
};
