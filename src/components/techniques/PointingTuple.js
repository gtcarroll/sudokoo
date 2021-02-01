//import React from "react";

// const PointingTuple = (props) => {
//   return <h2>pointing tuple</h2>;
// };

export const pointingTuple = {
  name: "Pointing Tuple",
  test: [
    [0, 0, 0, 0, 0, 0, 3, 9, 5],
    [5, 0, 0, 0, 7, 0, 0, 2, 0],
    [0, 0, 0, 6, 0, 5, 7, 1, 0],
    [0, 0, 0, 5, 0, 4, 0, 6, 0],
    [0, 0, 0, 7, 0, 3, 0, 0, 0],
    [0, 4, 5, 0, 0, 0, 0, 0, 0],
    [0, 1, 3, 0, 5, 0, 0, 7, 0],
    [0, 5, 0, 0, 8, 7, 0, 0, 2],
    [2, 0, 7, 0, 0, 0, 0, 0, 0],
  ],
  check: (cell, state, showcase) => {
    let axes = [state.sudoku.rows, state.sudoku.cols];
    let cellIndexes = [cell.row, cell.col];
    let wasUpdated = false;

    // for each axis this cell belongs to...
    for (let a = 0; a < 2; a++) {
      let unseen = [];
      for (let i = 0; i < 9; i++) if (cell.notes[i] > 0) unseen.push(i);
      let axis = axes[a][cellIndexes[a]];

      // ...for each other cell in this cell's house...
      for (let r = 0; r < 9; r++) {
        let other = state.sudoku.houses[cell.house][r];
        let otherIndexes = [other.row, other.col];

        // ...if that other cell is not in the same axis...
        if (otherIndexes[a] !== cellIndexes[a]) {
          // ...remove its suspects from the unseen list...
          for (let n = 0; n < 9; n++) {
            if (other.val <= 0 && other.notes[n] > 0 && unseen.includes(n)) {
              unseen.splice(unseen.indexOf(n), 1);
            }
          }
        }
      }

      // ...if there are any unseen suspects left...
      if (unseen.length > 0) {
        let soln = unseen[0] + 1;
        let notOnlyOne = false;
        for (let i = 0; i < 9; i++) {
          let roomie = axis[i];
          notOnlyOne |=
            roomie.house !== cell.house &&
            roomie.val <= 0 &&
            roomie.notes[soln - 1] > 0 &&
            unseen.includes(soln - 1);
        }
        // ...if this cell is not the only one in its axis and house w soln in suspects...
        if (notOnlyOne) {
          for (let i = 0; i < 9; i++) {
            let aff = axis[i];
            let affIndexes = [aff.row, aff.col];

            // ...if aff would be affected and is in the same axis as cell...
            if (
              aff.val <= 0 &&
              aff.notes[soln - 1] > 0 &&
              affIndexes[a] === cellIndexes[a]
            ) {
              if (aff.house !== cell.house) {
                wasUpdated = true;
                // ...remove the soln val in state.
                aff.notes[soln - 1] = 0;
                // ...remove the soln val in the showcase.
                showcase.houses[aff.house][aff.room].notes[soln - 1] = -1;
              }
            }
          }

          if (wasUpdated) {
            for (let i = 0; i < 9; i++) {
              let aff = axis[i];
              let affIndexes = [aff.row, aff.col];

              // ...if aff would be affected and is in the same axis as cell...
              if (
                aff.val <= 0 &&
                aff.notes[soln - 1] > 0 &&
                affIndexes[a] === cellIndexes[a]
              ) {
                if (aff.house === cell.house) {
                  wasUpdated = true;
                  // ...highlight the soln val in state.
                  aff.notes[soln - 1] = 3;
                  // ...highlight the soln val in the showcase.
                  showcase.houses[aff.house][aff.room].notes[soln - 1] = 2;
                }
              }
            }
          }
        }
      }
      // ...if updates to sudoku state were made, return them
      if (wasUpdated) return showcase;
    }

    return false;
  },
};
