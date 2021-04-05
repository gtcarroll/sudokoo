//import React from "react";
import { helper } from "./TechniqueHelper.js";

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
  check: (cell, state, snapshot) => {
    let wasUpdated = false;
    let axisKeys = Object.keys(cell.pos);
    let axes = [state.sudoku.rows, state.sudoku.cols];
    let cellIndexes = [cell.pos.row, cell.pos.col];

    // for each [row, col] this cell belongs to...
    for (let a = 0; a < 2; a++) {
      let axis = axes[a][cellIndexes[a]];
      let diffAxis = (c1, c2) => {
        let axisKey = axisKeys[a];
        return c1.pos[axisKey] !== c2.pos[axisKey];
      };
      let unseen = helper.getUnseen(cell, state, axisKeys[2], diffAxis);

      // ...if there are any unseen suspects left...
      if (unseen.length > 0) {
        let soln = unseen[0];
        let notOnlyOne = false;
        for (let i = 0; i < 9; i++) {
          let roomie = axis[i];
          notOnlyOne |=
            roomie.house !== cell.pos.house &&
            roomie.val <= 0 &&
            roomie.notes[soln] > 0 &&
            unseen.includes(soln);
        }
        // ...if this cell is not the only one in its axis and house w soln in suspects...
        if (notOnlyOne) {
          for (let i = 0; i < 9; i++) {
            let aff = axis[i];
            let affIndexes = [aff.pos.row, aff.pos.col];

            // ...if aff would be affected and is in the same axis as cell...
            if (
              aff.val <= 0 &&
              aff.notes[soln] > 0 &&
              affIndexes[a] === cellIndexes[a]
            ) {
              if (aff.pos.house !== cell.pos.house) {
                wasUpdated = true;
                // ...remove the soln val in state.
                aff.notes[soln] = -1;
                // ...remove the soln val in the snapshot.
                snapshot.houses[aff.pos.house][aff.pos.room].notes[soln] = -1;
              }
            }
          }

          if (wasUpdated) {
            for (let i = 0; i < 9; i++) {
              let aff = axis[i];
              let affIndexes = [aff.pos.row, aff.pos.col];

              // ...if aff would be affected and is in the same axis as cell...
              if (
                aff.val <= 0 &&
                aff.notes[soln] > 0 &&
                affIndexes[a] === cellIndexes[a]
              ) {
                if (aff.pos.house === cell.pos.house) {
                  wasUpdated = true;
                  // ...highlight the soln val in state.
                  aff.notes[soln] = 2;
                  // ...highlight the soln val in the snapshot.
                  snapshot.houses[aff.pos.house][aff.pos.room].notes[soln] = 2;
                }
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
