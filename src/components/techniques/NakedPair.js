//import React from "react";

// const NakedPair = (props) => {
//   return <h2>naked pair</h2>;
// };

const getSuspects = (cell) => {
  let suspects = [];
  for (let i = 0; i < cell.notes.length; i++)
    if (cell.notes[i] > 0) suspects.push(i);
  return suspects;
};

const isSame = (c1, c2) => {
  return c1.row === c2.row && c1.col === c2.col;
};

const pushChanges = (aff, i, state, showcase) => {
  let isAffected = aff.notes[i] > 0;
  if (isAffected) {
    // ...remove the pair of values from that cell's suspects.
    aff.notes[i] = 0;
    // ...mark the pair of values crossed out in showcase.
    showcase.houses[aff.house][aff.room].notes[i] = -1;
  }
  return isAffected;
};

export const nakedPair = {
  name: "Naked Pair",
  test: [
    [0, 3, 0, 0, 0, 8, 0, 0, 7],
    [8, 0, 0, 3, 0, 0, 2, 6, 0],
    [0, 0, 0, 0, 2, 9, 8, 3, 4],
    [0, 0, 0, 0, 0, 4, 3, 0, 0],
    [6, 0, 8, 1, 3, 2, 0, 0, 9],
    [0, 0, 3, 0, 0, 0, 0, 0, 0],
    [1, 0, 5, 4, 9, 3, 7, 8, 0],
    [0, 8, 0, 2, 7, 1, 0, 0, 3],
    [3, 0, 7, 8, 0, 0, 0, 1, 0],
  ],
  check: (cell, state, showcase) => {
    let pair = getSuspects(cell);

    // if this cell has exactly 2 suspects...
    if (pair.length === 2) {
      let axes = [state.sudoku.rows, state.sudoku.cols, state.sudoku.houses];
      let cellIndexes = [cell.row, cell.col, cell.house];

      // ...for each axis (row, col, house) this cell belongs to...
      for (let a = 0; a < 3; a++) {
        let axis = axes[a][cellIndexes[a]];

        // ...for each cell in that axis...
        for (let i = 0; i < 9; i++) {
          let wasUpdated = false;
          let other = axis[i];

          // ...if that cell is not the same and has exactly the same two suspects...
          let otherPair = getSuspects(other);
          if (
            !isSame(cell, other) &&
            otherPair.length === 2 &&
            otherPair[0] === pair[0] &&
            otherPair[1] === pair[1]
          ) {
            let otherIndexes = [other.row, other.col, other.house];

            // ...for each axis the cell's share...
            for (let b = 0; b < 3; b++) {
              if (cellIndexes[b] === otherIndexes[b]) {
                let sharedAxis = axes[b][otherIndexes[b]];

                // ...for each cell in that shared axis...
                for (let j = 0; j < 9; j++) {
                  let aff = sharedAxis[j];

                  // ...if that cell is not in this pair and is unset...
                  if (
                    !isSame(aff, cell) &&
                    !isSame(aff, other) &&
                    aff.val <= 0
                  ) {
                    // ...push potential changes to cell.
                    wasUpdated |= pushChanges(aff, pair[0], state, showcase);
                    wasUpdated |= pushChanges(aff, pair[1], state, showcase);
                  }
                }
              }
            }
          }

          // ...if updates to sudoku state were made...
          if (wasUpdated) {
            // ...highlight the naked pair values in state.
            state.sudoku.houses[cell.house][cell.room].notes[pair[0]] = 3;
            state.sudoku.houses[cell.house][cell.room].notes[pair[1]] = 3;
            state.sudoku.houses[other.house][other.room].notes[pair[0]] = 3;
            state.sudoku.houses[other.house][other.room].notes[pair[1]] = 3;

            // ...highlight the naked pair values in showcase.
            showcase.houses[cell.house][cell.room].notes[pair[0]] = 2;
            showcase.houses[cell.house][cell.room].notes[pair[1]] = 2;
            showcase.houses[other.house][other.room].notes[pair[0]] = 2;
            showcase.houses[other.house][other.room].notes[pair[1]] = 2;
            return showcase;
          }
        }
      }
    }
    return false;
  },
};
