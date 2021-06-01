import React, { useState } from "react";
import styled from "styled-components";
import { animation } from "../params.js";
import { ButtonTray } from "./controls";
import { Sudoku } from "./sudoku";
import {
  BirdFeed,
  tweetUnloaded,
  tweetLoaded,
  tweetSolved,
  tweetNoSolution,
  tweetInvalidSudoku,
} from "./birdfeed";
import {
  helper,
  nakedSingle,
  hiddenSingle,
  nakedPair,
  lockedCandidate,
  pointingTuple,
  hiddenPair,
  nakedTriple,
} from "./techniques";

var solveInterval = false;
var prev = false;
var next = false;
var isNewTweet = false;

export const SudokuController = (props) => {
  const [state, setState] = useState([]);
  var techniques = [
    nakedSingle,
    hiddenSingle,
    nakedPair,
    lockedCandidate,
    pointingTuple,
    hiddenPair,
    nakedTriple,
  ];
  var sudokus = [
    nakedPair.test,
    lockedCandidate.test,
    pointingTuple.test,
    hiddenPair.test,
    nakedTriple.test,
  ];

  const randomSudoku = () => {
    let r = Math.floor(Math.random() * sudokus.length);
    loadSudoku(sudokus[r]);
  };

  const loadInput = () => {
    let inputCells = document.querySelectorAll(".input-cell");
    let noInput = true;

    let input = buildEmpty2DArray();
    for (let i = 0; i < inputCells.length; i++) {
      let val = parseInt(inputCells[i].value);
      if (isNaN(val) || val <= 0 || val > 9) val = 0;
      else noInput = false;
      let h = Math.floor(i / 9),
        r = i % 9,
        y = 3 * Math.floor(h / 3) + Math.floor(r / 3),
        x = 3 * (h % 3) + (r % 3);
      input[y][x] = val;
    }

    if (!noInput) {
      loadSudoku(input);
    } else {
      state.shake === "shake"
        ? (state.shake = "shake2")
        : (state.shake = "shake");
      pushState();
    }
  };

  const resetSudoku = () => {
    solveInterval = false;
    prev = false;
    next = false;
    isNewTweet = false;

    state.birdfeed = false;
    state.techCounts = false;
    state.keyIterator = 0;
    state.isSolved = false;
    state.isFailed = false;
    state.isLoaded = false;
    state.unsolved = false;
    state.snapshot = false;
    state.shake = false;
    pushState();
  };

  // input is a 2d array of starting values
  const loadSudoku = (input) => {
    state.sudoku = {
      rows: buildEmpty2DArray(),
      cols: buildEmpty2DArray(),
      houses: buildEmpty2DArray(),
    };
    state.birdfeed = {
      i: 0,
      tweets: [tweetLoaded],
      curr: tweetUnloaded,
      next: tweetLoaded,
    };
    state.techCounts = new Map();
    techniques.forEach((tech) => {
      state.techCounts.set(tech.name, 0);
    });
    state.keyIterator = 1;
    state.isSolved = false;
    state.isFailed = false;
    state.isLoaded = true;
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
    if (isSudokuValid()) {
      state.birdfeed.tweets[0].snapshot = helper.createSnapshot(state.sudoku);
      state.snapshot = state.birdfeed.tweets[0].snapshot;
      pushState();
      console.log("Sudoku Loaded.");
    }
  };

  const isSudokuValid = () => {
    // for each row, col, house
    let axisKeys = ["rows", "cols", "houses"];
    for (let a = 0; a < 3; a++) {
      let axisArray = state.sudoku[axisKeys[a]];
      for (let i = 0; i < 9; i++) {
        let axis = axisArray[i];
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

        for (let j = 0; j < 9; j++) {
          if (axis[j].val > 0) {
            let cell = axis[j];
            if (seen[cell.val - 1]) {
              let snapshot = helper.createSnapshot(state.sudoku);
              helper.fillAxis(snapshot, cell, a, "tertiary");
              let snapshotData = tweetInvalidSudoku;
              snapshotData.snapshot = snapshot;
              snapshotData.report = tweetInvalidSudoku.getReport({
                a: a,
                x: cell.val,
              });
              state.birdfeed.tweets.push(snapshotData);

              state.isFailed = true;
              getNextTweet();
              return false;
            } else {
              seen[cell.val - 1] = true;
            }
          }
        }
      }
    }
    return true;
  };

  const pushState = () => {
    let localState = {
      sudoku: state.sudoku,
      birdfeed: state.birdfeed,
      techCounts: state.techCounts,
      keyIterator: state.keyIterator,
      isSolved: state.isSolved,
      isFailed: state.isFailed,
      isLoaded: state.isLoaded,
      unsolved: state.unsolved,
      snapshot: state.snapshot,
      shake: state.shake,
    };
    setState(localState);
  };

  const startSolveInterval = (ms) => {
    prev = false;
    next = false;
    getNextTweet();
    if (
      !(
        state.birdfeed.tweets[state.birdfeed.tweets.length - 1].solved &&
        state.birdfeed.i >= state.birdfeed.tweets.length - 1
      )
    )
      solveInterval = setInterval(getNextTweet, ms);
  };

  const stopSolveInterval = (push = true) => {
    if (solveInterval) {
      clearInterval(solveInterval);
      solveInterval = false;
    }
    if (push) pushState();
  };

  const getNextSolution = () => {
    if (state.isFailed) {
      stopSolveInterval();
      return false;
    } else if (!state.isLoaded) {
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
              key: state.keyIterator,
            };
            state.keyIterator++;
            if (techniques[t].getReport) {
              snapshotData.report = techniques[t].getReport(
                snapshotData.snapshot.props
              );
            }
            let techCount = 0;
            if (state.techCounts.has(techniques[t].name))
              techCount = state.techCounts.get(techniques[t].name);
            state.techCounts.set(techniques[t].name, techCount + 1);

            if (state.birdfeed.tweets) state.birdfeed.tweets.push(snapshotData);
            else state.birdfeed.tweets = [snapshotData];
            nextTweet();
            return true;
          }
        }
      }
      console.log("No solution was found.");
      stopSolveInterval(false);
      state.isFailed = true;
      let snapshotData = tweetNoSolution;
      snapshotData.report = tweetNoSolution.getReport({ x: 0, a: 0 });
      state.birdfeed.tweets.push(snapshotData);
      getNextTweet();
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

    if (!state.birdfeed.tweets[state.birdfeed.tweets.length - 1].solved) {
      let snapshotData = tweetSolved;
      snapshotData.report = tweetSolved.getReport(state.techCounts);
      state.birdfeed.tweets.push(snapshotData);
      getNextTweet();
    }
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
      state.isSolved = state.birdfeed.tweets[state.birdfeed.i + 1].solved;
      state.isFailed = state.birdfeed.tweets[state.birdfeed.i + 1].failed;

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
    if (!state.isSolved) {
      prev = true;
      next = false;
      isNewTweet = false;
    } else {
      state.isSolved = false;
    }

    if (!state.isFailed) {
      prev = true;
      next = false;
      isNewTweet = false;
    } else {
      state.isFailed = false;
    }

    if (state.birdfeed.i > 0) {
      state.birdfeed.curr = state.birdfeed.tweets[state.birdfeed.i];
      state.birdfeed.i--;
      state.birdfeed.next = state.birdfeed.tweets[state.birdfeed.i];
      mountSnapshot(state.birdfeed.next.snapshot);
    }
  };

  const firstTweet = () => {
    state.isFailed = false;
    state.isSolved = false;

    if (state.birdfeed.i > 0) {
      state.birdfeed.curr = state.birdfeed.tweets[state.birdfeed.i];
      state.birdfeed.i = 0;
      state.birdfeed.next = state.birdfeed.tweets[state.birdfeed.i];
      mountSnapshot(state.birdfeed.next.snapshot);
    }
  };

  const lastTweet = () => {
    if (state.birdfeed.i < state.birdfeed.tweets.length - 1) {
      state.birdfeed.curr = state.birdfeed.tweets[state.birdfeed.i];
      state.birdfeed.i = state.birdfeed.tweets.length - 1;
      state.birdfeed.next = state.birdfeed.tweets[state.birdfeed.i];

      state.isSolved = state.birdfeed.next.solved;
      state.isFailed = state.birdfeed.next.failed;
      mountSnapshot(state.birdfeed.next.snapshot);
    }
  };

  const mountSnapshot = (snapshot) => {
    state.snapshot = snapshot;
    pushState();
  };

  const priRandom = {
    text: "random",
    onClick: () => randomSudoku(),
    flexGrow: 1,
    disabled: false,
  };
  const priNext = {
    text: "next >",
    onClick: () => getNextTweet(true),
    flexGrow: 1,
    disabled: false,
  };

  const secLoad = {
    text: "load this sudoku",
    onClick: () => loadInput(),
    flexGrow: 3,
    disabled: false,
  };
  const secPlay = {
    text: "play",
    onClick: () => startSolveInterval(animation.delay),
    flexGrow: 2,
    disabled: false,
  };
  const secPause = {
    text: "pause",
    onClick: () => stopSolveInterval(),
    flexGrow: 2,
    disabled: false,
  };
  const secSolved = {
    text: "S O L V E D",
    onClick: () => console.log("S O L V E D"),
    flexGrow: 3,
    disabled: true,
    solved: true,
  };
  const secReset = {
    text: "reset",
    onClick: () => resetSudoku(),
    flexGrow: 3,
  };

  const terPrev = {
    text: "< prev",
    onClick: () => prevTweet(),
    flexGrow: 1,
    disabled:
      state.birdfeed &&
      (!state.birdfeed.next || state.birdfeed.next.key <= 0 || solveInterval),
  };

  return (
    <StyledDiv>
      <SudokuContainer>
        <Sudoku
          sudoku={state.snapshot ? state.snapshot : state.sudoku}
          isSolved={state.isSolved}
          isFailed={state.isFailed}
          isLoaded={state.isLoaded}
          shake={state.shake}
          auto={solveInterval}
        ></Sudoku>
      </SudokuContainer>
      <ControlContainer>
        {state.isFailed ? (
          <ButtonTray tertiary={terPrev} secondary={secReset} />
        ) : !state.isLoaded ? (
          <ButtonTray secondary={secLoad} primary={priRandom} />
        ) : state.isSolved ? (
          <ButtonTray tertiary={terPrev} secondary={secSolved}></ButtonTray>
        ) : solveInterval ? (
          <ButtonTray secondary={secPause}></ButtonTray>
        ) : (
          <ButtonTray
            tertiary={terPrev}
            secondary={secPlay}
            primary={priNext}
          ></ButtonTray>
        )}
      </ControlContainer>
      <BirdFeedContainer>
        <TweetList>
          {state.birdfeed ? (
            <BirdFeed
              currTweet={state.birdfeed.curr}
              nextTweet={state.birdfeed.next}
              key={state.birdfeed.next.key}
              isSolved={state.isSolved}
              isFailed={state.isFailed}
              isLoaded={state.isLoaded}
              auto={solveInterval}
              prev={prev}
              next={next}
              isNewTweet={isNewTweet}
              isFirstTweet={state.birdfeed.i === 0}
              isLastTweet={
                state.birdfeed.i === state.birdfeed.tweets.length - 1
              }
              firstTweet={firstTweet}
              lastTweet={lastTweet}
              resetSudoku={resetSudoku}
            />
          ) : (
            <BirdFeed />
          )}
        </TweetList>
      </BirdFeedContainer>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  padding: 3rem 2rem 0rem 2rem;
  height: 100%;

  display: grid;
  column-gap: 2rem;
  row-gap: 1.2rem;

  grid-template-rows: calc(100vh - 10rem) 1fr;
  grid-template-columns: calc(100vh - 10rem) 1fr;
  grid-template-areas:
    "sdku feed"
    "ctrl feed";

  @media (orientation: portrait) {
    width: 100%;
    padding: 1rem 1rem 0rem 1rem;
    row-gap: 0;
    grid-template-rows: calc(100vw - 2rem) 1rem calc(100vh - (100vw + 6.5rem)) 10rem;
    grid-template-columns: 1fr;
    grid-template-areas:
      "sdku"
      "gap"
      "feed"
      "ctrl";
  }
`;

const SudokuContainer = styled.div`
  position: relative;
  grid-area: sdku;
`;
const ControlContainer = styled.div`
  grid-area: ctrl;
  grid-gap: none;
  height: 4rem;
`;
const BirdFeedContainer = styled.div`
  grid-area: feed;
`;

const TweetList = styled.div`
  height: 100%;
  margin: 0;
  padding: 0;
`;
