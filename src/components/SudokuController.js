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
var prev = false;
var next = false;
var isNewTweet = false;
var isLoaded = false;
var keyIterator = 1;

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

    keyIterator = 1;

    state.sudoku = {
      rows: buildEmpty2DArray(),
      cols: buildEmpty2DArray(),
      houses: buildEmpty2DArray(),
    };
    state.isSolved = false;
    state.unsolved = [];
    state.birdfeed = {
      i: 0,
      tweets: [],
      curr: false,
      next: false,
    };

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
            cell.notes[other.val - 1] = false;
          }
        });
      }
    }
    isLoaded = true;
    state.isSolved = false;
    state.snapshot = false;
    pushState();

    console.log("...Sudoku Loaded");
  };

  const pushState = () => {
    let localState = {
      sudoku: state.sudoku,
      unsolved: state.unsolved,
      isSolved: state.isSolved,
      snapshot: state.snapshot,
      birdfeed: state.birdfeed,
    };
    setState(localState);
  };

  const startSolveInterval = (ms) => {
    prev = false;
    next = false;
    getNextTweet();
    solveInterval = setInterval(getNextTweet, ms);
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
      console.log(
        "Nothing left to solve. \nSudoku solution is " + verifySolution() + "."
      );
      stopSolveInterval();
      return false;
    } else {
      // let sudokuCopy = copySudoku(state.sudoku);
      // for each solving technique...
      for (let t = 0; t < techniques.length; t++) {
        // ...for each unsolved cell...
        for (let cell of state.unsolved) {
          // ...if this cell can be solved w this technique...
          let snapshot = techniques[t].check(cell, state);
          if (snapshot) {
            // ...report results.
            console.log(
              techniques[t].name +
                " @ (" +
                cell.pos.col +
                "," +
                cell.pos.row +
                ")"
            );
            state.snapshot = snapshot;
            let snapshotData = {
              snapshot: snapshot,
              technique: techniques[t],
              key: keyIterator,
            };
            keyIterator++;
            if (techniques[t].report) {
              snapshotData.report = techniques[t].report(
                snapshotData.snapshot.props
              );
            }
            if (state.birdfeed.tweets) state.birdfeed.tweets.push(snapshotData);
            else state.birdfeed.tweets = [snapshotData];
            nextTweet();
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
    state.snapshot = false;
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
    };
  };

  const getNextTweet = (isNext = false) => {
    next = isNext;
    prev = false;
    isNewTweet = !nextTweet();
    if (isNewTweet) {
      setTimeout(getNextSolution, animation.delay / 6);
    }
  };

  const nextTweet = () => {
    let tweetsLeft = state.birdfeed.i < state.birdfeed.tweets.length - 1;
    if (tweetsLeft) {
      state.birdfeed.curr = state.birdfeed.tweets[state.birdfeed.i];
      state.birdfeed.i++;
      state.birdfeed.next = state.birdfeed.tweets[state.birdfeed.i];
      mountSnapshot(state.birdfeed.next.snapshot);
    } else if (state.birdfeed.i === state.birdfeed.tweets.length - 1) {
      state.birdfeed.next = state.birdfeed.tweets[state.birdfeed.i];
      if (state.birdfeed.tweets.length === 1)
        mountSnapshot(state.birdfeed.next.snapshot);
    }
    return tweetsLeft;
  };

  const prevTweet = () => {
    prev = true;
    next = false;
    isNewTweet = false;
    if (state.birdfeed.i > 0) {
      state.birdfeed.curr = state.birdfeed.tweets[state.birdfeed.i];
      state.birdfeed.i--;
      state.birdfeed.next = state.birdfeed.tweets[state.birdfeed.i];
      mountSnapshot(state.birdfeed.next.snapshot);
    }
  };

  const mountSnapshot = (snapshot) => {
    state.snapshot = snapshot;
    pushState();
  };

  return (
    <StyledDiv>
      <SudokuContainer>
        <Sudoku
          sudoku={state.snapshot ? state.snapshot : state.sudoku}
          isSolved={state.isSolved}
          auto={solveInterval}
        ></Sudoku>
      </SudokuContainer>
      <BirdFeedContainer>
        <TweetList>
          {state.birdfeed && (
            <BirdFeed
              currTweet={state.birdfeed.curr}
              nextTweet={state.birdfeed.next}
              key={state.birdfeed.next.key}
              isSolved={state.isSolved}
              auto={solveInterval}
              prev={prev}
              next={next}
              isNewTweet={isNewTweet}
            />
          )}
        </TweetList>
      </BirdFeedContainer>
      <ControlContainer>
        <ButtonTray>
          {!isLoaded ? (
            <JellyButton
              text="load"
              onClick={() => loadSudoku(pointingTuple.test)}
              color="secondary"
            />
          ) : state.isSolved ? (
            <ButtonTray>
              <JellyButton
                text="< prev"
                onClick={() => prevTweet()}
                color="tertiary"
              />
              <JellyButton
                text="S O L V E D"
                onClick={() => loadSudoku(pointingTuple.test)}
                solved
                disabled
                flexGrow={3}
              />
            </ButtonTray>
          ) : solveInterval ? (
            <ButtonTray>
              <JellyButton
                text="< prev"
                onClick={() => prevTweet()}
                color="tertiary"
                disabled
              />
              <JellyButton
                text="pause"
                onClick={() => stopSolveInterval()}
                color="secondary"
                flexGrow={2}
              />
              <JellyButton
                text="next >"
                onClick={() => getNextTweet(true)}
                color="primary"
                disabled
              />
            </ButtonTray>
          ) : (
            <ButtonTray>
              <JellyButton
                text="< prev"
                onClick={() => prevTweet()}
                color="tertiary"
              />
              <JellyButton
                text="play"
                onClick={() => startSolveInterval(animation.delay)}
                color="secondary"
                flexGrow={2}
              />
              <JellyButton
                text="next >"
                onClick={() => getNextTweet(true)}
                color="primary"
              />
            </ButtonTray>
          )}
        </ButtonTray>
      </ControlContainer>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  padding: 2rem;

  display: grid;
  column-gap: 2rem;
  row-gap: 1.2rem;

  grid-template-rows: min(80vw, 80vh) 1fr;
  grid-template-columns: min(80vw, 80vh) 1fr;
  grid-template-areas:
    "sdku feed"
    "ctrl feed";
`;

const SudokuContainer = styled.div`
  position: relative;
  grid-area: sdku;
`;
const ControlContainer = styled.div`
  grid-area: ctrl;
  grid-gap: none;
`;
const BirdFeedContainer = styled.div`
  grid-area: feed;
`;

const TweetList = styled.div`
  height: 100%;
  margin: 0;
  padding: 0;
`;
