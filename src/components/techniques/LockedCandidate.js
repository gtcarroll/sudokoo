//import React from "react";
import { helper } from "./TechniqueHelper.js";

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
  check: (cell, state, snapshot) => {
    let axisKeys = Object.keys(cell.pos);
    let indexes = [cell.pos.row, cell.pos.col];

    // for each axis (row and col) this cell belongs to...
    for (let a = 0; a < 2; a++) {
      let wasUpdated = false;
      let diffHouse = (c1, c2) => {
        return c1.pos.house !== c2.pos.house;
      };
      let unseen = helper.getUnseen(cell, state, axisKeys[a], diffHouse);

      // ...if there are any unseen suspects left...
      if (unseen.length > 0) {
        let soln = unseen[0];
        let notOnlyOne = false;
        for (let r = 0; r < 9; r++) {
          let roomie = state.sudoku.houses[cell.pos.house][r];
          notOnlyOne |=
            r !== cell.pos.room &&
            roomie.val <= 0 &&
            roomie.notes[soln] > 0 &&
            unseen.includes(soln);
        }
        // ...if this cell is not the only one in its axis and house w soln in suspects...
        if (notOnlyOne) {
          // ...for each other unsolved cell in the same house...
          for (let r = 0; r < 9; r++) {
            if (r !== cell.pos.room) {
              let aff = state.sudoku.houses[cell.pos.house][r];
              let affIndexes = [aff.pos.row, aff.pos.col];

              // ...if aff would be affected and is not in the same axis as cell...
              if (
                aff.val <= 0 &&
                aff.notes[soln] > 0 &&
                affIndexes[a] !== indexes[a]
              ) {
                wasUpdated = true;

                // ...remove the soln from that cell's suspects.
                aff.notes[soln] = -1;
                // ...cross out the soln in the snapshot.
                snapshot.houses[aff.pos.house][aff.pos.room].notes[soln] = -1;
              }
            }
          }

          if (wasUpdated) {
            for (let r = 0; r < 9; r++) {
              let aff = state.sudoku.houses[cell.pos.house][r];
              let affIndexes = [aff.pos.row, aff.pos.col];

              // ...if aff would be affected and is in the same axis as cell...
              if (
                aff.val <= 0 &&
                aff.notes[soln] > 0 &&
                affIndexes[a] === indexes[a]
              ) {
                // ...highlight the soln val in state.
                aff.notes[soln] = 2;
                // ...highlight the soln val in the snapshot.
                snapshot.houses[aff.pos.house][aff.pos.room].notes[soln] = 2;
              }
            }
          }
        }
      }
      // ...if updates to sudoku state were made, return them
      if (wasUpdated) return snapshot;
    }
    return false;
  },
};
