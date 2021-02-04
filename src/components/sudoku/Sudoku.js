import React from "react";
import styled from "styled-components";
import { Cell, House } from "./";
import { colors } from "./../../params.js";

export const Sudoku = (props) => {
  return (
    <StyledDiv className={props.isSolved ? "solved" : ""}>
      <House isSolved={props.isSolved}>
        <Cell data={props.sudoku.houses[0][0]} />
        <Cell data={props.sudoku.houses[0][1]} />
        <Cell data={props.sudoku.houses[0][2]} />
        <Cell data={props.sudoku.houses[0][3]} />
        <Cell data={props.sudoku.houses[0][4]} />
        <Cell data={props.sudoku.houses[0][5]} />
        <Cell data={props.sudoku.houses[0][6]} />
        <Cell data={props.sudoku.houses[0][7]} />
        <Cell data={props.sudoku.houses[0][8]} />
      </House>
      <House isSolved={props.isSolved}>
        <Cell data={props.sudoku.houses[1][0]} />
        <Cell data={props.sudoku.houses[1][1]} />
        <Cell data={props.sudoku.houses[1][2]} />
        <Cell data={props.sudoku.houses[1][3]} />
        <Cell data={props.sudoku.houses[1][4]} />
        <Cell data={props.sudoku.houses[1][5]} />
        <Cell data={props.sudoku.houses[1][6]} />
        <Cell data={props.sudoku.houses[1][7]} />
        <Cell data={props.sudoku.houses[1][8]} />
      </House>
      <House isSolved={props.isSolved}>
        <Cell data={props.sudoku.houses[2][0]} />
        <Cell data={props.sudoku.houses[2][1]} />
        <Cell data={props.sudoku.houses[2][2]} />
        <Cell data={props.sudoku.houses[2][3]} />
        <Cell data={props.sudoku.houses[2][4]} />
        <Cell data={props.sudoku.houses[2][5]} />
        <Cell data={props.sudoku.houses[2][6]} />
        <Cell data={props.sudoku.houses[2][7]} />
        <Cell data={props.sudoku.houses[2][8]} />
      </House>
      <House isSolved={props.isSolved}>
        <Cell data={props.sudoku.houses[3][0]} />
        <Cell data={props.sudoku.houses[3][1]} />
        <Cell data={props.sudoku.houses[3][2]} />
        <Cell data={props.sudoku.houses[3][3]} />
        <Cell data={props.sudoku.houses[3][4]} />
        <Cell data={props.sudoku.houses[3][5]} />
        <Cell data={props.sudoku.houses[3][6]} />
        <Cell data={props.sudoku.houses[3][7]} />
        <Cell data={props.sudoku.houses[3][8]} />
      </House>
      <House isSolved={props.isSolved}>
        <Cell data={props.sudoku.houses[4][0]} />
        <Cell data={props.sudoku.houses[4][1]} />
        <Cell data={props.sudoku.houses[4][2]} />
        <Cell data={props.sudoku.houses[4][3]} />
        <Cell data={props.sudoku.houses[4][4]} />
        <Cell data={props.sudoku.houses[4][5]} />
        <Cell data={props.sudoku.houses[4][6]} />
        <Cell data={props.sudoku.houses[4][7]} />
        <Cell data={props.sudoku.houses[4][8]} />
      </House>
      <House isSolved={props.isSolved}>
        <Cell data={props.sudoku.houses[5][0]} />
        <Cell data={props.sudoku.houses[5][1]} />
        <Cell data={props.sudoku.houses[5][2]} />
        <Cell data={props.sudoku.houses[5][3]} />
        <Cell data={props.sudoku.houses[5][4]} />
        <Cell data={props.sudoku.houses[5][5]} />
        <Cell data={props.sudoku.houses[5][6]} />
        <Cell data={props.sudoku.houses[5][7]} />
        <Cell data={props.sudoku.houses[5][8]} />
      </House>
      <House isSolved={props.isSolved}>
        <Cell data={props.sudoku.houses[6][0]} />
        <Cell data={props.sudoku.houses[6][1]} />
        <Cell data={props.sudoku.houses[6][2]} />
        <Cell data={props.sudoku.houses[6][3]} />
        <Cell data={props.sudoku.houses[6][4]} />
        <Cell data={props.sudoku.houses[6][5]} />
        <Cell data={props.sudoku.houses[6][6]} />
        <Cell data={props.sudoku.houses[6][7]} />
        <Cell data={props.sudoku.houses[6][8]} />
      </House>
      <House isSolved={props.isSolved}>
        <Cell data={props.sudoku.houses[7][0]} />
        <Cell data={props.sudoku.houses[7][1]} />
        <Cell data={props.sudoku.houses[7][2]} />
        <Cell data={props.sudoku.houses[7][3]} />
        <Cell data={props.sudoku.houses[7][4]} />
        <Cell data={props.sudoku.houses[7][5]} />
        <Cell data={props.sudoku.houses[7][6]} />
        <Cell data={props.sudoku.houses[7][7]} />
        <Cell data={props.sudoku.houses[7][8]} />
      </House>
      <House isSolved={props.isSolved}>
        <Cell data={props.sudoku.houses[8][0]} />
        <Cell data={props.sudoku.houses[8][1]} />
        <Cell data={props.sudoku.houses[8][2]} />
        <Cell data={props.sudoku.houses[8][3]} />
        <Cell data={props.sudoku.houses[8][4]} />
        <Cell data={props.sudoku.houses[8][5]} />
        <Cell data={props.sudoku.houses[8][6]} />
        <Cell data={props.sudoku.houses[8][7]} />
        <Cell data={props.sudoku.houses[8][8]} />
      </House>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  width: calc(min(80vw, 80vh) - 2px);
  height: calc(min(80vw, 80vh) - 2px);

  border: 2px solid ${colors.sudokuBorder};

  box-sizing: border-box;

  &.solved {
    border-color: ${colors.sudokuFG};
  }
`;

Sudoku.defaultProps = {
  isSolved: false,
  isLoad: false,
  sudoku: {
    houses: [
      [
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
      ],
      [
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
      ],
      [
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
      ],
      [
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
      ],
      [
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
      ],
      [
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
      ],
      [
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
      ],
      [
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
      ],
      [
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
        {
          val: -1,
          set: false,
          notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
      ],
    ],
  },
};
