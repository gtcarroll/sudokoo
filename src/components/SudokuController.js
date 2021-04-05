import React, { useState } from "react";
import styled from "styled-components";
import { animation } from "../params.js";
import { JellyButton, ButtonTray } from "./controls";
import { Sudoku } from "./sudoku";
import { BirdFeed } from "./birdfeed";
import {
  nakedSingle,
  hiddenSingle,
  nakedPair,
  lockedCandidate,
  pointingTuple,
} from "./techniques";

var solveInterval = false;
var isLoaded = false;

export const SudokuController = (props) => {
  const [state, setState] = useState([]);
  var techniques = [
    nakedSingle,
    hiddenSingle,
    nakedPair,
    lockedCandidate,
    pointingTuple,
  ];

  // input is a 2d array of starting values
  const loadSudoku = (input) => {
    console.log("Loading Sudoku...");

    state.sudoku = {
      rows: buildEmpty2DArray(),
      cols: buildEmpty2DArray(),
      houses: buildEmpty2DArray(),
    };
    state.isSolved = false;
    state.unsolved = [];
    state.feed = [];

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
        state.sudoku.rows[y][x] = cell;
        state.sudoku.cols[x][y] = cell;
        state.sudoku.houses[h][r] = cell;
        if (isUnsolved) state.unsolved.push(cell);
      }
    }

    // for each unsolved cell...
    let axes = [state.sudoku.rows, state.sudoku.cols, state.sudoku.houses];
    for (let cell of state.unsolved.values()) {
      let indexes = [cell.pos.row, cell.pos.col, cell.pos.house];
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
    state.isSolved = false;
    pushState();

    console.log("...Sudoku Loaded");
  };

  const pushState = () => {
    let localState = {
      sudoku: state.sudoku,
      unsolved: state.unsolved,
      isSolved: state.isSolved,
    };
    setState(localState);
  };

  const startSolveInterval = (ms) => {
    //getNextSolution();
    solveInterval = setInterval(getNextSolution, ms);
    pushState();
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
      pushState();
      return false;
    } else {
      let sudokuCopy = copySudoku(state.sudoku);
      // for each solving technique...
      for (let t = 0; t < techniques.length; t++) {
        // ...for each unsolved cell...
        for (let cell of state.unsolved) {
          // ...if this cell can be solved w this technique...
          if (techniques[t].check(cell, state, sudokuCopy)) {
            // ...report results.
            console.log(
              techniques[t].name +
                " @ (" +
                cell.pos.col +
                "," +
                cell.pos.row +
                ")"
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
          if (!bool) {
            return false;
          }
        });
      }
    }
    state.isSolved = true;
    pushState();
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
      pos: {
        row: y,
        col: x,
        house: h,
        room: r,
      },
      val: v,
      preset: p,
      notes: [1, 1, 1, 1, 1, 1, 1, 1, 1],
      borders: {
        primary: [false, false, false, false],
        secondary: [false, false, false, false],
        tertiary: [false, false, false, false],
      },
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
      pos: {
        row: cell.pos.row,
        col: cell.pos.col,
        house: cell.pos.house,
        room: cell.pos.room,
      },
      val: cell.val,
      preset: cell.preset,
      notes: [...cell.notes],
      borders: {
        primary: [...cell.borders.primary],
        secondary: [...cell.borders.secondary],
        tertiary: [...cell.borders.tertiary],
      },
    };
  };

  return (
    <StyledDiv>
      <SudokuContainer>
        <Sudoku sudoku={state.sudoku} isSolved={state.isSolved}></Sudoku>
        <Sudoku sudoku={state.snapshot} overlay></Sudoku>
      </SudokuContainer>
      <BirdFeedContainer>
        <BirdFeed feed={state.feed}></BirdFeed>
      </BirdFeedContainer>
      <ControlContainer>
        <ButtonTray>
          {!isLoaded ? (
            <JellyButton
              text="load"
              onClick={() => loadSudoku(nakedPair.test)}
              color="highlight"
            />
          ) : state.isSolved ? (
            <JellyButton
              text="reset"
              onClick={() => loadSudoku(pointingTuple.test)}
              color="removal"
            />
          ) : solveInterval ? (
            <ButtonTray>
              <JellyButton
                text="reset"
                onClick={() => loadSudoku(pointingTuple.test)}
                color="removal"
                disabled
              />
              <JellyButton
                text="stop"
                onClick={() => stopSolveInterval()}
                color="removal"
                flexGrow={2}
              />
              <JellyButton
                text="next"
                onClick={() => setTimeout(getNextSolution, animation.delay / 6)}
                color="highlight"
                disabled
              />
            </ButtonTray>
          ) : (
            <ButtonTray>
              <JellyButton
                text="reset"
                onClick={() => loadSudoku(pointingTuple.test)}
                color="removal"
              />
              <JellyButton
                text="auto-solve"
                onClick={() => startSolveInterval(animation.delay)}
                color="highlightAlt"
                flexGrow={2}
              />
              <JellyButton
                text="next"
                onClick={() => setTimeout(getNextSolution, animation.delay / 6)}
                color="highlight"
              />
            </ButtonTray>
          )}
        </ButtonTray>
      </ControlContainer>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  display: grid;
  grid-template-rows: min(80vw, 80vh) 1fr;
  grid-template-columns: min(80vw, 80vh) 1fr;
  grid-gap: 2rem;
  padding: 2rem;
  grid-template-areas:
    "sdku feed"
    "ctrl feed";

  flex-grow: 1;
`;

const SudokuContainer = styled.div`
  position: relative;
  grid-area: sdku;
`;
const ControlContainer = styled.div`
  grid-area: ctrl;
`;
const BirdFeedContainer = styled.div`
  grid-area: feed;
`;
