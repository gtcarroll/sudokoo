//import React from "react";

// const LockedCandidate = (props) => {
//   return <h2>locked candidate</h2>;
// };

export const lockedCandidate = {
  name: "Locked Candidate",
  test: [
    [1, 2, 0, 0, 9, 0, 0, 6, 0],
    [6, 0, 3, 1, 4, 0, 0, 9, 2],
    [4, 0, 0, 0, 0, 2, 0, 0, 0],
    [0, 3, 0, 0, 1, 4, 2, 0, 0],
    [2, 0, 4, 0, 7, 0, 0, 0, 0],
    [0, 0, 6, 0, 2, 0, 0, 3, 0],
    [0, 0, 1, 2, 0, 0, 0, 4, 8],
    [0, 4, 0, 0, 0, 1, 7, 2, 0],
    [0, 6, 2, 4, 3, 0, 1, 5, 9],
  ],
  check: (cell, state, showcase) => {
    let axes = [state.sudoku.rows, state.sudoku.cols];
    let indexes = [cell.row, cell.col];

    // for each axis (row and col) this cell belongs to...
    for (let a = 0; a < 2; a++) {
      let axis = axes[a][indexes[a]];
      let wasUpdated = false;
      let unseen = [];
      for (let i = 0; i < 9; i++) if (cell.notes[i] > 0) unseen.push(i);

      // ...for each cell in that axis...
      for (let c = 0; c < 9; c++) {
        let other = axis[c];

        // ...if that cell is not in the same house...
        if (other.house !== cell.house) {
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
        for (let r = 0; r < 9; r++) {
          let roomie = state.sudoku.houses[cell.house][r];
          notOnlyOne |=
            r !== cell.room &&
            roomie.val <= 0 &&
            roomie.notes[soln - 1] > 0 &&
            unseen.includes(soln - 1);
        }
        // ...if this cell is not the only one in its axis and house w soln in suspects...
        if (notOnlyOne) {
          // ...for each other unsolved cell in the same house...
          for (let r = 0; r < 9; r++) {
            if (r !== cell.room) {
              let aff = state.sudoku.houses[cell.house][r];
              let affIndexes = [aff.row, aff.col];

              // ...if aff would be affected and is not in the same axis as cell...
              if (
                aff.val <= 0 &&
                aff.notes[soln - 1] > 0 &&
                affIndexes[a] !== indexes[a]
              ) {
                wasUpdated = true;

                // ...remove the soln from that cell's suspects.
                aff.notes[soln - 1] = 0;
                // ...cross out the soln in the showcase.
                showcase.houses[aff.house][aff.room].notes[soln - 1] = -1;
              }
            }
          }

          if (wasUpdated) {
            for (let r = 0; r < 9; r++) {
              let aff = state.sudoku.houses[cell.house][r];
              let affIndexes = [aff.row, aff.col];

              // ...if aff would be affected and is in the same axis as cell...
              if (
                aff.val <= 0 &&
                aff.notes[soln - 1] > 0 &&
                affIndexes[a] === indexes[a]
              ) {
                // ...highlight the soln val in state.
                aff.notes[soln - 1] = 3;
                // ...highlight the soln val in the showcase.
                showcase.houses[aff.house][aff.room].notes[soln - 1] = 2;
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
