import React, { useState } from "react";
import styled from "styled-components";
import { colors, animation } from "../params.js";
import { Sudoku } from "./sudoku";
import {
  nakedSingle,
  hiddenSingle,
  nakedPair,
  lockedCandidate,
  pointingTuple,
} from "./techniques";

var solveInterval = false;
var isLoaded = false;
var isSolved = false;

export const SudokuController = (props) => {
  const [state, setState] = useState([]);
  var techniques = [
    nakedSingle,
    hiddenSingle,
    nakedPair,
    lockedCandidate,
    pointingTuple,
  ];

  // Naked Single Test
  // var input = [
  //   [0, 4, 9, 0, 0, 0, 0, 3, 0],
  //   [0, 5, 0, 6, 1, 0, 0, 0, 0],
  //   [0, 0, 8, 0, 2, 9, 5, 0, 6],
  //   [8, 0, 0, 9, 0, 7, 0, 0, 4],
  //   [7, 0, 0, 0, 0, 0, 0, 8, 1],
  //   [0, 2, 5, 0, 4, 1, 3, 0, 0],
  //   [2, 0, 0, 0, 7, 6, 0, 1, 0],
  //   [5, 0, 0, 4, 0, 8, 7, 0, 0],
  //   [0, 8, 7, 0, 0, 0, 0, 9, 5],
  // ];

  // Hidden Single Test
  // var input = [
  //   [0, 7, 2, 3, 0, 0, 9, 0, 0],
  //   [0, 5, 0, 6, 0, 9, 0, 2, 0],
  //   [6, 0, 0, 0, 1, 0, 0, 3, 0],
  //   [0, 0, 0, 0, 0, 0, 2, 0, 0],
  //   [0, 4, 5, 8, 2, 3, 0, 7, 0],
  //   [0, 3, 0, 4, 0, 0, 0, 0, 8],
  //   [7, 0, 0, 0, 0, 0, 0, 0, 4],
  //   [0, 2, 0, 5, 0, 8, 0, 6, 0],
  //   [0, 0, 3, 0, 0, 1, 7, 0, 0],
  // ];

  // Naked Pair Test
  var input = [
    [0, 3, 0, 0, 0, 8, 0, 0, 7],
    [8, 0, 0, 3, 0, 0, 2, 6, 0],
    [0, 0, 0, 0, 2, 9, 8, 3, 4],
    [0, 0, 0, 0, 0, 4, 3, 0, 0],
    [6, 0, 8, 1, 3, 2, 0, 0, 9],
    [0, 0, 3, 0, 0, 0, 0, 0, 0],
    [1, 0, 5, 4, 9, 3, 7, 8, 0],
    [0, 8, 0, 2, 7, 1, 0, 0, 3],
    [3, 0, 7, 8, 0, 0, 0, 1, 0],
  ];

  // input is a 2d array of starting values
  const loadSudoku = (input) => {
    console.log("Loading Sudoku...");

    state.sudoku = {
      rows: buildEmpty2DArray(),
      cols: buildEmpty2DArray(),
      houses: buildEmpty2DArray(),
    };
    state.unsolved = [];

    // for every sudoku cell...
    for (let h = 0; h < 9; h++) {
      for (let r = 0; r < 9; r++) {
        let y = 3 * Math.floor(h / 3) + Math.floor(r / 3);
        let x = 3 * (h % 3) + (r % 3);

        // create cell object
        let val = input[y][x];
        let isUnsolved = !(val >= 1 && val <= 9);
        var cell = buildNewCell(y, x, h, r, val, !isUnsolved);
        // store cell in each state object
        state.sudoku.houses[h][r] = cell;
        state.sudoku.rows[y][x] = cell;
        state.sudoku.cols[x][y] = cell;
        if (isUnsolved) state.unsolved.push(cell);
      }
    }

    // for each unsolved cell...
    let axes = [state.sudoku.rows, state.sudoku.cols, state.sudoku.houses];
    for (let cell of state.unsolved.values()) {
      let indexes = [cell.row, cell.col, cell.house];
      // ...for each axis (row, col, house) this cell belongs to...
      for (let i = 0; i < 3; i++) {
        // ...for each other cell in that axis...
        axes[i][indexes[i]].forEach((other) => {
          // ...if the cell's value is set...
          if (other.val >= 1 && other.val <= 9) {
            // ...remove it from suspect list.
            cell.notes[other.val - 1] = 0;
          }
        });
      }
    }
    isLoaded = true;
    isSolved = false;
    pushState();

    console.log("...Sudoku Loaded");
  };

  const pushState = () => {
    let localState = {
      sudoku: state.sudoku,
      unsolved: state.unsolved,
    };
    setState(localState);
  };

  const startSolveInterval = (ms) => {
    getNextSolution();
    solveInterval = setInterval(getNextSolution, ms);
  };

  const stopSolveInterval = () => {
    if (solveInterval) {
      clearInterval(solveInterval);
      solveInterval = false;
      pushState();
    }
  };

  const getNextSolution = () => {
    if (!isLoaded) {
      console.log("No sudoku loaded.");
      stopSolveInterval();
      return false;
    } else if (state.unsolved.length === 0) {
      console.log("Nothing left to solve. Sudoku soln is " + verifySolution());
      stopSolveInterval();
      isSolved = true;
      pushState();
      return false;
    } else {
      let sudokuCopy = copySudoku(state.sudoku);
      // for each solving technique...
      for (let t = 0; t < techniques.length; t++) {
        // ...for each unsolved cell...
        for (let cell of state.unsolved) {
          // ...if this cell can be solved w this technique...
          let showcase = techniques[t].check(cell, state, sudokuCopy);
          if (showcase) {
            // ...report results.
            console.log(
              techniques[t].name + "\t@ (" + cell.col + "," + cell.row + ")"
            );
            pushState();
            return true;
          }
        }
      }
      console.log("No solution was found.");
      stopSolveInterval();
      return false;
    }
  };

  const verifySolution = () => {
    let axisSets = [state.sudoku.rows, state.sudoku.cols, state.sudoku.houses];
    // for each axis set (rows, cols, houses)...
    for (let s = 0; s < 3; s++) {
      let axisSet = axisSets[s];
      // ...for each axis in that set...
      for (let a = 0; a < 3; a++) {
        let axis = axisSet[a];
        let seen = [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
        ];
        // ...for each cell in that axis...
        for (let i = 0; i < 9; i++) {
          // ...tally all values that are seen...
          let cell = axis[i];
          if (cell.val < 1 || cell.val > 9 || seen[cell.val - 1]) return false;
          else seen[cell.val - 1] = true;
        }
        // ...and check that all 9 values are present.
        seen.forEach((bool) => {
          if (!bool) return false;
        });
      }
    }
    isSolved = true;
    return true;
  };

  const buildEmpty2DArray = () => {
    var result = new Array(9);
    for (let i = 0; i < 9; i++) {
      result[i] = new Array(9);
    }
    return result;
  };

  const buildNewCell = (y, x, h, r, v, p) => {
    return {
      row: y,
      col: x,
      house: h,
      room: r,
      val: v,
      preset: p,
      notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
    };
  };

  const copySudoku = (sudoku) => {
    let copy = {
      rows: buildEmpty2DArray(),
      cols: buildEmpty2DArray(),
      houses: buildEmpty2DArray(),
    };
    for (let h = 0; h < 9; h++) {
      for (let r = 0; r < 9; r++) {
        let y = 3 * Math.floor(h / 3) + Math.floor(r / 3);
        let x = 3 * (h % 3) + (r % 3);

        // create cell object
        var cell = copyCell(sudoku.houses[h][r]);

        // store cell in each state object
        copy.houses[h][r] = cell;
        copy.rows[y][x] = cell;
        copy.cols[x][y] = cell;
      }
    }
    return copy;
  };

  const copyCell = (cell) => {
    return {
      row: cell.row,
      col: cell.col,
      house: cell.house,
      room: cell.room,
      val: cell.val,
      preset: cell.preset,
      notes: [...cell.notes],
    };
  };

  return (
    <StyledDiv>
      <Sudoku sudoku={state.sudoku}></Sudoku>
      <Controls>
        {!isLoaded ? (
          <Button onClick={() => loadSudoku(input)}>load</Button>
        ) : isSolved ? (
          <Button onClick={() => loadSudoku(input)}>reset</Button>
        ) : solveInterval ? (
          <Controls>
            <Button onClick={() => stopSolveInterval()}>stop</Button>
            <Button onClick={() => getNextSolution()}>next</Button>
          </Controls>
        ) : (
          <Controls>
            <Button onClick={() => startSolveInterval(animation.delay)}>
              solve
            </Button>
            <Button onClick={() => getNextSolution()}>next</Button>
          </Controls>
        )}
      </Controls>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  display: grid;
  grid-template-rows: min(80vw, 80vh) 1fr;
  grid-template-columns: 1fr;
  grid-gap: 2rem;

  width: min(80vw, 80vh);
  height: 100%;
`;

const Controls = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  gap: 2em;

  width: 100%;
`;

const Button = styled.button`
  color: ${colors.sudokuBorder};
  background-color: transparent;
  border: 2px solid ${colors.sudokuBorder};
  border-radius: 1em;

  width: 100%;
  padding: 0.2em;
  font-size: 24px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${colors.sudokuBorder};
    color: ${colors.appBG};
    transform: scale(1.05);
  }
  &:active {
    transition: all 0.05 ease-in;
    background-color: ${colors.sudokuBG1};
    transform: scale(1.025);
    color: ${colors.sudokuBorder};
  }
`;
